import React from 'react'
import ComplexForRegulation from '../layout/Complex Button/ComplexForRegulation'
class ChooseLawRegulation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      regulationLaws: null

    }
  }
  handleLaws (law) {
    this.setState({ regulationLaws: law })
  }

  render () {
    return (
    <>
      <h1>{sessionStorage.getItem('lang') === 'en' ? 'Choose Regulation Laws' : 'اختار القانون المنظم'}</h1>
      <ComplexForRegulation />

    </>
    )
  }
}

export default ChooseLawRegulation
