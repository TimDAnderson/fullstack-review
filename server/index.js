const express = require('express');
const bodyParser = require('body-parser')

let app = express();
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/../client/dist'));



app.post('/repos', jsonParser, function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('got a post request')
  console.log(req)
  console.log(req.body)
  console.log(req.json)


  res.send("got it")
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

