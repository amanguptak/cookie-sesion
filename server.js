const express = require('express');
const pug = require('pug');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');




const app = express();

app.use(cookieParser());
app.set('trust proxy', 1); 

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 60000   
}));


app.set('view engine', 'pug');
app.set('views',"./view" ); 




app.get('/', (req, res)=> {
    console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);
    req.session.views = (req.session.views || 0) + 1;
    context={
    visits: req.session.views,
    cookies : req.cookies,
    signedCookies : req.signedCookies
};
res.render('index', context);
});


app.get('/delete', (req, res)=> {
    req.session=null;

    res.redirect('/');
});



app.listen(8000, function () {
  console.log('Listening on port 8000');
})