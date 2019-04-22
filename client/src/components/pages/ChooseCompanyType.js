import React from 'react'
import ComplexForRegulation from '../layout/Complex Button/ComplexForRegulation'
class  ChooseCompanyType extends React.Component  {
    constructor(props)
    {
        super(props)
        this.state = {
          
            regulationLaws:null,
         
        }

    }
  
    render(){
  return (
    <>
    <h1>Choose Company Type {this.props.match.params.law}</h1>

  
    
    </>
  )
  }
}


export default ChooseCompanyType