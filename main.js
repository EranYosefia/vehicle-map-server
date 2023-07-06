const express = require('express');
const userRouter = require('./routers/vehiclesRouter');
var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.use('/api/vehicles', userRouter);

app.listen(8000);