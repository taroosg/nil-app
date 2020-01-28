import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import SignInScreen from './components/SignInScreen';
import axios from 'axios';
import TweetForm from './components/TweetForm';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged(user => {
      user
        ? setUser(user)
        : setUser(null);
      setLoading(false);
    });
    return () => {
      unlisten();
    }
  }, [])

  const signOut = () => {
    firebase.auth().signOut();
  }

  const handleText = e => {
    const newText = e.target.value;
    setText(newText);
  }

  const tweetText = tweetText => {
    const url = 'http://localhost:8000/api/v1/request';
    const requestData = {
      tweet: tweetText,
      uid: user.uid,
    }
    axios.post(url, requestData, { crossdomain: true })
      .then(response => {
        console.log(response);
        setText('');
        document.getElementById('text').value = '';
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
      });
  }

  if (loading) return <div>loading</div>;

  return (
    <div>
      Username: {user && user.uid}
      <h1>Git Grass Grower</h1>
      {!user ?
        (<SignInScreen />) :
        (
          <TweetForm
            text={text}
            handleText={e => handleText(e)}
            tweet={() => tweetText(text)}
            signOut={() => signOut()}
          />
        )
      }
    </div>
  )
}

export default App;
