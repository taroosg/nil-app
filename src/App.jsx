import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import SignInScreen from './components/SignInScreen';
import axios from 'axios';
import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
  const [isModalOpen, setModalOpen] = useState(true);
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

  const grassUrl = process.env.REACT_APP_GRASS_URL;

  const getGrass = async url => {
    const data = await axios.get(url)
    return data;
  }

  useEffect(() => {
    if (user) {
      getGrass(`${grassUrl}?uid=${user.uid}`).then(result => {
        setGrass(result.data.reverse());
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
    // const url = 'https://now-i-learned.lolipop.io/api/v1/request';
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
          setGrass(result.data.reverse());
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

                  // <table>
                  //   <tbody>
                  //     <tr>
                  //       <th>date</th>
                  //       <th>count</th>
                  //     </tr>
                  //     {grass.map((x, index) => <tr key={index}><td>{x.data_date}</td><td>{x.data_count}</td></tr>)}
                  //   </tbody>
                  // </table>
                )
              }
            </div>
          )
      }
    </MuiThemeProvider>
  )
}

export default App;
