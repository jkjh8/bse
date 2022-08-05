import axios from 'axios'

const api = axios.create({
  baseURL: process.env.DEV
    ? `http://${window.location.hostname}:3000/api`
    : `https://${window.location.hostname}/api`,
  withCredentials: true
})

export { api }
