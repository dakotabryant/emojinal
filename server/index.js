const path = require('path');
const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const app = express();


const config = {
  apiKey: 'AIzaSyBcT9q_b1hRIcoNsiWBPfa-3xxPjNBkt_0',
  authDomain: 'emojinal-61d05.firebaseapp.com',
  databaseURL: 'https://emojinal-61d05.firebaseio.com',
  projectId: 'emojinal-61d05',
  storageBucket: 'emojinal-61d05.appspot.com',
  messagingSenderId: '433898361666'
};
firebase.initializeApp(config);
const database = firebase.database();

const email = 'hello@world.com';
const password = 'password';

// firebase.auth().signInWithEmailAndPassword(email, password).catch(err => console.error(err));

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    console.log(`${user.name} signed in!`);
    console.log(user.providerData[0].email);
    let name = user.name;
    let email = user.email;
    let uid = user.uid;
    let providerData = user.providerData;
    
  } else {
    console.log('no user signed in');
  }
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json());

app.post('/', (req, res) => {

  // let key = firebase.database().ref().push().key();
  database.ref('posts').set({
    hello: 'world1'
  });
  return res.status('201').json();
});

app.post('/users', (req, res) => {
  let user = firebase.auth().currentUser;

  if(!user){
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password))
    .then(() => firebase.auth().currentUser)
    .then(user => firebase.database().ref('users').child(req.body.username).set({
      uid: user.uid,
      name: 'hello',
      email: req.body.email
    }))
    .catch(err => console.error(err))
    // let user = firebase.auth().currentUser;
    // console.log(user);
    // firebase.database().ref().child('users/' + req.body.username).set({
    //   uid: user.uid,
    //   name: 'hello',
    //   email: req.body.email
    // });
    return res.status('201').json();

  } else {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(err => console.error(err));
    return res.status('200').json('logged in!'); 
  }
  // let token = user.getIdToken();
  // console.log(token);
  // firebase.database().ref('users')
  
});

app.get('/', (req, res) => {
  firebase.database().ref('posts').once('value').then(snapshot => {
    console.log(snapshot.val());
    return res.status('200').json(snapshot.val())
    .catch(err => console.error(err));
  });

});

app.get('/users', (req, res) => {
  firebase.database().ref('users').once('value').then(snapshot => {
    return res.status('200').json(snapshot.val());
  });
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});


let server;
function runServer(port=3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve();
    }).on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
