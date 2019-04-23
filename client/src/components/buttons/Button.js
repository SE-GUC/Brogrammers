import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import axios from 'axios'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})





function ContainedButtons (props) {
  const { classes } = props
 

  return (
    <div>

      <Button variant='contained' color='secondary' className={classes.button}  >
       {sessionstorage.getItem('lang')==='en'? 'Next': 'التالى'},

      </Button>

    </div>
  )
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ContainedButtons)
