module.exports.features = require('./Modernizr');

module.exports.dashedToCamelCase = function (dashed) {
  return dashed.replace(/(\-[a-z])/g, function(match, p1, offset, string){
    return (offset === 0 ? p1.toLowerCase() : p1.toUpperCase()).replace('-','');
  });
};

module.exports.camelCaseToDashed = function (camelCase) {
  return camelCase
    .replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    })
    .replace(/^ms-/, '-ms-');
};

var lookup = module.exports.lookup = { css: {}, js: {}};
module.exports.addProperty = function(dashedOrCamelCase) {
  var camelCase = module.exports.dashedToCamelCase(dashedOrCamelCase);
  var dashed = module.exports.camelCaseToDashed(camelCase);
  var prefixedCC = module.exports.features.prefixed(camelCase);
  module.exports.lookup.js[camelCase] = prefixedCC;

  if (prefixedCC) {
    module.exports.lookup.css[dashed] = module.exports.camelCaseToDashed(prefixedCC);
  } else {
    module.exports.lookup.css[dashed] = prefixedCC;
    console.log('no support for', dashed, camelCase, prefixedCC);
  }
};
