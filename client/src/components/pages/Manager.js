import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { Avatar } from '@material-ui/core'
import AssignmemtIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import Required from '../layout/inputs/Required'
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
      }
    }
    this.handleInput = this.handleInput.bind(this)
    this.handle = this.handle.bind(this)
    this.handleDate = this.handleDate.bind(this)
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
  handle() {
    this.props.callBack(this.state.manager)
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
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Manager Name' : '‫الاسم‬ المدير'} type={'text'} callBack={this.handleInput} name={'name'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Manager Type' : 'نوع المدير'} type={'text'} callBack={this.handleInput} name={'type'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Gender callBack={this.handleInput} field={sessionStorage.getItem('lang') === 'en' ? 'Manager Gender' : 'جنس المدير'} name={'sex'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Manager Nationality' : 'جنسیة‬ المدير'} type={'text'} callBack={this.handleInput} name={'nationality'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Identification Type' : 'نوع اثبات الشخصية'} type={'text'} callBack={this.handleInput} name={'identificationType'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Identification Number' : 'رقم اثبات الشخصية'} type={'text'} callBack={this.handleInput} name={'identificationNumber'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Date name={'birthDate'} callBack={this.handleDate} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Address' : 'عنوان الاقامة'} type={'text'} callBack={this.handleInput} name={'address'} />
          </Grid>
          <Grid container direction='column' alignItems='center' >
            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Managerial Position' : 'صفة الشخص في مجلس المدرين'} type={'text'} callBack={this.handleInput} name={'managerialPosition'} />
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
