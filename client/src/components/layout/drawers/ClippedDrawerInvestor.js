import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import EditProfileInvestor from "../../pages/EditProfileInvestor";
import InvestorRequests from "../../pages/InvestorRequests";
import ViewCompanies from "../../pages/ViewCompanies";
import Stepper from "../../steppers/stepper";
import { Paper } from "@material-ui/core";
import LinearDeterminate from "../loading/LinearDeterminate";
import InvestorCompanyRegSSC from "../../pages/InvestorCompanyRegSSC";
import InvestorCompanyRegSPC from "../../pages/InvestorCompanyRegSPC";
import stepper from "../../steppers/stepper";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawerInvestor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "i"
    };
  }
handleLoading=()=>{
  if(sessionStorage.getItem("loading"))
  return <LinearDeterminate/>
}
  handleContent = state => {
    switch (state.clicked) {
      case "requests":
        return (
          

          <InvestorRequests
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
      
        );
      case "companies":
        return <ViewCompanies token={sessionStorage.getItem("jwtToken")} />;
      case "profile":
        return (
          <EditProfileInvestor token={sessionStorage.getItem("jwtToken")} />
        );
      case "createssc":
        return (
         <InvestorCompanyRegSSC/>
        );
        case "createspc":
        return(
          <InvestorCompanyRegSPC/>
        );
        case "created":
       return  <Stepper/>
      default:
        return;
    }
  };
  handleHome = () => {
    document.location.href = "/";
  };

  handleCases2 = () => {
    this.setState({ clicked: "companies" });
  };

  handleCreatessc = () => {
    this.setState({ clicked: "createssc" });
  };

  handleCreatespc = () => {
    this.setState({ clicked: "createspc"})
  }

  handleCreated = () => {
    this.setState({ clicked: "created"})
  }

  handleProfile = () => {
    this.setState({ clicked: "profile" });
  };
  handleRequests = () => {
    this.setState({ clicked: "requests" });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              <p>
              {sessionStorage.getItem('lang') === 'en' ? 'Investor Profile' : 'حساب المستثمر'}
              </p>
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />

          <List>
            <ListItem button key={"Home"} onClick={this.handleHome}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary= {sessionStorage.getItem('lang') === 'en' ? 'Home' : 'صفحتي'}/>
            </ListItem>
            <ListItem
              button
              key={"Edit Your Profile"}
              onClick={this.handleProfile}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'Edit Your Profile' : 'تغير البينات'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key={"View My Companies"}
              onClick={this.handleCases2}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'View My Companies' : 'اظهر شركاتي'} />
            </ListItem>
            <ListItem
              button
              key={"View My Requests"}
              onClick={this.handleRequests}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'View My Requests' : 'اظهر طلباتي'} />
            </ListItem>
            <ListItem
              button
              key={"Create SSC Companies"}
              onClick={this.handleCreatessc}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'Create SSC Companies' : 'سجل شركتي ال SSC'} />
            </ListItem>
            <ListItem
              button
              key={"Create SPC Companies"}
              onClick={this.handleCreatespc}
            >
              <ListItemIcon>
                <InboxIcon />
                
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'Create SPC Companies' : 'سجل شركتي ال SPC'} />
            </ListItem>
            <ListItem
              button
              key={"Create D Companies"}
              onClick={this.handleCreated}
            >
              <ListItemIcon>
                <InboxIcon />
                
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('lang') === 'en' ? 'Create Other Companies' : 'سجل شركات اخرة'} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content} style={{marginTop:50}}>
       {this.handleLoading}
          {this.handleContent(this.state)}
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

ClippedDrawerInvestor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawerInvestor);