import express, {Express} from 'express'
import postRouter from "./routes/post.routes";
import connectDB from "./config/db";
import {config} from "dotenv";


/* Config des var d'environnement */
config()

/* Port de l'app */
const port = process.env.PORT || 5000

/* Connexion à la BD */
connectDB()
    .then(res => console.log('Success', res))
    .catch(err => console.error(err))

const app: Express = express()

// Middlewares
app.use(express.json()) // Content-Type: application/json
app.use(express.urlencoded({ extended: true })) // Content-Type: application/x-www-form-urlencoded

// Routes
app.use('/post', postRouter)

/* Lancer le serveur */
app.listen(port, () => console.log(`Server listening on port ${port}`))