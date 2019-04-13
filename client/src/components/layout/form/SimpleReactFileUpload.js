import React from "react";
import Button from "@material-ui/core/Button";

import axios from 'axios';

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploaded:false,
      submitted:false

    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };
  onClickHandler = () => {
    const data = new FormData()
    data.append('myFile', this.state.selectedFile)
    axios.post("http://localhost:3000/routes/api/admins/uploadfile", data, { 
       // receive two    parameter endpoint url ,form data
   }).then(res => { // then print response status
    console.log(res.statusText)
    this.setState({uploaded:true})
 })
}
onSubmitHandler=()=>{
  const data = new FormData()
  data.append('myFile', this.state.selectedFile)
  axios.post("http://localhost:3000/routes/api/admins/submit-form", data, { 
     // receive two    parameter endpoint url ,form data
 }).then(res => { // then print response status
  console.log(res.statusText)
  this.setState({submitted:true})
})
}
handleDisplay=(state)=>{
return state.uploaded&&!state.submitted?  <Button onClick={this.onSubmitHandler}>Submit</Button> : console.log("s")
}
  render() {
    return (
      <>
        <input type="file" name="myfile" onChange={this.onChangeHandler} />
        <Button
          onClick={this.onClickHandler} 
        >
          Upload
        </Button>
        {this.handleDisplay(this.state)}
      </>
    );
  }
}

export default SimpleReactFileUpload;
