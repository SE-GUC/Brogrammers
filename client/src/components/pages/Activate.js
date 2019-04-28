import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import HowToReg from '@material-ui/icons/HowToReg'
import MailIcon from '@material-ui/icons/Mail'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Required from '../layout/inputs/Required'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

export class PleaseActivate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investor: {
        email: '',
        password: '',
        c: true
      }
    }
  }
  componentDidMount() {
    fetch(`http://localhost:3000/api/investors/Activate/`+this.props.match.params.id, {
      method: "GET",
      headers: {
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ investorCompanies: json.data });
      });
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToReg />
          </Avatar>
          <Typography component="h1" variant="h5">
           Your Account has been activated successfully, Please sign in
          </Typography>
         
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(PleaseActivate)
