const express       = require('express'),
      http          = require('http'),
      https         = require('https'),
      fs            = require('fs'),
      path          = require('path'),
      app           = express();

let sslOptions = {  
    key: fs.readFileSync('wildcard.ewebs.se.key'),
    cert: fs.readFileSync('wildcard.ewebs.se.crt')
};

app.all('*', secure);

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources/views'));

const title = 'ewebs – eventweb solutions';

app.get('/', (req, res) => {
    
    res.render('index', { title: title, id: 'index' })
    
});

app.get('/funktioner', (req, res) => {
    
    res.render('funktioner', { title: 'Funktioner – ' + title, id: 'funktioner' })
    
});

app.get('/projekt', (req, res) => {
    
    res.render('projekt', { title: 'Projekt – ' + title, id: 'projekt' })
    
});

app.get('/projekt/:project', (req, res) => {
    
    let projects = {
            'the-sprint-experiment': 'The Sprint Experiment'
        },
        project = projects[req.params.project];
    
    if(!project)
        res.status(404).render('404');
    else
        res.render('projekt-details', { title: project + ' – Projekt – ' + title, id: 'projekt', project: req.params.project, label: project })
    
});

app.get('/kontakt', (req, res) => {
    
    res.render('kontakt', { title: 'Kontakt – ' + title, id: 'kontakt' })
    
});

app.get('*', (req, res) => {
   
    res.render('404', { title: '404 – ' + title, id: '404' })
    
});

http.createServer(app).listen(3000);
https.createServer(sslOptions, app).listen(3443);

function secure (req, res, next) {
    
    if(req.secure)
        return next();
    
    res.redirect('https://' + req.hostname + req.url);
    
}