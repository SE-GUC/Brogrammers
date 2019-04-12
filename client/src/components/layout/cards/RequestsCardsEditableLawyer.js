import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import SimpleMenu from "../menu/LawyerEditSimpleMenu";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import Error from "@material-ui/icons/Warning";
import HourGlass from "@material-ui/icons/HourglassEmpty";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popper from "../popper/Popper"; 
import { Hidden } from "@material-ui/core";
const styles = {
  card: {
    width: 290,
    height: 160
  },
  cover: {
  opacity:0,
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    height: 100,
    "&:hover": {
    opacity:1,
      transition: "0.3s"},
      transition: "0.3s"
  },

  title: {
    fontSize: 18,
    height: 20,
    fontWeight: "bold"
  },
  subheader: {
    fontSize: 15,
  },
  comment: {
    fontSize: 15,
    color: "#1f1f1f",
    fontWeight: "bold"
  },
  lawyer: {
    fontSize: 12,
    color: "#5f5f5f",
    fontWeight: "bold"
  },

  avatar: {
    backgroundColor: blue[600],
    "&:hover": {
      transform: "scale(1.3,1.3)",
      transition: "0.3s"
    },
    transition: "0.3s"
  }
};
class SimpleCard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, color: blue[500], opacity:0 };
  }
  checkrejectedicon = props => {
    if (props.subheader === "Accepted") return <DoneAll />;
    if (props.subheader === "PendingReviewer") return <Done />;
    if (
      props.subheader === "RejectedLawyer" ||
      props.subheader === "RejectedReviewer"
    )
      return <Error />;
    if (props.subheader === "PendingLawyer") return <HourGlass />;
  };
  checkrejs = props => {
    if (props.subheader === "RejectedLawyer") return red[500];
    if (props.subheader === "Accepted") return green[500];
    if (props.subheader === "RejectedReviewer") return yellow[500];
    if (
      props.subheader === "PendingReviewer" ||
      props.subheader === "PendingLawyer"
    )
      return blue[500];
  };

  checkrej = props => {
    if (props.subheader === "RejectedReviewer") {
      return true;
    } else return false;
  };
  popper = props => {
   return <Popper />
  };

  // const bull = <span className={classes.bullet}>•</span>;
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}
    
      >
        <CardHeader
          classes={{
            title: classes.title,
            subheader: classes.subheader
          }}
          avatar={
         
         <>   <IconButton
              aria-label="Request"
              style={{ backgroundColor: this.checkrejs(this.props) }}
              title={this.props.subheader}
              className={classes.avatar}
              >
              {this.checkrejectedicon(this.props)}

            </IconButton>
            </>
          }
          action={
            <SimpleMenu
              a={this.checkrej(this.props)}
              id={this.props.id}
              token={this.props.token}
              data={this.props.data}
            />
          }
          title={this.props.title}
         

          // subheader={this.props.nameAr}
        />

        <CardMedia className={classes.cover}  >
          <Typography className={classes.comment}>
            {" "}
            {this.props.lawyer !== undefined
              ? '"' + this.props.comment + '"'
              :<h1 style={{textAlign:'center', fontSize:"20px"}}> No Comments yet</h1>}
          </Typography>
          <Typography className={classes.lawyer}>
            {this.props.lawyer !== undefined
              ? "- " + this.props.lawyer
              : console.log}
          </Typography>
        </CardMedia>
      </Card>
    );
  }
}
SimpleCard2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard2);
