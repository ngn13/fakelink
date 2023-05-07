const express = require("express")
const createDomPurify = require("dompurify")
const { JSDOM } = require("jsdom")
const dp = createDomPurify(new JSDOM().window)
const app = express()

app.set("view engine", "ejs")
app.use("/", express.static("static"))

app.get("/lol", (req,res)=>{
    // i didnt do a for loop of mapping 
    // cause im lazy (yeah)
    let url = req.query.url
    let title = req.query.title
    let redirect = req.query.redirect
    let etitle = req.query.etitle
    let edesc = req.query.edesc
    let eimg = req.query.eimg
    let ecolor = req.query.ecolor

    if(
        url === undefined ||
        title === undefined ||
        redirect === undefined ||
        etitle === undefined ||
        edesc === undefined ||
        eimg === undefined ||
        ecolor === undefined
    )
        return res.redirect("/")

    let embed = {
        "title": dp.sanitize(etitle),
        "desc": dp.sanitize(edesc),
        "img": dp.sanitize(eimg),
        "color": dp.sanitize(ecolor)
    }
    url = dp.sanitize(url)
    title = dp.sanitize(title)
    redirect = dp.sanitize(redirect)
    res.render("../templates/lol.ejs", {url, title, redirect, embed})
})

app.get("*", (req,res)=>{
    res.redirect("/")
})

app.listen(3001, ()=>{
    console.log("Listening on port 3001...")
})