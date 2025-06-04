const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return checkResponse(res);
  });
}

function deleteItemById(Id, token) {
  return fetch(`${baseUrl}/items/${Id}`, {
    method: "DELETE",
    headers: {
      headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function likeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    return checkResponse(res);
  });
}

function unlikeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    return checkResponse(res);
  });
}

function addItem({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export { getItems, addItem, deleteItemById, likeItem, unlikeItem, checkResponse };
