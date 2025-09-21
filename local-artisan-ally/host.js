// Simple HTTP server to host the built application
// This allows you to share your application on your local network

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port to run the server on
const PORT = 3000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Handle the root path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Resolve the file path
  filePath = path.join(__dirname, 'dist', filePath);
  
  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.log(`File not found: ${filePath}`);
        fs.readFile(path.join(__dirname, 'dist', 'index.html'), (error, content) => {
          if (error) {
            // Index.html not found
            res.writeHead(500);
            res.end(`Server Error: ${error.code}`);
          } else {
            // Serve index.html for client-side routing
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Local Artisan Ally Server is running!`);
  console.log(`====================================================`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`Network Access: http://YOUR_IP_ADDRESS:${PORT}`);
  console.log(``);
  console.log(`To access from other devices on your network:`);
  console.log(`1. Find your IP address:`);
  console.log(`   - On Windows: Run 'ipconfig' in Command Prompt`);
  console.log(`   - On Mac/Linux: Run 'ifconfig' in Terminal`);
  console.log(`2. Replace YOUR_IP_ADDRESS with your actual IP address`);
  console.log(``);
  console.log(`Press Ctrl+C to stop the server`);
  console.log(`====================================================`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', error);
  }
});