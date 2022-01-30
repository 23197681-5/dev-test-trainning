const catsRouter = require("express").Router();
const sequelize = require('./catsTable')

const Cat = require('./catsTable');
sequelize.sync().then(() => console.log('db is ready'));

catsRouter.post("/", async (req, res) => {
    try {
        var validationResult = validateCat(req.body);
        console.log("result", validationResult, validationResult.length)
        await Cat.create(req.body);

            res.send('cat is saved');
    } catch (error) {
        res.send({message: JSON.stringify(validationResult, error.message)});
// 
    }
});

catsRouter.get("/", async (req, res) => {
    const cats = await Cat.findAll();
    res.send(cats);
});

catsRouter.get("/:id", async (req, res) => {
    try {
        const sentId = req.params.id;
        const cat = await Cat.findOne({
            id: sentId
        })
        if (!cat) {
            res.send("Ops... Cat not found!")
        }
        res.send(cat);
    } catch (err) {
        res.send("Not found", err.message)
    }
})


catsRouter.put("/:id", async (req, res) => {
    const sentId = req.params.id;
    var cat = await Cat.findOne({
        id: sentId
    })
    cat.name = req.params.name;
    cat.purring = req.params.purring;
    cat.years - req.params.years;
    await cat.save();
    cat = await Cat.findOne({
        id: sentId
    })
    res.send("Updated", cat);
})

catsRouter.delete("/:id", async (req, res) => {
    try {
        const sentId = req.params.id;
        var cat = await Cat.findOne({
            id: sentId
        })
        if (cat) {
            Cat.destroy({
                id: sentId
            });
            res.send("removed")
        } else {
            res.send("That cat does not exists!")
        }
    } catch (e) {
        res.send({
            message: JSON.stringify(e)
        })
    }
})


function validateCat() {
    newLittleCat = this
    var requiredValueNull = false;
    const requiredFields = ["name", "age", "purring"];

   requiredFields.forEach(element => {
       console.log("validating if ", element,
        "with value of", newLittleCat[element], "is null" )
        if ([null, undefined, ""].includes(newLittleCat[element])) {
            console.log("error")
            throw new  Error (element, "is not filled");
        }
    });

    if (newLittleCat.name.lenght < 3) {
        console.log("error")
        throw new  Error ("Name", " is too Short!");
    }

    if (newLittleCat.name.lenght > 30) {
        console.log("error")
        throw new  Error("Name", " is too big!");
    }
    return "valid"
}

module.exports = catsRouter;