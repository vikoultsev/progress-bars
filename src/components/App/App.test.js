import React from 'react'
import axios from "axios"
import MockAxios from "axios-mock-adapter"
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import App from './App'

const mockAPI = new MockAxios(axios, { delayResponse: Math.random() * 50 });
afterEach(() => {
  mockAPI.reset();
  cleanup();
});

test('renders without crashing', async () => {
  mockAPI.onGet().reply(200, {"buttons":[35,12,-6,-27],"bars":[56,49,52,14],"limit":220})
  const { getByText, getAllByTestId, getByTestId } = render(<App />);
  await waitForElement(() => getByText('35'));
  const bars = getAllByTestId('progress-bar-item');
  const buttons = getAllByTestId('button-item');
  const select = getByTestId('select');
  const options = getAllByTestId('select-option');

  expect(bars.length).toBe(4);
  expect(buttons.length).toBe(4);
  expect(select).toBeTruthy();
  expect(options.length).toBe(4);
})

test('clicks on buttons should change selected bar value', async () => {
  mockAPI.onGet().reply(200, {"buttons":[35,12,-6,-27],"bars":[56,49,52,14],"limit":220})
  const { getByText, getAllByTestId } = render(<App />);
  await waitForElement(() => getByText('35'));
  const bars = getAllByTestId('progress-bar-item');
  const buttons = getAllByTestId('button-item');

  expect(bars[0].textContent).toBe('56');
  expect(bars[1].textContent).toBe('49');
  expect(bars[2].textContent).toBe('52');
  expect(bars[3].textContent).toBe('14');

  fireEvent.click(buttons[0]);
  expect(bars[0].textContent).toBe('91');

  fireEvent.click(buttons[1]);
  expect(bars[0].textContent).toBe('103');

  fireEvent.click(buttons[2]);
  expect(bars[0].textContent).toBe('97');

  fireEvent.click(buttons[3]);
  expect(bars[0].textContent).toBe('70');

  fireEvent.click(buttons[3]);
  fireEvent.click(buttons[3]);
  fireEvent.click(buttons[3]);
  expect(bars[0].textContent).toBe('0');

  fireEvent.click(buttons[3]);
  expect(bars[0].textContent).toBe('0');
  expect(bars[1].textContent).toBe('49');
  expect(bars[2].textContent).toBe('52');
  expect(bars[3].textContent).toBe('14');
})

test('select dropdown should change selected bar', async () => {
  mockAPI.onGet().reply(200, {"buttons":[35,12,-6,-27],"bars":[56,49,52,14],"limit":220})
  const { getByText, getAllByTestId, getByTestId } = render(<App />);
  await waitForElement(() => getByText('35'));
  const bars = getAllByTestId('progress-bar-item');
  const buttons = getAllByTestId('button-item');
  const select = getByTestId('select');

  fireEvent.change(select, {
    target: {
      value: '2',
    }
  });

  expect(bars[0].textContent).toBe('56');
  expect(bars[1].textContent).toBe('49');
  expect(bars[2].textContent).toBe('52');
  expect(bars[3].textContent).toBe('14');

  fireEvent.click(buttons[0]);
  expect(bars[0].textContent).toBe('56');
  expect(bars[1].textContent).toBe('49');
  expect(bars[2].textContent).toBe('87');
  expect(bars[3].textContent).toBe('14');

  fireEvent.click(buttons[3]);
  expect(bars[2].textContent).toBe('60');
})



