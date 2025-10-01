## 📌 Project Overview
This project demonstrates MongoDB fundamentals and advanced queries including:
- CRUD operations
- Projections
- Sorting
- Pagination
- Aggregation pipelines
- Indexes and performance optimization

The database used is `books_db` with a collection named `books`.

## 📂 Project Structure
mongodb-data-layer-fundamentals-and-advanced-techniques-JosephMuriithiWarui/
│── week1-assignment.md
│── queries.js
│── insert_books.js
│── README.md          
│── screenshots/
│    ├── collections.png
│── .gitignore             

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-JosephMuriithiWarui.git
cd mongodb-data-layer-fundamentals-and-advanced-techniques-JosephMuriithiWarui
2. Open Mongo Shell
Make sure MongoDB is running locally or on Atlas, then run:
mongosh
3. Select the Database
use books_db
node insert_books.js
node queries.js


📄 Assignment Tasks Covered

Basic Queries
Find books by genre
Find books published after a certain year
Find books by author
Update book price
Delete a book by title
Advanced Queries
Find in-stock books published after 2010
Projection (title, author, price only)
Sorting (ascending & descending by price)
Pagination (5 books per page)
Aggregation
Average book price by genre
Author with the most books
Books grouped by decade
Indexes
Index on title
Compound index on author + published_year
Query performance check using explain()