const express = require("express")
const app = express()

const port = 3000

//const { initializeDatabase } = require("./src/modules/studentModel")
//const studentRoutes = require("./src/routes/studentRoutes")

const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.resolve(__dirname, "students.db")
let db

const initializeDatabase = () => {
	return new Promise((resolve, reject) => {
		db = new sqlite3.Database(dbPath, (err) => {
			if (err) {
				return reject(err)
			}
			db.run(
				`CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    age INTEGER NOT NULL,
                    grade TEXT NOT NULL
                )`,
				(err) => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				}
			)
		})
	})
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use routes
//app.use("/students", studentRoutes)

// Start the server and initialize the database
app.listen(port, async () => {
	try {
		await initializeDatabase()
		console.log(`Server running on http://localhost:${port}`)
	} catch (error) {
		console.error("Failed to initialize database:", error)
	}
})
