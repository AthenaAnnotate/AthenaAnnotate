// to reformat the data from the database into User object
module.exports = function(user, res) {
  console.log(user);
  var result = {};

  result.id = user.id;
  result.title = user.title;
  result.facebook = {
    id: user.facebookId,
    name: user.name,
    email: user.email,
    picture: user.picture
  };
  res.send(result);
};
