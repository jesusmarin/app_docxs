var express = require('express');
var router = express.Router();
var merge = require('../controllers/merge');


// define the home page route
router.get('/', function(req, res) {
    res.send('Home page generate word documents');
  });
//  route send docx
router.get('/descargar/docx', (req, resp, next) => resp.download('./docs/docu.docx')
  );
//  route send docx
router.get('/merge/doc', merge.genDocJson);


module.exports = router;