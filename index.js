const express = require('express');
// ?????
const path = require('path');

const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

// Require members for handlebars render method
const members = require('./members');

const app = express();

// Innit middleware ==>> require middleware from ./middleware/logger.js
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware ==> to parse POST request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members
}))

// Set staic folder
// app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));