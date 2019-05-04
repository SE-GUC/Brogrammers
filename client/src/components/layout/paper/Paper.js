import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'sticky',textAlign:'center',paddingTop:10,paddingBottom:10, marginTop:'0px',marginBottom:'100px',color:'white',top: '50px',zIndex:9999999999,
  },
  title: {
    fontSize: 30, color: '#3f3f3f', fontWeight: 'bold'
  }
})

function PaperSheet (props) {
  const { classes } = props

  return (
          <div className={classes.root}>

      <Paper  elevation={1}>
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
