import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const FormContainer = styled.form`
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
  grid-template-columns: 20% 70%; /* Adjust the column widths as needed */
  column-gap: 5%; /* Adjust the gap between columns as needed */
  background-color: #f2f2f2; /* Adjust the background color as needed */
  padding: 20px;
`;

const FormColumn = styled.div`
  margin-bottom: 20px; /* Add margin for separation */
  height: 50%; /* Ensure the ImageColumn takes full height */
`;

const ListColumn = styled.div`
  margin-bottom: 20px; /* Add margin for separation */
  max-height: 500px; /* Set a maximum height for the table container */
  overflow-y: auto; /* Enable vertical scrolling if needed */
`;

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct }) => {
  const [product, setProduct] = useState({
    id: editingProduct ? editingProduct.id : null,
    nombre: editingProduct ? editingProduct.nombre : '',
    descripcion: editingProduct ? editingProduct.descripcion : '',
    precio: editingProduct ? editingProduct.precio : 0,
    categoria: editingProduct ? editingProduct.categoria : '',
  });

  useEffect(() => {
    setProduct({
      id: editingProduct ? editingProduct.id : null,
      nombre: editingProduct ? editingProduct.nombre : '',
      descripcion: editingProduct ? editingProduct.descripcion : '',
      precio: editingProduct ? editingProduct.precio : 0,
      categoria: editingProduct ? editingProduct.categoria : '',
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
        categoria: '',
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
          value={product.nombre}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Descripción:
        <TextArea
          name="descripcion"
          value={product.descripcion}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Precio:
        <Input
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Categoría:
        <Input
          type="text"
          name="categoria"
          value={product.categoria}
          onChange={handleChange}
        />
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

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.nombre}</TableCell>
      <TableCell>{`$${product.precio}`}</TableCell>
      <TableCell>{product.categoria}</TableCell>
      <TableCell>{product.descripcion.substring(0, 50)}...</TableCell>
      <TableCell>
        <ButtonDelete onClick={() => onDelete(product.id)}>Eliminar</ButtonDelete>ㅤ
        <ButtonEdit onClick={() => onEdit(product)}>Editar</ButtonEdit>
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
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Categoría</TableHeader>
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
  const [productIdCounter, setProductIdCounter] = useState(3);

  useEffect(() => {
    // Simulación de carga de datos desde un archivo JSON
    // En un entorno real, podrías hacer una solicitud HTTP o utilizar otro método para obtener datos desde el servidor.
    const fetchData = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []); // El array vacío como segundo argumento garantiza que el efecto se ejecute solo una vez al montar el componente.

  const handleAddProduct = (newProduct, editingProduct) => {
    if (editingProduct !== null) {
      // Si estamos editando, actualizamos el producto existente
  
      
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        const index = prevProducts.findIndex((p) => p.id === editingProduct.id);
        newProducts[index] = newProduct;
        return newProducts;
      });
    } else {
      // Si no estamos editando, agregamos un nuevo producto con el ID del contador
      setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: productIdCounter }]);
      // Incrementamos el contador para el próximo producto
      setProductIdCounter((prevCounter) => prevCounter + 1);
    }
  };

 

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleEditProduct = (product) => {
    // Establecemos el producto que se está editando en el estado
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
