
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 300
  }
})

class NotRequired extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <TextField
          id='outlined-required'
          label={this.props.field}
          className={classes.textField}
          margin='normal'
          variant='outlined'
          type={this.props.type}
          onChange={this.props.callBack}
          name={this.props.name}
        />
        <br />
      </React.Fragment>
    )
  }
}
NotRequired.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(NotRequired)
