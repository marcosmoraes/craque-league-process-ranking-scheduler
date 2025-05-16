# Project Overview

## Name
League Process Ranking Scheduler

## Description
Service responsible for scheduling and processing league rankings in the Craque system. The service retrieves and processes data to calculate user points in leagues, including score predictions and player bets, sending them to SQS for ranking calculation.

## Main Features
- Schedule league ranking processing
- Retrieve league data
- Process user points
- Send data to SQS for calculation
- Event logging and monitoring

## Technology Stack
- Node.js 18.x
- AWS Lambda
- AWS SQS
- Serverless Framework
- MongoDB (for data storage)
- Serverless Offline (for local development)

## Repository Structure
```
.
├── api/           # API endpoints
├── config/        # Configuration files
├── domain/        # Business logic and models
├── infrastructure/# Infrastructure configurations
├── handler.js     # Lambda functions entry point
├── serverless.yml # Serverless Framework configuration
└── package.json   # Project dependencies
```

## Environment Variables
- `MONGODB_USERNAME`: MongoDB username
- `MONGODB_PASSWORD`: MongoDB password
- `MONGODB_HOST`: MongoDB host
- `DATABASE`: Main database name
- `DATABASE_CRAQUE`: Craque database name
- `PROCESSING_QUEUE_URL`: SQS queue URL for processing
- `AWS_REGION`: AWS region for services
- `NODE_ENV`: Execution environment (development/production)
- `LOG_LEVEL`: System log level 