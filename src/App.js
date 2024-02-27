import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      alert('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th className="table-heading">ID</th>
            <th className="table-heading">Name</th>
            <th className="table-heading">Email</th>
            <th className="table-heading">Role</th>

            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>


              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button>{currentPage}</button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
