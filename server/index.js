const express = require('express');
const bodyParser = require('body-parser')
const gitLookup = require('../helpers/github')
const database = require('../database')

async function mapRepos (repoArray, cb) {
  console.log('starting promise loop')
  const promises = repoArray.map( async repo => {
    const repoSave = await database.save(repo)
    return repoSave
  })
  repoSaves = await Promise.all(promises)

  console.log('ending the promise loop')
  database.getRepoArray(repoArray[0]['owner'].id, (repoArray)=>{
    cb(repoArray)
  })
}



let app = express();
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));



app.post('/repos', jsonParser, function (req, res) {
  console.log('got a post request')
  // console.log(req)
  // console.log(req.body)

  gitLookup.getReposByUsername(req.body.GitHandle, (err, repoArray) => {

    mapRepos(repoArray.data, (repoArray)=>{
      console.log('******************')
      console.log('this is an array of all the repos')
      console.log(repoArray)
      res.send(repoArray)
    })
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

