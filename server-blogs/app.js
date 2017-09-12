/**
 * Created by Administrator on 2017/8/29.
 */
const express = require('express');
const app = express();
const router = require('./router/index');
app.use(router);

const port = process.env.port || 3001;

app.listen(port, () => {
    console.log(`server is run ${port}`);
});
module.exports = app;
