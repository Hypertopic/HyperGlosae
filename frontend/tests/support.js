Cypress.Commands.add('sign_in', (username, password) => {
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.get('.navbar').should('contain', username);
});

Cypress.Commands.add('sign_out', () => {
  cy.reload();
});

