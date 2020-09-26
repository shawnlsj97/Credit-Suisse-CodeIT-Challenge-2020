import { Router } from "express";
var router = Router();
var result = { 'order': 0 }

for (let i = 0; i < 31; i++) {
    router.post("/", function (req, res) {
    var input = req.body;
    result["order"] = input["order"];
    res.send(result);
    });
}

export default router;
