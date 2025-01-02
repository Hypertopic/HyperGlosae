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

Quand("j'essaie de remplacer les métadonnées de la glose par :", (metadata) => {
  cy.click_on_text('metadata');
  cy.get('textarea').type('{selectAll}' + metadata).blur();
});

Quand("j'essaie de remplacer l'annotation du passage {int} par :", (block_number, markdown) => {
  let element = cy.get(`.lectern>.row:nth-child(${block_number + 1})>.scholium>.content>.formatted-text`);
  cy.intercept('GET', '/api/*').as('getDocument');
  element.click();
  cy.wait('@getDocument');
  cy.get('textarea').type('{selectAll}' + markdown).blur();
});

Quand("j'essaie de remplacer le contenu de la glose par :", (markdown) => {
  cy.click_on_text('content', '<TEXT>');
  cy.get('textarea').type('{selectAll}' + markdown.replaceAll(/[{}]/g, (x)=>`{${x}}`)).blur();
});

