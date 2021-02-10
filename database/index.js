const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  gitHandle: String,
  repoID: Number
  name: String
  watchers_count: Number
  forks_count: Number
  htmlURL: String
  ownerLogin: String
  ownerID: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repo.save((err, result)=>{
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      cb(result)
    }
  })
}

module.exports.save = save;