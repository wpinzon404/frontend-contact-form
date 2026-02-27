import { ContactCard } from './ContactCard';

/**
 * Renderiza la lista de contactos.
 * Usa guard clauses para manejar los estados de carga, error y lista vacía
 * antes del render principal, manteniendo el JSX limpio.
 */
export function ContactList({ contacts, loading, error, onEdit, onDelete }) {
  if (loading)               return <p className="state-msg">Cargando contactos…</p>;
  if (error)                 return <p className="state-msg error-text">Error: {error}</p>;
  if (contacts.length === 0) return <p className="state-msg">Aún no hay contactos registrados.</p>;

  return (
    <section className="contact-list">
      <h2>Contactos ({contacts.length})</h2>
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
