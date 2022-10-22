const route = require('express').Router();
const ticketsModel = require('../../Model/ticketsModel');

route.post('/ticket', (req, res) => {
    console.log(req.body);
    const data = req.body;
    // data._id = Math.random().toString();
    ticketsModel.create(data).then((ticket) => {
        if (!ticket) return res.status(400).send('Ticket not created');
        res.status(200).send('created ticket');
    })
        .catch((err) => {
            res.status(400).send(err);
        });
});

route.put('/ticket', (req, res) => {
    const { _id, name, description, steps, version, assigned, creator, priority, time } = req.body;

    ticketsModel.findByIdAndUpdate(_id, { name, description, steps, version, assigned, creator, priority, time })
        .then((ticket) => {
            if (!ticket) return res.status(400).send({ message: 'There was an error' });
            res.send({ message: 'Ticket updated' });
        }
        )
        .catch((err) => {
            if (err) return res.status(400).send({ message: 'There was an error' });
        }
        );
})

    .get('/', (req, res) => {
        ticketsModel.find().then((ticket) => {
            if (!ticket) return res.status(400).send('no tickets');
            res.send(ticket);

        })
            .catch((err) => {
                if (err) res.status(400).send(err);
            });
    });


module.exports = route;
