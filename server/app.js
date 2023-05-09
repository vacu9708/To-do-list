const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const routes=require("./routes/routes.js");

app.use(cors());
app.use((bodyParser.json()));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build'))) // To allow clients to search built react
app.use('/uploads/images', express.static(path.join(__dirname,'uploads/images')))
app.use('/resources',express.static(path.join(__dirname,'resources')))
app.use('/', routes)

// MongoDB connection
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const DB_address=process.env.DB_address
mongoose.connect(`mongodb://${DB_address || 'localhost:27017'}/auth_todo`, connectionParams);

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) 
    return console.log(err);
  console.log('Server running on port34: ', port);
});