import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var input = req.body['input'];
    let result = JSON.stringify(parseInt(input) * parseInt(input));
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
