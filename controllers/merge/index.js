var fs = require('fs');
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');

exports.genDocJson = async (req, resp, next) => {
    const dataDocs = req.body;

    const content = any;
    const path = dataDoc.documentPath;
    if (path.includes('http')) {
        content = fs.readFileSync(path).toString();;
    } else {
        content = fs.readFileSync(dataDoc.documentPath, 'binary');
    }


    const zip = PizZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    // console.log(dataDocs);
    let { nameDoc } = dataDocs;



    doc.setData({
        ...dataDocs,
    })

    try {
        doc.render()
    } catch (error) {
        throw error
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    //generando los documentos
    const path = (__dirname + `/docs/${nameDoc}.docx`);
    // console.log('path: ',path)
    fs.writeFileSync(path, buf);

    resp.download(`./controllers/merge/docs/${nameDoc}.docx`);

    //ressponse mostrando el errror
}