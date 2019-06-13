const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const list_path = path.join(__dirname, '../public', 'projList.json');

router.use(express.json());

router.get('/', (req, res) => {
    res.sendFile(list_path, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

router.post('/add', (req, res) => {
    const { body } = req;
    fs.readFile(list_path, (err, buf) => {
        if (err) throw err;
        const file = buf.toString();
        const file_json = JSON.parse(file);
        const file_new = Object.assign({}, file_json, {
            recent_proj: [...file_json.recent_proj, body],
        });
        fs.writeFile(list_path, JSON.stringify(file_new), (errr) => {
            if (errr) throw errr;
            res.send(JSON.stringify(body));
        });
    });
});

router.post('/remove', (req, res) => {
    const { body } = req;
    console.log(body);
    fs.readFile(list_path, (err, buf) => {
        if (err) throw err;
        const file = buf.toString();
        const file_json = JSON.parse(file);
        const new_proj_list = file_json.recent_proj.filter(el => el.id !== body.id);
        const file_new = Object.assign({}, file_json, {
            recent_proj: new_proj_list,
        });
        fs.writeFile(list_path, JSON.stringify(file_new), (errr) => {
            if (errr) throw errr;
            res.send(JSON.stringify(file_new));
        });
    });
});

router.post('/star', (req, res) => {
    const { body } = req;
    console.log(body);
    fs.readFile(list_path, (err, buf) => {
        if (err) throw err;
        const file = buf.toString();
        const file_json = JSON.parse(file);
        const new_proj_list = file_json.recent_proj.map(item => (
            body.id === item.id ?
                { ...item, starred: !item.starred } :
                item
        ));
        const file_new = Object.assign({}, file_json, {
            recent_proj: new_proj_list,
        });
        fs.writeFile(list_path, JSON.stringify(file_new), (errr) => {
            if (errr) throw errr;
            res.send(JSON.stringify(file_new));
        });
    });
});

module.exports = router;
