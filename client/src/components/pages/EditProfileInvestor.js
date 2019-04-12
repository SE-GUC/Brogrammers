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
        name: null,
        mail: null,
        password: null,
        type: null,
        idNumber: null,
        address: null,
        telephone: null,
        fax: null,
        gender: null,
        idType: null,
        dob: null,
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
        <UpdateIcon />
          <h2>Edit Your Profile</h2>
          <NotRequired name={"name"} field={"Full Name"} type="text" callBack={this.onChange} />
          <NotRequired name={"mail"} field={"Email"} type="email" callBack={this.onChange} />
          <NotRequired name={"password"} field={"Password"} type="password" callBack={this.onChange} />
          <NotRequired name={"type"} field={"Investor Type"} type="text" callBack={this.onChange} />
          <NotRequired name= {"idNumber"} field={"ID Number"} type="text" callBack={this.onChange} />
          <NotRequired name= {"address"} field={"Address"} type="text" callBack={this.onChange} />
          <NotRequired name={"telephone"} field={"Telephone"} type="text" callBack={this.onChange} />
          <NotRequired name={"fax"} field={"Fax"} type="text" callBack={this.onChange} />
          <div className={classes.checks}>
            <Gender name={'gender'} callBack={this.onChange} />
            <IDType name={'idType'} callBack={this.onChange} />
          </div>
          <Date name={"dob"} callBack={this.handleDate}/> 
          <Country name={"nationality"} callBack={this.onChange}/>
          <SaveChangesButton onClick={this.handleSubmission}  />
        </Paper>
      </main>
    )
  }
  handleDate(v) {
    this.setState( prevState => ({ investor : 
         {...prevState.investor, dob: v
         }
       }))
      
   }

   clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName];
      }
    }
  };

  handleSubmission(e) {
    let updatedData = this.state.investor;
    this.clean(updatedData);
    fetch("http://localhost:3000/api/investors/", {
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
    console.log('yeetchange')
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => {
        return {
          investor: {
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
