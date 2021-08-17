var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Task = require('./Task');

//Create New Task

router.post('/', VerifyToken, function (req, res) {

  
    Task.create({
        name:req.body.name,
        description:req.body.description,
        createddate:Date().toString(),
        status:req.body.status,
        sourceid:req.userId,
        source:'user',
        sessioninfo : req.body.sessioninfo,
        exportinfo:req.body.exportinfo,
        isactive:req.body.isactive
    }, function (err, task) {

        console.log(err)

        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(task);

    });

});

//Getall task for user
router.get('/',VerifyToken,function(req,res){

    Task.find({source:'user' ,sourceid:req.userId},function(err,tasks){

        if (err) return res.status(500).send("There was a problem finding the tasks.");
        res.status(200).send(tasks);

    });

});

// UPDATES A SINGLE Task IN THE DATABASE
router.put('/', VerifyToken, function (req, res) {
 
    Task.findOneAndUpdate({_id:req.body._id,source:'user',sourceid:req.userId}, req.body, {new: true}, function (err, task) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(task);
    });
});

//Get single task for user
router.get('/:id',VerifyToken,function(req,res){

    Task.find({_id:req.params.id,source:'user',sourceid:req.userId},function(err,task){

        if (err) return res.status(500).send("There was a problem finding the task.");
        res.status(200).send(task);

    });

});

// DELETES A task FROM THE DATABASE
router.delete('/:id', VerifyToken,function (req, res) {
    Task.findOneAndRemove({_id:req.params.id,source:'user',sourceid:req.userId}, function (err, task) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("Task: "+ task.name +" was deleted.");
    });
});








module.exports = router;
