const axios = require('axios')

async function obterEmpresas() {
    const url = `https://orb-dev-1.herokuapp.com/business`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    obterEmpresas
}