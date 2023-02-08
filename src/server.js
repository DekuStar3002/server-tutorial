const express = require('express');
const { todoRouter } = require('./routes/index');
const app = express();
app.use(express.json());
app.use('/api', todoRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});