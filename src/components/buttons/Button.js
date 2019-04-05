import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

// function getLawyers() {
  
    
//     console.log("please1")
//     return axios.get('https://jsonplaceholder.typicode.com/users');
//     console.log("please")
  
  
// }





function ContainedButtons(props) {
  const { classes } = props;
  
  return (
    <div>
     
      <Button variant="contained" color="secondary" className={classes.button}   >
        Take Task
      
      </Button>
    
      {/* <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label> */}
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);