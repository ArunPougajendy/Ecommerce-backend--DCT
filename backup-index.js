const express = require('express');
const app = express();
const port = 3001;

let products = [{ id: 1,name:'Pen',price:10},
                { id: 2,name:'Scale', price :15},
                { id: 3,name:'Marker',price:25}];

let users = [
    {id: 1, email: '1@gmail.com', name:'user1'},
    {id: 2, email: '2@gmail.com', name:'user2'},
    {id: 3, email: '3@gmail.com', name:'user3'}
];
//Route Handlers
//console.log(app);
app.get('/',function(req,res){
    //res.send('<h2> Hello World </h2>');
    //res.send('Hello World');
    console.log(req);

    res.send({Notice : 'Hello World'});
});

app.get('/about',(req,res) =>{
    res.send('<h2> About Page </h2>');
});

app.get('/contact',(req,res)=> {
    res.send('<h2> Contact Page </h2>');
});

app.get('/about/contact',(req,res)=> {
    res.send('<h2> About Contact Page </h2>');
});


app.get('/products',(req,res)=>{
    res.send(products);
})

app.get('/products/:id',(req,res)=>{
    let id = req.params.id;
    let product = products.find((prod) => prod.id == id);
    if(product)
        res.send(product);
    else   
        res.send({
            notice: 'No such Product'
        });
});

app.get('/products/name/:name',(req,res) => {
    let name = req.params.name;
    let filteredProducts = products.filter(prod =>
        prod.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    if(filteredProducts)
        res.send(filteredProducts);
    else  
        res.send({
        notice: 'No such Product'
        });  

});

app.get('/users',(req,res)=> {
    res.send(users);
})

app.get('/users/show/id/:id',(req,res) =>{
    let id = req.params.id;
    let selectedUser = users.find((user)=> {
        return user.id == id});
    if(selectedUser)
        res.send(selectedUser);
    else
        res.send({
        notice: 'No such User'
        });
});

app.get('/users/show/name/:name',(req,res) => {
    let name = req.params.name;
    let foundUser = users.find((user) => {return user.name == name});
    if(foundUser)
        res.send(foundUser);
    else
        res.send({
            notice: 'No such User'
            })
});

app.get('/users/show/email/:email',(req,res) => {
    let email = req.params.email;
    let foundEmail = users.find((user) => user.email == email);
    if(foundEmail)
        res.send(foundEmail);
    else
        res.send({
            notice: 'No such EMail'
            });
})

app.listen(port, () => {
    console.log('Listening to Port :'+port);
});