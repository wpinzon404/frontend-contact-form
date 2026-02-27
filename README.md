# Contact Form — Frontend

Interfaz de usuario para gestión de contactos construida con **React 19** y **Vite**.
Consume la API REST del backend en CodeIgniter 4.

## Tecnologías

- React 19
- Vite 7
- SweetAlert2 11 (alertas y confirmaciones)

---

## Requisitos previos

Asegúrate de tener instalado en tu máquina:

- [Node.js 18+](https://nodejs.org/)
- npm 9+ (viene incluido con Node.js)
- El **backend** corriendo en `http://localhost:8080`

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/wpinzon404/frontend-contact-form.git
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la URL del backend

Abre `src/api/contacts.js` y asegúrate de que la URL apunte al backend:

```js
const BASE_URL = 'http://localhost:8080/api/contacts';
```

> Si el backend corre en otro puerto o dominio, cambia esta línea.

### 4. Levantar el servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en: `http://localhost:5173`

---

## Scripts disponibles

| Comando         | Descripción                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Inicia el servidor de desarrollo         |
| `npm run build` | Genera los archivos optimizados para producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## Estructura del proyecto

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── contacts.js          # Todas las llamadas HTTP al backend (getAll, create, update, remove)
│   ├── components/
│   │   ├── ContactCard.jsx      # Tarjeta individual de un contacto (editar / eliminar)
│   │   ├── ContactForm.jsx      # Formulario para crear o editar un contacto
│   │   └── ContactList.jsx      # Lista de contactos con estados de carga y error
│   ├── hooks/
│   │   ├── useContactForm.js    # Estado del formulario: campos, validación y submit
│   │   └── useContacts.js       # Estado global: lista de contactos y operaciones CRUD
│   ├── lib/
│   │   └── alert.js             # Configuración centralizada de SweetAlert2
│   ├── App.css                  # Estilos globales de la aplicación
│   ├── App.jsx                  # Componente raíz: orquesta el formulario y la lista
│   ├── index.css                # Reset y estilos base
│   └── main.jsx                 # Punto de entrada de React
├── index.html                   # HTML base de la aplicación
├── package.json                 # Dependencias y scripts
└── vite.config.js               # Configuración de Vite
```

## Notas

- Si el servidor de desarrollo toma el puerto `5174` en lugar del `5173`, asegúrate de que ese origen esté permitido en el CORS del backend (`app/Config/Cors.php`).
- Para producción, actualiza `BASE_URL` en `src/api/contacts.js` con la URL real del backend.
