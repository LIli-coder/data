import React, { useState } from 'react';

export const Test = () => {
  const [login, setLogin] = useState('First Login');
  const [password, setPassword] = useState('First Password');

  return (
    <div>
      <hr />
      <h3>Test component</h3>
      <hr />
      <h5>Login: {login}</h5>
      <h5>Password: {password}</h5>
      <hr />
      <form >
        <input
          type="text"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

