const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database, { useMongoClient: true });

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');
const itemInsert = require('./routes/itemInsert');
const reportItem = require('./routes/reportItem');
const requestExisting = require('./routes/requestExistingItem');
const requestNew = require('./routes/requestNewItem');
const itemType = require('./routes/itemType');
const middletermnotification = require('./routes/middletermnotification');
const itemavailable = require('./routes/itemavailable');

const itemAllocation = require('./routes/itemAllocation');

const reports = require('./routes/reports');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/itemInsert', itemInsert);
app.use('/reportItem', reportItem);
app.use('/requestExistingItem', requestExisting);
app.use('/requestnewItem', requestNew);
app.use('/itemAllocation', itemAllocation);
app.use('/itemType', itemType);
app.use('/middletermnotification', middletermnotification);
app.use('/itemavailable', itemavailable);
app.use('/reports', reports);
// app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(session({secret: 'anystringoftext',
//                        saveUninitialized: true,
//             resave: true
// } ));
// app.set('iew engine','ejs'); 

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});