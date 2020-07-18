const express = require('express')
const db = require('./database/db')


const app = express();


app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api/crud', require('./routes/crud'))

const PORT = 5000

db.initDb((err, db) => {
    if(err) console.log(err)
    else {
        app.listen(PORT, () => {
            console.log(`Now listen on PORT ${PORT}`)
        })
    }
})