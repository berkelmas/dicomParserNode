const fs = require("fs");
const dcmjs = require("dcmjs");
const path = require("path");

const jsonContent = JSON.parse(fs.readFileSync("./studyJson2.json"));
const mainInstanceJson = jsonContent.ClearCanvasStudyXml.Study.Series.BaseInstance.Instance[0][
  "Attribute"
]
  .map((item) => {
    return item["__text"]
      ? { [item["_Tag"]]: { vr: item["_VR"], Value: [item["__text"]] } }
      : null;
  })
  .filter((item) => item !== null);

const resultObj = {};
mainInstanceJson.map((item) => {
  Object.entries(item).map((el) => {
    resultObj[el[0]] = el[1];
  });
});
// console.log(resultObj);
let dataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(resultObj);
console.log(dataset);
// let dataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(
//   jsonContent.ClearCanvasStudyXml.Study
// );
// console.log(dataset);
