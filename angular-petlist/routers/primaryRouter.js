var
  express = require('express'),
  primaryRouter = express.Router(),
  request = require('request'),
  searchJson = require('../search.json')

primaryRouter.get('/', function(req, res){
  res.sendFile('client/index.html', {root: '/', jsonData: searchJson})
})

primaryRouter.get('/static/search.json',function(req, res){
  //send  back search.json file and the url parameter for service
  res.send({jsonData: searchJson, service: req.query.service})
})


module.exports = primaryRouter;
