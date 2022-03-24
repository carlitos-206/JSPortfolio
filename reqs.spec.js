// Test for the screen size

describe("Testing for Screen Size", ()=>{
    it("Testing for the screen size", ()=>{
        let screenSize = 768
        expect(screenSize).toBe(false)
    })
})
describe("Testing for Screen Size 2", ()=>{
    it("Testing for the screen size", ()=>{
        let screenSize = 1920
        expect(screenSize).toBe(true)
    })
})