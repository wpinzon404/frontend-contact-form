import { ContactCard } from './ContactCard';

export function ContactList({ contacts, loading, error, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="state-msg">
        <div className="empty-state">
          <span className="empty-state-text">Cargando contactos…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">
        Error al cargar los contactos: {error}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="state-msg">
        <div className="empty-state">
          <span className="empty-state-text">Aún no hay contactos registrados.</span>
        </div>
      </div>
    );
  }

  return (
    <section className="contact-list">
      <div className="list-header">
        <h2>Contactos</h2>
        <span className="list-badge">{contacts.length}</span>
      </div>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
