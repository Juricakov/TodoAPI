require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/database');

const todoRouter = require('./routes/todoRouter');

app.use(express.json());
app.use('/todo', todoRouter);

app.use((err, req, res, next) => {
	console.log(err);
	res.send(500).json({
		message: 'Oops!',
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${process.env.PORT}`);
});

db.authenticate()
	.then(() => console.log('Connected to db!'))
	.catch((err) => console.error('Error connecting to db: ', err.stack));
db.sync();
