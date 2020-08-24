const fs = require('fs');

function Reporter(reportName) {
  let start;
  let end;

  this.timer = {
    start: () => start = Date.now(),
    end: () => end = Date.now()
  }

  this.report = function(details) {
    let msTimeDiff = end - start;
    let seconds = parseFloat(msTimeDiff / 1000).toFixed(2)
    let content = `per request latency: ${details.latency / 1000} second(s) | ${details.requests} requests | ${details.concurrency ? `${details.concurrency} ${details.approach.trim()}` : details.approach.trim()}\ntotal processing time: ${seconds}\n\n`
    fs.appendFile(reportName, content, function(err) {
      if (err) throw err;
    })
  }
}

module.exports = Reporter;