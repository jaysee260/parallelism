require('dotenv').config();
const fetch = require('node-fetch');
const Reporter = require('./utils/reporter');
const { port, requestLatencyInMs, reportName, numOfRequests } = process.env;

(async () => {
  const reporter = new Reporter(reportName)
  reporter.timer.start()
  
  const requests = []

  console.log(`about to kick off ${numOfRequests} requests in parallel`)

  for (let i = 1; i <= numOfRequests; i++) {
    console.log(`kicking off request number ${i}`)

    requests.push(fetch(`http://localhost:${port}/processJob`))
  }

  await Promise.all(requests)

  reporter.timer.end();
  reporter.report({
    latency: requestLatencyInMs,
    approach: 'in parallel',
    requests: numOfRequests
  });
})()
