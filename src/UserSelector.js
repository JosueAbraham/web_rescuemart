// UserSelector.js
import React from 'react';

const UserSelector = ({ currentUser, setCurrentUser }) => {
  return (
    <select value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
      <option value="user">Usuario</option>
      <option value="admin">Administrador</option>
    </select>
  );
};

export default UserSelector;
