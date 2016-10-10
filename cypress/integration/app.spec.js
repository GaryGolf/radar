describe('radar app', () => {
    beforeEach(() => {

    })

    it('should assert that title is correct', () => {

        cy.visit('http://localhost:8080')
        cy.title().should('include',"Document")
    })
})