import { confirmDelete, notifySuccess, notifyError } from '../lib/alert';

export function ContactCard({ contact, onEdit, onDelete }) {
  const handleDelete = async () => {
    const result = await confirmDelete(contact.name);
    if (!result.isConfirmed) return;

    try {
      await onDelete(contact.id);
      notifySuccess('Contacto eliminado correctamente.');
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-info">
        <strong>{contact.name}</strong>
        <span className="contact-email">{contact.email}</span>
        {contact.message && <p className="contact-message">{contact.message}</p>}
      </div>

      <div className="contact-actions">
        <button className="btn btn-secondary btn-icon" onClick={() => onEdit(contact)}>
          Editar
        </button>
        <button className="btn btn-danger btn-icon" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
