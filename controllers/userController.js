const userSchema = require("../model/userSchema.js");
const crypto = require('../utils/encryptUtil.js');
const express = require('express');
const UserToken = require('../model/userToken');




function userController() {
    function create(req, res) {
        req.body.password = crypto.cryptPassword(req.body.password);
        console.log('create work');
        if (!req.body.id || !req.body.full_name) {
            console.log('create work1');
            return res.status(400).send({});
        }
        var newUser = new userSchema(req.body);
        newUser.save(function (err, newDoc) {
            console.log('create work');
            if (err) {
                // if(err.code === 11000) return res.status(400).send({ error: 'user exists' });
                return res.status(400).send(err);
            }
            console.log(newDoc)

            res.status(200).send(newDoc);
        })



    }
    function deleteUser(req, res) {
        userSchema.deleteOne({ _id: req.params._id }, function (err, result) {

            if (err) {
                return res.status(500).send();

            }
            if (!result.n) {
                return res.status(400).send();
            }
            return res.status(200).send();
        })
    }

    function updateDetails(req, res) {

        userSchema.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true }, function (err, test) {
            console.log("update test is work ");
            if (err) {
                return res.status(500).send();
            }
            if (!test) {
                return res.status(404).send();
            }
            res.status(200).send();
        })

    }

    function updateScore(req, res) {
        userSchema.updateOne({ _id: req.user._id, "listTestAnswers._id": req.body._id }, { $set: { 'listTestAnswers.$.score': req.body.score } }, (err, user) => {
            console.log({ err, user });
        })
    }


    function updateUser(req, res) {
        userSchema.updateOne({ _id: req.user._id }, { $addToSet: req.body }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!result.n) {
                return res.status(200).send({ err: 'document_not_found' });
            }
            res.status(200).send();
        })
    }

    function getUser(req, res) {
        userSchema.findOne({ _id: req.user._id }, function (err, user) {
            console.log("getuser work!");
            console.log(req.headers);
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            }
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        })
    }

    function getAll(req, res) {
        userSchema.find(function (err, list) {
            console.log("get all work")
            if (err) {
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
    }
    function UpdateTestOfUser(req, res) {
        console.log("test UpdateTestOfUser");
        userSchema.findOneAndUpdate({ _id: req.body.intern_id },
            { $push: { listTest: { "test": req.body._id } } },
            function (err, user) {
                if (err) {
                    console.log("error UpdateTestOfUser");
                    return res.status(500).send(err);
                }
                console.log("success UpdateTestOfUser");
                console.log(user);
                res.status(201).send(user);
            })
    }

    function login(req, res) {

        userSchema.findOne({ email: req.body.email },
            { full_name: 1, password: 1, roleNumber: 1, email: 1 }, function (err, doc) {
                if (err) {
                    return res.status(500).send();
                }
                console.log(doc);
                if (!doc || !crypto.compare(req.body.password, doc.password)) {
                    console.log({ doc });
                    return res.status(401).send({ msg: "Email or passors not exists" });
                }
                var userToken = new UserToken(true, null,
                    doc.full_name, doc._id, doc.roleNumber, doc.email,
                    Date.now() + (60 * 1000 * 60));
                res.status(200).send({ token: userToken.token, full_name: doc.full_name, email: doc.email, roleNumber: doc.roleNumber });

            })
    }
    return {
        getUser: getUser,
        updateDetails: updateDetails,
        updateUser: updateUser,
        updateScore: updateScore,
        create: create,
        deleteUser: deleteUser,
        getAll: getAll,
        UpdateTestOfUser: UpdateTestOfUser,
        login: login,
    }
}

module.exports = userController()


