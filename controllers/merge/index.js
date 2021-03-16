var fs = require('fs');
var PizZip = require('pizzip');
var path = require('path');
var Docxtemplater = require('docxtemplater');
 var dataDocs = require('../../data/dataDoc');

exports.genDocJson = async (req, resp, next) => {
    //  const dataDocs = req.body;
    const templatePath = path.resolve(__dirname, 'template.docx');
    // console.log('object, aqui', templatePath)
    let content;
    console.log('@tabla ', dataDocs.default );
    if (templatePath.includes('http')) {
        content = fs.readFileSync(templatePath).toString();;
    } else {
        console.log('object, aqui')
        // content = fs.readFileSync(__dirname +`/${dataDocs.documentPath}`, 'binary');
        content = fs.readFileSync(path.resolve(__dirname, dataDocs.default.documentPath), 'binary');
    }

    const zip = PizZip(content);
    const doc = new Docxtemplater();
    doc.loadZip(zip);  

    // console.log(dataDocs);
    let { nameDoc } = dataDocs.default; 



    doc.setData({
        ...dataDocs.default,
    })

    try {
        doc.render()
    } catch (error) {
        throw error
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    //generando los documentos
    const pathPrint = (__dirname + `/docs/${nameDoc}.docx`);
    // console.log('path: ',path)
    fs.writeFileSync(pathPrint, buf);
    // try {
    //   await  resp.json({ 
    //         msg: `el archivo ${nameDoc}.docx se genero correctamente `,
    //         path
    //     })
    // } catch (err) {
    //  await   resp.json({ 
    //         msg: `error al generar el archivo ${nameDoc}.docx `,
    //         error:err.message
    //     });

    // }

    resp.download(`./controllers/merge/docs/${nameDoc}.docx`);
    //ressponse mostrando el error
}