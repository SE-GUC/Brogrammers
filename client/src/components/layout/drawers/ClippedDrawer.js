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
import MailIcon from "@material-ui/icons/Mail";
import RegisterAdmin from "../../pages/RegisterAdmin";
import RegisterReviewer from "../../pages/RegisterReviewer";
import RegisterLawyer from "../../pages/RegisterLawyer";
import AdminCases from "../../pages/AdminCases";
import SimpleReactFileUpload from "../../layout/form/SimpleReactFileUpload";
import EditProfileAdmin from "../../pages/EditProfileAdmin";
import ViewLawyersByAdmin from "../../pages/ViewLawyersByAdmin";
import ViewReviewersByAdmin from "../../pages/ViewReviewersByAdmin";
import NavBar from "../../../components/layout/Navbar";
import ViewList from "@material-ui/icons/ViewList";
import CreateCompany from "@material-ui/icons/CreateNewFolder";
import EditProfile from "@material-ui/icons/BorderColor";
import Identity from "@material-ui/icons/Person";
import Home from "@material-ui/icons/Home";
import Upload from "@material-ui/icons/CloudUpload";
import Add from "@material-ui/icons/PersonAdd";

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
    width: 240
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "a"
    };
  }
  handleContent = state => {
    switch (this.state.clicked) {
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
  };

  handleViewLawyers = () => {
    this.setState({ clicked: "viewLawyers" });
  };
  handleViewReviewers = () => {
    this.setState({ clicked: "viewReviewers" });
  };
  handleLawyer = () => {
    this.setState({ clicked: "l" });
  };
  handleReviewer = () => {
    this.setState({ clicked: "r" });
  };
  handleAdmin = () => {
    this.setState({ clicked: "a" });
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
  };
  handleUpload = () => {
    this.setState({ clicked: "forms" });
  };
  handleProfile = () => {
    this.setState({ clicked: "profile" });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <NavBar />
          <div className={classes.toolbar} />
          <List>
            <ListItem button key={"Home"} onClick={this.handleHome}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en" ? "Home" : "صفحتي"
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Your Profile"
                    : "تغير البينات"
                }
              />
            </ListItem>
            <ListItem button key={"View All Cases"} onClick={this.handleCases}>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "View All Cases"
                    : "اظهار الشركات"
                }
              />
            </ListItem>
            <ListItem button key={"upload Form"} onClick={this.handleUpload}>
              <ListItemIcon>
                <Upload />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "Upload form"
                    : "نوع شركة جديد"
                }
              />
            </ListItem>
            <Divider/>
            <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Admin"
                    : "ادمون جديد"
                }
              />
            </ListItem>

            <ListItem button key={"Create Lawyer"} onClick={this.handleLawyer}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Lawyer"
                    : "محامي جديد"
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Create new Reviewer"
                    : "مراجع جديد"
                }
              />
            </ListItem>
<Divider/>
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
                  sessionStorage.getItem("lang") === "en"
                    ? "View Lawyers"
                    : "اظهار المحاميين"
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
                  sessionStorage.getItem("lang") === "en"
                    ? "View Reviewer"
                    : "اظهار المراجعين"
                }
              />
            </ListItem>
          </List>
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

export default withStyles(styles)(ClippedDrawer);
