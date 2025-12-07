# Wiki API Routes Documentation

Stub API routes for the Next.js wiki application using App Router format. These are mock implementations for development and learning purposes.

## Overview

All routes use Next.js 15 App Router API format with TypeScript. They return proper HTTP status codes and log all operations to the console for debugging.

**Authentication**: This project uses [Stack Auth SDK](https://docs.stack-auth.com/docs/next/getting-started/setup) for user authentication and authorization. No custom auth routes are needed.

## Base URL

`/api/`

## Routes

### 1. Articles Collection

**`/api/articles`**

#### GET - List All Articles

- **Purpose**: Retrieve all articles
- **Returns**: Array of articles with metadata
- **Status**: 200 (success), 500 (error)
- **Mock Data**: 3 sample articles

```typescript
// Response format
{
  success: boolean
  data: Article[]
  message: string
}
```

#### POST - Create New Article

- **Purpose**: Create a new article
- **Body**: Article object (title, content, authorId, etc.)
- **Returns**: Created article with generated ID and timestamp
- **Status**: 201 (created), 500 (error)

```typescript
// Request body
{
  title: string
  content: string
  authorId: string
  authorName: string
  imageUrl?: string
}

// Response format
{
  success: boolean
  data: Article
  message: string
}
```

### 2. Individual Article

**`/api/articles/[id]`**

#### GET - Get Single Article

- **Purpose**: Retrieve a specific article by ID
- **Params**: `id` - Article identifier
- **Returns**: Single article object
- **Status**: 200 (found), 404 (not found), 500 (error)

#### PUT - Update Article

- **Purpose**: Update an existing article
- **Params**: `id` - Article identifier
- **Body**: Updated article fields
- **Returns**: Updated article object
- **Status**: 200 (updated), 404 (not found), 500 (error)

#### DELETE - Delete Article

- **Purpose**: Delete an article
- **Params**: `id` - Article identifier
- **Returns**: Success confirmation with deleted ID
- **Status**: 200 (deleted), 404 (not found), 500 (error)

### 3. File Upload

**`/api/upload`**

#### POST - Upload Files

- **Purpose**: Handle file uploads for articles
- **Body**: FormData with files
- **Returns**: File URLs and metadata
- **Status**: 201 (uploaded), 400 (invalid), 500 (error)

```typescript
// Response format
{
  success: boolean
  url?: string
  filename?: string
  message: string
  data?: FileInfo | { files: FileInfo[] }
}
```

#### GET - Upload Configuration

- **Purpose**: Get upload limits and allowed file types
- **Returns**: Upload configuration object
- **Status**: 200 (success)

## Data Types

### Article

```typescript
interface Article {
  id: string;
  title: string;
  content: string; // Markdown content
  authorId: string;
  authorName: string;
  createdAt: string; // ISO timestamp
  imageUrl?: string; // Optional header image
}
```

### Authentication

**Note**: Authentication is handled by [Stack Auth SDK](https://docs.stack-auth.com/docs/next/getting-started/setup). User types and authentication endpoints are provided by Stack Auth, not custom API routes.

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## Mock Data

### Sample Articles

- **Article 1**: "Welcome to WikiFlow" - Getting started guide
- **Article 2**: "Markdown Guide" - How to write in Markdown
- **Article 3**: "Advanced Features" - Advanced wiki features

### Sample User

- **ID**: user-123
- **Name**: John Doe
- **Email**: john.doe@example.com
- **Role**: editor

## Console Logging

All API routes log detailed information:

- 📄 Article operations
- 📝 Create/update operations
- 🗑️ Delete operations
- 📁 File upload operations
- ✅ Success operations
- ❌ Error conditions

**Note**: User authentication logging is handled by Stack Auth SDK.

## Testing the APIs

### Using curl

```bash
# Get all articles
curl http://localhost:3000/api/articles

# Get single article
curl http://localhost:3000/api/articles/1

# Create new article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article","content":"# Test\nContent"}'

# Upload file
curl -X POST http://localhost:3000/api/upload \
  -F "files=@example.jpg"
```

**Note**: Authentication endpoints are provided by Stack Auth SDK.

### Using JavaScript fetch

```javascript
// Get articles
const articles = await fetch("/api/articles").then((res) => res.json());

// Create article
const newArticle = await fetch("/api/articles", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My Article",
    content: "# Hello World",
    authorId: "user-123",
    authorName: "John Doe",
  }),
}).then((res) => res.json());
```

## Real Implementation Notes

When implementing these APIs for production:

### Database Integration

- Replace mock data with database queries
- Add proper error handling and validation
- Implement pagination for article listings
- Add search and filtering capabilities

### Authentication & Authorization

**Note**: Authentication is handled by Stack Auth SDK. When integrating:
- Use Stack Auth hooks and components for user management
- Check user permissions using Stack Auth's role-based system
- Add rate limiting and security measures as needed

### File Upload

- Integrate with cloud storage (AWS S3, Google Cloud)
- Add file type and size validation
- Implement image resizing and optimization
- Add malware scanning

### Data Validation

- Use libraries like Zod or Joi for request validation
- Sanitize user input to prevent XSS
- Validate markdown content
- Check for required fields

### Error Handling

- Add proper error logging
- Implement retry mechanisms
- Add monitoring and alerting
- Return appropriate error messages

### Performance

- Add caching for frequently accessed articles
- Implement database indexing
- Add compression for API responses
- Optimize query performance

## Development

The API routes are automatically available when running the Next.js development server:

```bash
npm run dev
```

All routes will be accessible at `http://localhost:3000/api/*` and will log operations to the console for debugging.
