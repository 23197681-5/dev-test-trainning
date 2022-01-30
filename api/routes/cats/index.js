const { send } = require("express/lib/response");
const res = require("express/lib/response");
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


module.exports = catsRouter;