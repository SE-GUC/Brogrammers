import React, { Component } from "react";
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
import InvestorCompanyRegSPC from "../../pages/InvestorCompanyRegSPC";
import InvestorCompanyRegSSC from "../../pages/InvestorCompanyRegSSC";
import Stepper from "../../steppers/stepper";
import { Paper } from "@material-ui/core";
import NavBar from "../Navbar";
import ViewList from "@material-ui/icons/ViewList";
import CreateCompany from "@material-ui/icons/CreateNewFolder";
import EditProfile from "@material-ui/icons/BorderColor";
import Identity from "@material-ui/icons/Person";
import Home from "@material-ui/icons/Home";
import Upload from "@material-ui/icons/CloudUpload";
import Note from "@material-ui/icons/NoteAdd";
import Add from "@material-ui/icons/PersonAdd";
import LinearDeterminate from "../loading/CustomizedProgress";
import zIndex from "@material-ui/core/styles/zIndex";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DRAWER_TOGGLE } from "../../../constants/actiontypes";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
    padding: theme.spacing.unit * 3
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
      default:
        return <Stepper />;
    }
  };
  handleHome = () => {
    document.location.href = "/";
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
                        : "سجل شركتي ال SSC"}
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
                        : "سجل شركتي ال SPC"}
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
                        : "سجل شركات اخرة"}
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
