/**
 * Created by Administrator on 2017/9/6.
 */
const express = require('express');
const router = express.Router();
const Admin = require('../controller/admin/index');

router.get('/register', Admin.register);

module.exports = router;