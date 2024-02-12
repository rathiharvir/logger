let logger = require('./logger')

describe("Logger Test", () => {
    it("Logginf Message without metadata", () => {
        expect(() => {
            logger.log("info", "This should throw an error")
        }).toThrow()
    })
})