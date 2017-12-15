const express   = require('express'),
      path      = require('path'),
      app       = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources/views'));

const title = 'ewebs – eventweb solutions';

app.get('/', (req, res) => {
    
    res.redirect('https://' + req.headers.host + req.url).render('index', { title: title, id: 'index' })
    
});

app.get('/funktioner', (req, res) => {
    
    res.redirect('https://' + req.headers.host + req.url).render('funktioner', { title: 'Funktioner – ' + title, id: 'funktioner' })
    
});

app.get('/projekt', (req, res) => {
    
    res.redirect('https://' + req.headers.host + req.url).render('projekt', { title: 'Projekt – ' + title, id: 'projekt' })
    
});

app.get('/projekt/:project', (req, res) => {
    
    let projects = {
            'the-sprint-experiment': 'The Sprint Experiment'
        },
        project = projects[req.params.project];
    
    if(!project)
        res.status(404).redirect('https://' + req.headers.host + req.url).render('404');
    else
        res.redirect('https://' + req.headers.host + req.url).render('projekt-details', { title: project + ' – Projekt – ' + title, id: 'projekt', project: req.params.project, label: project })
    
});

app.get('/kontakt', (req, res) => {
    
    res.redirect('https://' + req.headers.host + req.url).render('kontakt', { title: 'Kontakt – ' + title, id: 'kontakt' })
    
});

app.get('*', (req, res) => {
   
    res.redirect('https://' + req.headers.host + req.url).render('404', { title: '404 – ' + title, id: '404' })
    
});

app.listen(3000);