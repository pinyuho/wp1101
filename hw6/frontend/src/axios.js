import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
    try{
        const { data: obj } = await instance.post('/start')
        return obj
    }
    catch (error) { 
        if (!error.response){
            console.log(error)
            return { msg: `Error: Server not responding or not connected` }
        }
        return error.response.data 
    }
    // catch ((error) => {
    //     if (!error.response) {
    //         // network error
    //         return 
    //     } else {
    //         this.errorStatus = error.response.data.message;
    //     }
    // })
}

const set = async (code) => {
    try {
        const { data: obj } = await instance.post('/set', { code } ) // JSON.stringify()
        return obj
    }
    catch (error) { 
        if (!error.response){
            console.log(error)
            return { msg: `Error: Server not responding or not connected` }
        } else {
        return error.response.data 
        }
    }
}

const guess = async (code) => {
    try {
        const { data: obj } = await instance.get('/guess', { params: { code } })
        return obj 
    }
    catch (error) { 
        if (!error.response){
            console.log(error)
            return { msg: `Error: Server not responding or not connected` }
        } else {
            return error.response.data 
        }
    }
}

const restart = async () => {
    try {
        const { data: obj } = await instance.post('/restart')
        return obj
    } 
    catch (error) { 
        if (!error.response){
            console.log(error)
            return { msg: `Error: Server not responding or not connected` }
        }
        return error.response.data 
    }
    
}

export { startGame, guess, restart, set }
   



