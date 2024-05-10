const port = 4000;
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Middleware
const verifyToken = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(verifyToken);
app.use(errorHandler);

// Configuración de la conexión Sequelize con MySQL
const sequelize = new Sequelize("ecommerce", "root", "zapatillasblancas", {
  host: "localhost",
  dialect: "mysql",
});

// Definir modelos para Productos y Usuarios
const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  new_price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  old_price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  cartData: {
    type: Sequelize.JSON,
  },
});

// Sincronizar los modelos con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Database and tables created!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos MySQL establecida correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos MySQL:', error);
  });

//creacion de Api
app.get("/", (req ,res) =>{
    res.send("Express App is Running")
})

//Motor de almacenamiento de imágenes 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creacion de un punto de conexión de carga de imágenes 
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Endpoint para agregar un producto
app.post('/addproduct', async (req,res)=>{
    try {
        const product = await Product.create({
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            available: true // No es necesario incluir este campo si tiene un valor predeterminado
        });
        console.log("Producto guardado:", product);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para eliminar un producto
app.post('/removeproduct', async (req,res) =>{
    try {
        await Product.destroy({ where: { id: req.body.id } });
        console.log("Producto eliminado:", req.body.id);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para obtener todos los productos
app.get('/allproducts', async (req,res)=>{
    try {
        const products = await Product.findAll();
        console.log("Todos los Productos Obtenidos");
        res.send(products);
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para el registro de usuario
app.post('/signup',async(req,res)=>{
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Se ha encontrado un usuario con la misma dirección de correo" })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token })
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para el inicio de sesión de usuario
app.post('/login', async (req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Contraseña incorrecta" });
            }
        } else {
            res.json({ success: false, errors: "Correo electrónico incorrecto" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para obtener una nueva colección de datos
app.get('/newcollections', async (req,res) =>{
    try {
        const products = await Product.findAll();
        const newcollection = products.slice(1).slice(-8);
        console.log("Nueva colección obtenida");
        res.send(newcollection);
    } catch (error) {
        console.error("Error al obtener la nueva colección:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Endpoint para obtener datos populares en mujeres
app.get('/popularinwomen', async (req,res) =>{
    try {
        const products = await Product.findAll({ where: { category: "women" }, limit: 4 });
        console.log("Populares en mujeres obtenidos");
        res.send(products);
    } catch (error) {
        console.error("Error al obtener productos populares en mujeres:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

// Middleware para obtener usuario
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Por favor, autentíquese con un token válido"})
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Por favor, autentíquese con un token válido" });
        }
    }
}

// Endpoint para agregar productos en el carrito
app.post('/addtocart', fetchUser, async(req,res)=>{
    try {
        console.log("Agregado", req.body.itemId);
        let userData = await User.findOne({ where: { id: req.user.id } });
        userData.cartData[req.body.itemId] += 1;
        await User.update({ cartData: userData.cartData }, { where: { id: req.user.id } });
        res.send("Agregado");
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).send("Error al agregar producto al carrito");
    }
})

// Endpoint para eliminar producto del carrito
app.post('/removefromcart', fetchUser, async (req,res) =>{
    try {
        console.log("Eliminado", req.body.itemId);
        let userData = await User.findOne({ where: { id: req.user.id } });
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await User.update({ cartData: userData.cartData }, { where: { id: req.user.id } });
        res.send("Eliminado");
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).send("Error al eliminar producto del carrito");
    }
})

// Endpoint para obtener los datos del carrito
app.post('/getcart', fetchUser, async (req,res) =>{
    try {
        console.log("Obtener carrito");
        let userData = await User.findOne({ where: { id: req.user.id } });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error al obtener datos del carrito:", error);
        res.status(500).json({ success: false, error: error.message });
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port)
    } else {
        console.log("Error:"+ error)
    }
})