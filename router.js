var express = require('express')
var router = express.Router()

const db = require('./src/database')
const blogModel = db.blogs

router.get('/blog', (request, response) => {

    blogModel.findAll({})
        .then(blogs => {
            response.json({
                "message": "All OK",
                data: [...blogs]
            })
        })

    
})


router.post('/blog', (request, response) => {

    blogModel.create({
        "title": "How to use sequlize with serverless in nodejs",
        "description": "dslikfhsfi9wep9rhidf;idfshiodfhiowehiwefnwefsdfhklshksdfhkhsfwehwehrskdfknsdf",
        "published": 1
    })
        .then(something => {
            response.json({
                "message": "All OK",
                data: something
            })
        })
        .catch(err => {
            response.send({
                "message": "Something went wrong!"
            })
        })

    
})

module.exports = router;