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

class IDType extends React.Component {
  state = {
    value: 'National ID',
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
          <FormLabel component="legend">{sessionStorage.getItem('lang') === 'en' ? 'Identification Type' : 'نوع تعريف الهويه'}</FormLabel>
          <RadioGroup
            aria-label="Identification Type"
            name="idType"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="National ID" control={<Radio color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'National ID' : 'الرقم القومي'} />
            <FormControlLabel value="Passport" control={<Radio  color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'Passport' : 'جواز السفر'} />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

IDType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IDType);
