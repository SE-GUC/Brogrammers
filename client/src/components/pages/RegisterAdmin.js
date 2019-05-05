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
import RequiredValidation from '../layout/inputs/RequiredValidation';
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
class RegisterAdmin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      admin: {
        name: '',
        email: '',
        gender: 'male',
        password: '',
        birthDate: '',
        phone: ''
      },
      nameValid: true,
      emailValid: true,
      passwordValid:true,
      phoneValid: true,
      true:false,
       err:false

    }
    this.handleInput = this.handleInput.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.validate = this.validate.bind(this)
    this.handleReq= this.handleReq.bind(this)
  }
  validate(name,email,password,phone)
  {
    var regex = new RegExp(/^[a-zA-Z\s-, ]+$/);
    var number = new RegExp(/^[0-9]+$/)
    
    if(name)
    {
      if(regex.test(name))
      {
        this.setState({nameValid:true})
      }
      else{
        this.setState({nameValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({nameValid:false,
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
    }else{
      if(password.length<8)
      { this.setState({passwordValid:false,
         err:true})
      }else{
        this.setState({passwordValid:true})
      }
    }

  
  
    if(phone)
    {
      if(number.test(phone))
      {
        this.setState({phoneValid:true})
      }
      else{
        this.setState({phoneValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({phoneValid:false,
        err:true})
    }
  
   
  
  
  }
  handleReq = () => {
  

        return <>
            <Paper elevation={1} />

            <Snackbar variant='success' message={sessionStorage.getItem('lang') === 'en' ? 'Successfuly created an Admin' :'العمليه تمت بنجاح'} />
        </>
    
}
  async handleRegister (e) {
    e.preventDefault()
    let userData = this.state.admin
    await this.validate(this.state.admin.name,this.state.admin.email,this.state.admin.password,this.state.admin.phone)
    if(!this.state.err)
    {
    console.log('abc')
    fetch('https://serverbrogrammers.herokuapp.com/routes/api/admins/register', {
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
            this.setState({true:true})
         
        }
      })
    })}
    else
    this.setState({err:false,
    true:false})
  }
  handleDate (v) {
    console.log('heeey')
    this.setState(prevState => ({ admin:
         { ...prevState.admin, birthDate: v
         }
    }))
  }
  handleInput (e) {
    let value = e.target.value
    let name = e.target.name
    this.setState(prevState => {
      return {
        admin: {
          ...prevState.admin, [name]: value
        }
      }
    }, () => console.log(this.state.admin)
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
          <RequiredValidation name='name' field={sessionStorage.getItem('lang') === 'en' ? 'Full Name' : 'الاسم كامل '} type='text' callBack={this.handleInput} valid={this.state.nameValid} texthelper={!this.state.nameValid?"This field required and is only letters ":""} />
          <RequiredValidation name='email' field={sessionStorage.getItem('lang') === 'en' ? 'Email' : 'البريد '} type='email' callBack={this.handleInput} valid={this.state.emailValid} texthelper={!this.state.emailValid?"This field must be an email ":""} />
          <RequiredValidation name='password' field={sessionStorage.getItem('lang') === 'en' ? 'Password' : 'الرقم السرى '} type='password' callBack={this.handleInput}valid={this.state.passwordValid} texthelper={!this.state.passwordValid?"This field required and at least 8 characters  ":""}/>
          <RequiredValidation name='phone' field={sessionStorage.getItem('lang') === 'en' ? 'phone' : 'رقم الهاتف '} type='text' callBack={this.handleInput} valid ={this.state.phoneValid} texthelper={!this.state.phoneValid?"This field required and is only numbers ":""}/>
          <Date name='birthDate' callBack={this.handleDate} />
          <Gender name='gender' callBack={this.handleInput} />
          {
            console.log(this.state.true)
          }
         
          {this.state.true?(this.handleReq()):""}
          <AlertDialogSlide handleRegister={this.handleRegister} />
     
          
          
      
          
        </Paper>
      </main>
    )
  


  }
}
export default withStyles(styles)(RegisterAdmin)
