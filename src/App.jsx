import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import UserList from './components/UserList/UserList';
import UserSearch from './components/UserSearch/UserSearch';
import { useTheme } from './context/ThemeContext/ThemeContext';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={`appContainer ${theme}`}>
      <Container>
        <Button onClick={toggleTheme} className="mb-3">
          Toggle to {theme === 'light' ? 'dark' : 'light'} theme
        </Button>
        <UserSearch onSearch={handleSearch} />
        <UserList query={searchQuery} />
      </Container>
    </div>
  );
};

export default App;
