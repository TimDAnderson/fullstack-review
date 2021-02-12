const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (name, cb) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options)
    .then((response)=>{
      // console.log(response)
      cb(null, response)
    })
}

module.exports.getReposByUsername = getReposByUsername;