# Development Process

## Development Environment
### Prerequisites
- Node.js 18.x
- MongoDB
- AWS Account
- Serverless Framework CLI
- AWS CLI configured

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit the .env file with your credentials
   ```
4. Start local environment:
   ```bash
   serverless offline
   ```

## Development Workflow
1. Create a branch for your feature
2. Implement changes
3. Test locally using serverless offline
4. Commit changes
5. Create a Pull Request
6. After approval, merge to main

## Testing
### Local Testing
- Use local endpoint: `http://localhost:3000`
- Test league processing
- Check SQS message sending

### Test Examples
```bash
# Test league processing
curl -X POST http://localhost:3000/process-league \
  -H "Content-Type: application/json" \
  -d '{"leagueId": "123"}'
```

## Monitoring
- CloudWatch for production logs
- Performance metrics:
  - Processing time
  - Error rate
  - Memory usage
  - SQS message latency

## Maintenance
### Routines
- Monitor processing logs
- Check SQS queue status
- Update dependencies periodically
- Review error logs

### Troubleshooting
1. Check CloudWatch logs
2. Validate MongoDB connection
3. Confirm SQS queue access
4. Check processing status

## Deployment
### Development
```bash
serverless deploy --stage dev
```

### Production
```bash
serverless deploy --stage prod
```

### Rollback
```bash
serverless rollback --stage prod
``` 