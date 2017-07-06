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


/* a sample login. Uncomment these 3 lines or post a new user to the endpoint to login via the current email/password paradigm */
// const email = 'hello@world.com';
// const password = 'password';
// firebase.auth().signInWithEmailAndPassword(email, password).catch(err => console.error(err));

/*this function is run whenever firebase detects a change in user authentication status
  TODO: fix promise chain so that the user that logged in is available. This promise structure was working, but another change caused a regression
  currently the snapshot.val() here returns null, though the querry is correct, and the log of the uid matches a log in the post endpoint
  Various structures of async have been tried.
*/
firebase.auth().onAuthStateChanged((user) => {
  console.log(user.uid);
  if(user){
    return database.ref('users').child(user.uid).once('value')
    .then(snapshot => console.log(snapshot.val()))
    // .then(obj => console.log(snapshot.val()))
      // console.log(obj);
      // console.log(snapshot);
      // console.log(obj.name + ' signed in!');
    
    .catch(err => console.error(err));   
    // console.log(obj);
  } else {
    console.log('no user signed in');
  }
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json());

/* adds a questions to the questions database
  TODO: structure our general data. This endpoint may not be used in the final iteration
 */
app.post('/questions', (req, res) => {

  database.ref('questions').set({
    hello: 'world1'
  });
  return res.status('201').json();
});

/**our User Creation endpoint - creates the user in firebase's auth system and adds a reference to our database*/
app.post('/users', (req, res) => {
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password))
    .then(() => firebase.auth().currentUser)
    .then(user =>{ console.log(user.uid); database.ref('users').child(user.uid).set({
      uid: user.uid,
      name: req.body.name,
      email: req.body.email,
      username: req.body.username
    })})
    .catch(err => console.error(err));
  return res.status('201').json(`${req.body.username} created!`);
});

/* returns list of questions */
app.get('/', (req, res) => {
  firebase.database().ref('questions').once('value').then(snapshot => {
    console.log(snapshot.val());
    return res.status('200').json(snapshot.val())
    .catch(err => console.error(err));
  });

});

/*returns list of users from the database */
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
