import React, { Component } from 'react';
import Required from  '../layout/inputs/Required';
import NotRequired from  '../layout/inputs/NotRequired';
import Country from  '../layout/inputs/Country'
import Gender from  '../layout/inputs/Gender'
import IDType from  '../layout/inputs/IDType'
import Date from  '../layout/inputs/Date'
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
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
});

function Register(props) {
  const { classes } = props;

  return (
    
<main className={classes.main}>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
      <CssBaseline />
      
    <Paper className={classes.paper}>

     <Avatar className={classes.avatar}>
          <i class="fas fa-user-plus"></i>
     </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
     <Required field={'Full Name'} type='text'/>
     <Required field={'Email'} type='email'/>
     <Required field={'Password'} type='password'/>
     <Required field={'Investor Type'} type='text'/>
     <Gender/>
     <Date/>
     <IDType/>
     <Required field={'ID Number'} type='text'/>
     <Required field={'Address'} type='text'/>
     <Required field={'Telephone'} type='text'/>
     <NotRequired field={'Fax'} type='text'/>


     <Country/>
    </Paper>
    </main>
  );
}

export default withStyles(styles)(Register);
