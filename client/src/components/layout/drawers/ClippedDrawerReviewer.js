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
import ReviewerCases from '../../pages/ReviewerCases'
import ViewReviewerCasesbyID from '../../pages/ViewReviewerCasesbyID'
import EditProfileReviewer from '../../pages/EditProfileReviewer'
import Home from '@material-ui/icons/Home'
import EditProfile from '@material-ui/icons/BorderColor'
import ViewList from '@material-ui/icons/ViewList'
import LinearDeterminate from '../loading/CustomizedProgress';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import NavBar from '../Navbar';

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

class ClippedDrawerReviewer  extends React.Component {
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
          <ReviewerCases
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "myCases":
        return (
          <ViewReviewerCasesbyID token={sessionStorage.getItem("jwtToken")} />
        );
      case "profile":
        return <EditProfileReviewer token={sessionStorage.getItem("jwtToken")} />;
      default:
        return;
    }
  };
  // handleHome = () => {
  //   document.location.href = "/";
  // }
  // handleCases = () => {
  //   this.setState({ clicked: "cases" })
  // }
  // handleCases2 = () => {
  //   this.setState({ clicked: "myCases" })
  // }
  
  
  // handleComment = () => {
  //   this.setState({ clicked: "comment" })
  // }
  // handleProfile = () => {
  //   this.setState({ clicked: "profile" })

  // }

  handleHome = () => {
    document.location.href = "/";

    this.handleDrawerClose();
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
    this.handleDrawerClose();
  };
  handleCases2 = () => {
    this.setState({ clicked: "myCases" });
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
                 { sessionStorage.getItem("lang") === "en" ? "Home" : "صفحتي"
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
                {  sessionStorage.getItem("lang") === "en"
                    ? "View All Cases"
                    : "اعرض كل الشركات"
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
                 { sessionStorage.getItem("lang") === "en"
                    ? "View My Cases"
                    : "اظهر شركاتي"
                }
                </b>}
              />
            </ListItem>
          </List>
          
          <List>
           
            <Divider />
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
                {  sessionStorage.getItem("lang") === "en"
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

ClippedDrawerReviewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawerReviewer);
