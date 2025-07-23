## Feedback API Documentation

### Endpoints

- **POST /feedback** – Add new feedback
- **GET /feedback** – Retrieve all feedback
- **PUT /feedback/:id/vote** – Upvote or downvote feedback
- **DELETE /feedback/:id** – Delete specific feedback

### Example Feedback Object

```json
{
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great product!",
    "votes": 3
}
```