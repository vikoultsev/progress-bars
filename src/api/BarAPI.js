import axios from 'axios'

const apiURL = "http://pb-api.herokuapp.com/bars"
const headers = {
  'Accept': 'application/json'
}

export const getInitialData = () =>
  axios.get(apiURL, { headers })
    .then(res => res.data)

