const express = require('express');
const personRoutes = express.Router();
const AWS = require('aws-sdk');
const configDB = require('./configDB');
var uuid = require('node-uuid');

AWS.config.update(configDB.aws_remote_config);
const docClient = new AWS.DynamoDB.DocumentClient();

// Require Business model in our routes module
// let Person = require('./persons.model');

// Defined store route
personRoutes.route('/add').post(function (req, res) {
    
    let Item = {...req.body};
    Item.idPerson = uuid.v1();
    var params = {
        TableName : configDB.aws_table_name,
        Item : Item
    }

    docClient.put(params,function(err,data){
        if(err){
            res.status(400).send("unable to save to database");
        }else{
            res.status(200).json({'person' : 'person in added successfully'});
        }
    });

    // person.save()
    //     .then(person => {
    //         res.status(200).json({'person': 'person in added successfully'});
    //     })
    //     .catch(err => {
    //         res.status(400).send("unable to save to database");
    //     });

});

// Defined get data(index or listing) route
personRoutes.route('/').get(function (req, res) {
    const params = {
        TableName: configDB.aws_table_name
    };

    docClient.scan(params,function(err,data){
        if(err){
            console.log(err);
            res.send({
                success : false,
                message : err
            });
        }else{
            const {Items} = data;
            // res.send({
            //     success : true,
            //     movies : Items
            // });
            res.json(Items);
        }
    });
    
    // Person.find(function(err, persons){
    //     if(err){
    //         console.log(err);
    //     }
    //     else {
    //         res.json(persons);
    //     }
    // });
});

// Defined edit route
personRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    var params = {
        TableName : configDB.aws_table_name,
        Key : {
            "idPerson" : id
        }
    }

    docClient.get(params,function(err,data){
        if(err)
            console.log(err);
        else
            res.json(data);
        //console.log(data);
        })
    // Person.findById(id, function (err, business){
    //     res.json(business);
    // });
});

//  Defined update route
personRoutes.route('/update/:id').post(function (req, res) {
    var params = {
        TableName : configDB.aws_table_name,
        Key : {
            "idPerson" : req.params.id,
        },
        UpdateExpression: "set #name=:na ,#company=:co ,#age=:ag",
        ExpressionAttributeNames: {
            "#name": "name",
            "#company": "company",
            "#age": "age",
        },
        ExpressionAttributeValues: {
            ":na": req.body.name,
            ":co": req.body.company,
            ":ag": req.body.age,
        },
        ReturnValues: "UPDATED_NEW",
        };

    docClient.update(params,function(err,data){
        if(err)
        {
            res.status(400).send("unable to update the database");
            console.log(err);
        }
        else
            res.json('Update complete');
    });
    
    // Person.findById(req.params.id, function(err, person) {
    //     if (!person)
    //         res.status(404).send("data is not found");
    //     else {
    //         console.log(person);
    //         person.name = req.body.name;
    //         person.company = req.body.company;
    //         person.age = req.body.age;

    //         person.save().then(business => {
    //             res.json('Update complete');
    //         })
    //             .catch(err => {
    //                 res.status(400).send("unable to update the database");
    //             });
    //     }
    // });
});

// Defined delete | remove | destroy route
personRoutes.route('/delete/:id').get(function (req, res) {
    const id = req.params.id;
    var params = {
        TableName : configDB.aws_table_name,
        Key : {
            "idPerson" : id 
        }
    };

    docClient.delete(params,function(err,data){
        if(err)
            res.json(err);
        else 
            res.json('Successfully removed');
    });
    
    // Person.findByIdAndRemove({_id: req.params.id}, function(err, person){
    //     if(err) res.json(err);
    //     else res.json('Successfully removed');
    // });
});

personRoutes.route('/find/:id').get(function(req,res){
    Person.find({_id:req.params.id},function(err,person){
        if(err)
            res.json(err);
        else
            res.json(person);
    });
});



module.exports = personRoutes;