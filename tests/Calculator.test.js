const chai = require("chai")
const Calculator = require("../src/Calculator")
const { expect } = chai

describe("Calculator", () => {
	const calculatorService = new Calculator()
	const result = calculatorService.add(1, 2)
	it("should return the sum of a and b", () => {
		expect(result).to.equal(3)
	})
})
