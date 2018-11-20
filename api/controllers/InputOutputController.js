/**
 * InputOutputController
 *
 * @description :: Server-side logic for managing Input/Output data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const GeoJSON = require('geojson')
const tj = require('togeojson')
const fs = require('fs')
const DOMParser = require('xmldom').DOMParser
const mime = require('mime-types')
const geolib = require('geolib')
const unzip = require('unzip')
const uuidv1 = require('uuid/v1')

function processKML (path) {
  let data = fs.readFileSync(path, 'utf8')
  let kml = new DOMParser().parseFromString(data)
  let converted = tj.kml(kml)
  fs.unlinkSync(path)
  return converted
}

async function exportData (criteriaSites, criteriaPaths) {
  let sites
  try {
    sites = await Site.find(criteriaSites)
  } catch (err) {
    throw err
  }

  let paths
  try {
    paths = await Path.find(criteriaPaths).populate('first').populate('last')
  } catch (err) {
    throw err
  }
  let data = []
  for (let x in sites) {
    let site = sites[x]
    data.push({'lat': site.latitude, 'lng': site.longitude, 'type': site.type, 'status': site.status, 'name': site.name})
  }
  // Now we have everything
  for (let x in paths) {
    let path = paths[x]
    let pLine = []
    let intermedial = path.intermedial

    for (let idxPolyline in intermedial) {
      let latlng = intermedial[idxPolyline]
      pLine.push([latlng[1], latlng[0]])
    }
    pLine.unshift([path.first.longitude, path.first.latitude]) // We put in front of the array the first site
    pLine.push([path.last.longitude, path.last.latitude]) // We put in front of the array the last site

    data.push({'polyline': pLine, 'type': path.type, 'name': path.name, 'status': path.status})
  }
  return GeoJSON.parse(data, {'Point': ['lat', 'lng'], 'LineString': 'polyline'})
}

function importSites (data, project, zone, threshold) {
  return new Promise((resolve, reject) => {
    try {
      if (data.type !== 'FeatureCollection') {
        reject('GeoJSON its not well formatted')
      }
      let sites = []
      let paths = []
      let positions = data.features
      for (let x in positions) {
        // We iterate geojson
        if (positions[x].type !== 'Feature') {
          reject('GeoJSON its not well formatted')
        }
        if (positions[x].geometry.type === 'Point') {
          // We import this site
          let site = {}
          site['type'] = 'notdefined' // Define default not hardcoded
          if (positions[x].properties) { // We have to test if it's possible somewhere
            if (positions[x].properties.name) site['name'] = positions[x].properties.name || 'site-' + uuidv1()
            if (positions[x].properties.type) site['type'] = positions[x].properties.type
            if (positions[x].properties.status) site['status'] = positions[x].properties.status
          }

          site['latitude'] = positions[x].geometry.coordinates[1]
          site['longitude'] = positions[x].geometry.coordinates[0]
          site['project'] = project
          site['zone'] = zone
          // Call database ORM
          if (!isNaN(site.latitude) && !isNaN(site.longitude)) {
            sites.push(site)
          }
        }
        else if (positions[x].geometry.type === 'LineString') {
          // Test minimum 2
          let path = {}
          let flag = true
          path['name'] = 'path-' + uuidv1()
          path['type'] = 'notdefined'
          path['status'] = 'Planned'
          path['intermedial'] = []
          for (let y in positions[x].geometry.coordinates) {
            let latitude = positions[x].geometry.coordinates[y][1]
            let longitude = positions[x].geometry.coordinates[y][0]
            if (isNaN(latitude) || isNaN(longitude)) flag = false
            path.intermedial.push([
              latitude,
              longitude
            ])
          }
          if (flag) {
            paths.push(path)
          }
        }
      }

      let sitesPromises = []
      let pathsPromises = []
      // Now we have to work with paths and sites
      for (let x in paths) {
        // Search first/end point existence
        // If exists use existing point
        let posIni = sites.findIndex(function (e, index) {
          let dist = geolib.getDistance(
            {latitude: paths[x].intermedial[0][0],
            longitude: paths[x].intermedial[0][1]},
            {latitude: e.latitude, longitude: e.longitude}
          )
          return (dist < threshold)
        })
        let posEnd = sites.findIndex(function (e, index) {
          let end = paths[x].intermedial.length -1
          let dist = geolib.getDistance(
            {latitude: paths[x].intermedial[end][0],
            longitude: paths[x].intermedial[end][1]},
            {latitude: e.latitude, longitude: e.longitude}
          )
          return (dist < threshold)
        })
        if(posIni < 0) { // In this case we have to create a Site
          let newSite = {}
          newSite['name'] = 'site-' + uuidv1()
          newSite['type'] = 'notdefined'
          newSite['latitude'] = paths[x].intermedial[0][0]
          newSite['longitude'] = paths[x].intermedial[0][1]
          newSite['project'] = project
          newSite['status'] = 'Planned'
          newSite['zone'] = zone
          sites.push(newSite)
          posIni = sites.length - 1
        }
        if(posEnd < 0) { // In this case we have to create a Site
          let newSite = {}
          let end = paths[x].intermedial.length -1
          newSite['name'] = 'site-' + uuidv1()
          newSite['type'] = 'notdefined'
          newSite['latitude'] = paths[x].intermedial[end][0]
          newSite['longitude'] = paths[x].intermedial[end][1]
          newSite['project'] = project
          newSite['status'] = 'Planned'
          newSite['zone'] = zone
          sites.push(newSite)
          posEnd = sites.length - 1
        }
        paths[x].posIni = posIni
        paths[x].posEnd = posEnd
      }
      for (let x in sites) {
        sitesPromises.push(Site.create(sites[x]))
      }
      let resultSites = []
      Promise.all(sitesPromises).then(async function (values) {
        for (let x in paths) {
          let path = paths[x]
          path.intermedial.splice(0, 1)
          path.intermedial.splice(path.intermedial.length - 1, 1)

          // We calculate distances
          let distance
          try {
            distance = await sails.helpers.getDistancePath(values[path.posIni].id, values[path.posEnd].id, path.intermedial)
          } catch (err) {
            reject(err)
          }

          pathsPromises.push(Path.create({
            name: path.name,
            type: path.type,
            intermedial: path.intermedial,
            first: values[path.posIni].id,
            last: values[path.posEnd].id,
            status: path.status,
            distance: distance,
            project: project
          }))
          resultSites = values
        }
        Promise.all(pathsPromises).then(function (values) {
          let result = {
            sites: resultSites,
            paths: values
          }
          resolve(result)
        }).catch(function (reason) {
          reject(reason)
        })
      }).catch(function (reason) {
        reject(reason)
      })
    }
    catch (err) {
      reject(err)
    }
  })
}

 module.exports = {
   exports: async function (req, res) {
     let id = req.param('id')
     if (!id) {
       return res.badRequest('No project id was supplied.')
     }

     // First we validate project
     let project
     try {
       project = await Project.findOne(id)
     } catch (err) {
       throw err
     }
     // If we don't have a project with given id we must return err
     if (!project) throw new Error('This project doesn\'t exist!')

     let data
     try {
       data = await exportData({project: id}, {project: id})
     } catch (err) {
       console.log(err)
       return res.badRequest(err)
     }
     return res.json(data)
   },

   exportsAll: async function (req, res) {
     let data
     try {
       data = await exportData({ type: {'!=': ['node']}})
     } catch (err) {
       console.log(err)
       return res.badRequest(err)
     }
     return res.json(data)
   },
   imports: function (req, res) {
     req.file('data').upload({
        // don't allow the total upload size to exceed ~10MB
        maxBytes: 10000000
      }, function whenDone(err, uploadedFiles) {

        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return res.badRequest({msg: 'No file was uploaded'});
        }

        // If no project_id is issued, respond with an error
        if (!req.body.project) {
          return res.badRequest({msg: 'No project id was issued'});
        }
        let threshold = (Number.isInteger(req.body.threshold) && req.body.threshold > 0) ? req.body.threshold : 10
        if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.kmz')) {
          fs.createReadStream(uploadedFiles[0].fd)
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
              var fileName = entry.path
              var type = entry.type // 'Directory' or 'File'
              var size = entry.size
              if (fileName === 'doc.kml') {
                entry.pipe(fs.createWriteStream(uploadedFiles[0].fd + '.kml'))
                  .on('close', function () {
                    fs.unlinkSync(uploadedFiles[0].fd)
                    let data = processKML(uploadedFiles[0].fd + '.kml')
                    importSites(data, req.body.project, req.body.defaultZone, threshold).then(response => {
                      return res.json(response)
                    }, error => {
                      return res.json({msg: error})
                    })
                  })
              } else {
                entry.autodrain()
              }
            })
        }
        else if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.geojson')) {
          let data = fs.readFileSync(uploadedFiles[0].fd, 'utf8')
          fs.unlinkSync(uploadedFiles[0].fd)
          importSites(JSON.parse(data), req.body.project, req.body.defaultZone, threshold).then(response => {
            return res.json(response)
          }, error => {
            return res.json({msg: error})
          })
        }
        else if (mime.lookup(uploadedFiles[0].fd) === mime.lookup('.kml')) {
          let data = processKML(uploadedFiles[0].fd)
          importSites(data, req.body.project, req.body.defaultZone, threshold).then(response => {
            return res.json(response)
          }, error => {
            return res.json({msg: error})
          })
        }
        else {
          return res.json({msg: 'No file was uploaded or invalid file format.'})
        }
    })
   }
 };
