require('dotenv').config();
const fetch = require('node-fetch');
const pMap = require('p-map');
const Reporter = require('./utils/reporter');
const range = require('./utils/range');
const { port, requestLatencyInMs, reportName, numOfRequestsLarge, concurrency } = process.env;

(async () => {
  const reporter = new Reporter(reportName);
  reporter.timer.start();
  
  const mapper = async (e, i) => {
    console.log(`kicking off request number ${++i}`);
    await fetch(`http://localhost:${port}/processJob`);
  }

  console.log(`about to kick off ${numOfRequestsLarge} requests concurrently with p-map`);
  
  const result = await pMap(range(1, numOfRequestsLarge), mapper, { concurrency: parseInt(concurrency) });

  reporter.timer.end();
  reporter.report({
    latency: requestLatencyInMs,
    approach: 'concurrently',
    requests: numOfRequestsLarge,
    concurrency: concurrency
  })
})()
