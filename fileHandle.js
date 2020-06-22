const start = new Date().getTime();
const fs = require("fs");
const path = require("path");
const dcmjs = require("dcmjs");
const mainURL = "localhost:3000";
const studyID = "1.3.6.1.4.1.25403.194080962558504.3816.20200619082331.2";

const mainFolder = path.join(__dirname, studyID);
const allIn = fs.readdirSync(mainFolder);
const allSeries = allIn.filter((item) =>
  fs.lstatSync(path.join(mainFolder, item)).isDirectory()
);

const allStudy = {
  constructSeries: function () {
    const seriesSet = [];
    for (let i = 0; i < allSeries.length; i++) {
      const folder = allSeries[i];
      const self = this;
      seriesSet.push({
        SeriesInstanceUID: folder,
        instances: [],
      });
    }
    this.series = seriesSet;
    // allSeries.map((folder) => ({
    //   seriesName: folder,
    //   dicoms: fs
    //     .readdirSync(path.join(mainFolder, folder))
    //     .map((item) => path.join(mainFolder, folder, item))
    //     .map((dicomFile) => fs.readFileSync(dicomFile).buffer)
    //     .map((dicom) => dcmjs.data.DicomMessage.readFile(dicom))
    //     .map((dicomDict) => {
    //       const naturalizedMetadata = dcmjs.data.DicomMetaDictionary.naturalizeDataset(
    //         dicomDict.dict
    //       );
    //       return naturalizedMetadata;
    //     }),
    // }));
  },
  constructDicoms: function () {
    this.series.map((singleSeries, seriesIndex) => {
      fs.readdirSync(path.join(mainFolder, singleSeries["SeriesInstanceUID"]))
        .map((item) =>
          path.join(mainFolder, singleSeries["SeriesInstanceUID"], item)
        )
        .map((dicomFile) => fs.readFileSync(dicomFile).buffer)
        .map((dicom) => dcmjs.data.DicomMessage.readFile(dicom))
        .map((dicomDict, dicomIndex) => {
          const naturalizedMetadata = dcmjs.data.DicomMetaDictionary.naturalizeDataset(
            dicomDict.dict
          );

          this.StudyInstanceUID = naturalizedMetadata["StudyInstanceUID"];
          this.StudyDescription = naturalizedMetadata["StudyDescription"];
          this.StudyDate = naturalizedMetadata["StudyDate"];
          this.StudyTime = naturalizedMetadata["StudyTime"];
          this.PatientName = naturalizedMetadata["PatientName"];
          this.PatientId = naturalizedMetadata["PatientId"];

          this.series[seriesIndex]["SeriesDescription"] =
            naturalizedMetadata["SeriesDescription"];
          this.series[seriesIndex]["SeriesNumber"] =
            naturalizedMetadata["SeriesNumber"];
          this.series[seriesIndex]["SeriesDate"] =
            naturalizedMetadata["SeriesDate"];
          this.series[seriesIndex]["SeriesTime"] =
            naturalizedMetadata["SeriesTime"];
          this.series[seriesIndex]["Modality"] =
            naturalizedMetadata["Modality"];

          this.series[seriesIndex]["instances"][dicomIndex] = {};
          this.series[seriesIndex]["instances"][dicomIndex][
            "url"
          ] = `dicom://${mainURL}/${naturalizedMetadata["StudyInstanceUID"]}/${naturalizedMetadata["SeriesInstanceUID"]}/${naturalizedMetadata["SOPInstanceUID"]}`;
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"] = {};
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "Columns"
          ] = naturalizedMetadata["Columns"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "Rows"
          ] = naturalizedMetadata["Rows"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "InstanceNumber"
          ] = naturalizedMetadata["InstanceNumber"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "AcquisitionNumber"
          ] = naturalizedMetadata["AcquisitionNumber"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "PhotometricInterpretation"
          ] = naturalizedMetadata["PhotometricInterpretation"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "BitsAllocated"
          ] = naturalizedMetadata["BitsAllocated"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "BitsStored"
          ] = naturalizedMetadata["BitsStored"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "PixelRepresentation"
          ] = naturalizedMetadata["PixelRepresentation"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "SamplesPerPixel"
          ] = naturalizedMetadata["SamplesPerPixel"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "PixelSpacing"
          ] = naturalizedMetadata["PixelSpacing"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "HighBit"
          ] = naturalizedMetadata["HighBit"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "ImageOrientationPatient"
          ] = naturalizedMetadata["ImageOrientationPatient"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "ImagePositionPatient"
          ] = naturalizedMetadata["ImagePositionPatient"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "FrameOfReferenceUID"
          ] = naturalizedMetadata["FrameOfReferenceUID"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "ImageType"
          ] = naturalizedMetadata["ImageType"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "Modality"
          ] = naturalizedMetadata["Modality"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "SOPInstanceUID"
          ] = naturalizedMetadata["SOPInstanceUID"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "SeriesInstanceUID"
          ] = naturalizedMetadata["SeriesInstanceUID"];
          this.series[seriesIndex]["instances"][dicomIndex]["metadata"][
            "StudyInstanceUID"
          ] = naturalizedMetadata["StudyInstanceUID"];
          return naturalizedMetadata;
        });
    });
  },
};

allStudy.constructSeries();
allStudy.constructDicoms();

fs.writeFileSync(path.join(__dirname, "study.json"), JSON.stringify(allStudy));
console.log("PROCESSING TIME", new Date().getTime() - start);
// console.log(allStudy.series);

// {
//   "studies": [
//     {
//       "StudyInstanceUID": "1.2.840.113619.2.5.1762583153.215519.978957063.78",
//       "StudyDescription": "BRAIN SELLA",
//       "StudyDate": "20010108",
//       "StudyTime": "120022",
//       "PatientName": "MISTER^MR",
//       "PatientId": "832040",
//       "series": [
//         {
//           "SeriesDescription": "SAG T-1",
//           "SeriesInstanceUID": "1.2.840.113619.2.5.1762583153.215519.978957063.121",
//           "SeriesNumber": 2,
//           "SeriesDate": "20010108",
//           "SeriesTime": "120318",
//           "Modality": "MR",
//           "instances": [
//             {
//               "metadata": {
//                   "Columns": 512,
//                   "Rows": 512,
//                   "InstanceNumber": 3,
//                   "AcquisitionNumber": 0,
//                   "PhotometricInterpretation": "MONOCHROME2",
//                   "BitsAllocated": 16,
//                   "BitsStored": 16,
//                   "PixelRepresentation": 1,
//                   "SamplesPerPixel": 1,
//                   "PixelSpacing": [0.390625, 0.390625],
//                   "HighBit": 15,
//                   "ImageOrientationPatient": [0,1,0,0,0,-1],
//                   "ImagePositionPatient": [11.600000,-92.500000, 98.099998],
//                   "FrameOfReferenceUID": "1.2.840.113619.2.5.1762583153.223134.978956938.470",
//                   "ImageType": ["ORIGINAL","PRIMARY","OTHER"],
//                   "Modality": "MR",
//                   "SOPInstanceUID": "1.2.840.113619.2.5.1762583153.215519.978957063.124",
//                   "SeriesInstanceUID": "1.2.840.113619.2.5.1762583153.215519.978957063.121",
//                   "StudyInstanceUID": "1.2.840.113619.2.5.1762583153.215519.978957063.78"
//               },
//               "url": "dicomweb://s3.amazonaws.com/lury/MRStudy/1.2.840.113619.2.5.1762583153.215519.978957063.124.dcm"
//            }
//          ]
//        }
//      ]
//    }
//  ]
// }
