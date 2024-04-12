To attach Frontend - visit https://github.com/devtamin/React-For-Node-API and download files. Extract all zip files and open folder with VS Code.
npm install in React terminal 
npm run dev
Copy network/domain address, go to Node terminal, declare 'FRONTEND' variable in .env and paste address no quotes eg. http://www.example.com
npm install cors in Node terminal
In server.js- 
  const cors = require('cors')
  const FRONTEND = process.env.FRONTEND
  const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers like IE11 and various SmartTVs choke on 204
  }
Refresh Node terminal
Refresh React page
