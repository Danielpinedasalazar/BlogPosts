# NestJS Blog API

A comprehensive blog application built with NestJS, featuring user authentication, post management, file uploads, and more.

## 🚀 Features

- **User Management**: Complete user CRUD operations with Google OAuth integration
- **Authentication**: JWT-based authentication with access and refresh tokens
- **Post Management**: Create, read, update, and delete blog posts with status management
- **Tag System**: Organize posts with tags
- **File Uploads**: AWS S3 integration for file uploads
- **Email System**: Welcome emails and notifications using Nodemailer
- **Pagination**: Built-in pagination support for all list endpoints
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: PostgreSQL with TypeORM
- **Testing**: Unit and E2E tests with Jest
- **Validation**: Request validation using class-validator
- **Environment Configuration**: Multi-environment support

## 🛠️ Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Google OAuth
- **File Storage**: AWS S3
- **Email**: Nodemailer with EJS templates
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- AWS S3 bucket (for file uploads)
- Google OAuth credentials (for social login)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nestjs-intro
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create environment files based on your environment:

   ```bash
   # For development
   cp .env.example .env.development

   # For production
   cp .env.example .env.production
   ```

   Required environment variables:

   ```env
   NODE_ENV=development
   DATABASE_PORT=5432
   DATABASE_HOST=localhost
   DATABASE_NAME=your_database_name
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   PROFILE_API_KEY=your_profile_api_key
   JWT_SECRET=your_jwt_secret
   JWT_TOKEN_AUDIENCE=your_jwt_audience
   JWT_TOKEN_ISSUER=your_jwt_issuer
   JWT_ACCESS_TOKEN_TTL=3600
   JWT_REFRESH_TOKEN_TTL=86400
   API_VERSION=v1
   AWS_PUBLIC_BUCKET_NAME=your_s3_bucket
   AWS_REGION=your_aws_region
   AWS_CLOUDFRONT_URL=your_cloudfront_url
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY_ID=your_aws_secret_key
   MAIL_HOST=your_smtp_host
   SMTP_USERNAME=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   ```

4. **Database Setup**

   Update the TypeORM CLI configuration in `typeorm-cli.config.ts` with your database credentials, then run:

   ```bash
   # Run migrations
   pnpm run migration:run
   ```

## 🏃‍♂️ Running the Application

### Development

```bash
pnpm run start:dev
```

### Production

```bash
pnpm run build
pnpm run start:prod
```

### Debug Mode

```bash
pnpm run start:debug
```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## 🧪 Testing

### Unit Tests

```bash
pnpm run test
```

### E2E Tests

```bash
pnpm run test:e2e
```

### Test Coverage

```bash
pnpm run test:cov
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── config/          # JWT configuration
│   ├── decorators/      # Custom decorators
│   ├── dtos/           # Data transfer objects
│   ├── guards/         # Authentication guards
│   ├── providers/      # Auth services
│   └── social/         # Google OAuth integration
├── common/             # Shared modules
│   ├── interceptors/   # Response interceptors
│   └── pagination/     # Pagination utilities
├── config/             # Configuration files
├── mail/               # Email functionality
├── meta-options/       # Meta options management
├── posts/              # Blog posts module
├── tags/               # Tags management
├── uploads/            # File upload functionality
├── users/              # User management
└── migrations/         # Database migrations
```

## 🔐 Authentication

The application supports multiple authentication methods:

### JWT Authentication

- Access tokens for API access
- Refresh tokens for token renewal
- Configurable token expiration

### Google OAuth

- Social login integration
- Automatic user creation for Google users

## 📝 API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users (with pagination)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Authentication

- `POST /auth/signin` - Sign in with email/password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/google` - Google OAuth authentication

### Posts

- `POST /posts` - Create a new post
- `GET /posts` - Get all posts (with pagination)
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Tags

- `POST /tags` - Create a new tag
- `GET /tags` - Get all tags
- `DELETE /tags/:id` - Delete tag

### File Uploads

- `POST /uploads` - Upload file to AWS S3

## 🔧 Configuration

### Database Configuration

The application uses TypeORM with PostgreSQL. Configuration is handled through environment variables and the `database.config.ts` file.

### AWS Configuration

File uploads are handled through AWS S3. Configure your AWS credentials and bucket settings in the environment variables.

### Email Configuration

Email functionality uses Nodemailer with SMTP configuration. Set up your SMTP credentials in the environment variables.

## 📦 Available Scripts

- `pnpm run build` - Build the application
- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with hot reload
- `pnpm run start:debug` - Start in debug mode
- `pnpm run start:prod` - Start in production mode
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run E2E tests
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run doc` - Generate API documentation

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

## 🔄 Migration Commands

```bash
# Generate a new migration
pnpm run migration:generate -- -n MigrationName

# Run migrations
pnpm run migration:run

# Revert last migration
pnpm run migration:revert
```

## 🚀 Deployment

The application is ready for deployment to various platforms:

- **Docker**: Use the provided Dockerfile
- **Heroku**: Configure environment variables and deploy
- **AWS**: Deploy to EC2 or use AWS Elastic Beanstalk
- **Vercel**: Deploy as a serverless function

Make sure to set all required environment variables in your deployment environment.
