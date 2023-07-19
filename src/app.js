// Express
import express from "express";
const app = express();
const port = 8080;
const host = "0.0.0.0";

// Utils
import __dirname from "./utils.js";

// Rutas
import productsRoute from "./routes/products.router.js";
import cartsRoute from "./routes/carts.router.js";
import viewsRoute from "./routes/views.router.js";
import messagesRoute from "./routes/messages.router.js";
import cookiesRoute from "./routes/cookies.router.js";
import sessionsRoute from "./routes/sessions.router.js";

// Mongo
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import { messageModel } from "./dao/mongo/models/messages.model.js";
import { productModel } from "./dao/mongo/models/product.model.js";
const mongoUrl = "mongodb+srv://jdilernia99:coder@cluster0.dlkrswm.mongodb.net/?retryWrites=true&w=majority";
const enviroment = async () => {await mongoose.connect(mongoUrl)};
enviroment();
app.use(session({
	store: MongoStore.create({mongoUrl}),
	secret: "aN%l7a69ZtMR",
	resave: false,
	saveUninitialized: true,
}));

// Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
import handlebars from "express-handlebars";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/cookies", cookiesRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/messages", messagesRoute);
app.use("/", viewsRoute);

// Socket & Server:
import { Server } from "socket.io";
const httpServer = app.listen(port, host, () => {
	console.log(`Server up on http://${host}:${port}`);
});

const io = new Server(httpServer);

io.on("connection", async socket => {
	console.log(`Client ${socket.id} connected`);

	// Buscar productos en DB, escuchar cambios y enviar data:
	const products = await productModel.find().lean();
	io.emit("products", products);

	productModel.watch().on("change", async change => {
		const products = await productModel.find().lean();
		io.emit("products", products);
	});

	// Recibir usuarios, mensajes y crear entrada en DB:
	socket.on("user", async data => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		});

		const messagesDB = await messageModel.find();
		io.emit("messagesDB", messagesDB);
	});

	socket.on("message", async data => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		});

		const messagesDB = await messageModel.find();
		io.emit("messagesDB", messagesDB);
	});

	socket.on("disconnect", () => {
		console.log(`Client ${socket.id} disconnected`);
	});
});

// Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario

// Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo 
// Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
// Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login

// Al cargar el proyecto, éste deberá comenzar en la pantalla de login
// Al no tener un usuario, primero se creará un usuario, para esto, la pantalla de login deberá tener un link de redirección “Regístrate” 
// El proceso de registro deberá guardar en la base de datos al usuario
// Se regresará al proceso de login y se colocarán las credenciales de manera incorrecta, esto para probar que no se pueda avanzar a la siguiente pantalla.
// Posteriormente, se colocarán las credenciales de manera correcta, esto para corroborar que se cree una sesión correctamente y que se haga una redirección a la vista de productos.
// La vista de productos tendrá en una parte de arriba de la página el mensaje “Bienvenido” seguido de los datos del usuario que se haya logueado (NO mostrar password). Es importante que se visualice el “rol” para ver que aparezca “usuario” o “user”
// Se presionará el botón de logout y se destruirá la sesión, notando cómo nos redirige a login.
// Se ingresarán las credenciales específicas de admin indicadas en las diapositivas, el login debe redirigir correctamente y mostrar en los datos del rol: “admin” haciendo referencia a la correcta gestión de roles. 
// Se revisará que el admin NO viva en base de datos, sino que sea una validación que se haga de manera interna en el código.
