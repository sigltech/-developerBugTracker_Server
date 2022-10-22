require('dotenv').config();
const route = require('express').Router();
const userModel = require('../../Model/userModel');
const bcrypt = require('bcrypt');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

route.post('/users/register', (req, res) => {
    // salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Store hash in your password DB.
            const user = new userModel({
                name: req.body.name,
                password: hash,
                role: 'admin',
            });
            user.save().then((user) => {
                res.send('User created');
            }
            ).catch((err) => {
                res.send(err);
            }
            );
        });
    });
});

route.put('/users/modify', (req, res) => {
    const { _id, name, password, role } = req.body;
    userModel.findByIdAndUpdate(_id, { name, password, role })
        .then((user) => {
            if (!user) return res.status(400).send({ message: 'There was an error' });
            res.send({ message: 'User updated' });
        })
        .catch((err) => {
            if (err) return res.status(400).send({ message: 'There was an error' });
        });
});

route.post('/users/login', (req, res) => {
    try {
        const { name, password } = req.body;
        userModel.findOne({ name }).then((user) => {
            if (!user) return res.status(400).send({ message: 'User not found' });

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const tokenPayload = {
                        name: user.name,
                        role: user.role,
                    };

                    const sendToken = (err, tokenPayload) => {
                        if (err) return res.status(400).send({ message: 'There was an error' });
                        res.status(200).json({
                            token: tokenPayload,
                            message: 'User logged in',
                            data: {
                                name: user.name,
                                role: user.role,
                            },
                        });
                    };

                    jwt.sign(tokenPayload, process.env.SUPER_SECRET_KEY, { expiresIn: 3600 }, sendToken);

                    // res.send({
                    //     message: 'User logged in',
                    //     user: {
                    //         _id: user._id,
                    //         name: user.name,
                    //         role: user.role,
                    //         password: user.password,
                    //     }
                    // });
                } else {
                    res.send({ message: 'Wrong password' });
                }
            });
        });
    } catch (err) {
        res.send(err);
    }
});

route.get('/users', (req, res) => {
    userModel.find().then((user) => {
        if (!user) return res.status(400).send('no users');
        res.send(user);

    })
        .catch((err) => {
            if (err) res.status(400).send(err);
        });
});

route.post('/users/logout', (req, res) => {
    res.send('User logged out');
});


module.exports = route;
