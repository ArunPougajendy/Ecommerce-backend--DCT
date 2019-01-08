function Book() {

}

Book.data = [
    {id: 1, name: 'Harry Potter', author: 'JK Rowling'},
    {id: 2, name: 'Lord Of The Rings', author: 'Mark'}
];

Book.all = function() {
    return Book.data;
}

Book.findById = function(id) {
    return Book.data.find( book => book.id == id);
}

module.exports = { Book };