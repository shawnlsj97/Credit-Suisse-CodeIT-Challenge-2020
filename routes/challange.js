import { Router } from "express";
var router = Router();

router.post('/', function (req, res, next) {
    var input = req.body['input'];
    res.send(JSON.stringify(parseInt(input * parseInt(input))));
});

router.get('/test', (req, res) => {
    res.send(JSON.stringify("Hello World!"));
});

export default router;
