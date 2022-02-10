const axios = require('axios');

const COUNTER_HOST = process.env.COUNTER_HOST || 'http://localhost:3001';

async function getBookViewsCount(id) {
    let count = 0;

    try {
        await axios.post(`${COUNTER_HOST}/counter/${id}/incr`);
        const {data} = await axios.get(`${COUNTER_HOST}/counter/${id}`)
        count = data.count;
    } catch(err) {
        console.error('Error while getting book views count', err);
    }

    return count
}

module.exports = {
    getBookViewsCount
}