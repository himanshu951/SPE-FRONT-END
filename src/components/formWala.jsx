import React, { useState } from 'react';

function FormWala() {
  const [inputs, setInputs] = useState({ name: '', email: '', phone: '' });
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((prevState) => [...prevState, inputs]);
    setInputs({ name: '', email: '', phone: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          value={inputs.phone}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormWala;