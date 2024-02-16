// popup.js
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveJobButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'scrapeJobDetails' }, function(response) {
        if (response) {
          saveJobToExcel(response);
        }
      });
    });
  });

  function saveJobToExcel(jobDetails) {
    // Implement logic to save job details to Excel
    // Use SheetJS library or any other preferred method
  }
});
