import React, { Component } from 'react'
import RequiredValidation from '../layout/inputs/RequiredValidation'
import NotRequiredValidation from '../layout/inputs/NotRequiredValidation'
import Country from '../layout/inputs/Country'
import Gender from '../layout/inputs/Gender'
import IDType from '../layout/inputs/IDType'
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
class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      investor: {
        name: '',
        mail: '',
        type: '',
        password: '',
        gender: 'male',
        nationality: '',
        idType: 'National ID',
        idNumber: '',
        dob: '',
        address: '',
        telephone: '',
        fax: ''

      },
      nameValid: true,
      mailValid: true,
      typeValid: true,
      passwordValid:true,
      nationalityValid:true,
      idNumberValid: true,
      addressValid: true,
      telephoneValid: true,
      faxValid:  true,
       err:false

    }
    this.handleInput = this.handleInput.bind(this)
    this.validate = this.validate.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleCountry = this.handleCountry.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  validate(name,mail,type,password,nationality,idNumber,address,fax,telephone)
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
    if(mail)
    {
      if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))
      {
        this.setState({mailValid:true})
      }
      else{
        this.setState({mailValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({mailValid:false,
        err:true})
    }
    
    if(!password)
    {
      this.setState({passwordValid:false,
        err:true})
    }
    if(type)
    {
      if(regex.test(type))
      {
        this.setState({typeValid:true})
      }
      else{
        this.setState({typeValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({typeValid:false,
        err:true})
    }
    if(nationality)
    {
      if(regex.test(nationality))
      {
        this.setState({nationalityValid:true})
      }
      else{
        this.setState({nationalityValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({nationalityValid:false,
        err:true})
    }

    if(idNumber)
    {
      if(number.test(idNumber))
      {
        this.setState({idNumberValid:true})
      }
      else{
        this.setState({idNumberValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({idNumberValid:false,
        err:true})
    }
    if(telephone)
    {
      if(number.test(telephone))
      {
        this.setState({telephoneValid:true})
      }
      else{
        this.setState({telephoneValid:false,
          err:true})
      }
        
    }
    else
    {
      this.setState({telephoneValid:false,
        err:true})
    }
    if(!address)
    {
      this.setState({addressValid:false,
        err:true})
    }
   
    if(fax)
    {
      if(number.test(fax))
      {
        this.setState({faxValid:true})
      }
      else{
        this.setState({faxValid:false,
          err:true})
      }
        
    }
   
   
  
  }

  async handleRegister (e) {
    e.preventDefault()
    let userData = this.state.investor
  
  await this.validate (this.state.investor.name,this.state.investor.mail,this.state.investor.type,this.state.investor.password,
      this.state.investor.nationality,this.state.investor.idNumber,this.state.investor.address,
      this.state.investor.fax,this.state.investor.telephone)
      if(!this.state.err)
      {
    console.log('abc')
    fetch('https://serverbrogrammers.herokuapp.com/api/investors/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          console.log('Successful' + data + data.auth)
          document.location.href = '/PleaseActivate'
        }
      })
    })
  }
  }z
  handleDate (v) {
    this.setState(prevState => ({ investor:
         { ...prevState.investor, dob: v
         }
    }))
  }

  handleCountry (v) {
    this.setState(prevState => ({ investor:
         { ...prevState.investor, nationality: v
         }
    }))
    console.log('lol ' + v)
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
          <RequiredValidation name='name' field={sessionStorage.getItem('lang') === 'en' ? 'Full Name' : 'الاسم كامل '} type='text' callBack={this.handleInput} valid = {this.state.nameValid} texthelper={!this.state.nameValid?"This field is required and only letters ":""}/>
          <RequiredValidation name='mail' field={sessionStorage.getItem('lang') === 'en' ? 'Email' : 'البريد '} type='email' callBack={this.handleInput} valid = {this.state.mailValid} texthelper={!this.state.mailValid?"This field is required and must be an Email ":""} />
          <RequiredValidation name='password' field={sessionStorage.getItem('lang') === 'en' ? 'Password' : 'الرقم السرى '} type='password' callBack={this.handleInput} valid = {this.state.passwordValid} texthelper={!this.state.passwordValid?"This field is required ":""} />
          <RequiredValidation name='type' field={sessionStorage.getItem('lang') === 'en' ? 'Investor Type' : 'نوع المستثمر '} type='text' callBack={this.handleInput} valid = {this.state.typeValid} texthelper={!this.state.typeValid?"This field is required only letters ":""}/>
          <Gender name='gender' callBack={this.handleInput} />
          <Date name='dob' callBack={this.handleDate} />
          <IDType name='idType' callBack={this.handleInput} />
          <RequiredValidation name='idNumber' field={sessionStorage.getItem('lang') === 'en' ? 'Id number' : ' الرقم القومى'} type='text' callBack={this.handleInput} valid = {this.state.idNumberValid} texthelper={!this.state.idNumberValid?"This field required and is only numbers ":""} />
          <RequiredValidation name='address' field={sessionStorage.getItem('lang') === 'en' ? 'Address' : 'العنوان '} type='text' callBack={this.handleInput} valid = {this.state.addressValid} texthelper={!this.state.addressValid?"This field is required ":""}/>
          <RequiredValidation name='telephone' field={sessionStorage.getItem('lang') === 'en' ? 'Telephone' : 'رقم الهاتف '} type='text' callBack={this.handleInput} valid = {this.state.telephoneValid} texthelper={!this.state.telephoneValid?"This field is required and only numbers ":""}/>
          <NotRequiredValidation name='fax' field={sessionStorage.getItem('lang') === 'en' ? 'fax' : 'رقم الفاكس '} type='text' callBack={this.handleInput} valid = {this.state.faxValid} texthelper={!this.state.faxValid?"This field is only numbers ":""}/>
          <RequiredValidation name='nationality' field={sessionStorage.getItem('lang') === 'en' ? 'Country' : 'المدينه '} type='text' callBack={this.handleInput}valid = {this.state.nationalityValid} texthelper={!this.state.nameValid?"This field is required and only letters ":""}/>

          {/* <Country callBack={this.handleCountry}/> */}
          <AlertDialogSlide handleRegister={this.handleRegister} />
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(Register)
