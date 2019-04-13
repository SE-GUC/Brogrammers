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
import InvestorCompanyRegSPC from '../../pages/InvestorCompanyRegSPC'
import InvestorCompanyRegSSC from '../../pages/InvestorCompanyRegSSC'
import EditProfileInvestor from '../../pages/EditProfileInvestor'
import InvestorRequests from "../../pages/InvestorRequests";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawerInvestor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: "i"
    }
  }


  handleHome = () => {
    document.location.href = "/";
  }

  handleCases2 = () => {
    this.setState({ clicked: "companies" })
  }

  handleCompanySSC = () => {
    this.setState({ clicked: "createssc" })
  }
  handleCompanySPC = () => {
    this.setState({ clicked: "createspc" })
  }

  handleProfile = () => {
    this.setState({ clicked: "profile" })

  }
  render() {
    const { classes } = this.props;
    if (this.state.clicked == 'i') {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Investor profile
                      </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>

            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Companies"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Companies" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>



            </List>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />



          </main>
        </div>
      )
    }

    if (this.state.clicked == 'companies') {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Investor profile
                  </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>

            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Companies"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Companies" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>

            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <InvestorRequests
              id={sessionStorage.getItem("id")}
              token={sessionStorage.getItem("jwtToken")}
            />
          </main>
        </div>

      )
    }


    if (this.state.clicked == "profile") {
      return (


        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Investor profile
                              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>

            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Companies"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Companies" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <EditProfileInvestor token={sessionStorage.getItem("jwtToken")} />

          </main>
        </div>

      )
    }

    if (this.state.clicked == "createssc") {
      return (


        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Investor profile
                              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>

            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Companies"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Companies" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <InvestorCompanyRegSSC
              id={sessionStorage.getItem("id")}
              ssn={sessionStorage.getItem("ssn")}
              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>

      )
    }

    if (this.state.clicked == "createspc") {
      return (


        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Investor profile
                              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />

            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>

            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Companies"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Companies" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <InvestorCompanyRegSPC
              id={sessionStorage.getItem("id")}
              ssn={sessionStorage.getItem("ssn")}
              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>

      )
    }


  }
}




ClippedDrawerInvestor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawerInvestor);
