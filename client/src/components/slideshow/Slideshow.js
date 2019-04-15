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
  margin: '40px'
}

const center = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const Slideshow = () => {
  return (
    <Slide>
      <div style={eachSlide}>
        <div>
          <span>
            <img src={img1} width={875} height={500} class="center" />
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
  )
}

export default Slideshow
