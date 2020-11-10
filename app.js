const http = require('http');
const express = require('express');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + "/assets"));
app.get('/', (req, res) => {
  res.render('intro');
})

app.get('/main', (req, res) => {
  res.render('main');
})
app.get('/login', (req, res) => {
    res.render('login');
  })
app.get('/myprofile', (req, res) => {
    var page ="profile"; //기본 주소
    if(req.query.page){
        page = req.query.page
    }

    res.render('myprofile', {page: page});
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});