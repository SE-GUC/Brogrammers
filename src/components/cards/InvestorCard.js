import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomDialogInvestor from "../layout/form/CustomDialogInvestor";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function InvestorCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>
          Status: {props.status}
        </Typography>
        <Typography>{props.nameInEnglish}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.addressHQ}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomDialogInvestor investorCompany = {this.props}></CustomDialogInvestor>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(InvestorCard);
