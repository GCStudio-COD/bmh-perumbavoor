const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(filePath, 'utf-8');

// Replace all <img ...> with <img loading="lazy" ...>
// But skip the logo
html = html.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.includes('BMH.png')) return match; // skip logo
    if (p1.includes('loading=')) return match; // already lazy loaded
    
    return `<img loading="lazy" ${p1.trim()}>`;
});

fs.writeFileSync(filePath, html, 'utf-8');
console.log('Optimized images in index.html');
