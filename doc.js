// Script to extract project Models to json (swagger)

process.chdir(__dirname);

const fs = require('fs');

var models = require('require-all')({
  dirname     :  __dirname + '/api/models',
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

function addAttributeToResult (name, attr, data) {
  switch (attr.type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
    case 'array':
    case 'object':
      data.properties[name] = {type: attr.type};
      break;
    case 'json':
      data.properties[name] = {type: 'object'};
      break;
    default:
      break;
  }
}

var modelsDefaultAttributes = require(__dirname + '/config/models').models.attributes;

for (let x in models) {
  if (models.hasOwnProperty(x)) {
    let data = { properties: {}};
    let model = models[x];
    for (let y in modelsDefaultAttributes) {
      if (modelsDefaultAttributes.hasOwnProperty(y)) {
        let attr = modelsDefaultAttributes[y];
        if (model.attributes[y] !== false) {
          addAttributeToResult(y, attr, data);
        }
      }
    }
    for (let y in model.attributes) {
      if (model.attributes.hasOwnProperty(y)) {
        let attr = model.attributes[y];
        addAttributeToResult(y, attr, data);
      }
    }

    let filename = __dirname + '/assets/swagger/models/' + x + '.json';
    let json = JSON.stringify(data);
    fs.writeFileSync(filename, json);
  }
}
