import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AgregarCarrito from './AgregarCarrito';
import { Link } from 'react-router-dom';

const ProductosList = styled.div`
margin: 20px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`;

const NoResultMessage = styled.p`
  margin-bottom: 20%;
`;

const Mensaje = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
`;

const Producto = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImagenProducto = styled.img`
  max-width: 100%;
  max-height: 200px;
  width: auto;
  height: auto;
`;

const Precio = styled.p`
  font-weight: bold;
  color: #2D2F30;
`;

const Titulo = styled.h3`
  color: #000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const FiltrosContainer = styled.div`
margin: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  select, input {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  select {
    min-width: 120px;
  }
`;

const SearchResults = ({ products }) => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [precioFilter, setPrecioFilter] = useState('9999999');

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('/categories.json');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();

        console.log('Data from JSON:', data);

        // Filter products based on the search query, categoria, and precio
        const filteredResults = data.filter((product) =>
          (product.nombre.toLowerCase().includes(query.toLowerCase()) ||
          product.categoria.toLowerCase().includes(query.toLowerCase())) &&
          (categoriaFilter ? product.categoria === categoriaFilter : true) &&
          (precioFilter ? product.precio <= parseInt(precioFilter) : true)
        );

        console.log('Filtered Results:', filteredResults);

        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, categoriaFilter, precioFilter]);

  const renderResultMessage = () => {
    if (query && searchResults.length > 0) {
      return (<>
        <Mensaje>
          <h1>Resultados de "{query}": {searchResults.length} resultados encontrados.</h1>
        </Mensaje>
        <FiltrosContainer>
        <label>Categoría:
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>Precio máximo:
          <input
            type="number"
            value={precioFilter}
            onChange={(e) => setPrecioFilter(e.target.value)}
          />
        </label>
      </FiltrosContainer>
      </>
      );
    } else if (query && searchResults.length === 0) {
      return (<>
        <Mensaje><h1>No se encontraron resultados para "{query}".</h1></Mensaje>
        <FiltrosContainer>
        <label>Categoría:
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>Precio máximo:
          <input
            type="number"
            value={precioFilter}
            onChange={(e) => setPrecioFilter(e.target.value)}
          />
        </label>
      </FiltrosContainer>
        <NoResultMessage></NoResultMessage>
        </>

      );
    } else {
      return 'Explora nuestros productos:';
    }
  };

  return (
    <div>
      {renderResultMessage()}
  
      
      <ProductosList>
        {searchResults.map((product) => (
          <Producto key={product.id}>
            <StyledLink to={`/productos/${product.id}`}>
              <ImagenProducto src={process.env.PUBLIC_URL + '/' + product.imagen} alt={product.nombre} />
              <Precio>{product.categoria}</Precio>
              <Titulo>{product.nombre}</Titulo>
              <Precio>Precio: ${product.precio}</Precio>
            </StyledLink>
            <AgregarCarrito selectedProduct={product} cantidad={1} />
          </Producto>
        ))}
      </ProductosList>
    
    </div>
  );
};

export default SearchResults;