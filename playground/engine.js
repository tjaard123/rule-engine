const yaml = require("js-yaml");
const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.get("/rule/:ruleId", (req, res) => {
  var ruleId = req.params.ruleId;

  const doc = yaml.load(fs.readFileSync("./rules.yaml", "utf8"));
  var validationFnStr = doc.Fields[0].Validations[0].Validation;
  var validationFn = new Function("input", validationFnStr);

  console.log(validationFn("VALID123"));
  console.log(validationFn("INVALID123"));

	res.send(`<script>${validationFn}</script>`);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

// try {
//   const doc = yaml.load(fs.readFileSync("./rules.yaml", "utf8"));
//   var validationFnStr = doc.Fields[0].Validations[0].Validation;
//   var validationFn = new Function("input", validationFnStr);

//   console.log(validationFn("VALID123"));
//   console.log(validationFn("INVALID123"));
// } catch (e) {
//   console.log(e);
// }
