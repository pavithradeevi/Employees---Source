import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://localhost:8800';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ['websocket'] });

   
    fetchEmployees();

   
    socket.on('updateEmployees', fetchEmployees);

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="App">
      <h1>Salary Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th >Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="td">{employee.name}</td>
              <td className="td">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
