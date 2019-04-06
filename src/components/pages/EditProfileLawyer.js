import React, { Component } from "react";
import NotRequired from "../layout/inputs/NotRequired";
import Gender from "../layout/inputs/Gender";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Icon, Button } from "@material-ui/core";
import SaveChangesButton from "../layout/Dialogs/SaveChangesButton";
import Date from "../layout/inputs/Date";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  }
});
class EditProfileLawyer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Icon className={classes.icon} color="primary">
            add_circle
          </Icon>
          <h2>Edit Your Profile</h2>
          <NotRequired field={"First Name"} type="text" />
          <NotRequired field={"Middle Name"} type="text" />
          <NotRequired field={"Last Name"} type="text" />
          <NotRequired field={"Email"} type="email" />
          <NotRequired field={"Password"} type="password" />
          <NotRequired field={"Telephone"} type="text" />
          <NotRequired field={"Social Security Number"} type="text" />
          <NotRequired field={"Years Of Experience "} type="number" />
          <NotRequired field={"First Name"} type="text" />
          <NotRequired field={"Salary"} type="number" />
          <Date field={"Birth Date"}/>
          <Gender />
          <SaveChangesButton />
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(EditProfileLawyer);
