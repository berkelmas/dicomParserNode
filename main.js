const path = require("path");
const fs = require("fs");
// const dcmjs = require("./dcmjs.org/javascripts/libs/dcmjs");
const { dirname } = require("path");
const dcmjs = require("dcmjs");
const dicomParser = require("dicom-parser");
// dcmjs.utils.initialize();

var dicomFileAsBuffer = fs.readFileSync(
  path.join(
    __dirname,
    "Ozer, Assiye",
    "1.2.840.113619.2.452.3.101357109.259.1590550659.417",
    "1.2.840.113619.2.452.3.101357109.259.1590550659.419.1.dcm"
  )
).buffer;

const dicomData = dcmjs.data.DicomMessage.readFile(dicomFileAsBuffer);
let dataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomData.dict);
console.log(dataset);
// var dataSet = dicomParser.parseDicom(dicomFileAsBuffer);
// console.log(dataSet);
// // print the patient's name
// var patientName = dataSet.string("x00100010");
// console.log("Patient Name = " + patientName);
// var studyInstanceUid = dataSet.string("x0020000d");
// console.log("Study Instance UID = " + studyInstanceUid);

// let DicomDict = dcmjs.data.DicomMessage.readFile(dicomFileAsBuffer);

// dcmjs.utils.execute("dcm2xml", [
//   "--verbose",
//   "--native-format",
//   path.join(
//     __dirname,
//     "Ozer, Asiye",
//     "1.2.840.113619.2.452.3.101357109.259.1590550659.417",
//     "1.2.840.113619.2.452.3.101357109.259.1590550659.419.1.dcm"
//   ),
//   path.join(
//     __dirname,
//     "Ozer, Assiye",
//     "1.2.840.113619.2.452.3.101357109.259.1590550659.410.xml"
//   ),
// ]);
