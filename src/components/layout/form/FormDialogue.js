import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import NotRequired from "../inputs/NotRequired";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class FormDialogue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      width: "100%",
      data: []
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleInput = props => {
    return Object.keys(props.data).map(key => [key, props.data[key]][0]);
  };
  handleInputs(e) {
    let value = e.target.value;
    let name = e.target.name;
   // console.log(this.state.investor)
    this.setState( prevState => {
       return { 
          investor : {
                   ...prevState.investor, [name]: value
                  }
       }
    }, () => console.log(this.state.investor)
    )
}
  render() {
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>Edit</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {" "}
          <Grid container direction="column" alignItems="center">
            <DialogTitle id="form-dialog-title">Form Resubmission</DialogTitle>
          </Grid>
          <DialogContent>
            <DialogContentText>
              This form has been commented on and rejected by the lawyer, please
              edit the required fields to proceed.
            </DialogContentText>

            {this.handleInput(this.props).map((input, i) => (
              <Grid container direction="column" alignItems="center">
                <NotRequired name="name" field={input} type="text" callBack={this.handleInputs} />
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FormDialogue);
