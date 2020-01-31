import React from 'react';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const TweetForm = props => {

  const classes = useStyles();

  return (
    <Grid
      container
      // spacing={3}
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <Paper
          className={classes.paper}
        >
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              spacing={3}
            >
              <TextField
                required
                id="text"
                label="Tweet!"
                variant="outlined"
                multiline={true}
                rows={10}
                onChange={e => props.handleText(e)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              spacing={3}
            >
              <Button
                color="primary"
                type="button"
                id="tweet"
                variant='contained'
                onClick={() => props.tweet(props.text)}
              >
                tweet
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default TweetForm;