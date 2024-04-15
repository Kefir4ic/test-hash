import React, { useState } from 'react';
import XLSX from 'xlsx';

function UserGenerator() {
  const [regionCode, setRegionCode] = useState('');
  const [numberOfUsers, setNumberOfUsers] = useState('');
  const [users, setUsers] = useState([]);

  const generateUsers = () => {
    const generatedUsers = [];
    for (let i = 0; i < numberOfUsers; i++) {
      const password = Math.random().toString(36).substr(2, 10); // Генерируем случайный пароль до 10 символов
      const passwordHash = 2222/* здесь нужно добавить код для хеширования пароля */;
      const userData = {
        password,
        passwordHash,
        regionCode
      };
      generatedUsers.push(userData);
    }
    setUsers(generatedUsers);
  };

  const downloadUsers = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };

  return (
      <div>
        <h2>User Generator</h2>
        <div>
          <label>Region Code:</label>
          <input type="text" value={regionCode} onChange={(e) => setRegionCode(e.target.value)} />
        </div>
        <div>
          <label>Number of Users:</label>
          <input type="number" value={numberOfUsers} onChange={(e) => setNumberOfUsers(parseInt(e.target.value))} />
        </div>
        <button onClick={generateUsers}>Generate Users</button>
        {users.length > 0 && (
            <div>
              <h3>Generated Users:</h3>
              <table>
                <thead>
                <tr>
                  <th>Password</th>
                  <th>Password Hash</th>
                  <th>Region Code</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.password}</td>
                      <td>{user.passwordHash}</td>
                      <td>{user.regionCode}</td>
                    </tr>
                ))}
                </tbody>
              </table>
              <button onClick={downloadUsers}>Download Users</button>
            </div>
        )}
      </div>
  );
}

export default UserGenerator;

