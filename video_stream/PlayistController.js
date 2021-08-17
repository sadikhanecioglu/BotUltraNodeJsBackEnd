var express = require('express');
var router = express.Router();
var VerifyToken = require(__root + 'auth/VerifyToken');
var StreamPlayist = require('./StreamPlayist');
const { encrypt } = require('../utility/crypto');
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.post('/', VerifyToken, function (req, res) {

  
    StreamPlayist.create({
        name:req.body.name,
        streamurl:req.body.streamurl,
        outputservers:req.body.outputservers,
        isactive:req.body.isactive
    }, function (err, playist) {

        console.log(err)

        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(playist);

    });

});


//Getall task for user
router.get('/',VerifyToken,function(req,res){

    StreamPlayist.find({},function(err,playist){

        if (err) return res.status(500).send("There was a problem finding the servers.");
        res.status(200).send(playist);

    });

});

// UPDATES A SINGLE Task IN THE DATABASE
router.put('/', VerifyToken, function (req, res) {
 
    
    StreamPlayist.findOneAndUpdate({_id:req.body._id}, req.body, {new: true}, function (err, playist) {
        if (err) return res.status(500).send("There was a problem updating the playist.");
        res.status(200).send(playist);
    });
});

//Get single task for user
router.get('/:id',VerifyToken,function(req,res){

    StreamPlayist.find({_id:req.params.id},function(err,server){

        if (err) return res.status(500).send("There was a problem finding the Server.");
        res.status(200).send(server);

    });

});

// DELETES A task FROM THE DATABASE
router.delete('/:id', VerifyToken,function (req, res) {
    StreamPlayist.findOneAndRemove({_id:req.params.id}, function (err, playist) {
        if (err) return res.status(500).send("There was a problem deleting the Server.");
        res.status(200).send("Task: "+ playist.name +" was deleted.");
    });
});



router.post('/get/search',VerifyToken,function (req,res) {
    

    let filter = {};
    if(req.body.main.name)
    filter = {name:`/${req.bod.main.name}/`};

    StreamPlayist.paginate(filter,{offset:req.body.pageIndex,limit:req.body.pageSize},function(err,playist){

        if (err) return res.status(500).send(err);
        res.status(200).send({Result:playist.docs,TotalCount:playist.total});

    });

});








module.exports = router;