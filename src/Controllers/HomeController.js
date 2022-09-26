'use strict'
const HomeController ={
    get: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({message: 'Server running!'})
    }
}
export default HomeController;