import React from 'react';

import meme from '../assets/404.png'

function ErrorPage() {
  return (
    <div className='text-center container-fluid error-page'>
        <img className='img-fluid'  src={meme} alt="404" />
        {/* <h1>Error 404</h1> */}
    </div>
  )
}

export default ErrorPage