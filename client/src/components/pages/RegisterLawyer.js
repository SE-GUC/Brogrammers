import React, { Component } from 'react'
import Required from '../layout/inputs/Required'
import Date from '../layout/inputs/Date'
import AlertDialogSlide from '../layout/Dialogs/SlideDialog'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import RequiredValidation from '../layout/inputs/RequiredValidation'
import Snackbar from "../layout/snackbar/Snackbar"

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
      },
      firstNameValid: true,
      middleNameValid: true,
      lastNameValid: true,
      emailValid: true,
      socialSecurityNumberValid: true,
      passwordValid: true,
      mobileNumberValid: true,
      true:false,
      err:false
    }
    this.handleReq= this.handleReq.bind(this)
    this.validate = this.validate.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleReq = () => {
  

    return <>
        <Paper elevation={1} />

        <Snackbar variant='success' message={sessionStorage.getItem('lang') === 'en' ? 'Successfuly created a Lawyer' :'العمليه تمت بنجاح'} />
    </>

}
  validate(firstName,middleName,lastName,email,socialSecurityNumber,password,mobileNumber)
  {
    var regex = new RegExp(/^[a-zA-Z\s-, ]+$/);
    var number = new RegExp(/^[0-9]+$/)
    
    if(firstName)
    {
      if(regex.test(firstName))
      {
        this.setState({firstNameValid:true})
      }
      else{
        this.setState({firstNameValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({firstNameValid:false,
        err:true})
    }
    if(middleName)
    {
      if(regex.test(middleName))
      {
        this.setState({middleNameValid:true})
      }
      else{
        this.setState({middleNameValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({middleNameValid:false,
        err:true})
    }
    if(lastName)
    {
      if(regex.test(lastName))
      {
        this.setState({lastNameValid:true})
      }
      else{
        this.setState({lastNameValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({lastNameValid:false,
        err:true})
    }
    if(email)
    {
      if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
      {
        this.setState({emailValid:true})
      }
      else{
        this.setState({emailValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({emailValid:false,
        err:true})
    }
    
    if(!password)
    {
      this.setState({passwordValid:false,
        err:true})
    }
    if(mobileNumber)
    {
      if(number.test(mobileNumber))
      {
        this.setState({mobileNumberValid:true})
      }
      else{
        this.setState({mobileNumberValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({mobileNumberValid:false,
        err:true})
    }
    if(socialSecurityNumber)
    {
      if(number.test(socialSecurityNumber))
      {
        this.setState({socialSecurityNumberValid:true})
      }
      else{
        this.setState({socialSecurityNumberValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({socialSecurityNumberValid:false,
        err:true})
    }
    
  }


  async handleRegister (e) {
    e.preventDefault()
    let userData = this.state.investor
   await  this.validate(this.state.investor.firstName,this.state.investor.middleName,this.state.investor.lastName,
      this.state.investor.email,this.state.investor.socialSecurityNumber,
      this.state.investor.password,this.state.investor.mobileNumber)
      if(!this.state.err){
    console.log('abc')
    fetch('https://serverbrogrammers.herokuapp.com/api/lawyer/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('jwtToken')
      }
    }).then(response => {
      response.json().then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          console.log('Successful' + data)
          this.setState({true:true})
        }
      })
    })}
    else{
      this.setState({err:false,
        true:false})
    }
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
          <RequiredValidation name='firstName' field={sessionStorage.getItem('lang') === 'en' ? 'FirstName' : 'الاسم الاول '} type='text' callBack={this.handleInput} valid={this.state.firstNameValid} texthelper={!this.state.firstNameValid?"This field required and is only letters ":""}/>
          <RequiredValidation name='middleName' field={sessionStorage.getItem('lang') === 'en' ? 'Middle Name' : 'الاسم الثانى '} type='text' callBack={this.handleInput}valid={this.state.middleNameValid}texthelper={!this.state.middleNameValid?"This field required and is only letters ":""} />
          <RequiredValidation name='lastName' field={sessionStorage.getItem('lang') === 'en' ? 'Last Name' : 'الاسم الاخير '} type='text' callBack={this.handleInput}valid={this.state.lastNameValid}texthelper={!this.state.lastNameValid?"This field required and is only letters ":""} />
          <RequiredValidation name='email' field={sessionStorage.getItem('lang') === 'en' ? 'Email' : 'البريد '} type='email' callBack={this.handleInput}valid={this.state.emailValid} texthelper={!this.state.emailValid?"This field must be an email ":""} />
          <RequiredValidation name='password' field={sessionStorage.getItem('lang') === 'en' ? 'Password' : 'الرقم السرى '} type='password' callBack={this.handleInput}valid={this.state.passwordValid} texthelper={!this.state.passwordValid?"This field required and at least 8 characters  ":""} />
          <Required name='salary' field={sessionStorage.getItem('lang') === 'en' ? 'Salary' : 'المرتب '} type='number' callBack={this.handleInput} />
          <Required name='yearsOfExperience' field={sessionStorage.getItem('lang') === 'en' ? 'Years of Experience' : 'سنين الخبره '} type='number' callBack={this.handleInput} />
          <RequiredValidation name='socialSecurityNumber' field={sessionStorage.getItem('lang') === 'en' ? 'Social security number' : 'الرقم القومى '} type='text' callBack={this.handleInput} valid={this.state.socialSecurityNumberValid}texthelper={!this.state.socialSecurityNumberValid?"This field required and must have 14 number":""}/>
          <RequiredValidation name='mobileNumber'field={sessionStorage.getItem('lang') === 'en' ? 'Phone Number' : 'رقم الهاتف '} type='text' callBack={this.handleInput} valid={this.state.mobileNumberValid}texthelper={!this.state.mobileNumberValid?"This field required and at least 6 numbers  ":""}/> 
          <Date name='birthDate' callBack={this.handleDate} />
          {this.state.true?(this.handleReq()):""}
          <AlertDialogSlide handleRegister={this.handleRegister} />
         
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(RegisterLawyer)
