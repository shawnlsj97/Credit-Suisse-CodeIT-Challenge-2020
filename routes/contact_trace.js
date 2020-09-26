import { Router } from "express";
var router = Router();

function checkNonSilent(first, second) {
  var len = first.length;
  var count = 0;
  var i = 0;
  for (i = 0; i < len; i++) {
    if (first[i].charAt(0) == second[i].charAt(0)) {
      count++;
    }
  }
  if (count >= 2) {
    return true;
  } else {
    return false;
  }
}

router.post('/', function (req, res) {
    console.log(input);
    var infected = req.body['infected'];
    var origin = req.body['origin'];
    var cluster = req.body['cluster'];
    
    var result_arr = [];

    // when no mutations
    if (infected['genome'].localeCompare(origin['genome']) == 0) {
      for (var i in cluster) {
        result_arr.push(`${infected['name']} -> ${cluster[i]['name']}`);
      }
      result_arr.push(`${infected['name']} -> ${origin['name']}`);
    } else {
      var infected_genome = infected['genome'].split("-");
      var origin_genome = origin['genome'].split("-");
      var isNonSilent = checkNonSilent(infected_genome, origin_genome);
      if (isNonSilent) {
        for (var i in cluster) {
          result_arr.push(`${infected['name']}* -> ${cluster[i]['name']} -> ${origin['name']}`);
        }
      } else {
        for (var i in cluster) {
          result_arr.push(`${infected['name']} -> ${cluster[i]['name']} -> ${origin['name']}`);
        }
      }
    }

    let result = JSON.stringify(result_arr);
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
