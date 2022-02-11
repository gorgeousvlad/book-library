const axios = require('axios');

const COUNTER_HOST = process.env.COUNTER_HOST || 'http://localhost';
const COUNTER_PORT = process.env.COUNTER_PORT || '3001';
const url = `http://${COUNTER_HOST}:${COUNTER_PORT}`;

async function getBookViewsCount(id) {
    let count = 0;

    try {
        await axios.post(`${url}/counter/${id}/incr`, {});
        const {data} = await axios.get(`${url}/counter/${id}`)

        count = data.count;
    } catch(err) {
        console.error('Error while getting book views count', err);
    }

    return count
}

module.exports = {
    getBookViewsCount
}