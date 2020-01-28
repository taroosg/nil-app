import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('');

  const tweetText = tweetText => {
    const url = 'http://localhost:8000/api/v1/request';
    axios.post(url, { tweet: tweetText }, { crossdomain: true })
      .then(response => {
        console.log(response);
        setText('');
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
      });
  }

  return (
    <div>
      <h1>Git Grass Grower</h1>
      <textarea name="" id="" cols="30" rows="10" onChange={e => setText(e.target.value)}></textarea>
      <div><button type="button" id="tweet" onClick={() => tweetText(text)}>tweet</button></div>
    </div>
  )
}

export default App;
