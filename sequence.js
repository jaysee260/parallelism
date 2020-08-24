require('dotenv').config();
const fetch = require('node-fetch');
const Reporter = require('./utils/reporter');
const { port, requestLatencyInMs, reportName, numOfRequests } = process.env;

(async () => {
  const reporter = new Reporter(reportName);
  reporter.timer.start();

  console.log(`about to kick off ${numOfRequests} requests in sequence`);

  for (let i = 1; i <= numOfRequests; i++) {
    console.log(`kicking off request number ${i}`);
    await fetch(`http://localhost:${port}/processJob`);
  }

  reporter.timer.end();
  reporter.report({
    latency: requestLatencyInMs,
    approach: 'in sequence',
    requests: numOfRequests
  });
})()
