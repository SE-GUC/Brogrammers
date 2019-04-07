import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Required from  '../layout/inputs/Required';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 465,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export class ReviewerSignIn extends Component {
    constructor(props){
        super(props);
        this.state= {
            reviewer: {
            email: '',
            password: '',
           },
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(e){
        e.preventDefault();
        let reviewerData = this.state.reviewer;
        fetch('http://localhost:3000/api/reviewer/login',{
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(reviewerData),
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(response => {
            response.json().then(data =>{
              console.log("Successful" + data+ data.auth);
              this.props.callBack(data.token,data.auth,'x',data.data._id)
            })
        }) 
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
       // console.log(this.state.investor)
        this.setState( prevState => {
           return { 
            reviewer : {
                       ...prevState.reviewer, [name]: value
                      }
           }
        }, () => console.log(this.state.reviewer)
        )
    }

  render() {
    const { classes } = this.props;
    return (
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="email">Email</InputLabel> */}
              {/* <Input id="email" name="email" autoComplete="email" field={'Email'} type='email' callBack={this.handleInput} autoFocus /> */}
              <Required name= 'email' field={'Email'} type='email' callBack={this.handleInput}/>                      
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="password">Password</InputLabel> */}
              {/* <Input name="password" type="password" id="password" autoComplete="current-password" field={'Password'} callBack={this.handleInput} /> */}
              <Required name= 'password' field={'Password'} type='password' callBack={this.handleInput}/>          
            </FormControl>
            <FormControlLabel
              control={<label/>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {this.handleRegister}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(ReviewerSignIn);
