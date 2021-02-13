const axios = require('axios');
// const config = require('../config.js');

let getReposByUsername = (name, cb) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token 775f4d3e62c77133aabb88d62d1b4348ca048a73`
    }
  };

  axios(options)
    .then((response)=>{
      console.log('this is the response from the github server')
      console.log(response.data.length)
      cb(null, response)
    })
}

module.exports.getReposByUsername = getReposByUsername;