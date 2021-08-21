var Userdb = require('../model/model');

//Create & save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can't be empty."});
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender
    })

    //save user
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occured in a create operation."
            });
        });
}


//retrieve & return user(s)
exports.find = (req,res) =>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "Not found user with given id" + id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Error retrieving user with id" + id})
        })
    }else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Haiya Error occured while retrieving user"})
        })
    }

}

//update user by id
exports.update = (req,res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can't be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, { useFindAndModify: false})
        .then(data => {
        if(!data){
            res.status(400).send({message: `Can't update user with ${id}`})
        }else{
            res.send(data)
        }
        })
        .catch(err =>{
            res.status(500).send({message: "Can't update user."})
        })
}

//Delete user by id
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Singer was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Singer with id=" + id
            });
        });
}