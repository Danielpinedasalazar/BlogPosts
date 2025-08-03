# NestJS Blog API

A comprehensive blog management system built with NestJS, TypeORM, and PostgreSQL. This application provides a complete REST API for managing users, posts, tags, and meta options with authentication and pagination support.

## 🚀 Features

- **User Management**: Create, read, update, and delete users with secure password hashing
- **Post Management**: Full CRUD operations for blog posts with rich metadata
- **Tag System**: Organize posts with flexible tagging system
- **Meta Options**: Extensible metadata system for posts
- **Authentication**: Secure user authentication with bcrypt
- **Pagination**: Built-in pagination support for all list endpoints
- **Validation**: Comprehensive input validation using class-validator
- **Swagger Documentation**: Auto-generated API documentation
- **Environment Configuration**: Multi-environment configuration support
- **TypeORM Integration**: Database management with PostgreSQL

## 🏗️ Architecture

### Core Modules

- **Users Module**: User management and authentication
- **Posts Module**: Blog post CRUD operations
- **Tags Module**: Tag management system
- **Meta Options Module**: Extensible metadata system
- **Auth Module**: Authentication and authorization
- **Pagination Module**: Reusable pagination functionality

### Database Schema

#### Users

- `id`: Primary key
- `firstName`: User's first name (required)
- `lastName`: User's last name (optional)
- `email`: Unique email address (required)
- `password`: Hashed password (required)
- `posts`: One-to-many relationship with posts

#### Posts

- `id`: Primary key
- `title`: Post title (required)
- `postType`: Enum (POST, PAGE, etc.)
- `slug`: Unique URL slug (required)
- `status`: Enum (DRAFT, PUBLISHED, etc.)
- `content`: Post content (optional)
- `schema`: JSON schema for structured data (optional)
- `featuredImageUrl`: Featured image URL (optional)
- `publishOn`: Publication date (optional)
- `author`: Many-to-one relationship with users
- `tags`: Many-to-many relationship with tags
- `metaOptions`: One-to-one relationship with meta options

#### Tags

- `id`: Primary key
- `name`: Tag name (required)
- `posts`: Many-to-many relationship with posts

#### Meta Options

- `id`: Primary key
- `metaValue`: JSON metadata (required)
- `post`: One-to-one relationship with posts

## 🛠️ Tech Stack

- **Framework**: NestJS 10.x
- **Database**: PostgreSQL with TypeORM
- **Authentication**: bcrypt for password hashing
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Configuration**: @nestjs/config with Joi validation
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nestjs-intro
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   Create environment files based on your environment:

   **Development** (`.env.development`):

   ```env
   NODE_ENV=development
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
   DATABASE_SYNC=true
   DATABASE_AUTOLOAD=true
   ```

   **Production** (`.env.production`):

   ```env
   NODE_ENV=production
   DATABASE_HOST=your_prod_host
   DATABASE_PORT=5432
   DATABASE_USER=your_prod_user
   DATABASE_PASSWORD=your_prod_password
   DATABASE_NAME=your_prod_db
   DATABASE_SYNC=false
   DATABASE_AUTOLOAD=true
   ```

4. **Database Setup**

   ```bash
   # Create PostgreSQL database
   createdb your_db_name
   ```

5. **Run the application**

   ```bash
   # Development mode
   pnpm start:dev

   # Production mode
   pnpm build
   pnpm start:prod
   ```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## 🔌 API Endpoints

### Users

- `GET /users` - Get all users (with pagination)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `POST /users/create-many` - Create multiple users
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts

- `GET /posts` - Get all posts (with pagination)
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create a new post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Tags

- `GET /tags` - Get all tags
- `POST /tags` - Create a new tag
- `DELETE /tags/:id` - Delete tag

### Meta Options

- `POST /meta-options` - Create meta options for a post

## 📝 Example API Requests

### Create a User

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Create a Post

```http
POST http://localhost:3000/posts
Content-Type: application/json

{
  "title": "What's new with NestJS",
  "postType": "post",
  "slug": "new-with-nestjs-10",
  "status": "draft",
  "content": "This is the post content...",
  "schema": "{\"@context\": \"https://schema.org\", \"@type\": \"Article\"}",
  "featuredImageUrl": "http://example.com/image.jpg",
  "authorId": 1,
  "tags": [1, 2],
  "metaOptions": {
    "metaValue": "{\"sidebarEnabled\": true, \"footerActive\": true}"
  }
}
```

### Get Posts with Pagination

```http
GET http://localhost:3000/posts/?limit=10&page=1
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## 📖 Documentation Generation

Generate comprehensive documentation using Compodoc:

```bash
pnpm doc
```

This will start a documentation server at `http://localhost:3001`

## 🔧 Development Scripts

- `pnpm start:dev` - Start development server with hot reload
- `pnpm build` - Build the application
- `pnpm start:prod` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test:watch` - Run tests in watch mode

## 🏛️ Project Structure

```
src/
├── auth/                 # Authentication module
├── common/              # Shared utilities and modules
│   └── pagination/      # Pagination functionality
├── config/              # Configuration files
├── meta-options/        # Meta options module
├── posts/               # Posts module
├── tags/                # Tags module
├── users/               # Users module
├── app.controller.ts    # Main application controller
├── app.module.ts        # Root module
├── app.service.ts       # Main application service
└── main.ts             # Application entry point
```

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- Environment-based configuration
- SQL injection protection via TypeORM
- CORS configuration (configurable)

## 🌍 Environment Variables

| Variable            | Description               | Default      |
| ------------------- | ------------------------- | ------------ |
| `NODE_ENV`          | Environment mode          | `production` |
| `DATABASE_HOST`     | Database host             | `localhost`  |
| `DATABASE_PORT`     | Database port             | `5432`       |
| `DATABASE_USER`     | Database username         | -            |
| `DATABASE_PASSWORD` | Database password         | -            |
| `DATABASE_NAME`     | Database name             | -            |
| `DATABASE_SYNC`     | Auto-sync database schema | `false`      |
| `DATABASE_AUTOLOAD` | Auto-load entities        | `true`       |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.
