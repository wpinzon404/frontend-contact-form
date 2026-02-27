import { useEffect } from 'react';
import { useContactForm } from '../hooks/useContactForm';

export function ContactForm({ editing, onSubmit, onCancel }) {
  const { fields, errors, submitting, fill, reset, handleChange, handleSubmit } =
    useContactForm(onSubmit, Boolean(editing));

  useEffect(() => {
    editing ? fill(editing) : reset();
  }, [editing]);

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>{editing ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
      </div>

      <Field
        label="Nombre"
        name="name"
        value={fields.name}
        error={errors.name}
        onChange={handleChange}
        placeholder="Ej. Wilmer Pinzon"
      />
      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        value={fields.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="wil@gmail.com"
      />
      <Field
        label="Mensaje"
        name="message"
        value={fields.message}
        error={errors.message}
        onChange={handleChange}
        placeholder="Escribe un mensaje..."
        textarea
      />

      <div className="form-actions">
        {editing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Guardando…' : editing ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', value, error, onChange, textarea, placeholder }) {
  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    className: error ? 'input-error' : '',
  };

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {textarea
        ? <textarea {...inputProps} rows={4} />
        : <input {...inputProps} type={type} />}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
