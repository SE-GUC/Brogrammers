import React from 'react'
import { Slide } from 'react-slideshow-image'
import img1 from '../../components/Images/Pyramids.jpg'
import img2 from '../../components/Images/investorImage.jpg'
import img3 from '../../components/Images/lawyerImage.jpg'

const properties = {
  duration: 5000,
  transitionDuration: 300,
  infinite: true,
  arrows: true
}

const eachSlide = {
  marginTop: '15px',
  marginLeft: '21%',
  alignItems: 'center'
}

const slideShowBackground = {
  backgroundColor: '#eeeeee',
  paddingBottom: '10px',
  background: 'linear-gradient(to bottom, #000000, #DCDCDC)'
}

const Slideshow = () => {
  return (
    <div style={slideShowBackground}>
      <Slide>
        <div style={eachSlide}>
          <div>
            <span>
              <img src={img1} width={875} height={500} mode="fill" />
            </span>
          </div>
        </div>
        <div style={eachSlide}>
          <div>
            <span>
              <img src={img2} width={875} height={500} mode="cover" />
            </span>
          </div>
        </div>
        <div style={eachSlide}>
          <div>
            <span>
              <img src={img3} width={875} height={500} mode="cover" />
            </span>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default Slideshow
