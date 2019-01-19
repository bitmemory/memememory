import axios from 'axios'

export default {
    getStrike: () => {
        return axios.post('/api/charge')
    },
    getConfirm: (id) => {
        return axios.post('/api/charge/' + id)
    }
}