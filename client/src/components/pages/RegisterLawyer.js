import React, { Component } from 'react'
import Required from '../layout/inputs/Required'
import Date from '../layout/inputs/Date'
import AlertDialogSlide from '../layout/Dialogs/SlideDialog'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  }
})
class RegisterLawyer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      investor: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        socialSecurityNumber: '',
        password: '',
        birthDate: '',
        yearsOfExperience: '',
        salary: '',
        mobileNumber: ''
      }

    }
    this.handleInput = this.handleInput.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister (e) {
    e.preventDefault()
    let userData = this.state.investor
    console.log('abc')
    fetch('http://localhost:3000/api/lawyer/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + data)
        this.props.callBack(data.token, data.auth, 'l', data.data._id)
      })
    })
  }
  handleDate (v) {
    this.setState(prevState => ({ investor:
         { ...prevState.investor, birthDate: v
         }
    }))
  }
  handleInput (e) {
    let value = e.target.value
    let name = e.target.name
    // console.log(this.state.investor)
    this.setState(prevState => {
      return {
        investor: {
          ...prevState.investor, [name]: value
        }
      }
    }, () => console.log(this.state.investor)
    )
  }
  render () {
    const { classes } = this.props

    return (

      <main className={classes.main}>
        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf' crossorigin='anonymous' />
        <CssBaseline />

        <Paper className={classes.paper} elevation={16}>

          <Avatar className={classes.avatar}>
            <i class='fas fa-user-plus' />
          </Avatar>
          <Typography component='h1' variant='h5'>
          Sign up
          </Typography>
          <Required name='firstName' field={'First Name'} type='text' callBack={this.handleInput} />
          <Required name='middleName' field={'Middle Name'} type='text' callBack={this.handleInput} />
          <Required name='lastName' field={'Last Name'} type='text' callBack={this.handleInput} />
          <Required name='email' field={'Email'} type='email' callBack={this.handleInput} />
          <Required name='password' field={'Password'} type='password' callBack={this.handleInput} />
          <Required name='salary' field={'Salary'} type='number' callBack={this.handleInput} />
          <Required name='yearsOfExperience' field={'Years Of Experience'} type='number' callBack={this.handleInput} />
          <Required name='socialSecurityNumber' field={'Social Security Number'} type='text' callBack={this.handleInput} />
          <Required name='mobileNumber' field={'Phone Number'} type='text' callBack={this.handleInput} />
          <Date name='birthDate' callBack={this.handleDate} />
          <AlertDialogSlide handleRegister={this.handleRegister} />
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(RegisterLawyer)
