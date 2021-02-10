const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  gitHandle: String
  // repoID: Number
  // name: String
  // watchers_count: Number
  // forks_count: Number
  // htmlURL: String
  // ownerLogin: String
  // ownerID: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  let newRepo = new Repo(repo)
  console.log('****logging newRepo********')
  console.log(newRepo)

  // newRepo.save()
  //   .then(()=>{
  //     cb('saved')
  //   })

  newRepo.save((err, newRepo)=>{
    if (err) {
      console.log('error')
      console.log(err)
      return console.err(err)
    }
    // console.log(newRepo)
    cb(newRepo)
    Repo.find({gitHandle: "TimDAnderson2"})
      .then((repos) => {
        console.log('LOGGING ONE')
        console.log(repos)
        let found = repos[0]['_doc']
        console.log(found)
      })
      .catch((err)=>{
        console.log(err)
      })
  })
}


//quick test
save({ gitHandle: "TimDAnderson2" }, (result) => {
  console.log(result)
})



module.exports.save = save;