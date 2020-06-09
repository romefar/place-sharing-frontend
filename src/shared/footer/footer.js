import React from 'react'

import './footer.css'

const Footer = () => {
  return (
    <footer className="footer footer_fixed">
      <div className="footer__container">
        <p>Powered by <a rel="noopener noreferrer" href="https://opencagedata.com/" target="_blank" >OpenCage</a></p>
        <p>&copy; 2020</p>
      </div>
    </footer>
  )
}

export default Footer
