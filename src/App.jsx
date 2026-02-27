import { useState } from 'react';
import { useContacts } from './hooks/useContacts';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import './App.css';

/**
 * Componente raíz. Gestiona qué contacto se está editando
 * y decide si el formulario debe crear o actualizar.
 */
export default function App() {
  const { contacts, loading, error, addContact, editContact, deleteContact } = useContacts();

  // null = modo creación; un objeto contacto = modo edición
  const [editing, setEditing] = useState(null);

  // Un solo handler para crear y actualizar — el formulario no necesita saber cuál es
  const handleSubmit = (fields) =>
    editing ? editContact(editing.id, fields) : addContact(fields);

  const handleCancel = () => setEditing(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Formulario de Contacto</h1>
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
    </div>
  );
}
