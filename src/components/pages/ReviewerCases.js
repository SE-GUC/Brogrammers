
import React, { Component } from 'react';
import SimpleCard from '../cards/SimpleCard2'

class ReviewerCases extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reviewerCases:[]

    }
}

  
    componentDidMount(){
        
      {
        fetch('http://localhost:3000/api/reviewer/getall/cases',{
          headers: new Headers({
          // 'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkyZTlhM2I2M2Y1MTllYzZhN2EzNyIsImlhdCI6MTU1NDU5MTM4NiwiZXhwIjoxNTU0Njc3Nzg2fQ.yGPi0etbW68DNAJO7mjTFlmKIztxxV3rl7CD0036I7A'
        //if login is working and passing token correctly this will work 
              'x-access-token':this.props.token
        })
        })
    
        .then(res=> res.json())
        .then(json=>{
          this.setState({
            reviewerCases:json.data
          })
          
        })
     
    }
      
        }
 
    
        render(){
          console.log(this.state.reviewerCases)
           
           return(
              <div>
       
    
   <ul>
   {this.state.reviewerCases.map((item)=> (
       <SimpleCard  key={item._id} nameInEnglish={item.nameInEnglish} status={item.status}
       addressHQ= {item.addressHQ}
       Status= {item.status}
       addressHQ= {item.addressHQ}
       regulationLaw= {item.regulationLaw} 
   legalCompanyForm= {item.legalCompanyForm}
   nameInArabic= {item.nameInArabic}
    governerateHQ={item.governerateHQ}
   cityHQ= {item.cityHQ}
   
   telephoneHQ= {item.telephoneHQ}
   faxHQ= {item.faxHQ}
   capitalCurrency= {item.capitalCurrency}
   capital= {item.capital}
   investorName={item.investorName}
   investorSex={item.investorSex} 
   investorNationaty= {item.investorNationaty}
   investorIdentificationType= {item.investorIdentificationType}
   investorIdentificationNumber= {item.investorIdentificationNumber}
   investorBD= {item.investorBD}
   investorAddress= {item.investorAddress}
   investorTelephone= {item.investorTelephone}
   investorFax= {item.investorFax}
   investorEmail={item.investorEmail}
       
       />
       
     
   ))}
          </ul>
      
   
   </div>
         
           )
           }
    
    }
        


export default ReviewerCases;
