const url = 'https://localhost:7110/';

context('Login', () => {
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
            cy.get('input[type=email]').type('admin@test.com')
            cy.get('input[type=password]').type('Test-123')
            cy.get('button[type=submit]').click()
        });

        //Check if back on homepage and logged in
        cy.url().should('eq', url)
        cy.contains('Hello admin@test.com!')
        cy.contains('Logout')
    })

    it('Reach 2FA page when logging in', () => {
        //Fill in input fields and submit
        cy.get('form').within(() => {
            cy.get('input[type=email]').type('desleyoord@gmail.com')
            cy.get('input[type=password]').type('Test-123')
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