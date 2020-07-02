'use strict';

const express = require('express');
// const jwt = require('jsonwebtoken');
const api = express.Router();

require('dotenv').config();

const citiesControl = require('../controllers/cities_control.js');
const beachesControl = require('../controllers/beaches_control.js');
const itemsControl = require('../controllers/items_control.js');
const usersControl = require('../controllers/users_control.js');
const employeesControl = require('../controllers/employees_control.js');
const filledControl = require('../controllers/filled_control.js');
const sectorsControl = require('../controllers/sectors_control.js');
const cartsControl = require('../controllers/carts_control.js');

// const usersControl = require('../controllers/users_control.js');

// Cities
api.get('/cities', citiesControl.getCities);

// Beaches
api.get('/beaches', beachesControl.getBeaches);

// Carts
api.post('/cart', cartsControl.postCart);
api.get('/carts', cartsControl.getCarts);
api.get('/tickets', cartsControl.getTicketNumber);
api.get('/detailday', cartsControl.getCartsDetail);
api.get('/checkin', cartsControl.getItemUser);
api.get('/checkin/detail', cartsControl.getItemUserDetail);
api.post('/used', cartsControl.postUsed);

// Users
api.get('/user/email', usersControl.checkEmail);
api.get('/user/id', usersControl.getUserID);
api.get('/user', usersControl.getUser);
api.post('/user', usersControl.postUser);

// Employees
api.get('/employee', employeesControl.getEmployee);
api.post('/employee', employeesControl.postEmployee);

// Sold tickest and filled sectors
api.get('/state', filledControl.getFilled);
api.post('/checkcart', filledControl.getStock);

// Sectors
api.post('/sectors', sectorsControl.postSectors);
api.get('/sectors', sectorsControl.getSectors);
api.get('/sector', sectorsControl.getSector);

// Items
api.get('/items', itemsControl.getItemsCitySector);
api.get('/item', itemsControl.getItem);
api.put('/item', itemsControl.putItem);
api.put('/items', itemsControl.putItems);
api.post('/items', itemsControl.postItems);
api.get('/statesectoritems', itemsControl.getStateSectorItems);

//  Users check, token and cookie
// api.post('/login', usersControl.postUsersToken);

api.get('/', function (request, response) {
  response.send('NODE AT WORK!!!');
});

// Check the TOKEN of user
// function middlewareRouter(req, res, next) {
//   // let tokenHeader = req.headers['authorization'].split(' ');
//   // let token = tokenHeader[1];
//   let token = req.cookies['csrftoken'];

//   jwt.verify(token, process.env.KEY, function (err) {
//     if (err) {
//       res.status(401).send({
//         message: 'Forbidden',
//       });
//     } else {
//       next();
//     }
//   });
// }

module.exports = api;
