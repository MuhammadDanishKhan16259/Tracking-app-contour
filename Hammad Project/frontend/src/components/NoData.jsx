import React from 'react'
import noDataImg from '../assets/no-data.png'

function NoData() {
  return (
    <div className='no-data'>
        
        <img className='img-fluid' src={noDataImg} alt="image" />
    </div>
  )
}

export default NoData