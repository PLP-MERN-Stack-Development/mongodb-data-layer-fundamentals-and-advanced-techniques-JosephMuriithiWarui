// queries.js
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const books = db.collection("books");

    // 1. Find all books in a specific genre
    await books.find({ genre: "Fiction" });
    ;

    // 2. Find books published after a certain year
    await books.find({ published_year: { $gt: 1947 } }).toArray();


    // 3. Find books by a specific author
    await books.find({ author: "Paulo Coelho" }).toArray();
    

    // 4. Update the price of a specific book
    await books.updateOne(
      { _id: new ObjectId("68dcfb198450a8ac428ec243") },
      { $set: { price: 20.99 } }
    );

    // 5. Delete a book by its title
    await books.deleteOne({ title: "The Alchemist" });

    // 6. Books in stock and published after 2010
    await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    });

    // 7. Projection: return only title, author, price
    await books.find(
      {},
      { projection: { _id: 0, title: 1, author: 1, price: 1 } }
    );

    // 8. Sorting by price
    await books.find().sort({ price: 1 });
    const descSort = await books.find().sort({ price: -1 });

    // 9. Pagination (5 per page)
    await books.find().limit(5).skip(0);
    await books.find().limit(5).skip(5);
    

    // 10. Aggregation: average price by genre
    await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]);
    

    // 11. Aggregation: author with most books
    await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]);
    

    // 12. Group by decade
    await books.aggregate([
      { $project: { decade: { $multiply: [10, { $floor: { $divide: ["$published_year", 10] } }] } } },
      { $group: { _id: "$decade", totalBooks: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    

    // 13. Index creation
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });
    
    // 14. Explain with index
    await books.find({ author: "George Orwell" }).sort({ published_year: -1 }).explain("executionStats");
  }
}

runQueries();
