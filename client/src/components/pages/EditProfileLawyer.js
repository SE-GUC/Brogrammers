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
    fetch("https://serverbrogrammers.herokuapp.com/api/lawyer/", {
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
          lawyer: {
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
          <h2>{sessionStorage.getItem('lang') === 'en' ? 'Edit your Profile' : 'تغير بيانات حسابك'}</h2>
          <NotRequired name={"firstName"} field={sessionStorage.getItem('lang') === 'en' ? 'First Name' : 'الاسم الاول'} type="text" callBack={this.onChange}/>
          <NotRequired name={"middleName"} field={sessionStorage.getItem('lang') === 'en' ? 'Middle Name' : 'اسم الاب'} type="text" callBack={this.onChange} />
          <NotRequired name={"lastName"} field={sessionStorage.getItem('lang') === 'en' ? 'Last Name' : 'اسم العائلة'} type="text" callBack={this.onChange} />
          <NotRequired name={"email"} field={sessionStorage.getItem('lang') === 'en' ? 'Email' : 'البريد الاكتروني'} type="email" callBack={this.onChange}/>
          <NotRequired name={"password"} field={sessionStorage.getItem('lang') === 'en' ? 'Password' : 'كلمة السر'} type="password" callBack={this.onChange}/>
          <NotRequired name={"mobileNumber"} field={sessionStorage.getItem('lang') === 'en' ? 'Mobile Number' : 'رقم الهاتف'} type="text" callBack={this.onChange}/>
          <NotRequired name={"socialSecurityNumber"} field={sessionStorage.getItem('lang') === 'en' ? 'Social Security Number' : 'الرقم القومي'} type="text" callBack={this.onChange}/>
          <NotRequired name={"yearsOfExperience"} field={sessionStorage.getItem('lang') === 'en' ? 'Years of Experience' : 'عدد سنين الخبرة'} type="number" callBack={this.onChange}/>
          <NotRequired name={"gensalaryder"} field={sessionStorage.getItem('lang') === 'en' ? 'ٍSalary' : 'الراتب'} type="number" callBack={this.onChange}/>
          <Date name={"birthDate"} field={sessionStorage.getItem('lang') === 'en' ? 'Birth Date' : 'تاريخ الميلاد'} callBack={this.handleDate}/>
          <Gender name={"gender"} callBack={this.onChange} />
          <SaveChangesButton onClick={this.handleSubmission}/>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(EditProfileLawyer)
