const server = require("./src/app");
const { conn } = require('./src/db');
const {dataUploader, dataCheck} = require('./src/utils/testDataUpload')
const PORT = 3001

conn.sync({ force: true }).then(async() => {
    const {languageCheck, howFoundCheck} = await dataCheck();
    
    if(languageCheck === 0 && howFoundCheck === 0) {
        await dataUploader();
    } else {
        console.log("Data was already uploaded");
    }
    
    console.log('Languages:', languageCheck, 'How Found Us:', howFoundCheck);
    
    server.listen(PORT, () => {
        console.log("Servidor levantado en puerto 3001");
    });
});
