import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: '#00695c'
  },
  linearColorPrimary: {
    backgroundColor: '#ab1218'
  },
  linearBarColorPrimary: {
    backgroundColor: '#fcdeed'
  },
  linearColorSecondary: {
    backgroundColor: '#cccccc'
  },
  linearBarColorSecondary: {
    backgroundColor: '#ffffff'
  },
  linearColorAlt: {
    backgroundColor: '#000000'
  },
  linearBarColorAlt: {
    backgroundColor: '#999999'
  },
  // Reproduce the Facebook spinners.
  facebook: {
    margin: theme.spacing.unit * 2,
    position: 'relative'
  },
  facebook1: {
    color: '#eef3fd'
  },
  facebook2: {
    color: '#6798e5',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0
  }
})

function CustomizedProgress (props) {
  const { classes } = props
  return (
   <>
     <LinearProgress
       classes={{
         colorPrimary: classes.linearColorPrimary,
         barColorPrimary: classes.linearBarColorPrimary
       }}
     />
     <LinearProgress
       classes={{
         colorPrimary: classes.linearColorSecondary,
         barColorPrimary: classes.linearBarColorSecondary
       }}
     />
     <LinearProgress
       classes={{
         colorPrimary: classes.linearColorAlt,
         barColorPrimary: classes.linearBarColorAlt
       }}
     />
      </>
  )
}

CustomizedProgress.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomizedProgress)
