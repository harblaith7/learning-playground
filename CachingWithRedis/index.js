
const redis = require("redis");
const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios")




const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT)

const app = express();

function display(username, repos){
    return `<h1>${username} has ${repos} repositories</h1>`
}


async function getRepos(req, res, next) {
    const {username} = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    const repos = data.public_repos;

    client.setex(username, 3600, repos)
    
    res.send(display(username, repos))
}

function cache(req, res, next){
    const {username} = req.params;

    client.get(username, (err, data) => {
        if(err) throw err;
        if(data !== null){
            res.send(display(username, data))
        } else {
            next()
        }
    })
}

app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/repos/:username",cache, getRepos)
    


app.listen(PORT, (req, res) => {
    console.log("Now listening on PORT " + PORT)
})



