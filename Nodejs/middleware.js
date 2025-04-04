const express = require("express");
const app = express();
const port = 3100;

const middleware = (req, res, next) => {
// TYpes of MiddleWare

// 1. Application Level Middleware

/* 
const express = require('express');
const app = express();

// Application level middleware - runs on every request
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
 */
// 2. Router Level Middleware

/* 
const router = express.Router();

// Router level middleware - only runs on this router
router.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});   
*/
// 3. Error Handling Middleware

/* 
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};
*/
// 4. Built-in Middleware
/* 
// Parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static('public'));
*/

// 5. Third-Party Middleware

/* 
const morgan = require('morgan');
const cors = require('cors');

// Request logging
app.use(morgan('dev'));

// Enable CORS
app.use(cors());
 */



  const age = req.query.age;
  if (age < 18) {
    res.send("<h1>You are not allowed to access this page</h1>");
  } else {
    next();
  }
};

app.get("/", middleware, (req, res) => {
  res.send("<h1>You are allowed to access this page using middleware</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>You are allowed to access this page</h1>");
});
app.use(middleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

