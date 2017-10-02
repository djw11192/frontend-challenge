var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  primaryRouter = require('./routers/primaryRouter.js')


app.set('port', process.env.PORT || 3000);


app.use(logger('dev'))
app.use(express.static('client'))
app.use(bodyParser.json())

app.use('/', primaryRouter)
/*app.get('/', function(req, res) {
  res.sendFile('client/index.html', {root: '/'})
})*/

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
