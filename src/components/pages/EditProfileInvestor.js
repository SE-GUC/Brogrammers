import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import NotRequired from "../layout/inputs/NotRequired";
import NotRequiredSmall from "../layout/inputs/NotRequiredSmall";
import IDType from "../layout/inputs/IDType";
import Gender from "../layout/inputs/Gender";
import Country from "../layout/inputs/Country";
import Date from "../layout/inputs/Date";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Icon, Button } from "@material-ui/core";
import BlueButton from "../layout/Buttons/BlueButton";
import SaveChangesButton from "../layout/Dialogs/SaveChangesButton";
import Cancel from "../layout/Dialogs/Cancel";

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
  },
  checks: {
    display: "flex"
  }
});
class EditProfileInvestor extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Icon className={classes.icon} color="primary">
            add_circle
          </Icon>
          <h2>Edit Your Profile</h2>
          <NotRequired field={"Full Name"} type="text" />
          <NotRequired field={"Email"} type="email" />
          <NotRequired field={"Password"} type="password" />
          <NotRequired field={"Investor Type"} type="text" />
          <NotRequired field={"ID Number"} type="text" />
          <NotRequired field={"Address"} type="text" />
          <NotRequired field={"Telephone"} type="text" />
          <NotRequired field={"Fax"} type="text" />
          <div className={classes.checks}>
            <Gender />
            <IDType />
          </div>
          <Date />
          <Country />
          <SaveChangesButton />
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(EditProfileInvestor);
