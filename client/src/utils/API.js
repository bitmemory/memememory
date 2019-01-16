import axios from 'axios'

export default {
    getStrike: () => {
        return axios.post('/api/charge')
    },
    getConfirm: () => {
        return axios.get('/api/charge/authenticate')
    }
}