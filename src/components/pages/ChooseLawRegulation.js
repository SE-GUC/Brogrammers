import React from 'react'
import ComplexForRegulation from '../layout/Complex Button/ComplexForRegulation'
class  ChooseLawRegulation extends React.Component  {
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
    <h1>Choose Regulation Laws</h1>
    <ComplexForRegulation/>
    
    </>
  )
  }
}


export default ChooseLawRegulation