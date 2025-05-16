# System Components

## Data Models
### League
```typescript
interface League {
  id: string;
  name: string;
  status: string;
  fixtures: Fixture[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Fixture
```typescript
interface Fixture {
  id: string;
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  status: string;
  score?: {
    home: number;
    away: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## Services
### LeagueService (domain/service/league-service.js)
- `getOngoingLeagues()`: Retrieves active leagues
- `processLeagueData(league)`: Processes league data
- `validateLeague(league)`: Validates league data

### QueueService (infrastructure/queue/sqs-queue.js)
- `sendMessageToQueue(queueUrl, messageBody)`: Sends messages to SQS
- Message validation and error handling
- Timestamp tracking

## Data Access
### MongoDB
- Connection configured in `infrastructure/database/`
- Optimized queries for league data
- Connection pooling
- SSL/TLS enabled

## Processing Flow
1. **Retrieve Leagues**
   - Query active leagues
   - Validate league data
   - Filter relevant leagues

2. **Process Data**
   - Extract fixture information
   - Prepare processing data
   - Validate data structure

3. **Queue Processing**
   - Format message payload
   - Send to SQS queue
   - Track message status

4. **Error Handling**
   - Capture processing errors
   - Log error details
   - Implement retry logic

## Message Structure
```typescript
interface ProcessingMessage {
  leagueId: string;
  fixtures: Fixture[];
  timestamp: string;
  messageId: string;
}
```

## Error Handling
1. **Database Errors**
   - Connection failures
   - Query timeouts
   - Data validation errors

2. **Queue Errors**
   - Message sending failures
   - Queue access issues
   - Message validation errors

3. **Processing Errors**
   - Data processing failures
   - Business logic errors
   - Validation failures 