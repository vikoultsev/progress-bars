import React from 'react'
import block from 'bem-cn-lite'

import './Button.scss'
const b = block('Button')

function Button(props) {
  const {
    children,
    type,
    onClick,
  } = props;

  return (
    <button data-testid='button-item' className={b()} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
