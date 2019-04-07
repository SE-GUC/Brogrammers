
import React, { Component } from 'react';
import SimpleCard from '../cards/SimpleCard'

class LawyerCases extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lawyerCases:[]

    }
}

   fetchLawyerCases(){
        fetch('http://localhost:3000/api/lawyer/getall/cases',{
          headers: new Headers({
           'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYThkZTE1ZWJjZDYwMWE2MDBhNzk3MSIsImlhdCI6MTU1NDU3MDc3OSwiZXhwIjoxNTU0NjU3MTc5fQ.3NumY5TJkdIDbtAGl1jcdZnVPdq2Saqh4QKBgvkNhF8'
        //hardcoding token for now till login is completed 
        })
        })
    
        .then(res=> res.json())
        .then(json=>{
          this.setState({
            lawyerCases:json.data
          })
          
        })
     
    }
    componentDidMount(){
      
        this.fetchLawyerCases()
       
        }
   

    
    render(){
        console.log(this.state.lawyerCases)
       
        return(
           <div>
    =


        <SimpleCard t={this.state.lawyerCases} />
   

</div>
      
        )
        }
    
    }
        


export default LawyerCases;