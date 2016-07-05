var cheerio = require('cheerio');
var request = require('request');
var sizeOf = require('request-image-size');
var url = require('url');
var Promise = require('bluebird');
var models = require('../models/index');
var $;

var getDimensions = Promise.promisify(sizeOf);

var updateDoc = function(imageUrl, originalLink) {
  models.Doc.update({
    image: imageUrl
  }, {
    where: {
      url: originalLink
    },
    returning: true
  }).then(function(doc) {
    console.log(doc);
  });
};

var getLargest = function (imgArray, originalLink) {
  var maxDimensions = 0;
  var currDimension = 0;
  var dimArray = [];
  var largest = null;
  var i;
  var j;
  for (i = 0; i < imgArray.length; i ++) {
    dimArray.push(getDimensions({ url: imgArray[i], timeout: 5000 }));
  }
  Promise.all(dimArray.map(function(promise) {
    return promise.reflect();
  }))
  .then(function(results) {
    for (j = 0; j < results.length; j ++) {
      if (results[j].isFulfilled() && results[j].value() !== undefined) {
        currDimension = results[j].value().width * results[j].value().height;
        if (currDimension > maxDimensions) {
          maxDimensions = currDimension;
          largest = imgArray[j];
        }
      }
    }
    updateDoc(largest, originalLink);
  })
  .catch(function(error) {
    console.log(error);
  });
};

var getImages = function(doc, originalLink) {
  var images = doc('img');
  var keys = Object.keys(images);
  var key;
  var imgArray = [];
  var i;
  var urlObj;
  var baseUrl = url.parse(originalLink).protocol + '//' + url.parse(originalLink).hostname;

  console.log(keys.length);
  for (i = 0; i < keys.length; i++) {
    if (images[keys[i]].attribs) {
      for (key in images[keys[i]].attribs) {
        urlObj = url.parse(images[keys[i]].attribs[key]);
        if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
          imgArray.push(images[keys[i]].attribs[key]);
        } else if (urlObj.protocol !== 'data:' && urlObj.path !== null) {
          imgArray.push(url.resolve(baseUrl, urlObj.path));
        }
        console.log(imgArray.length);
      }
    }
  }
  getLargest(imgArray, originalLink);
};

var getTitle = function(doc, originalLink) {
  var baseUrl = url.parse(originalLink).protocol + '//' + url.parse(originalLink).hostname;
  var title = doc('title');
  models.Doc.update({
    title: title[0].children[0].data,
    baseUrl: baseUrl
  }, {
    where: {
      url: originalLink
    },
    returning: true
  }).then(function(entry) {
    console.log(entry);
  }).catch(function(error) {
    console.log(error);
  });
};

var getHTML = function(link) {
  request({
    uri: link,
    jar: true,
    maxRedirects: 20
  }, function(error, response, body) {
    if (!error) {
      $ = cheerio.load(body);
      getImages($, link);
      getTitle($, link);
    } else {
      console.log(error);
    }
  });
};

module.exports = getHTML;
