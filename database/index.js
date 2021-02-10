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

let getRepoArray = (owner, cb) => {
  Repo.find({ownerID: owner})
  .then((repoArray)=>{
    cb(repoArray)
  })

}

let save = (repo, cb) => {
  console.log(repo)
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  let newRepo = new Repo({
    gitHandle: repo['owner']['login'],
    repoID: repo.id,
    name: repo.name,
    watchers_count: repo.watchers_count,
    forks_count: repo.forks_count,
    htmlURL: repo.html_url,
    ownerID: repo['owner'].id
  })
  console.log('****logging newRepo********')
  console.log(newRepo)

  // newRepo.save()
  //   .then(()=>{
  //     cb('saved')
  //   })


  Repo.find({repoID: repo.id})
      .then((repos) => {
        console.log('LOGGING ONE')
        console.log(repos.length)

        if (repos.length === 0) {
          newRepo.save((err, newRepo)=>{
            if (err) {
              console.log('error')
              console.log(err)
              return console.err(err)
            }
            //do a find all for this github handle
            // Repo.find({ownerID: repo['owner'].id})
            //   .then((repoArray)=>{
            //     cb(repoArray)
            //   })

          })

        }
      })
      .catch((err)=>{
        console.log(err)
      })

}


//quick test
// save({ repoID: 123 }, (result) => {
//   console.log(result)
// })



module.exports.save = save;

module.exports.getRepoArray = getRepoArray;