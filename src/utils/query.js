import axios from 'axios'

const api = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

const query = (method, url, data) => {

  switch(method) {
    case 'GET':
      return api.get(url)

    default:
      return api.post(url, {data})
  }

}

export default query

