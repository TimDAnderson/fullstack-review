const axios = require('axios');
const gitToken = process.env.TOKEN
// const config = require('../config.js');

let getReposByUsername = (name, cb) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${gitToken}`
    }
  };

  axios(options)
    .then((response)=>{
      console.log('this is the response from the github server')
      cb(null, response)
    })
}

module.exports.getReposByUsername = getReposByUsername;