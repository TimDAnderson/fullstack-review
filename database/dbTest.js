const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  gitHandle: String,
  repoID: Number,
  reponame: String,
  watchers_count: Number,
  forks_count: Number,
  htmlURL: String,
  ownerLogin: String,
  ownerID: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let instance = new Repo()

instance.my.key = 'Hello'

instance.save((err) => {
  console.log(err)
})