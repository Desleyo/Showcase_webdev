const url = 'https://localhost:7110/'

context('2-Register', () => {
    beforeEach(() => {
        //Visit home page
        cy.visit(url)

        //Find register button and click, also check the page
        cy.contains('Register').click()
        cy.url().should('include', '/Account/Register')
    })

    it('Register invalid email', () => {
        //Wrongly fill in email and submit
        cy.get('form').within(() => {
            cy.get('input[type=email]').type('test@')
            cy.get('button[type=submit]').click()
        })

        //Check for error
        cy.get('form').within(() => {
            cy.get('span[id=Input_Email-error]')
        })
    })

    it('Register invalid password', () => {
        //Wrongly fill in password, and submit
        cy.get('form').within(() => {
            cy.get('input[id=Input_Password]').type('pass')
            cy.get('button[type=submit]').click()
        })

        //Check for error
        cy.get('form').within(() => {
            cy.get('span[id=Input_Password-error]')
        })
    })

    it('Register non-matching passwords', () => {
        //Fill password fields with non-matching passwords
        cy.get('form').within(() => {
            cy.get('input[id=Input_Password]').type('pass123')
            cy.get('input[id=Input_ConfirmPassword]').type('123pass')
            cy.get('button[type=submit]').click()
        })

        //Check for error
        cy.get('form').within(() => {
            cy.get('span[id=Input_ConfirmPassword-error]')
        })
    })
})