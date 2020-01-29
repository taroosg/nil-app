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
    setText(newText.substring(0, 140));
  }

  const getLen = str => {
    var result = 0;
    for (var i = 0; i < str.length; i++) {
      var chr = str.charCodeAt(i);
      if ((chr >= 0x00 && chr < 0x81) ||
        (chr === 0xf8f0) ||
        (chr >= 0xff61 && chr < 0xffa0) ||
        (chr >= 0xf8f1 && chr < 0xf8f4)) {
        result += 1;
      } else {
        result += 2;
      }
    }
    return result;
  };

  const tweetText = tweetText => {
    // const url = 'http://localhost:8000/api/v1/request';
    const url = 'https://now-i-learned.lolipop.io/api/v1/request';
    const requestData = {
      tweet: tweetText,
      uid: user.uid,
    }

    axios.post(url, requestData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(response => {
        console.log(response);
        setText('');
        document.getElementById('text').value = '';
      })
      .catch(error => {
        console.log(error);
        alert('Fatal Error.')
      })
      .then(() => {
      });
  }

  if (loading) return <div>loading</div>;

  return (
    <div>
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
