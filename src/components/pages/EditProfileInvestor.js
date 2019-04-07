import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import NotRequired from '../layout/inputs/NotRequired'
import NotRequiredSmall from '../layout/inputs/NotRequiredSmall'
import IDType from '../layout/inputs/IDType'
import Gender from '../layout/inputs/Gender'
import Country from '../layout/inputs/Country'
import Date from '../layout/inputs/Date'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Icon, Button } from '@material-ui/core'
import BlueButton from '../layout/Buttons/BlueButton'
import SaveChangesButton from '../layout/Dialogs/SaveChangesButton'
import Cancel from '../layout/Dialogs/Cancel'

const styles = theme => ({
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  checks: {
    display: 'flex'
  }
})

class EditProfileInvestor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      investor: {
        fullname: null,
        email: null,
        password: null,
        investorType: null,
        idNumber: null,
        address: null,
        telephone: null,
        fax: null,
        gender: null,
        idType: null,
        dateOfBirth: null,
        nationality: null
      }
    }
    this.handleSubmission = this.handleSubmission.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }
  render () {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Icon className={classes.icon} color='primary'>
            add_circle
          </Icon>
          <h2>Edit Your Profile</h2>
          <NotRequired name={'fullname'} field={'Full Name'} type='text' callBack={this.onChange} />
          <NotRequired name={'email'} field={'Email'} type='email' callBack={this.onChange} />
          <NotRequired name={'password'} field={'Password'} type='password' callBack={this.onChange} />
          <NotRequired name={'investorType'} field={'Investor Type'} type='text' callBack={this.onChange} />
          <NotRequired name={'idNumber'} field={'ID Number'} type='text' callBack={this.onChange} />
          <NotRequired name={'address'} field={'Address'} type='text' callBack={this.onChange} />
          <NotRequired name={'telephone'} field={'Telephone'} type='text' callBack={this.onChange} />
          <NotRequired name={'fax'} field={'Fax'} type='text' callBack={this.onChange} />
          <div className={classes.checks}>
            <Gender name={'gender'} callBack={this.onChange} />
            <IDType name={'idType'} callBack={this.onChange} />
          </div>
          <Date name={'dateOfBirth'} callBack={this.handleDate} />
          <Country name={'nationality'} callBack={this.onChange} callBack={this.onChange} />
          <SaveChangesButton onClick={this.handleSubmission} callBack={this.handleSubmission} />
        </Paper>
      </main>
    )
  }
  handleDate (v) {
    this.setState(prevState => ({ investor:
         { ...prevState.investor, dateOfBirth: v
         }
    }))
  }
  handleSubmission (e) {
    console.log('yeethandle')
    let updatedData = this.state
    fetch('http://localhost:3000/api/investors/', {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      console.log('Information updated successfully')
    })
  }

  onChange (e) {
    console.log('yeetchange')
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => {
        return {
          admin: {
            ...prevState.investor,
            [name]: value
          }
        }
      },
      () => console.log(value)
    )
  }
}

export default withStyles(styles)(EditProfileInvestor)
