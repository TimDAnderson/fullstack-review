const mongoose = require('mongoose');
const dbPW = process.env.mongoPW
// mongoose.connect('mongodb://localhost/fetchers');
mongoose.connect(`mongodb+srv://Tim925:${mongo1566}@cluster0.ay9l3.mongodb.net/fetchers?retryWrites=true&w=majority`, {
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
    console.log('logging the repArray')
    console.log(repoArray)
    cb(repoArray)
  })
  .catch((err)=>{
    console.log('this is the catch err')
    console.log(err)
  })
}


let getRepoArray = (owner, cb) => {
  Repo.find({ownerID: owner})
  .then((repoArray)=>{
    console.log('in the find all')
    cb(repoArray)
  })
  .catch((err)=>{
    console.log('this is the catch err')
    console.log(err)
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
  // console.log(newRepo.repoID)
  console.log(repo.id)


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
      console.log('error from find')
      console.log(err)
      reject(err)
    })
  })
}

// save({
//   gitHandle: 'hi',
//   repoID: 2,
//   name: 'string',
//   watchers_count: 4,
//   forks_count: 5,
//   htmlURL: 'hi',
//   ownerID: 5
// })


module.exports.save = save;
module.exports.getAll = getAll;
module.exports.getRepoArray = getRepoArray;