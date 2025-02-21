Cypress.Commands.add('sign_in', (username, password) => {
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.get('.navbar').should('contain', username);
});

Cypress.Commands.add('sign_out', () => {
  cy.reload();
});

Cypress.Commands.add('click_on_text', (type, text) => {
  let elements = text
    ? cy.contains(`.editable.${type}`, text)
    : cy.get(`.editable.${type}`);
  cy.intercept('GET', '/api/*').as('getDocument');
  elements.first().click();
  cy.wait('@getDocument');
});

Cypress.Commands.add('create_glose', (source, login, password) => {
  cy.visit('/' + source);
  cy.sign_in(login, password);
  cy.get('.create-document').click();
  cy.url().should('contain', '#');
  cy.sign_out();
});

Cypress.Commands.add('create_document_from_scratch', (login, password) => {
  cy.visit('/');
  cy.sign_in(login, password);
  cy.get('.create-document').click();
  cy.get('.lectern').should('exist');
});
