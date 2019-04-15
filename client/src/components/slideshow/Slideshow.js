import React from 'react'
import { Slide } from 'react-slideshow-image'
import img1 from '../../components/Images/Pyramids.jpg'
import img2 from '../../components/Images/investorImage.jpg'
import img3 from '../../components/Images/lawyerImage.jpg'

const slideImages = [
  '../../components/Images/Pyramids.jpg',
  './components/Images/investorImage.jpg',
  './components/Images/lawyerImage.jpg'
]

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const eachSlide = {
  margin: '40px',
  width: '1080',
  height: '720'
}

const Slideshow = () => {
  return (
    <Slide>
      <div style={eachSlide}>
        <div>
          <span>
            <img src={img1} width={500} height={500} mode="fit" />
          </span>
        </div>
      </div>
      <div style={eachSlide}>
        <div>
          <span>
            <img src={img2} width={500} height={500} mode="fit" />
          </span>
        </div>
      </div>
      <div style={eachSlide}>
        <div>
          <span>
            <img src={img3} width={500} height={500} mode="fit" />
          </span>
        </div>
      </div>
    </Slide>
  )
}

export default Slideshow
