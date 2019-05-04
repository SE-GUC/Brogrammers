import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Home from '@material-ui/icons/Home'
import EditProfile from '@material-ui/icons/BorderColor'
import MailIcon from '@material-ui/icons/Mail';
import EditProfileLawyer from '../../pages/EditProfileLawyer'
import LawyerCases from '../../pages/LawyerCases';
import ViewLawyerCasesbyID from '../../pages/ViewLawyerCasesbyID'
import ViewLawyerEditableCases from '../../pages/ViewLawyerEditableCases'
import LawyerComment from '../../pages/LawyerComment'
import LawyerCompanyRegSSC from '../../pages/LawyerCompanyRegSSC'
import LawyerCompanyRegSPC from '../../pages/LawyerCompanyRegSPC'
import NavBar from '../../../components/layout/Navbar'
import Note from '@material-ui/icons/NoteAdd'
import ViewList from '@material-ui/icons/ViewList'
import CreateCompany from '@material-ui/icons/CreateNewFolder';
import Stepper from "../../steppers/stepper";
import LinearDeterminate from "../loading/CustomizedProgress";
import ChooseCompanyType from "../../pages/ChooseCompanyType";
import Navbar from '../../../components/layout/Navbar';
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

class ClippedDrawerLawyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "i"
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
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
  };
  handleCases2 = () => {
    this.setState({ clicked: "companies" });
  };

  handleCreatessc = () => {
    this.setState({ clicked: "createssc" });
  };

  handleCreatespc = () => {
    this.setState({ clicked: "createspc" });
  };

  handleEdit = () => {
    this.setState({ clicked: "edit" });
  };

  handleCreated = () => {
    this.setState({ clicked: "created" });
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
        <Navbar />
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
              key={"View My Companies"}
              onClick={this.handleCases2}
            >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "View My Companies"
                    : "اظهر شركاتي"
                }
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
                  sessionStorage.getItem("lang") === "en"
                    ? "View All Cases"
                    : "اعرض كل الشركات"
                }
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Create SSC Companies"
                    : "سجل شركتي ال SSC"
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Create SPC Companies"
                    : "سجل شركتي ال SPC"
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Create Dynamic Companies"
                    : "سجل شركتي ال Dynamic"
                }
              />
            </ListItem>
            <Divider/>
          <List>
            
            
            <ListItem button key={"Edit Companies"} onClick={this.handleEdit}>
              <ListItemIcon>
                <EditProfile />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Companies "
                    : "تغير الشركات"
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
                    : "تغير البيانات"
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
ClippedDrawerLawyer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawerLawyer);
