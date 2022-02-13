const {spawn} = require('child_process')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const message = req.headers.text;
    if(message != null) {
      // const python = spawn('python3', ['model.py', message]);
      // // collect data from script
      // python.stdout.on('data', function (data) {
      // classification = data.toString();
      // if(classification == "yes") {
      //   res.send("yes")
      // }
      // });
      res.send(message)  
    }  
   })

app.listen(port, () => console.log(`Model is listening on port ${port}!`))