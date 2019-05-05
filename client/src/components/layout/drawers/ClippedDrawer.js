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
import NavBar from "../Navbar";
import ViewList from "@material-ui/icons/ViewList";
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
import CreateCompany from "@material-ui/icons/CreateNewFolder";
import RegisterAdmin from "../../pages/RegisterAdmin";
import RegisterReviewer from "../../pages/RegisterReviewer";
import RegisterLawyer from "../../pages/RegisterLawyer";
import AdminCases from "../../pages/AdminCases";
import SimpleReactFileUpload from "../../layout/form/SimpleReactFileUpload";
import EditProfile from "@material-ui/icons/BorderColor";
import EditProfileAdmin from "../../pages/EditProfileAdmin";
import ViewLawyersByAdmin from "../../pages/ViewLawyersByAdmin";
import ViewReviewersByAdmin from "../../pages/ViewReviewersByAdmin";
import Home2 from "../../pages/Home"
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

class ClippedDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "a",
      mobileOpen: false,
      drawerOpen: false
    };
  }
  handleLoading = () => {
    if (sessionStorage.getItem("loading")) return <LinearDeterminate />;
  };
  handleContent = state => {
    switch (state.clicked) {
      case "profile":
        return (
          <EditProfileAdmin
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "viewLawyers":
        return (
          <ViewLawyersByAdmin
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "viewReviewers":
        return (
          <ViewReviewersByAdmin
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "l":
        return (
          <RegisterLawyer
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "r":
        return (
          <RegisterReviewer
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "a":
        return (
          <RegisterAdmin
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "forms":
        return (
          <SimpleReactFileUpload
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      case "cases":
        return (
          <AdminCases
            id={sessionStorage.getItem("id")}
            token={sessionStorage.getItem("jwtToken")}
          />
        );
      default:
        return;
    }
  };
  handleHome = () => {
    document.location.href = "/";
    this.handleDrawerClose();
  };

  handleViewLawyers = () => {
    this.setState({ clicked: "viewLawyers" });
    this.handleDrawerClose();
  };
  handleViewReviewers = () => {
    this.setState({ clicked: "viewReviewers" });
    this.handleDrawerClose();
  };
  handleLawyer = () => {
    this.setState({ clicked: "l" });
    this.handleDrawerClose();
  };
  handleReviewer = () => {
    this.setState({ clicked: "r" });
    this.handleDrawerClose();
  };
  handleAdmin = () => {
    this.setState({ clicked: "a" });
    this.handleDrawerClose();
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
    this.handleDrawerClose();
  };
  handleUpload = () => {
    this.setState({ clicked: "forms" });
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
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Your Profile"
                    : "تغير البينات"
                }
                  </b>
                  }
              />
            </ListItem>
            <ListItem button key={"View All Cases"} onClick={this.handleCases}>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "View All Cases"
                    : "اظهار الشركات"
                }
                  </b>
                  }
              />
            </ListItem>
            <ListItem button key={"upload Form"} onClick={this.handleUpload}>
              <ListItemIcon>
                <Upload />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Upload form"
                    : "نوع شركة جديد"
                }
                  </b>
                  }
              />
            </ListItem>
            <Divider />
            <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Admin"
                    : "ادمون جديد"
                }
                  </b>
                  }
              />
            </ListItem>

            <ListItem button key={"Create Lawyer"} onClick={this.handleLawyer}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Lawyer"
                    : "محامي جديد"
                }
                  </b>
                  }
              />
            </ListItem>
            <ListItem
              button
              key={"Create Reviewer"}
              onClick={this.handleReviewer}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Reviewer"
                    : "مراجع جديد"
                }
                  </b>
                  }
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              key={"View Lawyers"}
              onClick={this.handleViewLawyers}
            >
              <ListItemIcon>
                <Identity />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "View Lawyers"
                    : "اظهار المحاميين"
                }
                  </b>
                  }
              />
            </ListItem>

            <ListItem
              button
              key={"View Lawyers"}
              onClick={this.handleViewReviewers}
            >
              <ListItemIcon>
                <Identity />
              </ListItemIcon>
              <ListItemText
                primary={
                    <b style={{ color: "#ffffff" }}>
                      {
                  sessionStorage.getItem("lang") === "en"
                    ? "View Reviewer"
                    : "اظهار المراجعين"
                }
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
ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  drawerOpen: state.drawerState.drawerOpen
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClippedDrawer));
