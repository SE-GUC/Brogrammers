import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { Avatar } from '@material-ui/core'
import AssignmemtIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import Required from '../layout/inputs/RequiredValidation'
import CssBaseline from '@material-ui/core/CssBaseline'
import BlueButton from '../layout/Buttons/BlueButton'
import Gender from '../layout/inputs/Gender'
import Date from '../layout/inputs/Date'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
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
    padding: `${theme.spacing.unit * 7}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500]
  }
})

class Manager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      manager: {
        name: '',
        type: '',
        sex: 'male',
        nationality: '',
        identificationType: '',
        identificationNumber: '',
        birthDate: '',
        address: '',
        managerialPosition: ''
      },
      nameValid: true,
      typeValid: true,
      sexValid: true,
      nationalityValid: true,
      identificationTypeValid: true,
      identificationNumberValid: true,
      birthDateValid: true,
      addressValid: true,
      managerialPositionValid: true
    }
    this.handleInput = this.handleInput.bind(this)
    this.handle = this.handle.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.validate = this.validate.bind(this)
  }
  handleDate(v) {
    this.setState(prevState => {
      return {
        manager:
        {
          ...prevState.manager, birthDate: v
        }
      }
    })
  }
  handleInput(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState(prevState => {
      return {
        manager: {
          ...prevState.manager, [name]: value
        }
      }
    }, () => console.log(this.state.manager)
    )
  }

  async handle() {
    await this.validate(
      this.state.manager.name,
      this.state.manager.type,
      this.state.manager.nationality,
      this.state.manager.identificationType,
      this.state.manager.identificationNumber,
      this.state.manager.address,
      this.state.manager.managerialPosition
    )
    if (!this.state.err) {
      this.props.callBack(this.state.manager)
      console.log(this.state.manager)
    }
    else {
      this.setState({
        err: false
      })
    }
  }

  validate(name, type, nationality, identificationNumber, identificationType, address, managerialPosition) {
    var regex = new RegExp(/^[a-zA-Z\s-, ]+$/);
    if (name) {
      if (regex.test(name)) {
        this.setState({ nameValid: true })
      }
      else {
        this.setState({
          nameValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        nameValid: false,
        err: true
      })
    }

    if (type) {
      if (regex.test(type)) {
        this.setState({ typeValid: true })
      }
      else {
        this.setState({
          typeValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        typeValid: false,
        err: true
      })
    }

    if (nationality) {
      if (regex.test(nationality)) {
        this.setState({ nationalityValid: true })
      }
      else {
        this.setState({
          nationalityValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        nationalityValid: false,
        err: true
      })
    }

    if (identificationNumber) {
      if (regex.test(identificationNumber)) {
        this.setState({ identificationNumberValid: true })
      }
      else {
        this.setState({
          identificationNumberValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        identificationNumberValid: false,
        err: true
      })
    }

    if (address) {
      if (regex.test(address)) {
        this.setState({ addressValid: true })
      }
      else {
        this.setState({
          addressValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        addressValid: false,
        err: true
      })
    }

    if (managerialPosition) {
      if (regex.test(managerialPosition)) {
        this.setState({ managerialPositionValid: true })
      }
      else {
        this.setState({
          managerialPositionValid: false,
          err: true
        })
      }
    }
    else {
      this.setState({
        managerialPositionValid: false,
        err: true
      })
    }

    return this.state.err
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.main} >
        <CssBaseline />
        <Grid container spacing={0} justify='space-evenly'>
          <Grid container direction='column' alignItems='center'>
            <Avatar className={classes.greenAvatar}>
              <AssignmemtIcon />
            </Avatar>
          </Grid>
          <Grid container direction='column' alignItems='center'>
            <Typography variant='h6' component='h3'>
              <p>
                {sessionStorage.getItem('lang') === 'en' ? 'Fill in your Managers Info!' : 'املئ بينات مدير الشركة'}
              </p>
            </Typography>
          </Grid >
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.nameValid} texthelper={!this.state.nameValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Manager Name' : '‫الاسم‬ المدير'} type={'text'} callBack={this.handleInput} name={'name'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.typeValid} texthelper={!this.state.typeValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Manager Type' : 'نوع المدير'} type={'text'} callBack={this.handleInput} name={'type'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Gender callBack={this.handleInput} field={sessionStorage.getItem('lang') === 'en' ? 'Manager Gender' : 'جنس المدير'} name={'sex'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.nationalityValid} texthelper={!this.state.nationalityValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Manager Nationality' : 'جنسیة‬ المدير'} type={'text'} callBack={this.handleInput} name={'nationality'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.identificationTypeValid} texthelper={!this.state.identificationTypeValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Identification Type' : 'نوع اثبات الشخصية'} type={'text'} callBack={this.handleInput} name={'identificationType'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.identificationNumberValid} texthelper={!this.state.identificationNumberValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Identification Number' : 'رقم اثبات الشخصية'} type={'text'} callBack={this.handleInput} name={'identificationNumber'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Date name={'birthDate'} callBack={this.handleDate} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.addressValid} texthelper={!this.state.addressValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Address' : 'عنوان الاقامة'} type={'text'} callBack={this.handleInput} name={'address'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required valid={this.state.managerialPositionValid} texthelper={!this.state.managerialPositionValid ? "This field is required and only letters " : ""} field={sessionStorage.getItem('lang') === 'en' ? 'Managerial Position' : 'صفة الشخص في مجلس المدرين'} type={'text'} callBack={this.handleInput} name={'managerialPosition'} />
          </Grid>
          <Grid container direction='column' alignItems='flex-end' >
            <BlueButton type='button' callBack={this.handle} />
          </Grid>
        </Grid>
      </div >
    )
  }
}
export default withStyles(styles)(Manager)
