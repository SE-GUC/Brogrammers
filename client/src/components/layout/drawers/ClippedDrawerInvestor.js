import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditProfileInvestor from "../../pages/EditProfileInvestor";
import InvestorRequests from "../../pages/InvestorRequests";
import ViewCompanies from "../../pages/ViewCompanies";
import InvestorCompanyRegSPC from "../../pages/InvestorCompanyRegSPC";
import InvestorCompanyRegSSC from "../../pages/InvestorCompanyRegSSC";
import Stepper from "../../steppers/stepper";
import NavBar from "../Navbar";
import ViewList from "@material-ui/icons/ViewList";
import EditProfile from "@material-ui/icons/BorderColor";
import Home from "@material-ui/icons/Home";
import Note from "@material-ui/icons/NoteAdd";
import LinearDeterminate from "../loading/CustomizedProgress";
import { connect } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Home2 from "../../pages/Home"
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex",
    zIndex: -1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#103755",
  },
  content: {
    flexGrow: 1,
   
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawerInvestor extends Component {
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
        return <InvestorCompanyRegSSC />;
      case "createspc":
        return <InvestorCompanyRegSPC />;
      case "created":
        return <Stepper />;
        case "Home":
        return <Home2 />;
    default:return  <Home2 />
    }
  };
  handleHome = () => {
    this.setState({ clicked: "Home" });
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

  handleCreated = () => {
    this.setState({ clicked: "created" });
    this.handleDrawerClose();
  };

  handleProfile = () => {
    this.setState({ clicked: "profile" });
    this.handleDrawerClose();
  };
  handleRequests = () => {
    this.setState({ clicked: "requests" });
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
    console.log(this.props.drawerOpen);
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
                      {sessionStorage.getItem("lang") === "en"
                        ? "Home"
                        : "صفحتي"}
                    </b>
                  }
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
                      {sessionStorage.getItem("lang") === "en"
                        ? "Edit Your Profile"
                        : "تغير البينات"}
                    </b>
                  }
                />
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
                  <ViewList />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <b style={{ color: "#ffffff" }}>
                      {" "}
                      {sessionStorage.getItem("lang") === "en"
                        ? "View My Companies"
                        : "اظهر شركاتي"}
                    </b>
                  }
                />
              </ListItem>
              <ListItem
                button
                key={"View My Requests"}
                onClick={this.handleRequests}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <b style={{ color: "#ffffff" }}>
                      {sessionStorage.getItem("lang") === "en"
                        ? "View My Requests"
                        : "اظهر طلباتي"}
                    </b>
                  }
                />
              </ListItem>
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
                      {sessionStorage.getItem("lang") === "en"
                        ? "Create SSC Companies"
                        : "SSCسجل شركتي ال"}
                    </b>
                  }
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
                      {sessionStorage.getItem("lang") === "en"
                        ? "Create SPC Companies"
                        : "SPCسجل شركتي ال "}
                    </b>
                  }
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
                      {sessionStorage.getItem("lang") === "en"
                        ? "Create Other Companies"
                        : "سجل شركات اخرى"}
                    </b>
                  }
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

ClippedDrawerInvestor.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  drawerOpen: state.drawerState.drawerOpen
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClippedDrawerInvestor));