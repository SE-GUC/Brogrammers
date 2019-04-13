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
import EditProfileInvestor from '../../pages/EditProfileInvestor'
import InvestorRequests from '../../pages/InvestorRequests'
import ViewCompanies from '../../pages/ViewCompanies';
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

class ClippedDrawerInvestor extends React.Component{
  
constructor(props){
    super(props);
    this.state={
        clicked:"i"
    }
}


  handleHome = () => {
    document.location.href = "/";
  }

  handleCases2 = () => {
    this.setState({ clicked: "companies" })
  }
  
  handleCreate = () =>{
    this.setState({clicked : "create"})
  }
  
  handleProfile = () => {
    this.setState({ clicked: "profile" })

  }
  handleRequests = () => {
    this.setState({ clicked: "requests" })

  }
    render(){
        const {classes}=this.props;
        if(this.state.clicked=='i'){
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
                        <ListItem button key={"View My Requests"} onClick={this.handleRequests}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="View My Requests" />
                        </ListItem>
                        <ListItem button key={"Create Companies"} onClick={this.handleCreate}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Create Companies" />
                        </ListItem>
                  
                
              
                    </List>
                   
                    </Drawer>
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                            
                     
                
                  </main>
                </div>
            )}
        if(this.state.clicked=='requests'){
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
                        <ListItem button key={"View My Requests"} onClick={this.handleRequests}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="View My Requests" />
                        </ListItem>
                        <ListItem button key={"Create Companies"} onClick={this.handleCreate}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Create Companies" />
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
            )}
       
        if(this.state.clicked=='companies'){
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
                    <ListItem button key={"View My Requests"} onClick={this.handleRequests}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="View My Requests" />
                        </ListItem>
                    <ListItem button key={"Create Companies"} onClick={this.handleCreate}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Create Companies" />
                        </ListItem>
          
                  </List>
                  </Drawer>
                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ViewCompanies token={sessionStorage.getItem("jwtToken")} />

                   </main>
                </div>
            
            )}
           

                        if(this.state.clicked == "profile"){return(

                            
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
                                <ListItem button key={"View My Requests"} onClick={this.handleRequests}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="View My Requests" />
                        </ListItem>
                                <ListItem button key={"Create Companies"} onClick={this.handleCreate}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Create Companies" />
                        </ListItem>
                              </List>
                                </Drawer>
                                <main className={classes.content}>
                                  <div className={classes.toolbar} />
                            <EditProfileInvestor       token={sessionStorage.getItem("jwtToken")}/>
                              
                                </main>
                              </div>

                        )}

                        if(this.state.clicked == "create"){return(

                            
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
                                <ListItem button key={"View My Requests"} onClick={this.handleRequests}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="View My Requests" />
                        </ListItem>
                                <ListItem button key={"Create Companies"} onClick={this.handleCreate}>
                          <ListItemIcon><InboxIcon /></ListItemIcon>
                          <ListItemText primary="Create Companies" />
                        </ListItem>
                              </List>
                                </Drawer>
                                <main className={classes.content}>
                                  <div className={classes.toolbar} />
                         
                              
                                </main>
                              </div>

                        )}

                       
                
            }
    }
  



ClippedDrawerInvestor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawerInvestor);
