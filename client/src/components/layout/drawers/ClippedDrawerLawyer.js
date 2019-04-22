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
import EditProfileLawyer from '../../pages/EditProfileLawyer'
import LawyerCases from '../../pages/LawyerCases';
import ViewLawyerCasesbyID from '../../pages/ViewLawyerCasesbyID'
import ViewLawyerEditableCases from '../../pages/ViewLawyerEditableCases'
import ChooseCompanyType from '../../pages/ChooseCompanyType'
import LawyerComment from '../../pages/LawyerComment'
import LawyerCompanyRegSSC from '../../pages/LawyerCompanyRegSSC'
import LawyerCompanyRegSPC from '../../pages/LawyerCompanyRegSPC'
import NavBar from '../../../components/layout/Navbar'
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

class ClippedDrawerLawyer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: "l"
    }
  }


  handleHome = () => {
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
  }
  render() {
    const { classes } = this.props;
    if (this.state.clicked == 'l') {
      return (
        <div className={classes.root}>
          <CssBaseline />
    
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >

          
            
            
            <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>
              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <LawyerCases token={sessionStorage.getItem("jwtToken")} />



          </main>
        </div>
      )
    }

    if (this.state.clicked == 'myCases') {
      return (
       
        <div className={classes.root}>
       
          <CssBaseline />
      
          {/* <NavBar> */}
      
       
         {/* </NavBar> */}
         
       
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
           
            <br/>
            <br/>
           <br/>
            
            <NavBar/>
           
            <div className={classes.toolbar}>
            
            <List>
              <ListItem button key={"Home"} onClick={this.handleHome}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key={"Edit Your Profile"} onClick={this.handleProfile}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Your Profile" />
              </ListItem>
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            
            <Divider />
            <List>
           
              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>
              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>

             
            </List>
          

          
            </div>
          
           
          
          </Drawer>
          
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <ViewLawyerCasesbyID token={sessionStorage.getItem("jwtToken")} id={sessionStorage.getItem("id")} />
          </main>
        </div>

      )
    }
    if (this.state.clicked == 'edit') {
      return (
        <div className={classes.root}>
          <CssBaseline />
        

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
             <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>
              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>


          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <ViewLawyerEditableCases
              id={sessionStorage.getItem("id")}

              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>

      )
    }


    if (this.state.clicked == "companyssc") {
      return (
        <div className={classes.root}>
          <CssBaseline />
         

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
             <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>
              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <LawyerCompanyRegSSC
              id={sessionStorage.getItem("id")}
              ssn={sessionStorage.getItem("ssn")}
              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>
      )
    }

    if (this.state.clicked == "companyspc") {
      return (
        <div className={classes.root}>
          <CssBaseline />
          

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
             <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>
              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <LawyerCompanyRegSPC
              id={sessionStorage.getItem("id")}
              ssn={sessionStorage.getItem("ssn")}
              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>
      )
    }

    if (this.state.clicked == "comment") {
      return (
        <div className={classes.root}>
          <CssBaseline />
       

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>

              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <LawyerComment

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
        

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>

              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <EditProfileLawyer

              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>
      )
    }
    if (this.state.clicked == "cases") {
      return (



        <div className={classes.root}>
          <CssBaseline />
       

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <NavBar/>
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
              <ListItem button key={"View All Cases"} onClick={this.handleCases}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View All Cases" />
              </ListItem>
            </List>
            <Divider />
            <List>

              <ListItem button key={"View My Cases"} onClick={this.handleCases2}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="View My Cases" />
              </ListItem>
              <ListItem button key={"Create SSC Company"} onClick={this.handleCompanySSC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SSC Company" />
              </ListItem>
              <ListItem button key={"Create SPC Company"} onClick={this.handleCompanySPC}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Create SPC Company" />
              </ListItem>
              <ListItem button key={"Edit Company"} onClick={this.handleEdit}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Edit Company" />
              </ListItem>

              <ListItem button key={"Write Comment"} onClick={this.handleComment}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Write Comment" />
              </ListItem>


            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <LawyerCases

              token={sessionStorage.getItem("jwtToken")}
            />

          </main>
        </div>
      )
    }


  }
}




ClippedDrawerLawyer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawerLawyer);
