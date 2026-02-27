// Base URL of the CodeIgniter backend API
const BASE_URL = 'http://localhost:8080/api/contacts';

// Headers required when sending JSON in the request body
const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * Reads the JSON from a fetch response.
 * If the request failed (non-2xx status), throws an error with the server message.
 * This is reused in every API function to avoid repeating the same check.
 */
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? 'Request failed');
  return data;
};

// GET /api/contacts — returns all contacts
export const getAll = () =>
  fetch(BASE_URL).then(handleResponse);

// POST /api/contacts — creates a new contact
export const create = (contact) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(contact),
  }).then(handleResponse);

// PUT /api/contacts/:id — updates an existing contact
export const update = (id, contact) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(contact),
  }).then(handleResponse);

// DELETE /api/contacts/:id — deletes a contact
export const remove = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handleResponse);
