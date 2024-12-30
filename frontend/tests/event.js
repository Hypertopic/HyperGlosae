import { When as Quand } from '@badeball/cypress-cucumber-preprocessor';

Quand("j'essaie de créer un nouveau document", () => {
  cy.get('.create-document').click();
});

Quand("j'essaie de créer un glose de type {string}", (option) => {
  cy.get('#select-dropdown').select(option);
  cy.get('.create-document').click();
});

Quand("je me focalise sur {string}", (title) => {
  cy.contains('span', title).parent().prev('a.focus').first().click();
});

