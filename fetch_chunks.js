const https = require('https'); 
const urls = [
  '/_next/static/chunks/main-app-4197587afde42461.js', 
  '/_next/static/chunks/app/page-97f17a4e4c32a0bf.js', 
  '/_next/static/chunks/884-77acaee5898aa116.js', 
  '/_next/static/chunks/408-d646f8abb76ecc5c.js', 
  '/_next/static/chunks/23-68cec0ed92d06c09.js'
]; 
Promise.all(urls.map(url => new Promise((resolve) => {
  https.get('https://www.ownholidayclub.com' + url, res => { 
    let d = ''; 
    res.on('data', c => d += c); 
    res.on('end', () => resolve(d)); 
  });
}))).then(files => { 
  const merged = files.join('\n'); 
  const matches = merged.match(/https?:\/\/[^\/\"\']+/g); 
  if (matches) { 
    console.log([...new Set(matches)]); 
  } 
});
