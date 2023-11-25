import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserFormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const UserItem = ({ user, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.nombre}</TableCell>
      <TableCell>{user.apellido}</TableCell>
      <TableCell>{user.edad}</TableCell>
      <TableCell>{user.sexo}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.direccion}</TableCell>
      <TableCell>{user.telefono}</TableCell>
      <TableCell>{user.pass}</TableCell>
      <TableCell>
        <Button onClick={() => onDelete(user.id)}>Eliminar</Button>
        <Button onClick={() => onEdit(user)}>Editar</Button>
      </TableCell>
    </TableRow>
  );
};

const UserList = ({ users, onDelete, onEdit }) => {
  return (
    <div>
      <UserTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Apellido</TableHeader>
            <TableHeader>Edad</TableHeader>
            <TableHeader>Sexo</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Dirección</TableHeader>
            <TableHeader>Teléfono</TableHeader>
            <TableHeader>Contraseña</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem key={user.id} user={user} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </UserTable>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userIdCounter, setUserIdCounter] = useState(2);

  // Estado para el nuevo usuario en el formulario
  const initialUserData = {
    nombre: '',
    apellido: '',
    edad: '',
    sexo: '',
    email: '',
    direccion: '',
    telefono: '',
    pass: '',
  };

  const [newUserData, setNewUserData] = useState(initialUserData);
  const [editedUserData, setEditedUserData] = useState(initialUserData);

  useEffect(() => {
    // Simulación de carga de datos desde un archivo JSON o una API
    const fetchData = async () => {
      try {
        // Obtener datos desde el archivo JSON
        const response = await fetch('/users.json');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const handleAddUser = (userData, editingUser) => {
    if (editingUser !== null) {
      // Si estamos editando, actualizamos el usuario existente
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        const index = prevUsers.findIndex((u) => u.id === editingUser.id);
        newUsers[index] = editedUserData; // Usamos editedUserData en lugar de userData
        return newUsers;
      });
      setEditingUser(null);
      setEditedUserData(initialUserData); // Limpiar los datos después de enviar el formulario
    } else {
      // Si no estamos editando, agregamos un nuevo usuario con el ID del contador
      setUsers((prevUsers) => [...prevUsers, { ...userData, id: userIdCounter }]);
      // Incrementamos el contador para el próximo usuario
      setUserIdCounter((prevCounter) => prevCounter + 1);
      setNewUserData(initialUserData); // Limpiar los datos después de enviar el formulario
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUserData(user); // Esto establecerá los datos del usuario en el formulario de edición
  };

  return (
    <div>
      <UserFormContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser(newUserData, editingUser);
        }}
      >
        <Label>Nombre:</Label>
        <Input
          type="text"
          name="nombre"
          value={editingUser ? editedUserData.nombre : newUserData.nombre}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, nombre: e.target.value });
            } else {
              setNewUserData({ ...newUserData, nombre: e.target.value });
            }
          }}
        />

        <Label>Apellido:</Label>
        <Input
          type="text"
          name="apellido"
          value={editingUser ? editedUserData.apellido : newUserData.apellido}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, apellido: e.target.value });
            } else {
              setNewUserData({ ...newUserData, apellido: e.target.value });
            }
          }}
        />

        <Label>Edad:</Label>
        <Input
          type="number"
          name="edad"
          value={editingUser ? editedUserData.edad : newUserData.edad}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, edad: e.target.value });
            } else {
              setNewUserData({ ...newUserData, edad: e.target.value });
            }
          }}
        />

        <Label>Sexo:</Label>
        <Input
          type="text"
          name="sexo"
          value={editingUser ? editedUserData.sexo : newUserData.sexo}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, sexo: e.target.value });
            } else {
              setNewUserData({ ...newUserData, sexo: e.target.value });
            }
          }}
        />

        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={editingUser ? editedUserData.email : newUserData.email}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, email: e.target.value });
            } else {
              setNewUserData({ ...newUserData, email: e.target.value });
            }
          }}
        />

<Label>Contraseña:</Label>
        <Input
          type="text"
          name="pass"
          value={editingUser ? editedUserData.pass : newUserData.pass}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, pass: e.target.value });
            } else {
              setNewUserData({ ...newUserData, pass: e.target.value });
            }
          }}
        />

        <Label>Dirección:</Label>
        <Input
          type="text"
          name="direccion"
          value={editingUser ? editedUserData.direccion : newUserData.direccion}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, direccion: e.target.value });
            } else {
              setNewUserData({ ...newUserData, direccion: e.target.value });
            }
          }}
        />

        <Label>Teléfono:</Label>
        <Input
          type="text"
          name="telefono"
          value={editingUser ? editedUserData.telefono : newUserData.telefono}
          onChange={(e) => {
            if (editingUser) {
              setEditedUserData({ ...editedUserData, telefono: e.target.value });
            } else {
              setNewUserData({ ...newUserData, telefono: e.target.value });
            }
          }}
        />

        <Button type="submit">
          {editingUser !== null ? 'Guardar Cambios' : 'Agregar Usuario'}
        </Button>
      </UserFormContainer>
      <UserList users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
    </div>
  );
};

export default UserManagement;
