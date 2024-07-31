import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from '../app';
import path from 'path';
import connectDB  from './jest.setup'
import closeConn from './jest.teardown'

// Setup test database connection
beforeAll(async () => {
  await connectDB()
});

// Cleanup and disconnect after tests
afterAll(async () => {
  await closeConn()
});

describe('Book API', () => {
  let bookId: any;

  // Test Create Book
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        published_date: '2024-07-30',
        ISBN: '1234567890'
      });

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Book');
    bookId = res.body._id;
  });

  // Test Get All Books
  it('should get all books', async () => {
    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test Get Single Book
  it('should get a single book by ID', async () => {
    const res = await request(app).get(`/books/${bookId}`);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty('_id', bookId);
  });

  // Test Update Book
  it('should update a book by ID', async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .send({
        title: 'Updated Test Book'
      });

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.title).toBe('Updated Test Book');
  });

  // Test Update Book Cover Picture
  it('should update book cover picture', async () => {
    // For file upload testing, use a valid image file
    const res = await request(app)
      .patch(`/books/cover-image/${bookId}`)
      .attach('coverImage', path.join(__dirname, 'test-image.jpg'));

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.msg).toBe("Cover image updated successfully");
  });

  // Test Delete Book
  it('should delete a book by ID', async () => {
    const res = await request(app).delete(`/books/${bookId}`);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.msg).toBe('Book successfully deleted');
  });

  // Test Get Single Book After Deletion
  it('should return a 404 error for deleted book', async () => {
    const res = await request(app).get(`/books/${bookId}`);

    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
