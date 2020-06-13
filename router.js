var express = require('express')
var router = express.Router()

const db = require('./src/database')
const { blogs, user, inventory, dailyLoginSource, userDailyLoginReward, question, answer, possible_answers } = db;

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
        response.json(res)
    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        })
    }

})

router.get('/users/:email', async (request, response) => {

    try {

        const { email } = request.params;

        const res = await user.findOne({
            where: {
                email
            },
            include: [{
                model: dailyLoginSource,
                through: {attributes: []},
                include: [inventory]
            }]
        })

        response.json(res)
        
    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        })
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

        const { email, itemName, quantity } = request.body;

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

        // here i am adding a INVENTORY ITEM and a Quantity to a User
        // so the join table will hold the quanity of the inventory item(Coins, Life, 2 types of Boosters) per user
        // since sequelize join table retains the uniqueness of the row, it kind of makes us a favour
        userExists[0].addInventory(inventoryItemExists[0], { through: { inventoryQuantity: quantity } })

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


router.get('/getUserInventory/:email', async (request, response) => {
    const { email } = request.params;

    try {
        const res = await user.findOne({
            where: { email },
            include: inventory
        })

        response.json({
            "message": "All OK",
            data: res.toJSON()
        })

    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        })
    }
})

router.post('/daily-login-source', async (request, response) => {

    try {

        const { dayCount, initialQuantity, inventoryId } = request.body
        console.log(request.body)

        const new_dls = await dailyLoginSource.create({
            dayCount,
            initialQuantity
        }); 
        
        const inv = await inventory.findOne({
            where: {
                "_ID": inventoryId
            }
        })
        
        new_dls.setInventory(inv);

        response.json({
            data: new_dls.toJSON()
        })

    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        })
    }
})


router.get('/daily-login-source', async (request, response) => {

    try {
        const res = await dailyLoginSource.findAll({
            include: inventory
        });
        response.json({
            data: res
        });
    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        });
    }

});

router.post('/login', async (request, response) => {

    try {
        const {email } = request.body;
    
        const existingUser = await user.findOne({ email });
        
        const rewards = await dailyLoginSource.findAll({});

        let today = new Date();

        rewards.forEach(async (reward) => {
            await existingUser.addDailyLoginSource(reward, { through: { rewardQuantity: reward.initialQuantity, loginDate: today++ } })
        });

        response.json({
            data: existingUser.toJSON()
        }); 

    } catch (error) {
        response.send({
            "message": `Something went wrong! ${error.message}`
        });
    }
});


router.post('/question', async (request, response) => {

    try {
        const { description, difficulty, answers } = request.body // perhaps tags can be added here too

        const questionObj = await question.create({
            description, difficulty,
            answers: [...answers]
        }, {
            include: answer
        })

        // const ans1 = await answer.create({
        //     ...answers[0]
        // })

        // const ans2 = await answer.create({
        //     ...answers[1]
        // })

        // const res = questionObj.addAnswers([ans1, ans2])
        // const res2 = questionObj.setCorrectAnswerId(ans1)

        

        response.json({
            data: questionObj.toJSON()
        }); 

    } catch (error) {
        console.log(error)
        response.send({
            "message": `Something went wrong! ${error.message}`
        });
    }
});

// {
//     include: [{
//         association: answer,
//         as: 'possible_answers'
//     }]
// }


module.exports = router;