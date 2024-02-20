const express = require('express');
const { port } = require('./config');
const usersRouter = require('./routes/users.route');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
