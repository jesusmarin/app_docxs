import fs from 'fs'
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const content = fs.readFileSync('tamplate.docx', 'binary');
const zip = PizZip(content);
const doc = new Docxtemplater();
doc.loadZip(zip);

//informacion a pasar al template
const data = fs.readFileSync('./archivo.txt').toString();
let notasArray = [];
notasArray = data.replace(/\r?\n|\r/g, ' ').split(' ');


//insertando datos en el template
for(let i = 0; i < notasArray.length; i++){
    const nombre = notasArray[i].substring(0, notasArray[i].indexOf(':'));
    const nota = notasArray[i].substring( notasArray[i].indexOf(':')+1, notasArray[i].length)
    const resultado = nota < 7 ? 'REPROBADO':'APROBADO';

    doc.setData({
        nombre: nombre,
        nota: nota,
        resultado: resultado
    })

    try {
        doc.render()
    } catch (error) {
        throw error
    }

    const buf = doc.getZip().generate({type: 'nodebuffer'});
    //generando los documentos
    fs.writeFileSync(`${nombre}.docx`, buf)
}