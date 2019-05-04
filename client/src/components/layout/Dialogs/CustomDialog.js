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
import Grid from "@material-ui/core/Grid";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
    backgroundColor: '#3f51b5'
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
    padding: theme.spacing.unit * 2,
    width: 400
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInput = props => {
    return Object.keys(props.company).map(key => [key, props.company[key]][0]);
  };
  handleInputVal = props => {
    return Object.keys(props.company).map(key => [key, props.company[key]][1]);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          {sessionStorage.getItem('lang') === 'en' ? 'View Details' : 'اظهار البيانات'}
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.company.nameInEnglish}
          </DialogTitle>
          <DialogContent>
            {this.handleInput(this.props).map((input, i) =>
              (input !== "managers" && input !== '_id') ? (
                <Grid
                  key={i}
                  style={{ marginTop: 12 }}
                  container
                  direction="column"
                  alignItems="left"
                >
                  <h3>- {input}:</h3> {this.handleInputVal(this.props)[i]}
                  <br />
                </Grid>
              ) : (
                console.log
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
            {sessionStorage.getItem('lang') === 'en' ? 'Close' : ' اغلاق'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogDemo;
