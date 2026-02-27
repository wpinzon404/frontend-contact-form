import { useState, useEffect, useCallback } from 'react';
import * as contactsApi from '../api/contacts';
import { notifyError } from '../lib/alert';

/**
 * Custom hook that manages the contacts list state.
 *
 * Responsibilities:
 *  - Load contacts from the API when the component mounts
 *  - Expose add / edit / delete functions that update the local state
 *    without needing to re-fetch the entire list from the server
 */
export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // useCallback ensures fetchContacts doesn't change on every render,
  // which prevents an infinite loop inside useEffect.
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await contactsApi.getAll();
      setContacts(response.data ?? []);
    } catch (err) {
      setError(err.message);
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load contacts once when the hook is first used
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Prepend the new contact to the top of the list (most recent first)
  const addContact = async (contact) => {
    const response = await contactsApi.create(contact);
    setContacts((prevContacts) => [response.data, ...prevContacts]);
  };

  // Replace the edited contact in the list by matching its ID
  const editContact = async (id, contact) => {
    const response = await contactsApi.update(id, contact);
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === id ? response.data : c))
    );
  };

  // Remove the deleted contact from the list by filtering it out
  const deleteContact = async (id) => {
    await contactsApi.remove(id);
    setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
  };

  return { contacts, loading, error, addContact, editContact, deleteContact };
}
