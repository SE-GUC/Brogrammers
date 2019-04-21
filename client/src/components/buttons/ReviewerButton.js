import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

class ReviewerButton extends Component{
constructor(props){
    super(props)
}


claimTask()
{
  fetch(`http://localhost:3000/api/reviewer/assignFreeTask/${this.props.compid}`, {
    method: "PUT",
   
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': this.props.token
    }
  }).then(response => {
   console.log(response)
    alert("Task Claimed!!!")
    window.location.reload();
  })
 }

 

render(){



    return(
        <div>
<Button variant='contained' color='primary' size="medium" onClick={this.claimTask.bind(this)}>Claim Task</Button>


        </div>
    )
    
}









}
export default ReviewerButton