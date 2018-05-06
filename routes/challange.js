import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/', function (req, res, next) {
    var input = req.body['input'];
    res.send(JSON.stringify(parseInt(input * parseInt(input))));
});

router.get('/test', (req, res) => {
    //res.send(JSON.stringify("Hello World!"));
    var testData = { input: 2 };
    axios.post("https://cis2018studentapp.herokuapp.com/challange", testData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log("Response " + JSON.stringify(response.data));
        res.json(response.data)
    });
});

export default router;
