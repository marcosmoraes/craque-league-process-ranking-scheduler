# API Documentation

## Endpoints

### POST /process-league
Processes a league's ranking data.

#### Request
```json
{
  "leagueId": "string"
}
```

#### Response (200)
```json
{
  "status": "PROCESSING",
  "messageId": "string",
  "timestamp": "string"
}
```

#### Response (400)
```json
{
  "message": "leagueId is required"
}
```

#### Response (500)
```json
{
  "message": "Internal Server Error"
}
```

## Message Models

### ProcessingMessage
```typescript
interface ProcessingMessage {
  leagueId: string;
  fixtures: Fixture[];
  timestamp: string;
  messageId: string;
}

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
}
```

## Error Codes
- 400: Bad Request - Invalid or missing parameters
- 500: Internal Server Error - Server internal error

## Limitations
- Processing timeout (defined by Lambda)
- Payload size limit (defined by API Gateway)
- Rate limiting (defined by API Gateway)
- SQS message size limit (256KB)

## Security
- IAM roles required
- API Gateway authentication
- SQS queue access control
- Environment variable encryption 