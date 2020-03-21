const express = require('express');
const shortid = require('shortid');

const JsonDB = require('node-json-db').JsonDB;

const db = new JsonDB("notes", true);

const apiRouter = express.Router();

async function readData() {
	const data = db.getData('/');

	return data;
}

apiRouter.get('/notes', async (_, res) => {
	const data = await readData();

	res.json(Object.values(data));
});

apiRouter.post('/notes', async (req, res) => {
	const { title, text } = req.body;

	const id = shortid.generate();

	db.push(`/${id}`, {
		id,
		title,
		text
	});

	res.json({
		success: true
	});
});

apiRouter.delete('/notes/:id', async (req, res) => {
	const noteId = req.params.id;

	db.delete(`/${noteId}`);

	res.json({
		success: true
	});
});

module.exports = apiRouter;