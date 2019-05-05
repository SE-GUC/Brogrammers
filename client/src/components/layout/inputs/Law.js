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

class Law extends React.Component {
  state = {
    value: 'Law 72',
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
            aria-label="Regulation Law"
            name="regulationLaw"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Law 72" control={<Radio color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'Law 72' : 'قانون 72'} />
            <FormControlLabel value="Law 159" control={<Radio  color="primary"/>} label={sessionStorage.getItem('lang') === 'en' ? 'Law 159' : 'قانون 159'} />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

Law.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Law);
