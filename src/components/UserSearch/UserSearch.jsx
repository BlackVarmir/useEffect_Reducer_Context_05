import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import { debounce } from 'lodash';

const UserSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = debounce((query) => {
    onSearch(query);
  }, 500);

  useEffect(() => {
    handleSearch(query);
    return () => handleSearch.cancel();
  }, [query]);

  return (
    <FormControl
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search users..."
      className="mb-3"
    />
  );
};

export default UserSearch;
