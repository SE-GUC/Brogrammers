import React, { Component } from 'react'
import Required from '../layout/inputs/Required'
import Gender from '../layout/inputs/Gender'
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
class RegisterReviewer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      investor: {
        name: '',
        email: '',
        gender: 'male',
        ssn: '',
        address: '',
        password: '',
        birth: '',
        yearsOfExperience: '',
        phone: ''
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
    fetch('http://serverbrogrammers.herokuapp.com/api/reviewer/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      response.json().then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          console.log('Successful' + data)
        }
      })
    })
  }
  handleDate (v) {
    this.setState(prevState => ({ investor:
         { ...prevState.investor, birth: v
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
          <Required name='name'field={sessionStorage.getItem('lang') === 'en' ? 'Full Name' : 'الاسم كامل '} type='text' callBack={this.handleInput} />
          <Required name='email' field={sessionStorage.getItem('lang') === 'en' ? 'Email' : 'البريد '} type='email' callBack={this.handleInput} />
          <Required name='password'field={sessionStorage.getItem('lang') === 'en' ? 'Password' : 'الرقم السرى '} type='password' callBack={this.handleInput} />
          <Required name='ssn' field={sessionStorage.getItem('lang') === 'en' ? 'Social security number' : 'الرقم القومى '} type='text' callBack={this.handleInput} />
          <Required name='yearsOfExperience' field={sessionStorage.getItem('lang') === 'en' ? 'Years of Experience' : 'سنين الخبره '} type='number' callBack={this.handleInput} />
          <Required name='address' field={sessionStorage.getItem('lang') === 'en' ? 'Address' : 'العنوان '} type='text' callBack={this.handleInput} />
          <Required name='phone' field={sessionStorage.getItem('lang') === 'en' ? 'Telephone' : 'رقم الهاتف '} type='text' callBack={this.handleInput} />
          <Date name='birth' callBack={this.handleDate} />
          <Gender name='gender' callBack={this.handleInput} />
          <AlertDialogSlide handleRegister={this.handleRegister} />
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(RegisterReviewer)
