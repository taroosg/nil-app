import React from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';


const TweetForm = props => {
  return (
    <div>
      <div>
        <Button
          color="secondary"
          variant='outlined'
          onClick={() => { props.signOut() }}
        >signOut</Button>
      </div>
      <TextField
        name=""
        id="text"
        multiline={true}
        rows={10}
        variant='outlined'
        onChange={e => props.handleText(e)}
      />
      {/* <textarea name="" id="text" cols="30" rows="10" onChange={e => props.handleText(e)}></textarea> */}
      <div>
        <Button
          color="primary"
          type="button"
          id="tweet"
          variant='outlined'
          onClick={() => props.tweet(props.text)}
        >tweet</Button>
      </div>
    </div>
  )
}
export default TweetForm;