import { useState } from 'react';
import { useContacts } from './hooks/useContacts';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import './App.css';

export default function App() {
  const { contacts, loading, error, addContact, editContact, deleteContact } = useContacts();
  const [editing, setEditing] = useState(null);

  const handleSubmit = (fields) =>
    editing ? editContact(editing.id, fields) : addContact(fields);

  const handleCancel = () => setEditing(null);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-text">
            <h1>Agenda de Contactos</h1>
            <p>Prueba técnica Wilmer Guzmán</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ContactForm
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        <ContactList
          contacts={contacts}
          loading={loading}
          error={error}
          onEdit={setEditing}
          onDelete={deleteContact}
        />
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Agenda de Contactos — Todos los derechos reservados
      </footer>
    </div>
  );
}
