import React, { useReducer, useEffect } from 'react';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const UserList = ({ query }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'FETCH_USERS_REQUEST' });
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (query) {
      const fetchSearchedUsers = async () => {
        dispatch({ type: 'FETCH_USERS_REQUEST' });
        try {
          const response = await fetch(`https://api.github.com/search/users?q=${query}`);
          const data = await response.json();
          dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data.items });
        } catch (error) {
          dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
        }
      };

      fetchSearchedUsers();
    }
  }, [query]);

  if (state.loading) {
    return <Spinner animation="border" />;
  }

  if (state.error) {
    return <Alert variant="danger"> Error: {state.error} </Alert>;
  }

  if (state.users.length === 0) {
    return <Alert variant="warning">No users found</Alert>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <ListGroup>
        {state.users.map((user) => (
          <ListGroup.Item key={user.id} className={`userListItem ${theme}`}>{user.login}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserList;
