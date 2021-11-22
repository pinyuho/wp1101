import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const { data: obj } = await instance.post('/start')
  return obj
}

const set = async (code) => {
    try {
        const { data: obj } = await instance.post('/set', { code } ) // JSON.stringify()
        return obj
    }
    catch (error) { return error.response.data }
}

const guess = async (code) => {
    try {
        const { data: obj } = await instance.get('/guess', { params: { code } })
        return obj 
    }
    catch (error) { return error.response.data }
}

const restart = async () => {
    const { data: obj } = await instance.post('/restart')
    return obj
}

export { startGame, guess, restart, set }
   



