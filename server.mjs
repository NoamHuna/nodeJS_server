import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
let current_data = ''
// Route for GET request
app.get('/', (req, res) => {
  res.send(JSON.stringify(current_data));
});

// Route for POST request
app.post('/data', (req, res) => {
  const receivedData = req.body;
  current_data = receivedData
  console.log('Received JSON data:', receivedData);

  // Write received data to file
  fs.writeFile(
    'receivedData.json',
    JSON.stringify(receivedData, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ message: 'Error writing file' });
      } else {
        res.json({
          message: 'Data successfully received and saved to file',
          data: receivedData,
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
