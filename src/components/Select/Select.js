import React from 'react'
import block from 'bem-cn-lite'
import './Select.scss'

const b = block('Select')

function Select(props) {
  const { options, value, onChange } = props;

  const renderOption = (option)=>
    <option key={option.text} data-testid='select-option' className={b('option')} value={option.value}>{option.text}</option>

  return (
    <select data-testid='select' className={b()} onChange={onChange} value={value}>
      {options.map(renderOption)}
    </select>
  )
}

export default Select
