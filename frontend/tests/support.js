Cypress.Commands.add('sign_in', (username, password = '') => {
  if (!password) switch (username) {
    case 'christophe': password = 'redqueen';
  }
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

Cypress.Commands.add('create_glose', (source, login, password, random = false) => {
  cy.visit('/' + source);
  cy.sign_in(login, password);
  cy.get('.create-document').click();
  cy.url().should('contain', '#');
  if (random) {
    cy.set_random_name();
  }
  cy.sign_out();
});

Cypress.Commands.add('create_document_from_scratch', (login, password) => {
  cy.visit('/');
  cy.sign_in(login, password);
  cy.get('.create-document').click();
  cy.get('.lectern').should('exist');
});

Cypress.Commands.add('edit_metadata', (metadata) => {
  cy.click_on_text('metadata');
  cy.get('textarea').type('{selectAll}' + metadata).blur();
  cy.get('.scholium .metadata').should('exist');
});

Cypress.Commands.add('edit_content', (metadata) => {
  cy.click_on_text('content');
  cy.get('textarea').type('{selectAll}' + metadata).blur();
});

Cypress.Commands.add('set_random_name', function() {
  this.randomName = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
  cy.edit_metadata(`dc_title: ${this.randomName}`);
});

Cypress.Commands.add('click_on_contextual_menu_item', (context, item_name) => {
  cy.get(`${context} > .dropdown > .toggle`).click({force: true});
  cy.contains(item_name).click({force: true});
});

