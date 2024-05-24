const express = require("express");

const URL = require("./models/url");

const app = express();
const {connectMongoDB} = require("./connection");
const urlRoute = require("./routes/url");

const port = 3000;

connectMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("mongo connected"))
;

app.use(express.json());

app.use("/url",urlRoute);

app.get("/:shortId",async(req,res)=>{
    const shortId= req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push : {
            visitHistory :  {
                timestamp : Date.now(),
            },
        },
    }

    );
    res.redirect(entry.redirectURL);
});

app.listen(port, ()=> console.log('server started at 3000'));

