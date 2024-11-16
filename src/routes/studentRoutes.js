const express = require("express")
const { StudentModel } = require("../studentModel")

const router = express.Router()

// Get all students
router.get("/", async (req, res) => {
	try {
		const students = await StudentModel.getAllStudents()
		res.json(students)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Get a single student by ID
router.get("/:id", async (req, res) => {
	try {
		const student = await StudentModel.getStudentById(req.params.id)
		if (student) {
			res.json(student)
		} else {
			res.status(404).json({ error: "Student not found" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Add a new student
router.post("/", async (req, res) => {
	try {
		const { name, age, grade } = req.body
		if (!name || !age || !grade) {
			return res
				.status(400)
				.json({ error: "Name, age, and grade are required" })
		}
		const newStudent = await StudentModel.addStudent({ name, age, grade })
		res.status(201).json(newStudent)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Update a student
router.put("/:id", async (req, res) => {
	try {
		const { name, age, grade } = req.body
		const updatedStudent = await StudentModel.updateStudent(req.params.id, {
			name,
			age,
			grade,
		})
		if (updatedStudent) {
			res.json(updatedStudent)
		} else {
			res.status(404).json({ error: "Student not found" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Delete a student
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await StudentModel.deleteStudent(req.params.id)
		if (deleted) {
			res.json({ message: "Student deleted successfully" })
		} else {
			res.status(404).json({ error: "Student not found" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = router
