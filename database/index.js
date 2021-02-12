const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetchers');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  gitHandle: String,
  repoID: Number,
  name: String,
  watchers_count: Number,
  forks_count: Number,
  htmlURL: String,
  ownerID: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let getAll = (cb) => {
  Repo.find()
  .then((repoArray)=>{
    cb(repoArray)
  })
}


let getRepoArray = (owner, cb) => {
  Repo.find({ownerID: owner})
  .then((repoArray)=>{
    cb(repoArray)
  })
}


let save = (repo, cb) => {
  // console.log(repo)
  return new Promise ((resolve, reject)=>{


  let newRepo = new Repo({
    gitHandle: repo['owner']['login'],
    repoID: repo.id,
    name: repo.name,
    watchers_count: repo.watchers_count,
    forks_count: repo.forks_count,
    htmlURL: repo.html_url,
    ownerID: repo['owner'].id
  })
  console.log('****finding then saving new repo********')
  // console.log(newRepo)


  Repo.find({repoID: repo.id})
    .then((repos) => {
      console.log('LOGGING ONE')
      console.log(repos.length)

      if (repos.length === 0) {
        console.log('new repo detected')
        newRepo.save((err, newRepo)=>{
          if (err) {
            console.log('error')
            console.log(err)
            return console.err(err)
          }
          resolve()
        })
      }
      resolve()
    })
    .catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}


//quick test
// save({ repoID: 123 }, (result) => {
//   console.log(result)
// })



module.exports.save = save;
module.exports.getAll = getAll;
module.exports.getRepoArray = getRepoArray;