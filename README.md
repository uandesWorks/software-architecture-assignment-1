# Assigment 01


## Installation
1. Create file called `.env` in the main folder of the project and add the `credentials` that we will pass in the `Report`.
2. Install Dependencies
```
npm install
```
`NOTE:` Maybe Your Computer need to install one of the dependencies in admin mode
   ```
   npm install -g nodemon
   ```

## Run Code 
   ```
   npm run dev
   ```
   Enter in this [url](http://localhost:8000) to see the web application

##  Populate Fake Data
```
npm run seedData
```

### Apis Querys
* [Postman Invitation](https://interstellar-eclipse-871816.postman.co/workspace/Testing-Architecture~8877c687-380f-4a88-9648-7d81b16a8c38/collection/18573767-f6961827-7f0b-4ee7-b68d-776047019fbb?action=share&creator=18573767)

## Models
- Authors (name, date of birth, country of origin, short description).
- Books (name, summary, date of publication, number of sales).
- Reviews (book, review, score from 1 to 5, number of up-votes).
- Sales by year (book, year, sales).

## Views
- Authors View: Here you can see the name, birthday, country and description of an Author and you have all the furncionalities of the CRUD.
- Books View: Here you can see the name, summary, publication date and total sales of a Book and you have all the furncionalities of the CRUD.
- Reviews View: Here you can see the book name, review, score and up votes of the Reviews and you have all the furncionalities of the CRUD.
- Sales View: Here you can see the book name, year and the sales of the book from Sales model and you have all the furncionalities of the CRUD.
- Information View: 
   - Authors data table: Table that shows authors, number of published books, average score and total sales. This table should have a sort and filter for each column.
   - Top 10 rated books: Table that shows the top 10 rated books of all time, with their most popular highest and lowest rated review.
   - Top 50 selling books: Table that shows the top 50 selling books of all time, showing their total sales for the book, total sales for the author, and if the book was the on the top 5 selling books the year of its publication.
- Search: A search window, that lets me input text, and returns a paginated list of books whose description contains any of the words in the search.