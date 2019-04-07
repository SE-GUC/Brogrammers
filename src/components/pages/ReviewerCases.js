
import React, { Component } from 'react';
import SimpleCard from '../cards/SimpleCard2'

class ReviewerCases extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reviewerCases:[]

    }
}

   fetchReviewerCases(){
        fetch('http://localhost:3000/api/reviewer/getall/cases',{
          headers: new Headers({
           'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkyZTlhM2I2M2Y1MTllYzZhN2EzNyIsImlhdCI6MTU1NDU5MTM4NiwiZXhwIjoxNTU0Njc3Nzg2fQ.yGPi0etbW68DNAJO7mjTFlmKIztxxV3rl7CD0036I7A'
       //hardcoding token for now till login is completed
        })
        })
    
        .then(res=> res.json())
        .then(json=>{
          this.setState({
            reviewerCases:json.data
          })
          
        })
     
    }
    componentDidMount(){
        
        this.fetchReviewerCases()
      
        }
 
    
    render(){
        console.log(this.state.reviewerCases)
       
        return(
           <div>
  

            
        <SimpleCard t2={this.state.reviewerCases}/>
   

</div>
      
        )
        }
    
    }
        


export default ReviewerCases;