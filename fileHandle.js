const start = new Date().getTime();
const fs = require("fs");
const path = require("path");
const dcmjs = require("dcmjs");
const mainURL = "http://localhost:3000";
const studyID = "1.3.6.1.4.1.25403.194080962558504.3816.20200619082331.2";

const mainFolder = path.join(__dirname, studyID);
const allIn = fs.readdirSync(mainFolder);
const allSeries = allIn.filter((item) =>
  fs.lstatSync(path.join(mainFolder, item)).isDirectory()
);

const allStudy = {
  studyID,
  series: allSeries.map((folder) => ({
    seriesName: folder,
    dicoms: fs
      .readdirSync(path.join(mainFolder, folder))
      .map((item) => path.join(mainFolder, folder, item))
      .map((dicomFile) => fs.readFileSync(dicomFile).buffer)
      .map((dicom) => dcmjs.data.DicomMessage.readFile(dicom))
      .map((dicomDict) => {
        const naturalizedMetadata = dcmjs.data.DicomMetaDictionary.naturalizeDataset(
          dicomDict.dict
        );
        delete naturalizedMetadata["PixelData"];
        delete naturalizedMetadata["00431028"];
        delete naturalizedMetadata["00431029"];
        delete naturalizedMetadata["0043102A"];
        delete naturalizedMetadata["AnatomicRegionSequence"];
        delete naturalizedMetadata["00090010"];
        delete naturalizedMetadata["00091002"];
        delete naturalizedMetadata["00091004"];
        delete naturalizedMetadata["00091030"];
        delete naturalizedMetadata["00091031"];
        delete naturalizedMetadata["000910E3"];
        delete naturalizedMetadata["ScanningSequence"];
        delete naturalizedMetadata["SequenceVariant"];
        delete naturalizedMetadata["ScanOptions"];
        delete naturalizedMetadata["MRAcquisitionType"];
        delete naturalizedMetadata["MagneticFieldStrength"];
        delete naturalizedMetadata["PixelBandwidth"];
        delete naturalizedMetadata["SecondaryCaptureDeviceManufacturer"];
        delete naturalizedMetadata[
          "SecondaryCaptureDeviceManufacturerModelName"
        ];
        delete naturalizedMetadata["SecondaryCaptureDeviceSoftwareVersions"];
        delete naturalizedMetadata["SoftwareVersions"];
        delete naturalizedMetadata["ProtocolName"];
        delete naturalizedMetadata["BeatRejectionFlag"];
        delete naturalizedMetadata["HeartRate"];
        delete naturalizedMetadata["TriggerWindow"];
        delete naturalizedMetadata["ReceiveCoilName"];
        delete naturalizedMetadata["AcquisitionMatrix"];
        delete naturalizedMetadata["InPlanePhaseEncodingDirection"];
        delete naturalizedMetadata["FlipAngle"];
        delete naturalizedMetadata["VariableFlipAngleFlag"];
        delete naturalizedMetadata["SAR"];
        delete naturalizedMetadata["PatientPosition"];
        delete naturalizedMetadata["DiffusionBValue"];
        delete naturalizedMetadata["ContributingEquipmentSequence"];
        delete naturalizedMetadata["00190010"];
        delete naturalizedMetadata["00191012"];
        delete naturalizedMetadata["0019101E"];
        delete naturalizedMetadata["0019105A"];
        delete naturalizedMetadata["0019107E"];
        delete naturalizedMetadata["00191081"];
        delete naturalizedMetadata["0019108A"];
        delete naturalizedMetadata["0019108B"];
        delete naturalizedMetadata["0019108F"];
        delete naturalizedMetadata["00191091"];
        delete naturalizedMetadata["0019109C"];
        delete naturalizedMetadata["0019109E"];
        delete naturalizedMetadata["0019109F"];
        delete naturalizedMetadata["001910A4"];
        delete naturalizedMetadata["001910A7"];
        delete naturalizedMetadata["001910A8"];
        delete naturalizedMetadata["001910A9"];
        delete naturalizedMetadata["001910AA"];
        delete naturalizedMetadata["001910AB"];
        delete naturalizedMetadata["001910AC"];
        delete naturalizedMetadata["001910AD"];
        delete naturalizedMetadata["001910AE"];
        delete naturalizedMetadata["001910AF"];
        delete naturalizedMetadata["001910B0"];
        delete naturalizedMetadata["001910B1"];
        delete naturalizedMetadata["001910B2"];
        delete naturalizedMetadata["001910B3"];
        delete naturalizedMetadata["001910B4"];
        delete naturalizedMetadata["001910B5"];
        delete naturalizedMetadata["001910B6"];
        delete naturalizedMetadata["001910B7"];
        delete naturalizedMetadata["001910B8"];
        delete naturalizedMetadata["001910B9"];
        delete naturalizedMetadata["001910BA"];
        delete naturalizedMetadata["001910BB"];
        delete naturalizedMetadata["001910BC"];
        delete naturalizedMetadata["001910BD"];
        delete naturalizedMetadata["001910C0"];
        delete naturalizedMetadata["001910CB"];
        delete naturalizedMetadata["001910CC"];
        delete naturalizedMetadata["001910D5"];
        delete naturalizedMetadata["001910D7"];
        delete naturalizedMetadata["001910D8"];
        delete naturalizedMetadata["001910D9"];
        delete naturalizedMetadata["001910DF"];
        delete naturalizedMetadata["001910E0"];
        delete naturalizedMetadata["001910F2"];
        delete naturalizedMetadata["001910F9"];
        delete naturalizedMetadata["StudyID"];
        delete naturalizedMetadata["SeriesNumber"];
        delete naturalizedMetadata["SliceLocation"];
        delete naturalizedMetadata["00210010"];
        delete naturalizedMetadata["00211035"];
        delete naturalizedMetadata["00211036"];
        delete naturalizedMetadata["00211037"];
        delete naturalizedMetadata["00211056"];
        delete naturalizedMetadata["00211057"];
        delete naturalizedMetadata["00211058"];
        delete naturalizedMetadata["00211059"];
        delete naturalizedMetadata["0021105A"];
        delete naturalizedMetadata["0021105B"];
        delete naturalizedMetadata["0021105C"];

        delete naturalizedMetadata["0021105D"];
        delete naturalizedMetadata["0021105E"];
        delete naturalizedMetadata["0021105F"];
        delete naturalizedMetadata["00250010"];
        delete naturalizedMetadata["00250010"];
        delete naturalizedMetadata["0025101A"];
        delete naturalizedMetadata["00270010"];
        delete naturalizedMetadata["00271031"];
        delete naturalizedMetadata["00271032"];
        delete naturalizedMetadata["00271033"];
        delete naturalizedMetadata["00271035"];
        delete naturalizedMetadata["00271060"];
        delete naturalizedMetadata["00271061"];
        delete naturalizedMetadata["00271062"];
        delete naturalizedMetadata["VOILUTFunction"];
        delete naturalizedMetadata["AdmissionID"];
        delete naturalizedMetadata["PerformedProcedureStepStartDate"];
        delete naturalizedMetadata["PerformedProcedureStepStartTime"];
        delete naturalizedMetadata["PerformedProcedureStepID"];
        delete naturalizedMetadata["PerformedProcedureStepDescription"];
        delete naturalizedMetadata["RequestAttributesSequence"];
        delete naturalizedMetadata["00430010"];
        delete naturalizedMetadata["00431001"];
        delete naturalizedMetadata["00431006"];
        delete naturalizedMetadata["00431007"];
        delete naturalizedMetadata["00431008"];
        delete naturalizedMetadata["00431009"];
        delete naturalizedMetadata["0043100A"];
        delete naturalizedMetadata["0043100B"];
        delete naturalizedMetadata["0043100C"];
        delete naturalizedMetadata["0043102C"];
        delete naturalizedMetadata["00431030"];
        delete naturalizedMetadata["00431032"];
        delete naturalizedMetadata["00431035"];
        delete naturalizedMetadata["00431038"];
        delete naturalizedMetadata["00431039"];
        delete naturalizedMetadata["00431060"];
        delete naturalizedMetadata["00431061"];
        delete naturalizedMetadata["00431062"];
        delete naturalizedMetadata["0043106F"];
        delete naturalizedMetadata["00431084"];
        delete naturalizedMetadata["00431097"];
        delete naturalizedMetadata["00510010"];
        delete naturalizedMetadata["00511001"];
        delete naturalizedMetadata["00511002"];
        delete naturalizedMetadata["00511003"];
        delete naturalizedMetadata["00511004"];
        delete naturalizedMetadata["00511005"];
        delete naturalizedMetadata["00511006"];
        delete naturalizedMetadata["00511007"];
        delete naturalizedMetadata["00511008"];
        delete naturalizedMetadata["00511009"];
        delete naturalizedMetadata["0051100A"];
        delete naturalizedMetadata["0051100C"];
        delete naturalizedMetadata["0051100E"];
        delete naturalizedMetadata["00290010"];
        delete naturalizedMetadata["00291026"];
        delete naturalizedMetadata["004310C0"];
        delete naturalizedMetadata["004310BC"];
        delete naturalizedMetadata["004310BB"];
        delete naturalizedMetadata["004310BA"];
        delete naturalizedMetadata["004310B8"];
        delete naturalizedMetadata["004310B7"];
        delete naturalizedMetadata["004310B2"];
        delete naturalizedMetadata["004310AA"];
        delete naturalizedMetadata["0043109A"];
        delete naturalizedMetadata["00431096"];
        delete naturalizedMetadata["00431095"];
        delete naturalizedMetadata["00431091"];
        delete naturalizedMetadata["00431090"];
        delete naturalizedMetadata["0043108A"];
        delete naturalizedMetadata["00431089"];
        delete naturalizedMetadata["00431088"];
        delete naturalizedMetadata["00431083"];
        delete naturalizedMetadata["00431082"];
        delete naturalizedMetadata["00431082"];
        delete naturalizedMetadata["00431081"];
        delete naturalizedMetadata["00431080"];
        delete naturalizedMetadata["0043107D"];
        delete naturalizedMetadata["00431037"];
        delete naturalizedMetadata["00431036"];
        delete naturalizedMetadata["00431034"];
        delete naturalizedMetadata["00431033"];
        delete naturalizedMetadata["0043102F"];
        delete naturalizedMetadata["0043102E"];
        delete naturalizedMetadata["0043102D"];
        delete naturalizedMetadata["0043101D"];
        delete naturalizedMetadata["0043101C"];
        delete naturalizedMetadata["00431010"];
        delete naturalizedMetadata["0043100E"];
        delete naturalizedMetadata["0043100D"];
        delete naturalizedMetadata["00431004"];
        delete naturalizedMetadata["00431003"];
        delete naturalizedMetadata["00431002"];
        delete naturalizedMetadata["00291035"];
        delete naturalizedMetadata["00291034"];
        delete naturalizedMetadata["00291026"];
        delete naturalizedMetadata["00291018"];
        delete naturalizedMetadata["00291017"];
        delete naturalizedMetadata["00291016"];
        delete naturalizedMetadata["00291015"];
        delete naturalizedMetadata["00290010"];
        delete naturalizedMetadata["00271041"];
        delete naturalizedMetadata["00271040"];
        delete naturalizedMetadata["00271030"];
        delete naturalizedMetadata["00271010"];
        delete naturalizedMetadata["00271006"];
        delete naturalizedMetadata["0025101B"];
        delete naturalizedMetadata["00251019"];
        delete naturalizedMetadata["00251018"];
        delete naturalizedMetadata["00251017"];
        delete naturalizedMetadata["00251014"];
        delete naturalizedMetadata["00251011"];
        delete naturalizedMetadata["00251010"];
        delete naturalizedMetadata["00251007"];
        delete naturalizedMetadata["00251006"];
        delete naturalizedMetadata["00231080"];
        delete naturalizedMetadata["0023107D"];
        delete naturalizedMetadata["00231074"];
        delete naturalizedMetadata["00231070"];
        delete naturalizedMetadata["00230010"];
        delete naturalizedMetadata["00211084"];
        delete naturalizedMetadata["00211083"];
        delete naturalizedMetadata["00211082"];
        delete naturalizedMetadata["00211081"];
        delete naturalizedMetadata["00211053"];
        delete naturalizedMetadata["00211052"];
        delete naturalizedMetadata["00211051"];
        delete naturalizedMetadata["00211050"];
        delete naturalizedMetadata["0021104F"];
        delete naturalizedMetadata["001910E2"];
        delete naturalizedMetadata["001910D3"];
        delete naturalizedMetadata["001910D2"];
        delete naturalizedMetadata["001910CF"];
        delete naturalizedMetadata["001910CE"];
        delete naturalizedMetadata["001910CD"];
        delete naturalizedMetadata["001910CA"];
        delete naturalizedMetadata["001910C9"];
        delete naturalizedMetadata["001910C8"];
        delete naturalizedMetadata["001910C7"];
        delete naturalizedMetadata["001910C6"];
        delete naturalizedMetadata["001910C5"];
        delete naturalizedMetadata["001910C4"];
        delete naturalizedMetadata["001910C3"];
        delete naturalizedMetadata["001910C2"];
        delete naturalizedMetadata["001910BE"];
        delete naturalizedMetadata["001910A3"];
        delete naturalizedMetadata["001910A2"];
        delete naturalizedMetadata["001910A1"];
        delete naturalizedMetadata["001910A0"];
        delete naturalizedMetadata["0019109D"];
        delete naturalizedMetadata["0019109B"];
        delete naturalizedMetadata["00191097"];
        delete naturalizedMetadata["00191096"];
        delete naturalizedMetadata["00191095"];
        delete naturalizedMetadata["00191094"];
        delete naturalizedMetadata["00191093"];
        delete naturalizedMetadata["00191092"];
        delete naturalizedMetadata["00191090"];
        delete naturalizedMetadata["0019108D"];
        delete naturalizedMetadata["00191088"];
        delete naturalizedMetadata["00191087"];
        delete naturalizedMetadata["00191084"];
        delete naturalizedMetadata["0019107F"];
        delete naturalizedMetadata["0019107D"];
        delete naturalizedMetadata["0019101B"];
        delete naturalizedMetadata["0019101A"];
        delete naturalizedMetadata["00191019"];
        delete naturalizedMetadata["00191018"];
        delete naturalizedMetadata["00191017"];
        delete naturalizedMetadata["00191011"];
        delete naturalizedMetadata["0019100F"];
        delete naturalizedMetadata["000910E9"];
        delete naturalizedMetadata["00091027"];
        delete naturalizedMetadata["ReferencedImageSequence"];
        delete naturalizedMetadata["ReferencedPerformedProcedureStepSequence"];
        delete naturalizedMetadata["_vrMap"];
        delete naturalizedMetadata["00431098"];
        delete naturalizedMetadata["SpecificCharacterSet"];
        delete naturalizedMetadata["InstanceCreationDate"];
        delete naturalizedMetadata["InstanceCreationTime"];
        delete naturalizedMetadata["SOPClassUID"];

        return naturalizedMetadata;
      }),
  })),
};

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
