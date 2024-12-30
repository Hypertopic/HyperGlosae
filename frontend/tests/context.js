import { Given as Soit } from '@badeball/cypress-cucumber-preprocessor';

Soit("un document existant affiché comme document principal", () => {
  cy.visit('/');
  cy.sign_in('alice', 'whiterabbit');
  cy.get('.create-document').click();
  cy.get('.lectern').should('exist');
  cy.get('.focus').click();
  cy.sign_out();
});

Soit("une session active avec mon compte", () => {
  cy.sign_in('alice', 'whiterabbit');
});

Soit("la liste des documents affichée", () => {
  cy.visit('/');
});

Soit("le document contenant l'image 2019_10-13_16_UKR_R_A affiché comme document principal", () => {
  cy.visit('/b33f9568386e11eea7644766f8f7218a');
});

Soit("{string} le document principal", (title) => {
  const uris = {
    'Les fées (Charles Perrault)': '/37b4b9ba5cdb11ed887beb5c373fa643',
  };
  expect(uris).to.have.keys(title);
  cy.visit(uris[title]);
});

Soit("un document dont je suis l'auteur affiché comme glose", () => {
  cy.create_glose('4e1a31e14b032f2fa9e161ee9b123456', 'alice', 'whiterabbit');
});

Soit("un document dont je ne suis pas l'auteur affiché comme glose", () => {
  cy.create_glose('4e1a31e14b032f2fa9e161ee9b123456', 'bill', 'madhatter');
});

Soit("un document en deux passages affiché comme document principal", () => {
  cy.visit('/05b61f5285c711ed97bf6b9b56808c45');
});

Soit("une glose dont je suis l'auteur faisant référence uniquement au premier passage", () => {
  cy.sign_in('alice', 'whiterabbit');
  cy.get('.create-document').click();
  cy.click_on_text('content', '<TEXT>');
  cy.get('textarea').type('{selectAll}{{}1{}} First side passage').blur(); // Braces are escaped for Cypress.
  cy.contains('First side passage').should('exist');
  cy.sign_out();
});

