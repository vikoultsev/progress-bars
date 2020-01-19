import React from 'react'
import block from 'bem-cn-lite'
import './ProgressBarItem.scss'

const b = block('ProgressBarItem')

function ProgressBarItem(props) {
  const { value, limit, isSelected, index } = props;
  const barWidth = (value / limit) * 100;
  const isOverloaded = (value / limit) > 1;

  return (
    <div data-testid='progress-bar-item' className={b({ overloaded: isOverloaded })}>
      <div className={b('container', { selected: isSelected })}>
        <div className={b('bar')} style={{ width: `${barWidth}%` }} />
        <div className={b('value')}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default ProgressBarItem
