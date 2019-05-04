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
      this.addComment = this.addComment.bind(this)
      this.onChange = this.onChange.bind(this)
}

addComment()
{
  let updatedData = this.state.company;
  this.clean(updatedData);
  fetch(`https://serverbrogrammers.herokuapp.com/api/reviewer/addcomment/${this.props.compid}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': this.props.token
    }
  }).then(response => {
    console.log(response)
     alert( sessionStorage.getItem('lang')==='en'? 'Your Comment has been added successfully !!': 'تم اضافه التعليق بنجاح'
    )
     window.location.reload();
   }) 
}
clean = obj => {
  for (var propName in obj) {
    if (obj[propName] === "" || obj[propName] === undefined || obj[propName] === null) {
      delete obj[propName];
    }
  }
};


render(){
    return(
        <div>

      <NotRequired
            name={"reviewerComment"}
            field={ sessionStorage.getItem('lang')==='en'? 'reviewerComment': 'تعليق المراجع'
          }
            type="text"
            callBack={this.onChange}
          />
            <Button variant='contained'
            color='primary' 
            size="medium" 
            onClick={this.addComment.bind(this)} >{ sessionStorage.getItem('lang')==='en'? 'Add Comment': 'اضافه التعليق'
          }</Button>
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