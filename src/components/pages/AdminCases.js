
import React, { Component } from 'react';
import SimpleCard from '../cards/SimpleCard3'

class AdminCases extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            adminCases:[]

    }
}

   fetchAdminCases(){
        fetch('http://localhost:3000/routes/api/admins/getall/cases',{
          headers: new Headers({
           'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTk0MDYwM2I2M2Y1MTllYzZhN2EzOCIsImlhdCI6MTU1NDU5NTkzNiwiZXhwIjoxNTU0NjgyMzM2fQ.eKcFvWF1evQ_qpApNA9Qwlag9WCa00E7brE2dWI5Q40'
        //hardcoding token for now till login is completed 
        })
        })
    
        .then(res=> res.json())
        .then(json=>{
          this.setState({
            adminCases:json.data
          })
          
        })
     
    }
    componentDidMount(){
      
        this.fetchAdminCases()
       
        }
   

    
    render(){
        console.log(this.state.adminCases)
       
        return(
           <div>
    =


        <SimpleCard t3={this.state.adminCases} />
   

</div>
      
        )
        }
    
    }
        


export default AdminCases;