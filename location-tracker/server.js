const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk menyajikan file statis
app.use(express.static(__dirname));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Endpoint untuk menerima data lokasi
app.post('/save-location', (req, res) => {
  const { latitude, longitude, timestamp, googleMapsLink } = req.body;
  const locationData = `Latitude: ${latitude}, Longitude: ${longitude}, Timestamp: ${timestamp}, Google Maps: ${googleMapsLink}\n`;

  fs.appendFile('locations.txt', locationData, (err) => {
    if (err) {
      console.error('Gagal menyimpan lokasi:', err);
      return res.status(500).send('Gagal menyimpan lokasi');
    }
    console.log('Lokasi tersimpan:', locationData);
    res.status(200).send('Lokasi diterima');
  });
});

// Jalankan server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});
