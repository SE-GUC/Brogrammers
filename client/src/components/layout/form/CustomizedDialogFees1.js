import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from "@material-ui/core/DialogContentText"
import TakeMoney from "../../pages/TakeMoney"

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
    minWidth: 400
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class CustomizedDialogFees1 extends React.Component {
  constructor(props){
    super(props);
  this.state = {
      open: false,
      fees:0,
      curr:''
    };
  this.handleViewFees = this.handleViewFees.bind(this)
  }

  handleClickOpen = () => {
    this.handleViewFees()
    this.setState({
      open: true
    });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleViewFees=()=>{
    let x =0 ;
    fetch('http://localhost:3000/api/lawyer/'+this.props.id+'/viewFees',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token':this.props.token
        }
      }).then(response => {
        response.json().then(data =>{
          this.setState({
            fees:data.EstimatedFees,
            curr:data.Currency
          })
      }) 
    }) 
}

  render() {
    
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>View Fees</MenuItem>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
        <DialogTitle id="alert-dialog-title">{"Expected Fees:"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>
                {this.state.fees} {this.state.curr}
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TakeMoney />
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogFees1;
