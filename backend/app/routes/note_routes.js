var ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    app.get('/notes/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        }
        db.collection('notes').findOne(details, (err, item) => {
            if (err){
                resp.send({'error': 'An error has occured'})
            } else {
                resp.send(item)
            }
        })
    })

    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        }
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured ' })
            } else {
                res.send(result.ops[0])
            }
        }
        )
    })
}