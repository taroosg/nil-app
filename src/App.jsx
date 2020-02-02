import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import SignInScreen from './components/SignInScreen';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import orange from '@material-ui/core/colors/orange';
import 'typeface-noto-sans-full'
import TweetForm from './components/TweetForm';
import ButtonAppBar from './components/ButtonAppBar';
import GrassTable from './components/GrassTable';
import SimpleModal from './components/SimpleModal';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // main: '#A59ACA',
      main: '#f39800',
    },
    secondary: orange,
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const [grass, setGrass] = useState('');

  // modal管理
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

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
    setModalOpen(false);
  }

  const handleText = e => {
    const newText = e.target.value;
    setText(newText.substring(0, 140));
  }

  const grassUrl = process.env.REACT_APP_GRASS_URL;

  const getGrass = async url => {
    const data = await axios.get(url)
    return data;
  }

  useEffect(() => {
    if (user) {
      getGrass(`${grassUrl}?uid=${user.uid}`).then(result => {
        setGrass(result.data);
        setModalOpen(false);
      })
    }
  }, [grassUrl, user]);

  const tweetText = tweetText => {
    if (tweetText === '') {
      return false;
    }
    setModalOpen(true);
    const url = process.env.REACT_APP_REQUEST_URL;
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
        getGrass(`${grassUrl}?uid=${user.uid}`).then(result => {
          setGrass(result.data);
          setModalOpen(false);
        })
      })
      .catch(error => {
        console.log(error);
        alert('Fatal Error.')
        setModalOpen(false);
      })
      .then(() => {
      });
  }

  return (
    <MuiThemeProvider
      theme={darkTheme}
    >
      <CssBaseline />
      <SimpleModal
        isModalOpen={isModalOpen}
        handleModalOpen={() => handleModalOpen()}
        handleModalClose={() => handleModalClose()}
      />
      <ButtonAppBar
        title="NIL"
        user={user}
        signOut={() => signOut()}
      />
      {loading
        ? <p>loading</p>
        : !user
          ? <SignInScreen />
          : (
            <div>
              <TweetForm
                height="800px"
                text={text}
                handleText={e => handleText(e)}
                tweet={() => tweetText(text)}
                signOut={() => signOut()}
              />
              {(grass === '')
                ? ''
                : (
                  <GrassTable
                    grassArray={grass}
                  />
                )
              }
            </div>
          )
      }
    </MuiThemeProvider>
  )
}

export default App;
