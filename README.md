# serverless-e2e-tests

An example of running E2E tests using the Serverless Framework. By default, they are executed every 30 minutes. You can change this by modifying `schedule: rate(30 minutes)` in `serverless.yml`.

Currently they test a simple example consumer flow:

```
Login -> Get Account Data -> Fin
```

Not setting the world on fire by any means, but could be a useful jump off point.

If there are any failures, they are logged, and a message is posted into a Slack room of your choosing.



## Prerequisites
Install Node and the Serverless CLI:

```bash
npm install -g serverless
```

## Deployment
```bash
E2E_USERNAME=<username> \ # This is just to show how environment variables can be set at deploy-time
E2E_PASSWORD=<password> \
SLACK_WEBHOOK_URL=<the url to the webhook in slack> \
serverless deploy
```

## Development
Invoke the E2E tests locally, passing the correct credentials:

```bash
E2E_USERNAME=<username> \
E2E_PASSWORD=<password> \
SLACK_WEBHOOK_URL=<the url to the webhook in slack> \
serverless invoke local -f consumer-e2e
```
