const url = 'https://localhost:7110/'

context('3-Login', () => {
    beforeEach(() => {
        //Visit home page
        cy.visit(url)

        //Find login button and click, also check the page
        cy.contains('Login').click()
        cy.url().should('include', '/Account/Login')
    })

    it('Login without 2FA', () => {
        //Fill in input fields and submit
        cy.get('form').within(() => {
            cy.get('input[type=email]').type(Cypress.env('admin_email'))
            cy.get('input[type=password]').type(Cypress.env('admin_password'), { log: false })
            cy.get('button[type=submit]').click()
        });

        //Check if back on homepage and logged in
        cy.url().should('eq', url)
        cy.contains('Hello ' + Cypress.env('admin_email') + '!')
        cy.contains('Logout')
    })

    it('Reach 2FA page when logging in', () => {
        //Fill in input fields and submit
        cy.get('form').within(() => {
            cy.get('input[type=email]').type(Cypress.env('user_email'))
            cy.get('input[type=password]').type(Cypress.env('user_password'), { log: false })
            cy.get('button[type=submit]').click()
        });

        //Check if on 2FA page
        cy.url().should('include', '/LoginWith2fa')

        //Check if form correct
        cy.get('form').within(() => {
            cy.get('input[type=text]')
            cy.get('input[type=checkbox]')
            cy.get('button[type=submit]')
        })
    })
})