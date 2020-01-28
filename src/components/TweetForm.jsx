import React from 'react';


const TweetForm = props => {
  return (
    <div>
      <textarea name="" id="text" cols="30" rows="10" onChange={e => props.handleText(e)}></textarea>
      <div>
        <button type="button" id="tweet" onClick={() => props.tweet(props.text)}>tweet</button>
      </div>
    </div>
  )
}
export default TweetForm;