import fs from 'fs';

fs.readFile('archivo.txt', 'utf8', (error, datos)=>{
    if(error){
        throw error;
    }else{
        console.log(datos)
    }
})