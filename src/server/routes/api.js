var Router = require('express').Router;
var router = new Router();
var models = require('../models/index');
var annotationConstructor = require('../utils/annotationConstructor');
var listOfDocs = require('../utils/listOfDocs');
var userConstructor = require('../utils/userConstructor');
var scraper = require('../utils/scraper');
var addOtherUsers = require('../utils/addOtherUsers');

// EXTENSION - creates an annotation for a given Doc and User
router.post('/api/create', function(req, res) {
  models.Doc.findOrCreate({
    where: { url: req.body.target.source },
    raw: true
  }).then(function(doc) {
    // if doc[1] = true, then send to scraper
    if (doc[1] === true) {
      scraper(req.body.target.source);
    }
    models.Annotation.create({
      UserId: Number(req.body.creator),
      DocId: Number(doc[0].id),
      url: req.body.id,
      text: req.body.body.text,
      source: req.body.target.source,
      exact: req.body.target.selector.exact,
      prefix: req.body.target.selector.prefix,
      suffix: req.body.target.selector.suffix,
      private: req.body.private,
      groupId: req.body.groupId
    }).then(function(note) {
      models.Annotation.findAll({
        include: [{
          model: models.User
        }],
        where: { id: note.dataValues.id }
      }).then(function(annotation) {
        annotationConstructor(annotation, res);
      }).catch(function(err) {
        res.send(err);
      });
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// EXTENSION - loads Annotations for a given Doc for a given User
router.get('/api/doc', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId,
      source: req.query.source
    },
    order: [['createdAt', 'ASC']]
  }).then(function(annotations) {
    annotationConstructor(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - updates an annotation
router.put('/api/annotations', function(req, res) {
  models.Annotation.update({
    // exact: req.body.target.selector.exact,
    // prefix: req.body.target.selector.prefix,
    // suffix: req.body.target.selector.suffix,
    text: req.body.body.text,
    private: req.body.private,
    groupId: req.body.groupId
  }, {
    where: { url: req.body.id },
    returning: true
  }).then(function(annotations) {
    models.Annotation.findAll({
      include: [{
        model: models.User
      }],
      where: { url: annotations[1][0].dataValues.url }
    }).then(function(annotation) {
      annotationConstructor(annotation, res);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - deletes an annotation
router.delete('/api/annotations', function(req, res) {
  models.Annotation.destroy({
    where: { url: req.query.id }
  }).then(function() {
    res.send('deleted');
  }).catch(function() {
    res.send('error');
  });
});

// BOTH - finds or creates User
router.post('/api/users', function(req, res) {
  models.User.findOrCreate({
    where: {
      facebookId: req.body.id
    },
    defaults: {
      name: req.body.name,
      email: req.body.email,
      picture: req.body.picture.data.url
    }
  }).then(function(user) {
    userConstructor(user[0], res);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - updates a User's info
router.put('/api/users', function(req, res) {
  models.User.update({
    name: req.body.name,
    title: req.body.title
  }, {
    where: { id: req.body.id },
    returning: true
  }).then(function(users) {
    userConstructor(users[1][0].dataValues, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all Annotations for a given User
router.get('/api/annotations', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all public Annotations excluding the User's own
router.get('/api/discover', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: {
        $notIn: [req.query.UserId]
      },
      private: 'Public'
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all Annotations form users that User is following
router.get('/api/following', function(req, res) {
  models.Follows.findAll({
    include: [{
      model: models.User,
      as: 'follows'
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(users) {
    models.Annotation.findAll({
      include: [{
        model: models.User
      }, {
        model: models.Doc
      }],
      where: {
        UserId: {
          $in: users.map(function(user) {
            return user.dataValues.follows.id;
          })
        },
        private: 'Public'
      },
      order: [['updatedAt', 'DESC']]
    }).then(function(annotations) {
      res.send(annotations);
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads Docs for a given User
router.get('/api/docs', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(annotations) {
    listOfDocs(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - deletes all annotations for a given Doc for a given User
router.delete('/api/docs', function(req, res) {
  models.Annotation.destroy({
    where: {
      UserId: req.query.UserId,
      DocId: req.query.DocId
    }
  }).then(function() {
    res.send('deleted');
  }).catch(function() {
    res.send('error');
  });
});

// BOTH - toggles following a User
router.post('/api/follow', function(req, res) {
  models.Follows.findAll({
    where: {
      UserId: req.body.id,
      followsId: req.body.userId
    }, attributes: ['id']
  }).then(function(join) {
    if (join.length === 0) {
      models.Follows.create({
        UserId: req.body.id,
        followsId: req.body.userId
      }).then(function(newjoin) {
        res.send(newjoin);
      }).catch(function(err) {
        res.send(err);
      });
    } else {
      models.Follows.destroy({
        where: {
          id: join[0].id
        }
      }).then(function() {
        res.send(JSON.stringify({ UserId: 'deleted' }));
      }).catch(function() {
        res.send(JSON.stringify({ failure: 'failure' }));
      });
    }
  }).catch(function() {
  });
});

// BOTH - loads a list of Users that a User is following
router.get('/api/follow', function(req, res) {
  models.Follows.findAll({
    include: [{
      model: models.User,
      as: 'follows'
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(users) {
    res.send(users.map(function(user) {
      return user.dataValues.follows;
    }));
    // res.send(users);
  }).catch(function(err) {
    // console.log(err);
    res.send(err);
  });
});

// BOTH - finds a Group, or creates a Group and adds User as a member
router.post('/api/groups', function(req, res) {
  models.Group.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      creatorId: req.body.UserId
    }
  }).then(function(group) {
    if (group[1] === false) {
      res.send(JSON.stringify('Group Already Exists!'));
    } else {
      models.UserGroup.create({
        UserId: req.body.UserId,
        GroupId: group[0].dataValues.id
      }).then(function(newGroup) {
        addOtherUsers(req.body.otherUsersArray, group[0].dataValues.id, req.body.creator);
        res.send(JSON.stringify(newGroup.dataValues.GroupId));
      }).catch(function(err) {
        res.send(err);
      });
    }
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - gets list of Groups for a User
router.get('/api/groups', function(req, res) {
  models.UserGroup.findAll({
    include: [{
      model: models.Group,
      as: 'users'
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(groups) {
    res.send(groups.map(function(group) {
      return group.dataValues.users;
    }));
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - removes association to a Group - returns list of Groups
router.delete('/api/groups', function(req, res) {
  models.UserGroup.destroy({
    where: {
      UserId: req.query.UserId,
      GroupId: req.query.GroupId
    }
  }).then(function() {
    models.UserGroup.findAll({
      include: [{
        model: models.Group,
        as: 'users'
      }],
      where: {
        UserId: req.query.UserId
      }
    }).then(function(groups) {
      res.send(groups.map(function(group) {
        return group.dataValues.users;
      }));
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - load all annotations for a specific group
router.get('/api/group', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      // private: 'Group',
      groupId: req.query.GroupId,
      source: req.query.source
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// To handle joining an existing Group
router.post('/api/groups/invite', function(req, res) {
  addOtherUsers(req.body.otherUsersArray, req.body.GroupId, req.body.creator);
  res.send('invites sent');
});

// To handle searching for users
router.get('/api/search/users', function(req, res) {
  models.User.findAll({
    where: {
      name: {
        $iLike: req.query.name + '%'
      },
      id: {
        $ne: req.query.user
      }
    }
  }).then(function(users) {
    res.send(users);
  }).catch(function(error) {
    res.send(error);
  });
});

module.exports = router;

// To handle accepting or declining a Group invitation
router.post('/api/groups/join', function(req, res) {
  models.UserInvite.destroy({
    where: {
      UserId: req.body.UserId,
      GroupId: req.body.GroupId
    }
  }).then(function() {
    if (req.body.accept === true) {
      models.UserGroup.create({
        UserId: req.body.UserId,
        GroupId: req.body.GroupId
      }).then(function(newAssociation) {
        res.send(JSON.stringify(newAssociation.dataValues.GroupId));
      }).catch(function(error) {
        res.send(error);
      });
    } else {
      res.send('declined');
    }
  }).catch(function(error) {
    res.send(error);
  });
});

// To handle fetching all Invites for a specific User
router.get('/api/invites', function(req, res) {
  models.UserInvite.findAll({
    where: {
      UserId: req.query.user
    }
  }).then(function(associations) {
    res.send(associations);
  }).catch(function(error) {
    res.send(error);
  });
});

// Get a list of groups and users followed
router.get('/api/channels', function (req, res) {
  models.User.findAll({
    include: [{
      model: models.Group,
      as: 'groups'
    }, {
      model: models.User,
      as: 'follows'
    }],
    where: {
      id: req.query.UserId
    }
  }).then(function(list) {
    var groups = list[0].groups.map(function(group) {
      return { id: group.id, name: group.name, type: 'group' };
    });
    var following = list[0].follows.map(function(user) {
      return { id: user.id, name: user.name, type: 'user' };
    });
    var results = groups.concat(following);
    res.send(results);
  });
});

// Get a list of annotations for a Group for a Doc
router.get('/api/group/doc', function(req, res) {
  models.UserGroup.findAll({
    include: [{
      model: models.User,
      as: 'groups'
    }],
    where: {
      GroupId: req.query.GroupId
    }
  }).then(function(users) {
    var userList = users.map(function(user) {
      return user.UserId;
    });
    models.Annotation.findAll({
      include: [{
        model: models.User
      }, {
        model: models.Doc
      }],
      where: {
        UserId: {
          $in: userList
        },
        source: req.query.source,
        private: 'Public'
      },
      order: [['createdAt', 'ASC']]
    }).then(function(annotations) {
      annotationConstructor(annotations, res);
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// Get a list of annotations for a followed User for a Doc
router.get('/api/following/doc', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId,
      source: req.query.source,
      private: 'Public'
    },
    order: [['createdAt', 'ASC']]
  }).then(function(annotations) {
    annotationConstructor(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// Get a list of all members of a group, sorted alphabetically
router.get('/api/groups/members', function(req, res) {
  models.UserGroup.findAll({
    include: [{
      model: models.User,
      as: 'groups'
    }, {
      model: models.Group,
      as: 'users'
    }],
    where: {
      GroupId: req.query.GroupId
    }
  }).then(function(users) {
    var members = users.map(function(user) {
      return user.dataValues.groups.dataValues;
    });
    res.send({
      groupName: users[0].dataValues.users.dataValues.name,
      creator: members.filter(function(member) {
        return member.id === users[0].dataValues.users.dataValues.creatorId;
      })[0].name,
      members: members.sort(function(a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      })
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// Get a specific User's annotations
router.get('/api/user', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId,
      private: 'Public'
    },
    order: [['updatedAt', 'DESC']]
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(error) {
    res.send(error);
  });
});
