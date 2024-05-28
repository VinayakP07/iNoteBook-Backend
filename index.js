const connectToMongo = require('./db.js');
connectToMongo();
const express = require('express');
const cors = require('cors')
const app = express();


app.use(cors())
const port = 5000;

app.use(express.json());

app.use('/auth', require('./Routes/auth.js'));
app.use('/notes', require('./Routes/note.js'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})