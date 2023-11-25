import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ProductManagement from './ProductManagement';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ showOverlay }) => (showOverlay ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledCookieConsent = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;

  & p {
    margin-bottom: 20px;
  }

  & button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const App = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleAccept = () => {
    setShowOverlay(false);
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/admin" element={<ProductManagement />} />
        </Routes>

        <Overlay showOverlay={showOverlay}>
          <StyledCookieConsent>
            <p>Cookie consent content goes here.</p>
            <button onClick={handleAccept}>Accept</button>
          </StyledCookieConsent>
        </Overlay>
      </AppContainer>
    </Router>
  );
};

export default App;
