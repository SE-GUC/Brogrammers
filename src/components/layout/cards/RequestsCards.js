import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import SimpleMenu from "../menu/SimpleMenu";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import Error from "@material-ui/icons/Warning";
import HourGlass from "@material-ui/icons/HourglassEmpty"


const styles = {
  card: {
    maxWidth: 275,
    height: 160
  },
 
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  avatar: {
    backgroundColor: blue[600]
  }
};
class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false,
    color:blue[500] ,
     
  };

  }
  checkrejectedicon=props =>{
    if (props.subheader === "Accepted")
    return <DoneAll/>
    if (props.subheader === "PendingReviewer")
    return <Done/>
    if (props.subheader==='RejectedLawyer'||props.subheader==='RejectedReviewer')
    return <Error/>
    if (props.subheader === "PendingLawyer")
    return <HourGlass/>
  }
  checkrejs =props =>{
    if (props.subheader === 'RejectedLawyer')
    return red[500]
    if (props.subheader === "Accepted")
    return green[500]
    if (props.subheader === "RejectedReviewer")
    return yellow[500]
    if (props.subheader === "PendingReviewer"||props.subheader === "PendingLawyer")
    return blue[500]
  }

  checkrej = props => {
    
    if (props.subheader === 'RejectedLawyer') {
      return true
    } else return false;
  };

  // const bull = <span className={classes.bullet}>•</span>;
  render() {
   
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
       <CardHeader
          classes={{
            title: classes.title
          }}
          avatar={
            <Avatar aria-label="Request" style={{backgroundColor:this.checkrejs(this.props)}} title={this.props.subheader} className={classes.avatar}>
             {this.checkrejectedicon(this.props)}
            </Avatar>
          }
          action={
            <SimpleMenu a={this.checkrej(this.props)} id ={this.props.id} token={this.props.token} data={this.props.data}/>
          
          }
          title={this.props.title}
          subheader={this.props.nameAr}
        />
        <CardContent>
          {this.props.lawyerComment}
        </CardContent>
      
      </Card>
    );
  }
}
SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
