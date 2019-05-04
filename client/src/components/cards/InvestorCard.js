import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as PendingIcon } from "../Icons/pending.svg";
import { ReactComponent as LawyerRejectedIcon } from "../Icons/lawyerrejected.svg";
import { ReactComponent as AcceptedIcon } from "../Icons/accepted.svg";
import { ReactComponent as ReviewerRejectedIcon } from "../Icons/reviewerrejected.svg";
import CustomDialog from "../layout/Dialogs/CustomDialog";

const styles = theme => ({
 
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: "#fafafa"
  },
  title: {
    fontSize: 20
  }
});

class InvestorCard extends React.Component {
  state = { expanded: false };

  checkStatusIcon = props => {
    console.log(props.company);
    switch (props.company.status) {
      case "PendingLawyer":
        return <PendingIcon />;
      case "PendingReviewer":
        return <PendingIcon />;
      case "RejectedLawyer":
        return <LawyerRejectedIcon />;
      case "RejectedReviewer":
        return <ReviewerRejectedIcon />;
      case "Accepted":
        return <AcceptedIcon />;
    }
  };

  reformatStatus = props => {
    switch (props.company.status) {
      case "PendingLawyer":
        return "Pending Lawyer";
      case "PendingReviewer":
        return "Pending Reviewer";
      case "RejectedLawyer":
        return "Rejected Lawyer";
      case "RejectedReviewer":
        return "Rejected Reviewer";
      case "Accepted":
        return "Accepted";
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
          classes={{title: classes.title}}
          className={classes.header}
            avatar={
              <Avatar className={classes.avatar}>
                {this.checkStatusIcon(this.props)}
              </Avatar>
            }
            title={this.props.company.nameInEnglish}
            subheader={this.reformatStatus(this.props)}
          />
          <CardContent>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label={sessionStorage.getItem('lang')==='en'? 'View details': 'اظهار التفاصيل '}
>
              <CustomDialog
                className={classes.dialog}
                company={this.props.company}
              />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit />
        </Card>
      </div>
    );
  }
}

InvestorCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvestorCard);
