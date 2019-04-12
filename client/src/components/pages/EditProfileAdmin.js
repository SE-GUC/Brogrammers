import React, { Component } from 'react'
import NotRequired from '../layout/inputs/NotRequired'
import Gender from '../layout/inputs/Gender'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Icon, Button } from '@material-ui/core'
import SaveChangesButton from '../layout/Dialogs/SaveChangesButton'
import { blueGrey, blue } from '@material-ui/core/colors'
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
      .spacing.unit * 3}px`,
    backgroundColor: '#f4f4f4'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  }
})
class EditProfileAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      admin: {
        email: null,
        password: null,
        phone: null,
        gender: null
      }
    }
    this.handleSubmission = this.handleSubmission.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  render () {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
        <UpdateIcon/>
          <h2>Edit Your Profile</h2>
          <NotRequired
            name={'email'}
            field={'Email'}
            type='email'
            callBack={this.onChange}
          />
          <NotRequired
            name={'password'}
            field={'Password'}
            type='password'
            callBack={this.onChange}
          />
          <NotRequired
            name={"phone"}
            field={"Telephone"}
            type="text"
            callBack={this.onChange}
          />
          <Gender name="gender" callBack={this.onChange} />
          <SaveChangesButton onClick={this.handleSubmission} />
        </Paper>
      </main>
    )
  }
  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName];
      }
    }
  };

  handleSubmission(e) {
    let updatedData = this.state.admin;
    this.clean(updatedData);
    fetch("http://localhost:3000/routes/api/admins/", {
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
            ...prevState.admin,
            [name]: value
          }
        }
      },
      () => console.log(value)
    )
  }
}

export default withStyles(styles)(EditProfileAdmin)
