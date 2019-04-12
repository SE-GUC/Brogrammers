import React, { Component } from 'react'
import NotRequired from '../layout/inputs/NotRequired'
import Gender from '../layout/inputs/Gender'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Icon, Button } from '@material-ui/core'
import SaveChangesButton from '../layout/Dialogs/SaveChangesButton'
import Date from '../layout/inputs/Date'
import {ReactComponent as UpdateIcon} from '../Icons/UpdateIcon.svg'

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
  }
})
class EditProfileLawyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lawyer: {
        firstName: null,
        middleName: null,
        lastName: null,
        email: null,
        password: null,
        mobileNumber: null,
        socialSecurityNumber: null,
        yearsOfExperience: null,
        salary: null,
        birthDate: null,
        gender: null
      }
    }
    this.handleSubmission = this.handleSubmission.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }

  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName];
      }
    }
  };

  handleSubmission(e) {
    let updatedData = this.state.lawyer;
    this.clean(updatedData);
    fetch("http://localhost:3000/api/lawyer/", {
      method: "PUT",
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
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => {
        return {
          admin: {
            ...prevState.lawyer,
            [name]: value
          }
        }
      },
      () => console.log(value)
    )
  }

  handleDate (v) {
    console.log(v)
    this.setState(prevState => ({ lawyer:
         { ...prevState.lawyer, birthDate: v
         }
    }))
  }

  render () {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
        <UpdateIcon/>
          <h2>Edit Your Profile</h2>
          <NotRequired name={"firstName"} field={"First Name"} type="text" callBack={this.onChange}/>
          <NotRequired name={"middleName"} field={"Middle Name"} type="text" callBack={this.onChange} />
          <NotRequired name={"lastName"} field={"Last Name"} type="text" callBack={this.onChange} />
          <NotRequired name={"email"} field={"Email"} type="email" callBack={this.onChange}/>
          <NotRequired name={"password"} field={"Password"} type="password" callBack={this.onChange}/>
          <NotRequired name={"mobileNumber"} field={"Telephone"} type="text" callBack={this.onChange}/>
          <NotRequired name={"socialSecurityNumber"} field={"Social Security Number"} type="text" callBack={this.onChange}/>
          <NotRequired name={"yearsOfExperience"} field={"Years Of Experience "} type="number" callBack={this.onChange}/>
          <NotRequired name={"gensalaryder"} field={"Salary"} type="number" callBack={this.onChange}/>
          <Date name={"birthDate"} field={"Birth Date"} callBack={this.handleDate}/>
          <Gender name={"gender"} callBack={this.onChange} />
          <SaveChangesButton onClick={this.handleSubmission}/>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(EditProfileLawyer)
