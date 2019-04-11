import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

class ReviewerApproveDisapprove extends Component{
constructor(props){
    super(props)
}


approveTask()
{
  fetch(`http://localhost:3000/api/reviewer/getTasks/approve/${this.props.compid}`, {
    method: "PUT",
   
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': this.props.token
    }
  }).then(response => {
   console.log(response)
    alert("Task Approved!!... Now the company is established!!")
    window.location.reload();
  })
 }

 disapproveTask()
 {
   fetch(`http://localhost:3000/api/reviewer/getTasks/disapprove/${this.props.compid}`, {
     method: "PUT",
    
     headers: {
       'Content-Type': 'application/json',
       'x-access-token': this.props.token
     }
   }).then(response => {
    console.log(response)
     alert("Task Disapproved!!....Please do not forget to write a comment")
     window.location.reload();
   })
  }



render(){
// console.log(this.props.compid)
//  console.log(this.props.token)
//onClick={this.claimTask.bind(this)}

    return(
        <div>
<Button variant='contained' color='primary' size="medium" onClick={this.approveTask.bind(this)} >Accept Company</Button>

<Button variant='contained' color='secondary' size="medium" onClick={this.disapproveTask.bind(this)}>Reject Company</Button>


        </div>
    )
    
}









}
export default ReviewerApproveDisapprove