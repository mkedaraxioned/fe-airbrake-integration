import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <UnorderedList listStyleType='none' display='flex'>
          <ListItem m='5px 8px'>
            <Link to='/'>Home</Link>
          </ListItem>
          <ListItem m='5px 8px'>
            <Link to='/dashboard'>Dashboard</Link>
          </ListItem>
        </UnorderedList>
      </nav>
    </header>
  );
};

export default Header;
