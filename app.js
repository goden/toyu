var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var employee = require('./routes/employee');
var client = require('./routes/client');

var app = express();

// import db module
var mongoose = require('mongoose');
var schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/toyu');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//
// Database access
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB: connected toyu database.'); 
});

//
// 宣告資料結構
// 員工
var employeeSchema = schema({
  eId: String,                                                // 工號
  username: String,                                           // 系統帳號
  password: String,                                           // 系統密碼
  permission: {type: schema.Types.ObjectId, ref: "Permission"},  // 系統權限
  firstName: {type: String, default: ""},                     // 姓
  lastName: {type: String, default: ""},                      // 名字
  birthDate: {type: Date, default: Date.now },                // 生日
  inaugurationDate: {type:Date, default: Date.now },          // 到職日
  leaveDate: {type: Date, default: Date.now},                 // 離職日
  male: {type: Boolean, default: true},                       // 性別
  tel: {type: String, default: ""},                           // 連絡電話
  mobile: {type: String, default: ""},                        // 手機
  address: {type: String, default: ""},                       // 居住地址
  positions: [{type: schema.Types.ObjectId, ref: "Position"}],  // 職稱
  dispatched: {type: Boolean, default: false},                // 派遣配合
});

// 權限
var permissionSchema = schema({
  level: Number,                                          // 權限等級
  comment: {type: String, default: ""}                    // 說明
});

// 職稱
var positionSchema = schema({
  type: Number,                                           // 職位等級
  title: {type: String, default: ""}                      // 說明
});

// 客戶
var clientSchema = schema({
  cId: String,
  name: String,
  owner: String,
  ownerTitle: String,
  zip: String,
  city: {type: schema.Types.ObjectId, ref: "City"}, 
  address: String, 
  tels: [{type: String}],
  faxes: [{type: String}],
  emails: [{type: String}],
  website: String,
  taxNumber: Number,
  comment: String,
  payments: [{type: schema.Types.ObjectId, ref: "Payment"}],
  accounts: [{type: String}]
});

// 付款方式
var paymentSchema = schema({
  type: Number,
  comment: String
});

var citySchema = schema({
  type: Number,
  name: String
});

app.db = {
  model: {
    Permission: mongoose.model("Permission", permissionSchema),
    Position: mongoose.model("Position", positionSchema),
    Employee: mongoose.model("Employee", employeeSchema),
    Payment: mongoose.model("Payment", paymentSchema),
    City: mongoose.model("City", citySchema),
    Client: mongoose.model("Client", clientSchema)
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
// REST API
// //////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/employee", employee.create);
app.get("/employee", employee.read);
app.put("/employee/:eId", employee.update);
app.delete("/employee/:eId", employee.delete);

app.post("/client", client.create);
app.get("/client", client.read);
app.put("/client/:cId", client.update);
app.delete("/client/:cId", client.delete);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3052);
module.exports = app;
