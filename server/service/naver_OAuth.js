const env=require('../env/naver_OAuth.json')
const axios=require('axios')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const state = "RAMDOM_STATE";
const login = async (req, res) => { // 네이버로 login
  const callback_URI ="http://localhost:3000/naver/OAuth/callback";
  const login_URI = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + env.client_id + '&redirect_uri=' + 
  callback_URI + '&state=' + state;
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end(login_URI)
}

const callback = async (req, res) => { // 네이버 로그인 완료시 callback
  const code = req.query.code; // Code to retrieve client's Naver token
  console.log(code)
  let uri= 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
      + env.client_id + '&client_secret=' + env.client_secret + '&code=' + code + '&state=' + state; // For sending a request for client's Naver token
  let headers={'X-Naver-Client-Id': env.client_id, 'X-Naver-Client-Secret': env.client_secret}
  axios.get(uri, {headers: headers}) // Get client's Naver token
  .then(res=>{
    const parsed_token=res.data
    uri= 'https://openapi.naver.com/v1/nid/me',
    headers= {'Authorization': `bearer ${parsed_token.access_token}`}
    //console.log(parsed_token)
    return axios.get(uri, {headers: headers}) // Get client's Naver profile using the Naver token
  })
  .then(res=>{
    let profile=res.data.response // naver profile
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    // Check if registered
    User.findOne({ userID: profile.email })
    .then(async user => {
      // If not registered, register the new user
      if(!user){
        const newUser = new User({ // New document
          userID: profile.email,
          password: profile.id,
          name: profile.name,
          img: profile.profile_image
        });
        await newUser.save()
      }
      // Send JWT
      let token = jwt.sign({ userID: profile.email}, 'secretkey');
      return res.end(JSON.stringify({registered: "No", token: token}))
    })
  })
  .catch(error=>{
    console.log(error)
    res.status(error.response.status).end(JSON.stringify(error));
    return
  })
}

const refresh_access_token = async(req, res)=>{
  const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id='
   + client_id + '&client_secret=' + client_secret + '&refresh_token=' + req.body.refresh_token;

   request.get(api_url, (error, response, body)=>{
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(JSON.parse(body).access_token)
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
   })
}

module.exports={login, callback}