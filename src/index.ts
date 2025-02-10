import express from 'express'
import mongoose from "mongoose"
import { concertRouter, adminConcertRouter, bandRouter, adminBandRouter, venueRouter, stateRouter, reviewRouter } from './routers'
import { drawerController } from './controllers'
import { Middleware } from './middleware/middleware'
import * as socketio from 'socket.io'
import * as http from 'http'
import * as path from "path"
import cors from 'cors'

const PORT = process.env.PORT || ''
const DB_URL = process.env.DB_URL || ''
const SECRET = process.env.SECRET || ''
const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

var middleware = new Middleware(SECRET, ADMIN_SECRET)

mongoose
    .connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error(`Could not connect to MongoDB: ${error}`))

const app = express()
app.use(express.json())
app.use(cors())
app.use('/concert', middleware.verifyAuthorization, concertRouter)
app.use('/admin_concert', middleware.verifyAdminAuthorization, adminConcertRouter)
app.use('/band', middleware.verifyAuthorization, bandRouter)
app.use('/admin_band', middleware.verifyAdminAuthorization, adminBandRouter)
app.use('/venue', middleware.verifyAuthorization, venueRouter)
app.use('/review', middleware.verifyAuthorization, reviewRouter)
app.use('/state', middleware.verifyAuthorization, stateRouter)

// Only to keep our free Heroku App alive
app.get('/heroku', (req, res) => { return res.send('Hello, I am alive') })

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/index.html"))
})

// Socket
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server()
io.attach(server)

io.on('connection', async (socket: socketio.Socket) => {

    console.log(`Connection : SocketId = ${socket.id}`)

    const versionCode = Number(socket.handshake.query.versionCode?.toString())
    const platform = socket.handshake.query.platform?.toString()
    if (versionCode && platform) {
        socket.join(getSocketRoom(versionCode, platform))
        const drawer = await drawerController.findBy(versionCode, platform)
        if (drawer) {
            socket.emit('updateDrawer', JSON.stringify(drawer))
        }
    }

    socket.on("message", function (message: any) {
        console.log("Message: " + message)
        console.log("Queries: " + JSON.stringify(socket.handshake.query))
    })
})

app.use('/updateDrawer', middleware.verifyAuthorization, async (req, res) => {
    const versionCode = Number(req.query.versionCode?.toString())
    const platform = req.query.platform?.toString()

    if (versionCode && platform) {
        const drawer = await drawerController.findBy(versionCode, platform)
        if (drawer) {
            const room = getSocketRoom(versionCode, platform)
            io.to(room).emit('updateDrawer', JSON.stringify(drawer))
            console.log(`Send Updated-Drawer to Room ${getSocketRoom(versionCode, platform)}`)

            return res.status(200).json(drawer)
        }
    }

    return res.status(400).json({ error: "No json drawer available" })
})

function getSocketRoom(versionCode: number, platform: string): string {
    return versionCode + "+" + platform
}

server.listen(PORT, () => {
    console.log(`Http Server listening on Port: http://localhost:${PORT}`)
})
