const express = require('express')
const cors = require('cors')
require('./db')

const app = express();
const port = process.env.PORT || 9000

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`connect at port no. ${port}`);
})