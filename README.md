# 🧑‍💻 Agenda‑Frontend  

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)  

Interfaz de usuario (frontend) para la gestión de agenda médica: pacientes, doctores y citas.  
Construida con **React + Vite + Tailwind CSS**, consumiendo una API REST (backend), con autenticación **JWT** y diseño responsivo.

---

## 🧩 Estructura del proyecto

```bash
agenda‑frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Doctors/
│   │   ├── Patients/
│   │   └── Appointments/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── PatientsPage.jsx
│   │   └── AppointmentsPage.jsx
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── doctor.service.js
│   │   ├── patient.service.js
│   │   └── appointment.service.js
│   ├── utils/
│   │   ├── axiosConfig.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Requisitos previos

- 🧱 **Node.js** (versión 16+ recomendada)  
- 🧩 **npm** o **yarn**  
- Una instancia de la API backend funcionando (por ejemplo: `agenda‑backend`)  
- (Opcional) Cliente API o herramientas de desarrollo (Postman, Insomnia, etc.)  

---

## 🔧 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```dotenv
VITE_API_BASE_URL=https://tu‑api‑backend.com/api
VITE_AUTH_TOKEN_KEY=authToken
NODE_ENV=development
```

> ⚠️ **Importante:**  
> - Asegúrate de que `VITE_API_BASE_URL` coincide con la URL de tu backend.  
> - No subas credenciales ni secretos al repositorio.  

---

## ▶️ Ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/jorgelmunozp/agenda‑frontend.git
cd agenda‑frontend

# 2. Instalar dependencias
npm install
# o
yarn install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Construir para producción
npm run build
```

Después de arrancar, abre el navegador en:  
👉 `http://localhost:5173` (ou el puerto que Vite te indique)

---

## 🔑 Flujo de autenticación (JWT)

La aplicación se comunica con la API mediante tokens JWT.  
- Al iniciar sesión, se obtiene un token que se guarda (por ejemplo: en `localStorage`).  
- Los endpoints protegidos se acceden incluyendo el token en encabezados `Authorization: Bearer <TOKEN>`.  
- Se implementan rutas protegidas en la interfaz para usuarios autenticados.

### 🧾 Registro / Login  
- Formulario de registro: ruta `/register`  
- Formulario de login: ruta `/login`  
- Una vez autenticado, se redirige a un dashboard principal con navegación hacia doctores, pacientes o citas.

---

## 📋 Funcionalidades principales

- ✅ Autenticación y gestión de sesiones (login, registro, logout)  
- 👨‍⚕️ Gestión de doctores: listado, creación, edición, eliminación  
- 👨‍🦰 Gestión de pacientes: listado, creación, edición, eliminación  
- 📅 Gestión de citas: listado con filtros (por doctor, paciente, fecha), creación, edición, cancelación  
- 📱 Diseño responsivo: adaptado para escritorio y móvil (gracias a Tailwind CSS)  
- 🧼 Validación de formularios: previene datos incorrectos antes de enviar al backend  
- 🧩 Uso de hooks personalizados para lógica reutilizable (useAuth, useDoctors, useAppointments…)  
- 📈 Manejo de errores globales y feedback de usuario (modales, alertas, spinners de carga)  

---

## 🧠 Características técnicas

- **📚 Framework & librerías:**  
  - React 18  
  - Vite para bundler rápido  
  - Tailwind CSS para diseño utilitario  
- **🧭 Arquitectura de componentes:**  
  - Componentes funcionales con hooks  
  - Context API o similar para estado global de autenticación  
- **🌍 Comunicación con API:**  
  - Axios o fetch configurado con base URL desde entorno (`axiosConfig.js`)  
  - Interceptores para añadir token y manejar errores 401  
- **🔍 Validación de datos:**  
  - Librerías como Yup o Zod para esquemas de validación de formularios  
- **🎨 UI/UX:**  
  - Diseño limpio y fácil de usar  
  - Feedback instantáneo al usuario  
- **🚀 Preparado para producción:**  
  - Script de build (`npm run build`)  
  - Puede desplegarse en servicios como Netlify, Vercel o similar  
- **🔧 Buenas prácticas:**  
  - Código modular y escalable  
  - Separación de responsabilidades  
  - Archivos de configuración (.env, tailwind.config.js)  

---

## 🧰 Scripts disponibles

```bash
npm run dev      # Inicia la aplicación en modo desarrollo
npm run build    # Construye la versión optimizada para producción
npm run preview  # Previsualiza la versión de producción
npm run lint     # Corre linter (si está configurado)
```

---

## 📘 Ejemplo de flujo de uso

1. Usuario accede a `/login` y se autentica → obtiene JWT  
2. Usuarios navega al Dashboard y visita `/doctors` para listar doctores  
3. Crea un nuevo doctor con el formulario de `/doctors/new`  
4. Navega a `/appointments`, filtra por doctor y fecha, y crea nueva cita  
5. Cierra sesión desde el botón “Logout” y vuelve a la página de login  

---

## 💡 Próximos pasos y mejoras sugeridas

- 🔁 Implementar *refresh tokens* para mantener sesiones activas sin requerir relogin  
- 📘 Añadir documentación de componentes con Storybook  
- 🧪 Añadir pruebas de UI con Jest + React Testing Library  
- 🎯 Añadir gráficos e informes (por ejemplo: número de citas por día, por doctor)  
- 🔍 Mejora de accesibilidad (a11y) y pruebas de usabilidad  
- ↔️ Modo oscuro / claro para interfaz  
- 🚀 Integración de CI/CD para despliegue automático en Vercel/Netlify  

---

## 👨‍💻 Autor

**Jorge Luis Muñoz Pabón**  
📦 Repositorio: [https://github.com/jorgelmunozp/agenda‑frontend](https://github.com/jorgelmunozp/agenda‑frontend)  
🗓️ Proyecto frontend para administración de agenda médica, diseñado con enfoque escalable y experiencia de usuario rigurosa.
