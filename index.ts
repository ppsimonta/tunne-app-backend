import express from 'express';
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
import ConnectDatabase  from './database/database';
const instanceRoutes = require('./routes/instanceRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
import dotenv from 'dotenv';
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const { initializeSocket } = require('./socket/socket'); 
import swaggerUi from 'swagger-ui-express';
const YAML = require('yamljs');

const port = 8001;
const app = express();
app.use(cors(
    {
        origin: process.env.corsOrigin, 
        credentials: true,
    }
));

const RoutesSpec = YAML.load('./routes/routes.swagger.yaml');


app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { secure: false, maxAge: 60000000 }}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

app.use('/instances', instanceRoutes)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(RoutesSpec));



app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io
initializeSocket(server);

server.listen(port, () => {
    ConnectDatabase();
    console.log(`Tunne app listening at http://localhost:${port}`);
})



