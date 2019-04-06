import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  grid: {
    width: '800',
  },
};

class Date extends React.Component {
  state = {
    // The first commit of Material-UI
  //  selectedDate: new Date('2014-08-18T21:11:54'),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.callBack(date)
    
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            margin="normal"
            label="Date of Birth"
            name={this.props.name}
            variant="outlined"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
         
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

Date.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Date);
