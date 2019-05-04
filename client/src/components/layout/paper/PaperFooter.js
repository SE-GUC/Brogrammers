import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit / 2,
    width: '100%',
    bottom: 0,
    position: 'fixed',
    background: 'black',
    borderTop: 'solid',
    borderColor: 'blue',
    color: 'white',
    zIndex: 900,
    fontSize: 10,
    opacity: 0.3,
    transition: '0.3s',
    '&:hover': {
      opacity: 1,
      transition: '0.3s'
    }
  }
})

function PaperSheet (props) {
  const { classes } = props
  return (
    <div>
      <Paper
        className={classes.root}
        elevation={1}
        style={styles.companiesBackground}
      >
        <Grid
          container
          direction='row'
          spacing={40}
          direction='row'
          justify='space-evenly'
          alignItems='center'
        >
          <p>
            Choose Langauge:{' '}
            <a
              href=''
              onClick={() => {
                props.callBack(
                  sessionStorage.getItem('lang') == 'ar' ? 'en' : 'ar'
                )
              }}
            >
              {sessionStorage.getItem('lang') == 'ar' ? 'English' : 'العربية'}
            </a>
          </p>
          <p>
            Need help? <a href='../../../../../../../help'> Click Here!</a>
          </p>
          <p>
            <a href='../../../../../../../../AboutUs'>About Us </a>
          </p>
          <p>Brogrammers© 2019-∞</p>
        </Grid>
      </Paper>
    </div>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaperSheet)
