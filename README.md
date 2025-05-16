# League Process Ranking Scheduler

Service responsible for scheduling and processing league rankings in the Craque system.

## 🚀 Technologies

- Node.js 18.x
- MongoDB
- AWS Lambda
- AWS SQS
- Serverless Framework
- Serverless Offline

## 📋 Prerequisites

- Node.js 18.x
- MongoDB
- AWS Account
- Serverless Framework CLI
- AWS CLI configured

## 🔧 Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit the .env file with your credentials
```

4. Run locally
```bash
serverless offline
```

## 🔒 Security Considerations

- All sensitive credentials are stored in environment variables
- MongoDB connections use SSL/TLS
- AWS credentials are managed through IAM roles
- SQS messages include timestamps for tracking
- Error messages are sanitized to prevent information leakage

## 🛠️ Development

### Useful Commands

- Local development: `serverless offline`
- Dev deployment: `serverless deploy --stage dev`
- Prod deployment: `serverless deploy --stage prod`

## 📝 License

This project is licensed under the [MIT](LICENSE) license.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
