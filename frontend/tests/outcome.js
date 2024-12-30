import { Then as Alors } from '@badeball/cypress-cucumber-preprocessor';

Alors("la glose ouverte a le titre par défaut", () => {
  cy.get('.runningHead .scholium').should('contain', '<TITLE>');
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

