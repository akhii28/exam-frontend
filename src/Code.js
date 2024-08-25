const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: 'akhilesh',
      email: 'akhilesh.21bce8858@vitapstudent.ac.in',
      roll_number: '21BCE8858',
      message: 'Invalid input data',
    });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach((item) => {
    if (isNumeric(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  return res.status(200).json({
    is_success: true,
    user_id: 'akhilesh',
    email: 'akhilesh.21bce8858@vitapstudent.ac.in',
    roll_number: '21BCE8858',
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
  });
});

app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: 1,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
