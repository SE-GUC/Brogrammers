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
import MailIcon from '@material-ui/icons/Mail';
import ReviewerCases from '../../pages/ReviewerCases'
import ViewReviewerCasesbyID from '../../pages/ViewReviewerCasesbyID'
import EditProfileReviewer from '../../pages/EditProfileReviewer'
import ReviewerComment from '../../pages/ReviewerComment'
import InvestorCompanyRegSPC from '../../pages/InvestorCompanyRegSPC'
import Home from '@material-ui/icons/Home'
import EditProfile from '@material-ui/icons/BorderColor'
import ViewList from '@material-ui/icons/ViewList'
import LinearDeterminate from '../loading/LinearDeterminate';
import Navbar from '../Navbar';

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

class ClippedDrawerReviewer  extends React.Component {
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
      case "comment":
        return <ReviewerComment/>;;
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
  };
  handleCases = () => {
    this.setState({ clicked: "cases" });
  };
  handleCases2 = () => {
    this.setState({ clicked: "myCases" });
  };

  handleComment = () => {
    this.setState({ clicked: "comment" });
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
                  sessionStorage.getItem("lang") === "en"
                    ? "Edit Your Profile"
                    : "تغير البيانات"
                }
              />
            </ListItem>
            <ListItem
              button
              key={"Comment on my companies"}
              onClick={this.handleComment}
            >
              <ListItemIcon>
                <EditProfile />
              </ListItemIcon>
              <ListItemText
                primary={
                  sessionStorage.getItem("lang") === "en"
                    ? "Comment on Company"
                    : " علق علي شركاتي"
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

ClippedDrawerReviewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawerReviewer);
