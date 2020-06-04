var express = require('express')
var router = express.Router()

const db = require('./src/database')
const { blogs, user, inventory } = db;

router.get('/blog', (request, response) => {

    blogs.findAll({})
        .then(blogs => {
            response.json({
                "message": "All OK",
                data: [...blogs]
            })
        })    
})


router.post('/blog', (request, response) => {

    blogs.create({
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

router.post('/users', async (request, response) => {

    const { email, fullName } = request.body;

    try {
        const res = await user.create({
            email,
            fullName
        })
    
        if(res) {
            // create a new User Inventory for him

        }


        response.json(res)
    } catch (error) {
        response.json({})
    }

})
router.post('/inventory', async (request, response) => {

    const { title } = request.body;

    try {
        const res = await inventory.create({
            title
        })
        response.json({
            "message": "All OK",
            data: res.json()
        })
    } catch (error) {
        response.send({
                "message": `Something went wrong! ${error.message}`
        })
    }
})


router.post("/purchaseInventory", async (request, response) => {
    try {

        const { email, itemName, quantity} = request.body;

        const userExists = await user.findAll({
            where: {
                email
            }
        })

        console.log(userExists[0].toJSON())

        const inventoryItemExists = await inventory.findAll({
            where: {
                title: itemName
            }
        })

        console.log(inventoryItemExists[0].toJSON())

        userExists[0].addInventory(inventoryItemExists)



        response.json({
            "message": "All OK",
            user: userExists[0].toJSON(),
            inventory: inventoryItemExists[0].toJSON(),
        })




        
    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        })
    }
})

module.exports = router;