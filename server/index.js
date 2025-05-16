import express from 'express'
import cors from 'cors'
import entriesRouter from './routes/entries.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/entries', entriesRouter)

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
