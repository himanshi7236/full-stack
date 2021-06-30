const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
//const HttpError = require('./utils/http-error');


const port = 3000;
app.use(bodyParser.json());
// Routing
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes)





app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
});