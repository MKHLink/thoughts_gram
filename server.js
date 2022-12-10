//importing express and mongoose
const express = require('express');
const mongoose = require('mongoose');

//ports for server connection
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes'));

//mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughts-gram',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug',true);

app.listen(PORT, () => console.log(`Connected to localhost: ${PORT}`));