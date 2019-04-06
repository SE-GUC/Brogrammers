import React, { Component } from "react";
import NotRequired from "../layout/inputs/NotRequired";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Icon, Button } from "@material-ui/core";
import SaveChangesButton from "../layout/Dialogs/SaveChangesButton";


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
class LawyerComment extends Component {
  render() {
    const { classes } = this.props;
    return (
      //<main className={classes.main}>
        <Paper className={classes.paper}>
          <Icon className={classes.icon} color="primary">
            add_circle
          </Icon>
          <h2>Add Your Comment</h2>
          <NotRequired field={"LawyerComment"} type="text" />
          <NotRequired field={"CompanyId"} type="text" />

          <SaveChangesButton />
        </Paper>
     // </main>
    );
  }
}

export default withStyles(styles)(LawyerComment);
