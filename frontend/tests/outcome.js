import { Then as Alors, Step } from '@badeball/cypress-cucumber-preprocessor';

Alors("la glose ouverte a le titre par défaut", () => {
  Step(this, "'<TITLE>' est la glose ouverte");
});

Alors("{string} est la glose ouverte", (title) => {
  cy.get('.runningHead .scholium').should('contain', title);
});

Alors("je peux lire {string}", (text) => {
  cy.get('body').should('contain', text);
});

Alors("je vois l'image {string} dans la glose", (alternative_text) => {
  cy.get('.row:not(.runningHead)>.main').should('have.descendants', `img[alt='${alternative_text}']`);
});

Alors("{string} est le document principal", (title) => {
  cy.get('.main .work').should('contain', title);
  cy.title().should('contain', title);
});

Alors("{string} une des gloses", (title) => {
  cy.get('.gloses').should('contain', title);
});

Alors("{string} une des sources", (title) => {
  cy.get('.sources').should('contain', title);
});

Alors("le créateur est {string}", (name) => {
  cy.get('.metadata > .work').first().should('contain', name);
});

Alors("l'année de publication est {string}", (year) => {
  cy.get('.metadata > .edition').first().should('contain', year);
});

Alors("la glose contient {string}", (text) => {
  cy.get('.scholium .formatted-text').contains(text).should('exist');
});

Alors("la glose est ouverte en mode édition", () => {
  cy.get('.scholium').should('have.descendants', 'form');
});

Alors("le document apparaît dans ma bibliothèque", function() {
  cy.get('[alt="Index"]').click();
  cy.get('.bookshelf').contains(this.randomName);
});

Alors("je vois {string} dans la liste des éditeurs", (userName) => {
  cy.get('.modal-dialog .list-group').should('contain', userName);
  cy.get('.modal-dialog .btn-close').click();
});

Alors("{string} peut modifier le document", (userName) => {
  cy.sign_out();
  cy.sign_in('christophe');
  cy.edit_content('My own');
  cy.contains('.formatted-text', 'My own');
});

Alors("le document apparaît dans la bibliothèque de {string}", function(userName) {
  cy.sign_out();
  cy.sign_in(userName);
  cy.get('[alt="Index"]').click();
  cy.get('.bookshelf').contains(this.randomName);
});

Alors("le type {string} est le type de la glose", (name) => {
  cy.contains('.typeSelected', name);
});

Alors("la glose n'a pas de type", () => {
  cy.get('.typeSelected').should('not.exist');
});

