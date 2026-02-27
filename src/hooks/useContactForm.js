import { useState } from 'react';
import { notifySuccess, notifyError } from '../lib/alert';

// Estado vacío inicial del formulario
const EMPTY_FORM = { name: '', email: '', message: '' };

/**
 * Valida los campos del formulario y retorna un objeto con los mensajes de error.
 * Si el objeto está vacío, el formulario es válido.
 */
const validate = (fields) => {
  const errors = {};

  if (!fields.name.trim())
    errors.name = 'El nombre es obligatorio.';
  else if (fields.name.trim().length < 2)
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  else if (fields.name.trim().length > 100)
    errors.name = 'El nombre no puede superar los 100 caracteres.';

  if (!fields.email.trim())
    errors.email = 'El correo electrónico es obligatorio.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Ingresa un correo electrónico válido.';

  if (!fields.message.trim())
    errors.message = 'El mensaje es obligatorio.';
  else if (fields.message.trim().length < 10)
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';

  return errors;
};

/**
 * Hook personalizado que gestiona el estado del formulario de contacto.
 *
 * @param {Function} onSubmit  - Función a llamar con los datos del formulario (crear o actualizar)
 * @param {boolean}  isEditing - Indica si el formulario está en modo edición
 */
export function useContactForm(onSubmit, isEditing) {
  const [fields, setFields]         = useState(EMPTY_FORM);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Rellena el formulario con los datos de un contacto existente (modo edición)
  const fill = (contact) => {
    setFields({ name: contact.name, email: contact.email, message: contact.message });
  };

  // Limpia el formulario al estado vacío inicial
  const reset = () => {
    setFields(EMPTY_FORM);
    setErrors({});
  };

  // Actualiza un campo y borra su error a medida que el usuario escribe
  const handleChange = ({ target: { name, value } }) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ejecuta validación del lado cliente antes de llamar a la API
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(fields);
      notifySuccess(isEditing ? 'Contacto actualizado correctamente.' : 'Contacto guardado correctamente.');
      reset();
    } catch (err) {
      // Muestra el error recibido de la API (ej. validación fallida o error de red)
      notifyError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return { fields, errors, submitting, fill, reset, handleChange, handleSubmit };
}
