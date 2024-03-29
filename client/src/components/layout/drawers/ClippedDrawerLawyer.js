import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home'
import EditProfile from '@material-ui/icons/BorderColor'
import EditProfileLawyer from '../../pages/EditProfileLawyer'
import LawyerCases from '../../pages/LawyerCases';
import ViewLawyerCasesbyID from '../../pages/ViewLawyerCasesbyID'
import ViewLawyerEditableCases from '../../pages/ViewLawyerEditableCases'
import LawyerCompanyRegSSC from '../../pages/LawyerCompanyRegSSC'
import LawyerCompanyRegSPC from '../../pages/LawyerCompanyRegSPC'
import NavBar from '../../../components/layout/Navbar'
import Note from '@material-ui/icons/NoteAdd'
import ViewList from '@material-ui/icons/ViewList'
import Stepper from "../../steppers/stepper";
import LinearDeterminate from "../loading/CustomizedProgress";

import Navbar from '../../../components/layout/Navbar';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    zIndex: -1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#103755"
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawerLawyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "i",
      mobileOpen: false,
      drawerOpen: false
    };
  }
  handleLoading = () => {
    if (sessionStorage.getItem("loading")) return <LinearDeterminate />;
  };
  handleContent = state => {
    switch (state.clicked) {
      case "cases":
        return (
          <LawyerCases
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "companies":
        return (
          <ViewLawyerCasesbyID token={sessionStorage.getItem("jwtToken")} />
        );
      case "profile":
        return <EditProfileLawyer token={sessionStorage.getItem("jwtToken")} />;
      case "createssc":
        return <LawyerCompanyRegSSC />;
      case "createspc":
        return <LawyerCompanyRegSPC />;
      case "created":
        return <Stepper />;
      case "edit":
        console.log("hello");
        return <ViewLawyerEditableCases />;
      default:
        return;
    }
  };

  /*   handleHome = () => {
    document.location.href = "/";
  }
  handleCases = () => {
    this.setState({ clicked: "cases" })
  }
  handleCases2 = () => {
    this.setState({ clicked: "myCases" })
  }
  handleCompanySSC = () => {
    this.setState({ clicked: "companyssc" })
  }
  handleCompanySPC = () => {
    this.setState({ clicked: "companyspc" })
  }
  handleEdit = () => {
    this.setState({ clicked: "edit" })
  }
  handleComment = () => {
    this.setState({ clicked: "comment" })
  }
  handleProfile = () => {
    this.setState({ clicked: "profile" })
  } */

  handleHome = () => {
    document.location.href = "/";
    this.handleDrawerClose();
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
    this.handleDrawerClose();
  };
  handleCases2 = () => {
    this.setState({ clicked: "companies" });
    this.handleDrawerClose();
  };

  handleCreatessc = () => {
    this.setState({ clicked: "createssc" });
    this.handleDrawerClose();
  };

  handleCreatespc = () => {
    this.setState({ clicked: "createspc" });
    this.handleDrawerClose();
  };

  handleEdit = () => {
    this.setState({ clicked: "edit" });
    this.handleDrawerClose();
  };

  handleCreated = () => {
    this.setState({ clicked: "created" });
    this.handleDrawerClose();
  };



  handleProfile = () => {
    this.setState({ clicked: "profile" });
    this.handleDrawerClose();
  };

  handleDrawerToggle = () => {
    this.setState(prevState => {
      return { drawerOpen: !prevState.drawerOpen };
    });
  };
  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handelOpen = () => {
    this.setState({ mobileOpen: localStorage.getItem("openDrawer") });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <NavBar handleDrawerToggle={this.handleDrawerToggle} />
        <div className={classes.toolbar} />
        <Drawer
          className={classes.drawer}
          variant={"temporary"}
          open={this.state.drawerOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <ClickAwayListener onClickAway={this.handleDrawerClose}>

          <List>
            <ListItem button key={"Home"} onClick={this.handleHome}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en" ? "Home" : "صفحتي"
                }
                </b>}
              />
            </ListItem>
            <ListItem
              button
              key={"View My Cases"}
              onClick={this.handleCases2}
            >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "View My Cases"
                    : "اظهر شركاتي"
                }
                </b>}
              />
            </ListItem>


            <ListItem
              button
              key={"View All Available cases"}
              onClick={this.handleCases}
            >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "View All Cases"
                    : "اعرض كل الشركات"
                }
                </b>}
              />
            </ListItem>
          </List>
          <Divider />
          <ListItem
            button
            key={"Create SSC Companies"}
            onClick={this.handleCreatessc}
          >
            <ListItemIcon>
              <Note />
            </ListItemIcon>
            <ListItemText
              primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                sessionStorage.getItem("lang") === "en"
                  ? "Create SSC Companies"
                  : "سجل شركتي ال SSC"
              }
              </b>}
            />
          </ListItem>
          <ListItem
            button
            key={"Create SPC Companies"}
            onClick={this.handleCreatespc}
          >
            <ListItemIcon>
              <Note />
            </ListItemIcon>
            <ListItemText
              primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                sessionStorage.getItem("lang") === "en"
                  ? "Create SPC Companies"
                  : "سجل شركتي ال SPC"
              }
              </b>}
            />
          </ListItem>
          <ListItem
            button
            key={"Create D Companies"}
            onClick={this.handleCreated}
          >
            <ListItemIcon>
              <Note />
            </ListItemIcon>
            <ListItemText
              primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                sessionStorage.getItem("lang") === "en"
                  ? "Create Dynamic Companies"
                  : "سجل شركتي ال Dynamic"
              }
              </b>}
            />
          </ListItem>
          <Divider />
          <List>
            
            
            <ListItem button key={"Edit Companies"} onClick={this.handleEdit}>
              <ListItemIcon>
                <EditProfile />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Companies "
                    : "تغير الشركات"
                }
                </b>}
              />
            </ListItem>
            <ListItem
              button
              key={"Edit Your Profile"}
              onClick={this.handleProfile}
            >
              <ListItemIcon>
                <EditProfile />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Your Profile"
                    : "تغير البيانات"
                    
                }
                </b>}
                
              />
            </ListItem>

          </List>
          </ClickAwayListener>
        </Drawer>
        <main className={classes.content} style={{ marginTop: 50 }}>
          {this.handleLoading}
          {this.handleContent(this.state)}
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}
ClippedDrawerLawyer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawerLawyer);
