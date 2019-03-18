const express = require('express');

const router = express.Router();

const queries = require('../db/queries'); //..(go out of current folder /db go in db folder, and get queries.js, file name/ not export)//no need to to write js

function validProduct(product)
{
    return typeof product.title == 'string' &&
    product.title.trim() != '' &&
    !isNaN(product.price) &&
    product.price > 0 && 
    Number.isInteger(product.quantity) &&
    product.quantity >= 0;
}

function validId(req, res, next)
{
    if(!isNaN(req.params.id))
    {
       next(); //go on to the next thing
    }else{
        const error = new Error('Invalid id');
        next(error);
    }
}

function validProductMiddleWare(req,res,next)
{
    if(validProduct(req.body))
    {
         next();
    }

    //it is showing price in string instead of numbers
    else {
         const error = new Error('InValid Product');
         next(error);
    }
     
}
function  getProductFromBody(body){
    const  { title, description, price, quantity, image } = body;

    const product = {
        title,
        description,
        price,
        quantity,
        image
    };

    return product;
}

     

router.get('/', (req, res) => { //(req, res)are parameter function
    queries
        .getAll() //object and it method queries..getAll()
        .then(products => { // i should get back some products, product parameter
        res.json(products); 
        });
        
});

router.get('/:id', validId, (req, res,next) => { //(req, res)are parameter function
     
        //find it in db
        queries
            .getOne(req.params.id)
            .then(product => {
                if(product)
                {
                    res.json(product)
                }
                else
                {
                    next();
                }
            });    
});

router.post('/', validProductMiddleWare, (req, res,next) => {
   
   
   //console.log(req.body);
    
      const product = getProductFromBody(req.body);

        queries
            .create(product)
            .then(id => {
                res.json({
                    id
                });
            });
   
    
});

router.put('/:id', validId, validProductMiddleWare, (req,res) => {
    const product = getProductFromBody(req.body);
    queries
        .update(req.params.id, product)
        .then(() => {
            res.json({
                message:'updated'
            });
        });
});

router.delete('/:id', validId, (req, res) => {
queries
    .delete(req.params.id)//delete same name in queries
        .then(() => {
            res.json({
                message:'deleted'
            });
        });
});
module.exports = router;