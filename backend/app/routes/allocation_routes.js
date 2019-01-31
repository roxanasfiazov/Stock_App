const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    app.get('/api/allocations', (req, resp) => {
        db.collection('allocations').find({}).toArray((err, result) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(result)
        })
    })

    app.get('/api/allocations/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id': new ObjectID(id)
        }
        db.collection('allocations').findOne(details, (err, item) => {
            if (err) resp.send({ 'error': 'An error has occured' })
            else resp.send(item)
        })
    })

    app.post('/api/allocations', (req, resp) => {
        const allocation = {
            symbol: req.body.symbol,
            percentage: req.body.percentage
        }
        db.collection('allocations').insertOne(allocation, (err, result) => {
            if (err) resp.send({'error': 'An error has occured'})
            else resp.send(result.ops[0])
        })
    })

    app.delete('/api/allocations/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id' : new ObjectID(id)
        }
        db.collection('allocation').deleteOne(details, (err, item) => {
            if (err) resp.send({'error': 'An error has occured'})
            else resp.send(item.ops[0])
        })
    })

    app.put('/api/allocations/:id', (req, resp) => {
        const id = req.params.id
        const details = {
            '_id' : new ObjectID(id)
        }
        const allocation = {
            percentage: req.body.percentage
        }
        db.collection('allocation').updateOne(details, allocation, (err, item) => {
             if (err) esp.send({'error': 'An error has occured'})
             else resp.send(item.ops[0])
        })
    })


}