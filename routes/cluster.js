import { Router } from "express";
var answer = { "answer": 0 }
var router = Router();
var rows;
var cols;
var snapshot;

function startCluster(r, c) {
  if (r < 0 || c < 0 || r >= rows || c >= cols || snapshot[r][c] == '*' || snapshot[r][c] == '2') {
    return;
  }

  snapshot[r][c] = 2; // mark as 'checked'

  startCluster(r - 1, c); //down
  startCluster(r + 1, c); //up
  startCluster(r, c - 1); // left
  startCluster(r, c + 1); // right
  startCluster(r - 1, c - 1) // top left
  startCluster(r - 1, c + 1) // top right
  startCluster(r + 1, c - 1) // bottom left
  startCluster(r + 1, c + 1) // bottom right
}

router.post("/", function (req, res) {
  snapshot = req.body;
  var numClusters = 0;
  rows = snapshot.length;
  cols = snapshot[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (snapshot[r][c] == '1') {
        startCluster(r, c);
        numClusters++;
      }
    }
  }
  answer["answer"] = numClusters;
  res.send(answer);
});

export default router;
