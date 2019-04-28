import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Gender extends React.Component {
  state = {
    value: 'male',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.callBack(event)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{sessionStorage.getItem('lang') === 'en' ? 'Gender' : 'الجنس'}</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name={this.props.name}
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange} 
          >
            <FormControlLabel value="male" control={<Radio color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'Male' : 'ذكر'} />
            <FormControlLabel value="female" control={<Radio  color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'Female' : 'انثي'} />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

Gender.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gender);
