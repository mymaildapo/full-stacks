const connection = require ('./connection'); //./ mean same folder, cant be /connection it will think it is in the root
// require ('./connection') IS THE name of the js file everytime, not the export, 
//object
module.exports = {
     getAll(){ // method
        return connection('product'); //this will return connection with product [everything in product]
            //this is like select * from product table
    },
    getOne(id)
    {
        return connection('product').where('id',id).first();
        
    },
    create(product) {
        return connection('product').insert(product,'id').then(ids=>
            {
                return ids[0];

            });
    },
    update(id,product)
    {
        return connection('product').where('id',id).update(product);
    },
    delete(id)
    {
        return connection('product').where('id',id).del();
    }

};
