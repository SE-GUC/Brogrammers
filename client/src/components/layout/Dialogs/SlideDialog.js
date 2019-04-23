import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClose2 = e => {
    this.setState({ open: false });
    this.props.handleRegister(e);
  };


  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        {sessionStorage.getItem('lang') === 'en' ? 'Submit' : 'تسجيل'}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
          {sessionStorage.getItem('lang') === 'en' ? 'Submit your form?' : 'تسليم البيانات'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            {sessionStorage.getItem('lang') === 'en' ? 'Are you sure you want to proceed' : 'هل تريد المتابعة؟'}

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
            {sessionStorage.getItem('lang') === 'en' ? 'Disagree' : 'إلغاء'}
            </Button>
            <Button onClick={this.handleClose2} color="primary">
            {sessionStorage.getItem('lang') === 'en' ? 'Agree' : 'متابعه'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;