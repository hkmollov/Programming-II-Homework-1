const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

let obj = {
  messages: []
};

const FILENAME = __dirname + '/../store/messages.json';

/* GET home page. */
router.get('/', (request, result) => {
  fs.access(FILENAME, fs.F_OK, (err) => {
      if(!err) {
         fs.readFile(FILENAME, (err, data) => {
              obj = JSON.parse(data);
              result.render('index', { messages: obj.messages });
          });
      } else {
        result.render('index')
      }
  });
});


/*! Post Request */
router.post('/post', (request, result) => {
  fs.access(FILENAME, fs.F_OK, (err) => {
      if(err) {
          obj.messages.push({name: request.body.name, message: request.body.message});

          fs.writeFile(FILENAME, JSON.stringify(obj), 'utf8', (err) => {
              if(err) {
                  console.log(err);
              }
          });

          result.redirect('/');
      } else {
          fs.readFile(FILENAME, (err, data) => {
              obj = JSON.parse(data);
                  
              obj.messages.push({name: request.body.name, message: request.body.message});

              console.log(obj);

              fs.writeFile(FILENAME, JSON.stringify(obj), 'utf8', (err) => {
                  if(err) {
                      console.log(err);
                  }
              });

              result.redirect('/');
          });
      }
  });
});

module.exports = router;
