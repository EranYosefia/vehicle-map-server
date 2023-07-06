const express = require('express');
const userRouter = require('./routers/vehiclesRouter');
var cors = require('cors')

const app = express();

const port = process.env.PORT || 8000

app.use(cors())

app.use(express.json());

app.use('/api/vehicles', userRouter);

app.listen(port, () =>{
    console.log(`Started on port ${port}`)
});