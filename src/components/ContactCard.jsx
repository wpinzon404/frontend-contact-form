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
        <span>{contact.email}</span>
        <p>{contact.message}</p>
      </div>
      <div className="contact-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(contact)}>Editar</button>
        <button className="btn btn-danger"    onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}
