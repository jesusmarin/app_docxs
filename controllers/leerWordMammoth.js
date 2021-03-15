import superagent from'superagent';
import mammoth from 'mammoth';

// const url = 'http://www.ojk.ee/sites/default/files/respondus-docx-sample-file_0.docx';
const url = 'http://localhost:4002/doc';

const main = async () => {

 const response = await superagent.get(url)
   .parse(superagent.parse.image)
   .buffer();

  const buffer = response.body;

  const text = (await mammoth.extractRawText({ buffer })).value;
  const lines = text.split('\n');

  console.log(lines);
};

main().catch(error => console.error(error));