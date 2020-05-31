import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import BackDrop from '../../UI-elements/backdrop'

import './modal.css'

const ModalOverlay = ({ className = '', headerClass = '', contentClass = '', footerClass = '', style, headerTitle, onSubmitHandler, footerContent, children }) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{headerTitle}</h2>
      </header>
      <form onSubmit={onSubmitHandler || (e => e.preventDefault())}>
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footerContent}
        </footer>
      </form>
    </div>
  )

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => {
  return (
    <Fragment>
      {props.show && <BackDrop onClick={props.onCancel}/>}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={250}
        classNames="modal">
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func
}

export default Modal
