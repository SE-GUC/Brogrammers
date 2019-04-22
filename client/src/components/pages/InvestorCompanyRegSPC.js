import React, { Component } from 'react'
import AlertDialogSlide from '../layout/Dialogs/SlideDialog'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { Avatar } from '@material-ui/core'
import AssignmemtIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import Required from '../layout/inputs/Required'
import NotRequired from '../layout/inputs/NotRequired'
import CssBaseline from '@material-ui/core/CssBaseline'

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

class InvestorCompanyReg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      company: {
        legalCompanyForm: '',
        nameInArabic: '',
        nameInEnglish: '',
        governerateHQ: '',
        cityHQ: '',
        addressHQ: '',
        telephoneHQ: '',
        faxHQ: '',
        capitalCurrency: '',
        capital: ''
      }
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleRegister(event) {
    event.preventDefault()
    fetch('http://localhost:3000/api/investors/createspccompany',
      {
        method: 'POST',
        body: JSON.stringify(this.state.company),
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000',
          'x-access-token': sessionStorage.getItem("jwtToken")
        }
      }).then(response => {
        response.json().then(data => {
          if (data.error) {
            alert(data.error);
          }
          else {
            console.log('Successful' + data)
          }
        })
      })
  }

  handleInput(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState(prevState => {
      return {
        company: {
          ...prevState.company, [name]: value
        }
      }
    }, () => console.log(this.state.company)
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} elevation={16} >
          <Grid container spacing={0} justify='space-evenly'>
            <Grid container direction='column' alignItems='center'>
              <Avatar className={classes.greenAvatar}>
                <AssignmemtIcon />
              </Avatar>
            </Grid>
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h6' component='h3'>
                <p>
                  {sessionStorage.getItem('lang') === 'en' ? 'Fill in your Company Form!' : 'املئ بينات شركتك'}
                </p>
              </Typography>
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Law' : ' ‫القانون‬‫ المنظم'} type={'text'} callBack={this.handleInput} name={'regulationLaw'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Legal Company Form' : '‫شكل‬ ‫الشركة ‫القانوني‬ '} type={'text'} callBack={this.handleInput} name={'legalCompanyForm'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Name In Arabic' : ' ‫اسم‬‫ المنشأة‬'} type={'text'} callBack={this.handleInput} name={'nameInArabic'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <NotRequired field={sessionStorage.getItem('lang') === 'en' ? 'Name In English' : 'اسم‬ ‫المنشأه‬‫بالانجلیزیة‬ (في‬‬ ‫حالة‫ وجوده‬‫)'} type={'text'} callBack={this.handleInput} name={'nameInEnglish'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Government HQ' : '‫المركز ‫الرئیسي‬ ‫(المحافظة)‬‬'} type={'text'} callBack={this.handleInput} name={'governerateHQ'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'City HQ' : 'المركز ‫الرئیسي‬ ‫‫(المدینة)'} type={'text'} callBack={this.handleInput} name={'cityHQ'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Address HQ' : ' ‫المركز‬ ‫الرئیسي ‫(العنوان)'} type={'text'} callBack={this.handleInput} name={'addressHQ'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Telephone HQ' : '‫التلیفون‬'} type={'text'} callBack={this.handleInput} name={'telephoneHQ'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Fax HQ' : '‫الفاكس‬'} type={'text'} callBack={this.handleInput} name={'faxHQ'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Capital Currency' : '‫عملة‬ ‫رأس‬ ‫المال‬'} type={'text'} callBack={this.handleInput} name={'capitalCurrency'} />
            </Grid>
            <Grid container direction='column' alignItems='center' >
              <Required field={sessionStorage.getItem('lang') === 'en' ? 'Capital' : 'رأس‬ ‫المال'} type={'number'} callBack={this.handleInput} name={'capital'} />
            </Grid>
            <Grid>
              <br />
            </Grid>
            <Grid container direction='column' alignItems='flex-end' >
              <AlertDialogSlide handleRegister={this.handleRegister} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(InvestorCompanyReg)
