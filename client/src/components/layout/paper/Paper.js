import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2

  },
  title: {
    fontSize: 30, color: '#3f3f3f', fontWeight: 'bold'
  }
})

function PaperSheet (props) {
  const { classes } = props

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.title}>

        Your Requests
        </Typography>
        <Typography component='p' />
      </Paper>
    </div>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaperSheet)
