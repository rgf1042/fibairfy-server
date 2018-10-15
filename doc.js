// Script to extract project Models to json (swagger)

process.chdir(__dirname);

const fs = require('fs');

var models = require('require-all')({
  dirname     :  __dirname + '/api/models',
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

function addAttributeToResult (name, attr, data, type) {
  switch (attr.type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
    case 'array':
    case 'object':
      data[type].properties[name] = {type: attr.type};
      break;
    case 'json':
      data[type].properties[name] = {type: 'object'};
      break;
    default:
      break;
  }
}

function attachAdditionalInfoToAttribute (name, model, data, type) {
  try {
    let additional = model._swagger.attributes.append[type][name]
    let current = data[type].properties[name];
    current = Object.assign(current, additional);
  } catch (err) {

  }
}

function addAttributes (model, type, data) {
  for (let y in modelsDefaultAttributes) {
    if (modelsDefaultAttributes.hasOwnProperty(y)) {
      let attr = modelsDefaultAttributes[y];
      let isDisabled = false;
      try {
        isDisabled = Boolean(model._swagger.attributes.ignore[type][y]);
      } catch (err) {
        isDisabled = false
      }
      if (model.attributes[y] !== false && !isDisabled) {
        addAttributeToResult(y, attr, data, type);
        attachAdditionalInfoToAttribute(y, model, data, type);
      }
    }
  }

  for (let y in model.attributes) {
    if (model.attributes.hasOwnProperty(y)) {
      let attr = model.attributes[y];
      let isDisabled = false;
      try {
        isDisabled = Boolean(model._swagger.attributes.ignore[type][y]);
      } catch (err) {
        isDisabled = false
      }
      if (!isDisabled) {
        addAttributeToResult(y, attr, data, type);
        attachAdditionalInfoToAttribute(y, model, data, type);
      }
    }
  }
}

var modelsDefaultAttributes = require(__dirname + '/config/models').models.attributes;

for (let x in models) {
  if (models.hasOwnProperty(x)) {
    let data = {
      request: {
        properties: {}
      },
      response: {
        properties: {}
      }};
    let model = models[x];

    addAttributes(model, 'request', data);
    addAttributes(model, 'response', data);

    let filename = __dirname + '/assets/swagger/models/' + x + '.json';
    let json = JSON.stringify(data);
    fs.writeFileSync(filename, json);
  }
}
