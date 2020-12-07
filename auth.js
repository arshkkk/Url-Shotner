const User = require('./model/user')
const {v4: uuidv4} = require('uuid')


module.exports = (req, res, next) => {

    if (req.cookies._id) {
        req.user = {_id: req.cookies._id}

        //checking for new updations that we made to deny duplication increments of click from same user
        // if visitedUrls exists or not
        if (!req.cookies.visitedUrls)
            res.cookie('visitedUrls', JSON.stringify([]), {expires: new Date(253402300000000)})

        next()

    } else {
        res.cookie('_id', uuidv4(), {expires: new Date(253402300000000)})
        res.cookie('visitedUrls', JSON.stringify([]), {expires: new Date(253402300000000)})
        next()

    }

}