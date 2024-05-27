import axios from "axios"

const BASE_URL = 'https://rentify-app-wr4l.onrender.com'

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

