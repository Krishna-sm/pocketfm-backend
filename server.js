require('dotenv').config({
    
    path:'./.env.local'
})
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

const port = process.env.PORT || 5000 
ConnectDB()



app.listen(port,()=>{
    console.log(`the app is listen at http://localhost:${port}`);
})