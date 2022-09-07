'use strict'
const axios = require('axios').default 

module.exports = {
    get: (req, res) => {

        res.json({message: 'Server running!'})
    }
}