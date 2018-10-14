const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const cors = require('cors')
const bodyParser  =  require("body-parser");
const fs = require('fs')
app.use(cors())
app.use(compression())
app.use(express.static(path.join(__dirname, 'index.html')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/blockchain', (req, res) => {
  // fs.writeFile('blockchain.txt', 'Hello world!\n', () => {
    fs.readFile('blockchain.txt', 'utf-8', (err, data) => {
        res.setHeader('Content-Type', 'application/json')
        // res.send(JSON.stringify(data))
        res.send((data))
    })

  // })
  //

})

app.post('/blockchain', (req, res) => {

   console.log(req.body)
    fs.writeFile('blockchain.txt', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
    });

    res.sendStatus(200)
})


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

// const PORT = process.env.PORT ? process.env.PORT : 3010
const PORT = 3031
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`==> listening on http://localhost:${PORT}.`)
})
