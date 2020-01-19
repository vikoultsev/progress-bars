import React, { useEffect, useState } from 'react';
import block from 'bem-cn-lite'
import * as BarAPI from '../../api/BarAPI';
import ProgressBarItem from '../ProgressBarItem'
import Button from '../Button'
import Select from '../Select'
import './App.scss'

const b = block('App')

function App() {
  const [buttons, setButtons] = useState([]);
  const [bars, setBars] = useState([]);
  const [limit, setLimit] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonItemWidth =  `${(1 / buttons.length) * 100}%`
  const selectOptions = bars.map((bar, index) => ({
    text: `Progress bar #${index + 1}`,
    value: index,
  }))

  useEffect(() => {
    BarAPI
      .getInitialData()
      .then(res => {
        setButtons(res.buttons);
        setBars(res.bars);
        setLimit(res.limit);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleBarValueUpdate = value => () =>{
    const newBars = [...bars];
    const newValue = newBars[currentIndex] + value
    newBars[currentIndex] = newValue >= 0 ? newBars[currentIndex] + value : 0;
    setBars(newBars);
  }

  const handleSelect = event => {
    const value = Number(event.target.value);
    setCurrentIndex(value);
  }

  const renderProgressBarItem = (value, index) =>
    <div key={index} className={b('barItem', { selected: index === currentIndex})}>
      <ProgressBarItem value={value} limit={limit} isSelected={index === currentIndex} />
    </div>

  const renderButton = value =>
    <div key={value} style={{ width: buttonItemWidth }} className={b('buttonItem')}>
      <Button type='button' onClick={handleBarValueUpdate(value)}>{value}</Button>
    </div>

  return (
    <main className={b()}>
      <h1 className={b('headline')}>Progress Bars</h1>
      <div className={b('limit')}>{`Limit: ${limit}`}</div>
      <div className={b('bars')}>
        {bars.map(renderProgressBarItem)}
      </div>
      <div className={b('tools')}>
        <div className={b('select')}>
          <Select options={selectOptions} value={currentIndex} onChange={handleSelect} />
        </div>
        <div className={b('buttons')}>
          {buttons.map(renderButton)}
        </div>
      </div>
    </main>
  )
}

export default App
