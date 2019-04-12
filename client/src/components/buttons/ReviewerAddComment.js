import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import NotRequired from '../layout/inputs/NotRequired'

class ReviewerAddComment extends Component{
    constructor(props){
      super(props)
      this.state = {
        company: {
          reviewerComment: null
        }
      }
}

addComment()
{
  let updatedData = this.state.company;
  this.clean(updatedData);
  fetch(`http://localhost:3000/api/reviewer/addcomment/${this.props.compid}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': this.props.token
    }
  }).then(response => {
    console.log(response)
     alert("Your comment has been added successfully !!")
     window.location.reload();
   }) 
}

render(){
    return(
        <div>

      <NotRequired
            name={"reviewerComment"}
            field={"reviewerComment"}
            type="text"
            callBack={this.onChange}
          />
            <Button variant='contained'
            color='primary' 
            size="medium" 
            onClick={this.addComment.bind(this)} >Add Comment</Button>
        </div>
    )
}


onChange (e) {
  let value = e.target.value
  let name = e.target.name
  this.setState(
    prevState => {
      return {
        company: {
          ...prevState.company,
          [name]: value
        }
      }
    },
    () => console.log(value)
  )
}


}
export default ReviewerAddComment