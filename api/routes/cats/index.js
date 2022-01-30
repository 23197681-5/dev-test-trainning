const catsRouter = require("express").Router();
const sequelize = require('./catsTable')

const Cat = require('./catsTable');
sequelize.sync().then(() => console.log('db is ready'));

catsRouter.post("/", (req, res)=>{
    Cat.create(req.body).then(()=>{
        res.send('cat is saved');
    })
});

catsRouter.get("/", async (req, res)=>{
    const cats = await Cat.findAll();
    res.send(cats);
});

catsRouter.get("/:id", async( req, res)=>{
    const sentId = req.params.id;
    const cat = await Cat.findOne({id: sentId})
    res.send(cat);
})


catsRouter.put("/:id", async( req, res)=>{
    const sentId = req.params.id;
    var cat = await Cat.findOne({id: sentId})
    cat.name = req.params.name;
    cat.purring = req.params.purring;
    cat.years - req.params.years;
    await cat.save();
    cat = await Cat.findOne({id: sentId})
    res.send("Updated", cat);
})

catsRouter.delete("/:id", async(req, res)=>{
    const sentId = req.params.id;
    Cat.destroy({id: sentId});
    res.send("removed")

})
module.exports = catsRouter;