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
import ViewLawyersByAdmin from "../../pages/ViewLawyersByAdmin"
import ViewReviewersByAdmin from "../../pages/ViewReviewersByAdmin"
import NavBar from '../../../components/layout/Navbar'
import ViewList from '@material-ui/icons/ViewList'
import CreateCompany from '@material-ui/icons/CreateNewFolder'
import EditProfile from '@material-ui/icons/BorderColor'
import Identity from '@material-ui/icons/Person'
import Home from '@material-ui/icons/Home'
import Upload from '@material-ui/icons/CloudUpload'
import Add from '@material-ui/icons/PersonAdd'


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

  handleAdmin = () => {
    this.setState({ clicked: "a" });
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
  handleHome = () => {
    document.location.href = "/";
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
  };
  handleForms = () => {
    this.setState({ clicked: "forms" });
  };
  handleProfile = () => {
    this.setState({ clicked: "profile" });
  };
  render() {
    const { classes } = this.props;
    if (this.state.clicked == "a") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <RegisterAdmin token={sessionStorage.getItem("jwtToken")} />
          </main>
        </div>
      );
    }
    if (this.state.clicked == "l") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <RegisterLawyer
              callBack={this.callBack}
              token={sessionStorage.getItem("jwtToken")}
            />
          </main>
        </div>
      );
    }
    if (this.state.clicked == "r") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <RegisterReviewer token={sessionStorage.getItem("jwtToken")} />
          </main>
        </div>
      );
    }
    if (this.state.clicked == "cases") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <AdminCases token={sessionStorage.getItem("jwtToken")} />
          </main>
        </div>
      );
    }
    if (this.state.clicked == "forms") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <SimpleReactFileUpload />
          </main>
        </div>
      );
    }

    if (this.state.clicked == "profile") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <EditProfileAdmin token={sessionStorage.getItem("jwtToken")} />
          </main>
        </div>
      );
    }

    // ATEF
    if (this.state.clicked == "viewLawyers") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* my page goes in here */}
            <ViewLawyersByAdmin token={sessionStorage.getItem("jwtToken")} />
          </main>
        </div>
      );
    }
// hereh
  // ATEF
  if (this.state.clicked == "viewReviewers") {
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
           <NavBar/>
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                key={"Edit Your Profile"}
                onClick={this.handleProfile}
              >
                <ListItemIcon>
                  <EditProfile />
                </ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem
                button
                key={"View All Cases"}
                onClick={this.handleCases}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
              <ListItem button key={"Upload Form"} onClick={this.handleForms}>
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText primary="Upload Form" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button key={"Create Admin"} onClick={this.handleAdmin}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Admin" />
              </ListItem>
              <ListItem
                button
                key={"Create Reviewer"}
                onClick={this.handleReviewer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Reviewer" />
              </ListItem>
              <ListItem
                button
                key={"Create Lawyer"}
                onClick={this.handleLawyer}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create Lawyer" />
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
                <ListItemText primary="View Lawyers" />
              </ListItem>

              <ListItem
                button
                key={"View Reviewers"}
                onClick={this.handleViewReviewers}
              >
                <ListItemIcon>
                  <Identity />
                </ListItemIcon>
                <ListItemText primary="View Reviewers" />
              </ListItem>


            </List>
          </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* my page goes in here */}
          <ViewReviewersByAdmin token={sessionStorage.getItem("jwtToken")} />
        </main>
      </div>
    );
  }

  }
  
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
