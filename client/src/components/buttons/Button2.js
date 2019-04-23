import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

class Button2 extends Component{
constructor(props){
    super(props)
}


claimTask()
{
  fetch(`http://localhost:3000/api/lawyer/assignFreeTask/${this.props.compid}`, {
    method: "PUT",
   
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': this.props.token
    }
  }).then(response => {
   console.log(response)
    alert(sessionStorage.getItem('lang')==='en'? 'Task claimed': 'استلام المهمه ')
    window.location.reload();
  })
 }


render(){
// console.log(this.props.compid)
//  console.log(this.props.token)


    return(
        <div>
<Button variant='contained' color='primary' size="medium" onClick={this.claimTask.bind(this)}>
 {sessionStorage.getItem('lang')==='en'? 'Claim task': 'استلام المهمه '},
</Button>


        </div>
    )
    
}









}
export default Button2