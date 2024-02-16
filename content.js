// content.js
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'scrapeJobDetails') {
    const jobDetails = await scrapeJobDetails();
    sendResponse(jobDetails);
  }
});

async function scrapeJobDetails() {
  // Use Puppeteer for web scraping
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(window.location.href);

  // Example: Extract text content using Puppeteer
  const textContent = await page.evaluate(() => {
    return document.body.innerText;
  });

  // Use spaCy for job title detection
  const jobTitle = await detectJobTitle(textContent);

  await browser.close();

  return { title: jobTitle, link: window.location.href };
}

async function detectJobTitle(text) {
  // Implement logic to use spaCy for job title detection
  // Example: Using spaCy
  const spacy = require('spacy');
  const nlp = await spacy.load('en_core_web_sm');
  const doc = await nlp(text);
  const jobTitle = doc.ents.find(ent => ent.label_ === 'JOB_TITLE');

  return jobTitle ? jobTitle.text : 'Job Title Not Detected';
}
