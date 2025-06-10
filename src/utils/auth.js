import { checkResponse } from "./api";

const BASE_URL = 'http://localhost:3001';

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, avatar, email, password })
  })
  .then(checkResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse);
};

export const edit = ({ name, avatar }, token) => {
  console.log('Token received in edit function:', token);
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 },
 body: JSON.stringify({ name, avatar })
  })
  .then(checkResponse);
}

export const getContent = (token) => {
return fetch(`${BASE_URL}/users/me`, {
 method: 'GET',
 headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,
 }
})
.then(checkResponse);
};