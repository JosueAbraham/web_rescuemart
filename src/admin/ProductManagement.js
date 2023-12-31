import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
  background-color: #EBCC1E;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonDelete = styled.button`
  background-color: #FF2323;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 60%; /* Adjust the column widths as needed */
  column-gap: 5%; /* Adjust the gap between columns as needed */
  background-color: #f2f2f2; /* Adjust the background color as needed */
  padding: 20px;
`;
const FormColumn = styled.div`
  margin-bottom: 20px;
`;

const ListColumn = styled.div`
  margin-bottom: 10px; /* Add margin for separation */
  max-height: 700px; /* Set a maximum height for the table container */
  overflow-y: auto; /* Enable vertical scrolling if needed */
`;
const Label = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    margin-bottom: 5px;
  }

  select,
  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
`;

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct, categories }) => {
  const [product, setProduct] = useState({
    id: editingProduct ? editingProduct.id : null,
    nombre: editingProduct ? editingProduct.nombre : '',
    descripcion: editingProduct ? editingProduct.descripcion : '',
    precio: editingProduct ? editingProduct.precio : 0,
    stock: editingProduct ? editingProduct.stock : 0,
    categoria: editingProduct ? editingProduct.categoria : '',
    imagen: editingProduct ? editingProduct.imagen : '',
  });

  useEffect(() => {
    setProduct({
      id: editingProduct ? editingProduct.id : null,
      nombre: editingProduct ? editingProduct.nombre : '',
      descripcion: editingProduct ? editingProduct.descripcion : '',
      precio: editingProduct ? editingProduct.precio : 0,
      stock: editingProduct ? editingProduct.stock : 0,
      categoria: editingProduct ? editingProduct.categoria : '',
      imagen: editingProduct ? editingProduct.imagen : '',
    });
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct !== null) {
      onSubmit(product, editingProduct);
      setEditingProduct(null);
    } else {
      onSubmit({ ...product, id: product.length + 1 }, null);
      setProduct({
        id: null,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        categoria: '',
        imagen: '',
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>
        Nombre:<br/>
        <Input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Descripción:<br/>
        <TextArea
          name="descripcion"
          value={product.descripcion}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Precio:<br/>
        <Input
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Cantidad:<br/>
        <Input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Imagen:<br/>
        <TextArea
          name="imagen"
          value={product.imagen}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
      <span>Categoría:</span><br/>
      <select
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.nombre}>
            {category.nombre}
          </option>
        ))}
      </select>
    </Label>
      <br />
      <Button type="submit">
        {editingProduct !== null ? 'Guardar Cambios' : 'Agregar Producto'}
      </Button>
    </FormContainer>
  );
};

const ProductListContainer = styled.div`
  max-width: %100;
  
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: none;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: none;
  }
  &:nth-child(even) {
    background-color: none;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={process.env.PUBLIC_URL + '/' + product.imagen}
          alt={product.nombre}
          style={{ maxHeight: '50px', maxWidth: '50px' }}
        />
      </TableCell>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.nombre}</TableCell>
      <TableCell>{`$${product.precio}`}</TableCell>
      <TableCell>{product.categoria}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.descripcion.substring(0, 100)}...</TableCell>
      <TableCell>
        <ButtonDelete onClick={() => onDelete(product.id)}><FontAwesomeIcon icon={faTrash} /></ButtonDelete><br/><br/>
        <ButtonEdit onClick={() => onEdit(product)}><FontAwesomeIcon icon={faEdit} /></ButtonEdit>
      </TableCell>
    </TableRow>
  );
};

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <ProductListContainer>
      <ProductTable>
        <thead>
          <tr>
            <TableHeader>Imagen</TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Categoría</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </ProductTable>
    </ProductListContainer>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productIdCounter, setProductIdCounter] = useState(11);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories.json');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct, editingProduct) => {
    if (editingProduct !== null) {
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        const index = prevProducts.findIndex((p) => p.id === editingProduct.id);
        newProducts[index] = newProduct;
        return newProducts;
      });
    } else {
      setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: productIdCounter }]);
      setProductIdCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <TwoColumnContainer>
        <FormColumn>
          <ProductForm
            onSubmit={handleAddProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            categories={categories}
          />
        </FormColumn>
        <ListColumn>
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        </ListColumn>
      </TwoColumnContainer>
    </div>
  );
};


export default ProductManagement;
