import React from "react";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import FormDialogue from "../form/FormDialogue";
import CustomizedDialogDemo from "../form/CustomizedDialogDemo";
import CustomizedDialogFees from "../form/CustomizedDialogFees";

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleEdit = (props) => {
    
    if (props.a === true) return <FormDialogue id= {props.id} token= {props.token} data={props.data}  />;
  };
  handledialog = props => {
    
    return <CustomizedDialogDemo data={props.data}/>;
  };
  handledialogFees = props => {
   
    if(this.props.status==="AcceptedReviewer")
    return <CustomizedDialogFees data={props.data} id= {props.id} token= {props.token}/>;
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.handledialogFees(this.props)}
          {this.handledialog(this.props)}
          {this.handleEdit(this.props)}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
