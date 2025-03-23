const url = 'https://localhost:7110/'

context('1-Match', () => {
    beforeEach(() => {
        //Visit home page
        cy.visit(url)

        //Find login button and click, also check the page
        cy.contains('Login').click()
        cy.url().should('include', '/Account/Login')

        //Fill in input fields and submit
        cy.get('form').within(() => {
            cy.get('input[type=email]').type(Cypress.env('admin_email'))
            cy.get('input[type=password]').type(Cypress.env('admin_password'), { log: false })
            cy.get('button[type=submit]').click()
        });
    })

    it('Update and reset match', () => {
        //Update scores of both teams
        cy.get('match-component').shadow().find('button[id=button_t1]').click()
        cy.get('match-component').shadow().find('button[id=button_t2]').click()

        //Check score
        cy.get('match-component').shadow().find('p[id=score]').contains('1 - 1')

        //Reset score of match
        cy.get('button[id=reset-match]').click()

        //Check score again
        cy.get('match-component').shadow().find('p[id=score]').contains('0 - 0')
    })
})