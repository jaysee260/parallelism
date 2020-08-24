# Parallelism

Some performance tests between sequential, parallel, and concurrent async API requests.

## Details

### Notes on the configuration file
There is a `.env` file with the following variables:
```
port=3001
requestLatencyInMs=3000

reportName=benchmarks.txt
numOfRequests=10
numOfRequestsLarge=1000
concurrency=200
```

You can tweak them to your liking.

Most of these variables are self explanatory, but a few notes nonetheless:

- after each run, an entry will be written to a performance report, detailing the request latency, number of requests, strategy (`in sequence | in parallel | concurrently`), and total processing time of each run. `reportName` is the name of the file to which these entries are written.
- `sequence.js` and `parallel.js` use `numOfRequests` to determine the number of requests to make.
- concurrentParallel.js uses `numOfRequestsLarge`.
- `concurrency` specifies the max number of parallel requests that will be kicked off at once.

<hr>

### Install dependencies
- `npm install`

### Start the server
- `npm start`

### Kick off a run
Open a second terminal. There are 3 options:

- `npm run seq` will trigger the sequential strategy.
- `npm run par` will trigger the parallel strategy.
- `npm run conpar` will trigger the concurrent strategy.

### Additional notes
The concurrent strategy still kicks off requests in parallel, it just doesn't do them all at once.

I found that with the parallel strategy, the server crashed at 3,000 (parallel) requests.