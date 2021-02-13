const mongoose = require('mongoose');
const dbPW = process.env.mongoPW
// mongoose.connect('mongodb://localhost/fetchers');
mongoose.connect(`mongodb+srv://Tim925:${dbPW}@cluster0.ay9l3.mongodb.net/fetchers?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
  .catch((err)=>{
    console.log(err)
  })
}


let getRepoArray = (owner, cb) => {
  Repo.find({ownerID: owner})
  .then((repoArray)=>{
    cb(repoArray)
  })
  .catch((err)=>{
    console.log(err)
  })
}


let save = (repo, cb) => {
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


  Repo.find({repoID: repo.id})
    .then((repos) => {
      if (repos.length === 0) {
        newRepo.save((err, newRepo)=>{
          if (err) {
            return console.err(err)
          }
        })
      }
      resolve()
    })
    .catch((err)=>{
      reject(err)
    })
  })
}


module.exports.save = save;
module.exports.getAll = getAll;
module.exports.getRepoArray = getRepoArray;