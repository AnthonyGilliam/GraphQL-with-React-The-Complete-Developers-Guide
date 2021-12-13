const app = require('./server/server');

app.listen(port = 4000, () => {
  console.log('Listening on port:  ', port);
});
