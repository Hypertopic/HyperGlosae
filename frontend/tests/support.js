Cypress.Commands.add('sign_in', (username, password) => {
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.get('.navbar').should('contain', username);
});

Cypress.Commands.add('sign_out', () => {
  cy.reload();
});

Cypress.Commands.add('click_on_text', (type) => {
  cy.get(`.editable.${type}`).first().click();
});

Cypress.Commands.add('create_glose', (source, login, password) => {
  cy.visit('/' + source);
  cy.sign_in(login, password);
  cy.get('.create-document').click();
  cy.url().should('contain', '#');
  cy.sign_out();
});

