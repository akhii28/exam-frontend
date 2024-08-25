import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleOptionChange = (event) => {
    const value = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error("Invalid JSON format: Missing 'data' key");
      setError('');

      // API call
      const response = await axios.post('https://exam-backend-zc73.onrender.com/bfhl', parsedInput);
      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON format. Please enter a valid JSON.');
      setResponseData(null);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div className="mt-3">
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h4>Alphabets:</h4>
            <p>{responseData.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h4>Numbers:</h4>
            <p>{responseData.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h4>Highest Lowercase Alphabet:</h4>
            <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-5 p-4 border rounded" style={{ maxWidth: '600px' }}>
      <h1>JSON Processor</h1>
      <div className="mb-3">
        <label htmlFor="jsonInput" className="form-label">API Input</label>
        <textarea
          id="jsonInput"
          className="form-control"
          rows="4"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Enter JSON here..."
        ></textarea>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        Submit
      </button>
      {error && <div className="alert alert-danger">{error}</div>}

      {responseData && (
        <div className="mt-3">
          <label htmlFor="multiFilter" className="form-label">Multi Filter</label>
          <select
            id="multiFilter"
            className="form-select"
            multiple
            value={selectedOptions}
            onChange={handleOptionChange}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div>{renderResponse()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
