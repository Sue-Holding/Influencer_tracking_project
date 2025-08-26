const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Sätt EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Statisk mapp för CSS etc.
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (req, res) => {
    res.render('landingpage', {message: null, title: 'Registrering'}, { title: 'Hem' });
}
);

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

//Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});