import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Page = styled.div`
 
`;
const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 60%; /* Adjust the column widths as needed */
  column-gap: 5%; /* Adjust the gap between columns as needed */
 /* Adjust the background color as needed */
  padding: 20px;
  background-color: #f2f2f2; 
 
`;

const FormContainer = styled.form`
  max-width: 800px;
  margin: 10px auto;
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

const TextArea = styled.textarea`
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

const ButtonEdit = styled.button`
  background-color: #ebcc1e;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonDelete = styled.button`
  background-color: #ff2323;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FormColumn = styled.div`
  margin-bottom: 20px;
`;

const ListColumn = styled.div`
  margin-bottom: 20px;
  max-height: 500px;
  overflow-y: auto;
`;

const ProductTable = styled.table`
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

const CategoryForm = ({ onSubmit, editingCategory, setEditingCategory }) => {
  const [category, setCategory] = useState({
    id: editingCategory ? editingCategory.id : null,
    nombre: editingCategory ? editingCategory.nombre : '',
    descripcion: editingCategory ? editingCategory.descripcion : '',
  });

  useEffect(() => {
    setCategory({
      id: editingCategory ? editingCategory.id : null,
      nombre: editingCategory ? editingCategory.nombre : '',
      descripcion: editingCategory ? editingCategory.descripcion : '',
    });
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory !== null) {
      onSubmit(category, editingCategory);
      setEditingCategory(null);
    } else {
      onSubmit({ ...category, id: category.length + 1 }, null);
      setCategory({
        id: null,
        nombre: '',
        descripcion: '',
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>
        Nombre:
        <Input
          type="text"
          name="nombre"
          value={category.nombre}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Descripción:
        <TextArea
          name="descripcion"
          value={category.descripcion}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Button type="submit">
        {editingCategory !== null ? 'Guardar Cambios' : 'Agregar Categoría'}
      </Button>
    </FormContainer>
  );
};

const CategoryItem = ({ category, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{category.id}</TableCell>
      <TableCell>{category.nombre}</TableCell>
      <TableCell>{category.descripcion}</TableCell>
      <TableCell>
        <ButtonDelete onClick={() => onDelete(category.id)}><FontAwesomeIcon icon={faTrash} /></ButtonDelete><br/><br/>
        <ButtonEdit onClick={() => onEdit(category)}><FontAwesomeIcon icon={faEdit} /></ButtonEdit>
      </TableCell>
    </TableRow>
  );
};

const CategoryList = ({ categories, onDelete, onEdit }) => {
  return (
    <ProductTable>
      <thead>
        <tr>
          <TableHeader>ID</TableHeader>
          <TableHeader>Nombre</TableHeader>
          <TableHeader>Descripción</TableHeader>
          <TableHeader>Acciones</TableHeader>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </ProductTable>
  );
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryIdCounter, setCategoryIdCounter] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/categories.json'); // Ajusta la ruta según la ubicación de tu archivo JSON
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleAddCategory = (newCategory, editingCategory) => {
    if (editingCategory !== null) {
      setCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        const index = prevCategories.findIndex((c) => c.id === editingCategory.id);
        newCategories[index] = newCategory;
        return newCategories;
      });
    } else {
      setCategories((prevCategories) => [...prevCategories, { ...newCategory, id: categoryIdCounter }]);
      setCategoryIdCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  return (
    <Page>
      <TwoColumnContainer>
        <FormColumn>
          <CategoryForm
            onSubmit={handleAddCategory}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
          />
        </FormColumn>
        <ListColumn>
          <CategoryList
            categories={categories}
            onDelete={handleDeleteCategory}
            onEdit={handleEditCategory}
          />
        </ListColumn>
      </TwoColumnContainer>
    </Page>
  );
};

export default CategoryManagement;
