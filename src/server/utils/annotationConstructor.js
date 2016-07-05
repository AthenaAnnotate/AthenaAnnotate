// to reformat the data from the database into Annotation Object
module.exports = function(array, res) {
  var result = [];
  array.forEach(function(item) {
    var obj = {};
    obj.id = item.url;
    obj.createdAt = item.createdAt;
    obj.creator = {
      id: item.User.id,
      name: item.User.name,
      title: item.User.title
    };
    obj.body = {
      lastModified: item.updatedAt,
      text: item.text
    };
    obj.target = {
      source: item.source,
      selector: {
        exact: item.exact,
        prefix: item.prefix,
        suffix: item.suffix
      }
    };
    obj.private = item.private;
    obj.group = item.groupId;
    result.push(obj);
  });
  res.send(result);
};
