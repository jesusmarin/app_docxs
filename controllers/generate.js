const officegen = require('officegen')
const fs = require('fs')

// Create an empty Word object:
let author = 'SOLINFO';
let docx = officegen({
	type: 'docx', 
	author, 
	creator : 'Webservices generate OfficeGen', 
	description  : 'Prueba, docx, OfficeGen', 
  orientation :'landscape', //Either 'landscape' or 'portrait'. The default is 'portrait'.
  pageSize :'letter paper',//support value: 'A4', 'A3', 'letter paper'Or set customize size with { width: 11906, height: 16838 }
  subject:'Generacion dinamica de documentos word',
  title:'Word Generations',
  pageMargins :{ 
    top: 1800, 
    right: 1440, 
    bottom: 1800, 
    left: 1440
  }
	 //otras popiedades, subject, title, columns   
})
docx.setDocCategory('developer');
/*
docx.setDocTitle('...')
docx.setDocSubject('...')
docx.setDocKeywords('...')
docx.setDescription( '...')
docx.setDocCategory('...')
docx.setDocStatus('...')
*/
 
// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})
 
// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
})
 
// Crea un paragraph:
let pObj = docx.createP()
 
pObj.addText('Simple')
pObj.addText(' con color', { color: '000088' })
pObj.addText(' y  color de fondo.', { color: '00ffff', back: '000088' })
 
//nuevo parrafo
pObj = docx.createP()
 
pObj.addText('Since ')
pObj.addText('officegen 0.2.12', {
  back: '00ffff',
  shdType: 'pct12',
  shdColor: 'ff0000'
}) // Use pattern in the background.
pObj.addText(' you can do ')
pObj.addText('more cool ', { highlight: true }) // Highlight!
pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.
 
pObj = docx.createP()
 
pObj.addText('Even add ')
pObj.addText('external link', { link: 'https://github.com', bold: true, underline: true  })
pObj.addText('!')
 
pObj = docx.createP()
 
pObj.addText('Bold + underline', { bold: true, underline: true })
 
pObj = docx.createP({ align: 'center' })
 
pObj.addText('Center this text', {
  border: 'dotted',
  borderSize: 12,
  borderColor: '88CCFF'
})
 
pObj = docx.createP()
pObj.options.align = 'right'
 
pObj.addText('Align this text to the right.')
 
pObj = docx.createP()
 
pObj.addText('Those two lines are in the same paragraph,')
pObj.addLineBreak()
pObj.addText('but they are separated by a line break.')
 
docx.putPageBreak()
 
pObj = docx.createP()
 
pObj.addText('Fonts face only.', { font_face: 'Arial' })
pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
 
docx.putPageBreak()
 
pObj = docx.createP()
 
// We can even add images:
//pObj.addImage(__dirname, 'some-image.png')
 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream(`./docs/${author}.docx`)
 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)