const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');

const router = express.Router();
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.xlsx')
  }
});
const upload = multer({ storage });

const TypeModel = require('../models/type');
const SubTypeModel = require('../models/subtype');
const ReportModel = require('../models/report');

router.get('/', async function (req, res, next) {
  const types = await TypeModel.find({});
  const subTypes = await SubTypeModel.find({});
  const reports = await ReportModel.find({});

  res.locals.viewpage = 'index'
  res.render('layout', { title: 'Express', types, subTypes, reports });
});

router.get('/upload', function (req, res, next) {
  res.locals.viewpage = 'upload'
  res.render('layout', { title: 'Express' });
});

router.post('/upload', upload.single('xlsfile'), async function (req, res, next) {
  console.log('file: ', req.file);
  console.log('filename: ', req.file.filename);
  console.log('path: ', req.file.path);
  const workbook = xlsx.readFile(req.file.path);
  const sheetNameList = workbook.SheetNames;

  const sheets = sheetNameList.map((sheetName) => {
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  });
  console.log('sheet name:', sheets);

  await ReportModel.deleteMany({});
  await TypeModel.deleteMany({});
  await SubTypeModel.deleteMany({});

  const reports = xlsx.utils.sheet_to_json(workbook.Sheets['report']);
  await ReportModel.insertMany(reports)
    .then(() => console.log('upload report successfuly.'))
    .catch(e => console.error('upload report err:', e.message));

  const types = xlsx.utils.sheet_to_json(workbook.Sheets['type']);
  await TypeModel.insertMany(types)
    .then(() => console.log('upload type successfuly.'))
    .catch(e => console.error('upload type err:', e.message));

  const subTypes = xlsx.utils.sheet_to_json(workbook.Sheets['sub_type']);
  await SubTypeModel.insertMany(subTypes)
    .then(() => console.log('upload subtype successfuly.'))
    .catch(e => console.error('upload subtype err:', e.message));

  res.json({ sheetNameList, sheets });
});

module.exports = router;
