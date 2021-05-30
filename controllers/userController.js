const userSchema = require("../model/userSchema.js");
const crypto = require('../utils/encryptUtil.js');
const express = require('express');
const UserToken = require('../model/userToken');


function userController() {
    function create(req, res) {
        console.log('work');
        if (!req.body.id || !req.body.full_name) {
            return res.status(400).send({}); 
        }
        var newUser = new userSchema(req.body);
        newUser.save(function (err, newDoc) {
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
                console.log(err);
            }
            if (!result.n) {
                return res.status(400).send();
            }
            return res.status(200).send();
        })
    }

    function updateUser(req, res) {
        req.body.password = crypto.cryptPassword(req.body.password);
        userSchema.updateOne({ _id: req.body._id }, { $set: req.body }, function (err, result) {
            console.log('update is work');
            if (err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!result.n) {
                return res.status(404).send();
            }
            res.status(200).send();

        })
    }

    function getUser(req, res) {
        userSchema.findOne({ _id: req.body._id }, function (err, user) {
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
            if (err) {
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
    }
    function login (req, res) {
        
        userSchema.findOne({ email: req.body.email },
                { full_name: 1, password: 1,roleNumber: 1, email: 1 }, function (err, doc) {
                    if (err) {
                        return res.status(500).send();
                    }
                    console.log(doc);
                    if (!doc || !crypto.compare(req.body.password, doc.password)) {
                        // user dos'nt exists
                        return res.status(401).send({ msg: "Email or passors not exists" });
                    }
                    var userToken = new UserToken(true, null,
                        doc.full_name, doc._id, doc.roleNumber, doc.email,
                        Date.now() + (60 * 1000 * 60));
                    res.status(200).send({ token: userToken.token, full_name: doc.full_name, email: doc.email, roleNumber: doc.roleNumber });
                console.log(send)
                })
        }
    return {
        getUser: getUser,
        updateUser:updateUser,
        create: create,
        deleteUser: deleteUser,
        getAll:getAll,
        login:login,
    }
}

module.exports = userController()


