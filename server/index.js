const express = require('express');
const bodyParser = require('body-parser')
const gitLookup = require('../helpers/github')
const top25 = require('../helpers/top25')
const database = require('../database')
const cors = require('cors');


//the purpose of this function is to make sure all
//repos get saved to db before returning to clinet
function mapRepos (repoArray, cb) {
  let promises = [];
  repoArray.forEach((repo)=>{
    promises.push(database.save(repo))
  })
  Promise.all(promises)
    .then(()=>{
      database.getRepoArray(repoArray[0]['owner'].id, (repoArray)=>{
        cb(repoArray)
      })
    })
}

let app = express();

var jsonParser = bodyParser.json()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', jsonParser, function (req, res) {
  console.log('got a post request')
  gitLookup.getReposByUsername(req.body.GitHandle, (err, repoArray) => {
    mapRepos(repoArray.data, (repoArray)=>{
      res.send(repoArray)
    })
  })
});

app.get('/repos', function (req, res) {
  console.log('got a get request')
  database.getAll((repoArray)=>{
    console.log('******THIS IS HTE REPO ARRAY FROM INDEX EXPRESS')
    console.log(repoArray)
    top25.lookup(repoArray, (top25Arr)=>{
      res.send(top25Arr)
    })
  })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

