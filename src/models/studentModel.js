// studentModel.js

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

const StudentModel = {
	getAllStudents: () => {
		return new Promise((resolve, reject) => {
			db.all("SELECT * FROM students", [], (err, rows) => {
				if (err) {
					reject(err)
				} else {
					resolve(rows)
				}
			})
		})
	},
	getStudentById: (id) => {
		return new Promise((resolve, reject) => {
			db.get("SELECT * FROM students WHERE id = ?", [id], (err, row) => {
				if (err) {
					reject(err)
				} else {
					resolve(row)
				}
			})
		})
	},
	addStudent: ({ name, age, grade }) => {
		return new Promise((resolve, reject) => {
			db.run(
				"INSERT INTO students (name, age, grade) VALUES (?, ?, ?)",
				[name, age, grade],
				function (err) {
					if (err) {
						reject(err)
					} else {
						resolve({ id: this.lastID, name, age, grade })
					}
				}
			)
		})
	},
	updateStudent: (id, { name, age, grade }) => {
		return new Promise((resolve, reject) => {
			db.run(
				"UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?",
				[name, age, grade, id],
				function (err) {
					if (err) {
						reject(err)
					} else if (this.changes === 0) {
						resolve(null)
					} else {
						resolve({ id, name, age, grade })
					}
				}
			)
		})
	},
	deleteStudent: (id) => {
		return new Promise((resolve, reject) => {
			db.run("DELETE FROM students WHERE id = ?", [id], function (err) {
				if (err) {
					reject(err)
				} else {
					resolve(this.changes > 0)
				}
			})
		})
	},
}

module.exports = { initializeDatabase, StudentModel }
