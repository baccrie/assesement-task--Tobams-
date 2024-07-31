import fs from 'fs'


// read swagger docs file
export default function readFile(){
  return new Promise((resolve, reject) => {
    fs.readFile('./docs.json', {'encoding': 'utf-8'}, (err, data)=> {
      if (err) {
        reject(err)
      }   
      resolve(data)
    })
  }) 
}
