import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeee',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo style={{ maxWidth: '30rem', maxHeight: '15rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
