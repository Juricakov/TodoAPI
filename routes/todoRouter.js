const express = require('express');
const router = express.Router();
const TodoModel = require('../models/TodoModel');

router.post('/', async (req, res, next) => {
	const { text, completed } = req.body;
	if (text == undefined || completed == undefined) {
		return res.status(400).json({
			message: 'Text and completed are required fields',
		});
	}
	try {
		const todo = TodoModel.build({
			text: text,
			completed: completed,
		});
		const savedTodo = await todo.save();
		return res.status(200).json(savedTodo);
	} catch (error) {
		return next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const todos = await TodoModel.findAll();
		res.status(200).json(todos);
	} catch (error) {
		return next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id);
	if (id == undefined) {
		return res.status(400).json({
			message: 'Id must be an integer',
		});
	}
	try {
		const todo = await TodoModel.findOne({ where: { id: id } });
		if (!todo) {
			return res.status(404).json({
				message: `No todo with id ${id} exists`,
			});
		}
		return res.status(200).json(todo);
	} catch (error) {
		return next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	const { text, completed } = req.body;
	const id = parseInt(req.params.id);
	if (id == undefined) {
		return res.status(400).json({
			message: 'Id must be an integer',
		});
	}
	if (text == undefined || completed == undefined) {
		return res.status(400).json({
			message: 'Text and completed are required fields',
		});
	}

	try {
		const todo = await TodoModel.findOne({ where: { id: id } });
		if (!todo) {
			return res.status(404).json({
				message: `No todo with id ${id} exists`,
			});
		}
		await TodoModel.update(
			{ text: text, completed: completed },
			{ where: { id: id } }
		);
		res
			.status(200)
			.json({ ...todo.dataValues, text: text, completed: completed });
	} catch (error) {
		return next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id);
	if (id == undefined) {
		return res.status(400).json({
			message: 'Id must be an integer',
		});
	}
	try {
		const todo = await TodoModel.findOne({ where: { id: id } });
		if (!todo) {
			return res.status(404).json({
				message: `No todo with id ${id} exists`,
			});
		}
		await TodoModel.destroy({ where: { id: id } });
		return res.status(200).json(todo);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
