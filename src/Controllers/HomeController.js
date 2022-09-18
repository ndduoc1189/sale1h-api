'use strict'
const HomeController ={
    get: (req, res) => {

        res.json({message: 'Server running!'})
    }
}
export default HomeController;