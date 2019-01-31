var ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    app.get('/api/holdings', (req, resp) => {
        db.collection('holdings').find({}).toArray((err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(result)
        })
    })

    app.get('/api/holdings/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        }
        db.collection('holdings').findOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(item)
        })
    })

    app.post('/api/holdings', (req, resp) => {
        const holding = {
            symbol: req.body.symbol,
            amount: req.body.amount
        }
        db.collection('holdings').insertOne(holding, (err, result) => {
            if (err) resp.send({'error': 'An error has occured'})
            else resp.send(result.ops[0])
        })
    })

    app.delete('/api/holdings/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id' : new ObjectID(id)
        }
        db.collection('holding').deleteOne(details, (err, item) => {
            if (err) resp.send({'error': 'An error has occured'})
            else resp.send(item.ops[0])
        })
    })

    app.put('/api/holdings/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id' : new ObjectID(id)
        }
        const holding = {
            amount: req.body.amount
        }
        db.collection('holding').updateOne(details, holding, (err, item) => {
             if (err) esp.send({'error': 'An error has occured'})
             else resp.send(item.ops[0])
        })
    })


}