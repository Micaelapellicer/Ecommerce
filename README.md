#### E-COMMERCE


## Descripción del Proyecto
El proyecto eCommerce es una aplicación web desarrollada en Visual que permite a los usuarios explorar y comprar productos en línea. La aplicación ofrece una interfaz intuitiva y funciones de búsqueda avanzadas para encontrar productos específicos. Los usuarios pueden registrarse, iniciar sesión, agregar productos al carrito de compras y realizar pedidos de manera segura.

## Características Principales

Registro de usuarios: Los usuarios pueden crear una cuenta utilizando su correo electrónico y contraseña.
Inicio de sesión seguro: Los usuarios registrados pueden iniciar sesión de forma segura utilizando sus credenciales.
Exploración de productos: Los usuarios pueden navegar por una amplia variedad de productos organizados por categorías.
Agregar al carrito: Los usuarios pueden agregar productos al carrito de compras para su posterior compra.
Gestión del carrito: Los usuarios pueden ver y modificar los productos en su carrito antes de finalizar la compra.

## Tecnologías Utilizadas

Frontend: HTML, CSS, JavaScript, React.js
Backend: Node.js, Express.js, Sequelize (ORM), MySQL2
Autenticación: JSON Web Tokens (JWT)
Almacenamiento de Imágenes: Multer
Despliegue: Heroku

##  Estructura del Proyecto
El proyecto está estructurado en tres carpetas principales:
frontend: Contiene el código fuente del frontend de la aplicación desarrollado con React.js.
backend: Contiene el código fuente del backend de la aplicación desarrollado con Node.js y Express.js.
admin: Contiene el panel de administración de la aplicación, donde los administradores pueden gestionar productos y pedidos.

## Instalación y Uso

Backend

1. **Clonar el Repositorio**: Clona el repositorio del proyecto desde GitHub.
2. **Instalar Dependencias**: En la carpeta `backend`, ejecuta `npm install` para instalar las dependencias del proyecto.
3. **Configurar la Base de Datos**: En el archivo `index.js` del backend, modifica los campos `username`, `password` y `database` con las credenciales y el nombre de la base de datos de tu servidor MySQL.
4. **Levantar el Servidor**: Ejecuta `node .\index.js` para iniciar el servidor backend.

Frontend

1. **Instalar Dependencias**: En la carpeta `frontend`, ejecuta `npm install` para instalar las dependencias del proyecto.
2. **Levantar el Servidor de Desarrollo**: Ejecuta `npm run start` para iniciar el servidor de desarrollo del frontend.

Admin

1. **Instalar Dependencias**: En la carpeta `admin`, ejecuta `npm install` para instalar las dependencias del proyecto.
2. **Levantar el Servidor de Desarrollo**: Ejecuta `npm run dev` para iniciar el servidor de desarrollo del panel de administración.


## Autor
El proyecto eCommerce fue desarrollado por Micaela Pellicer.