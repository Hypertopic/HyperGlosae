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
  cy.edit_metadata(metadata);
});

Quand("j'essaie de remplacer l'annotation du passage {int} par :", (block_number, markdown) => {
  let element = cy.get(`.lectern>.row:nth-child(${block_number + 1})>.scholium>.content>.formatted-text`);
  cy.intercept('GET', '/api/*').as('getDocument');
  element.click();
  cy.wait('@getDocument');
  cy.wait(1000);
  cy.get('textarea').type('{selectAll} ' + markdown).blur();
});

Quand("j'essaie de remplacer le contenu de la glose par :", (markdown) => {
  cy.click_on_text('content', '<TEXT>');
  cy.get('textarea').type('{selectAll} ' + markdown.replaceAll(/[{}]/g, (x)=>`{${x}}`)).blur();
});

Quand("j'ajoute le document principal à ma bibliothèque", () => {
  cy.get('.bookmark').click();
});

Quand("j'essaie d'accorder les droits d'édition à {string}", (userName) => {
  cy.click_on_contextual_menu_item('.scholium', 'Invite editors...');
  cy.get('.modal-dialog input').type(userName);
  cy.contains('button', 'Invite').click();
});

Quand("je choisis {string} comme type de glose", (pattern) => {
  cy.get('.typeIcon').click();
  cy.get('#searchType').type(pattern);
  cy.get('.list-group-item').first().click();
});

Quand("je survole le texte :", (text) => {
  cy.contains('p[title="Highlight in document"]', text.trim())
    .trigger('mouseover');
});

Quand("je clique sur la référence temporelle {string} annotée", (timecode) => {
  cy.contains('p', timecode).click();
});

