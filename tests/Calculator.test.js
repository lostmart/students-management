const chai = require("chai")
const Calculator = require("../src/Calculator")
const { expect } = chai

describe("Calculator", () => {
	let calculatorService

	// Initialize a new Calculator instance before each test
	beforeEach(() => {
		calculatorService = new Calculator()
	})

	describe("add", () => {
		it("should return the sum of a and b", () => {
			const result = calculatorService.add(1, 2)
			expect(result).to.equal(3)
		})
	})

	describe("subtract", () => {
		it("should return the subtraction of a and b", () => {
			const result = calculatorService.subtract(3, 2)
			expect(result).to.equal(1)
		})
	})

	describe("divide", () => {
		it("should return the division of a and b", () => {
			const result = calculatorService.divide(16, 4)
			expect(result).to.equal(4)
		})

		it("should throw an error when dividing by 0", () => {
			expect(() => calculatorService.divide(10, 0)).to.throw(
				Error,
				"Can't divide by 0"
			)
		})
	})

	describe("multiply", () => {
		it("should return the multiplication of a and b", () => {
			const result = calculatorService.multiply(4, 4)
			expect(result).to.equal(16)
		})
	})
})
