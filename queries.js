// Write MongoDB queries to:
// Find all books in a specific genre
    db.books.find({ genre: "Fiction" })

// Find books published after a certain year
    db.books.find({published_year: {$gt: 1947}})
// Find books by a specific author
    db.books.find({author: "Paulo Coelho"})

// Update the price of a specific book
    db.books.updateOne({
    _id: ObjectId('68dcfb198450a8ac428ec243')},
    {$set: {price: 20.99}})

// Delete a book by its title
    db.books.deleteOne({ title: "The Alchemist" })


// Task 3: Advanced Queries
// Write a query to find books that are both in stock and published after 2010
    db.books.find({ 
    in_stock: true,
    published_year: { $gt: 2010 }
    })

// Use projection to return only the title, author, and price fields in your queries
    db.books.find( {}, {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
})

// Implement sorting to display books by price (both ascending and descending)
    //Ascending
    db.books.find().sort({price: 1})
    //Descending
    db.books.find().sort({price: -1})

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
    //limit
    db.books.find().limit(5).skip(0)
    db.books.find().limit(5).skip(5)
    db.books.find().limit(5).skip(10)

// Task 4: Aggregation Pipeline
//Create an aggregation pipeline to calculate the average price of books by genre
    db.books.aggregate([
    {
        $group: {
        _id: "$genre",                  // group by genre
        averagePrice: { $avg: "$price"} // calculate average price
        }
    }
    ])


// Create an aggregation pipeline to find the author with the most books in the collection
    db.books.aggregate([
    {
        $group: {
        _id: "$author",         
        totalBooks: { $sum: 1 }
        }
    },
    {
        $sort: { totalBooks: -1 }
    },
    {
        $limit: 1
    }
    ])

// Implement a pipeline that groups books by publication decade and counts them
    db.books.aggregate([
    {
        $project: {
        decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] }
        }
    },
    {
        $group: {
        _id: { $multiply: ["$decade", 10] }, // convert back to actual decade (e.g., 1990)
        totalBooks: { $sum: 1 }
        }
    },
    {
        $sort: { _id: 1 } // sort decades in ascending order
    }
    ])

// Create an index on the `title` field for faster searches
    db.books.createIndex({ title:1 })

// Create a compound index on `author` and `published_year`
   db.books.createIndex({ author: 1, published_year: -1 })

// Use the `explain()` method to demonstrate the performance improvement with your indexes
    db.books.find({ 
        author: "George Orwell" }).sort({ published_year: -1 }).explain("executionStats")




