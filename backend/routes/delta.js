const express = require('express');
const path = require('path');

const router = express.Router();

router.get(['/', '/areas*', '/projects*', '/library*', '/knowledge*', '/proj_id*', '/area_id*'], (req, res) => {
    console.log('aaa', __dirname);
    // console.log('aaa', path.join(__dirname, '../../.build/amsbiz-delta-ui/home', 'index.html'));
    res.sendFile(path.join(__dirname, '../../public', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
module.exports = router;
