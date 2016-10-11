describe('radar app', () => {
    context('Quering', () => {
        beforeEach(() => {
             cy.visit('http://localhost:8080')
        })
        it('should take input', () => {
            cy.get('input').type('Зв{enter}')
        })
    })
})