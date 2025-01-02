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

