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
  cy.click_on_text('content', '…');
  cy.get('textarea').type('{selectAll} ' + markdown.replaceAll(/[{}]/g, (x)=>`{${x}}`)).blur();
});

Quand("j'ajoute le document principal à ma bibliothèque", () => {
  cy.get('.bookmark').click();
});

Quand("j'essaie d'accorder les droits d'édition à {string}", (userName) => {
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Invite editors...');
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

Quand("je sélectionne le fragment de texte :", (text) => {
  text = text.trim();
  cy.contains('p', text).setSelection(text);
  let paragraph = cy.contains('.main', text);
  cy.click_on_contextual_menu_item(paragraph, 'Comment the selected text...');
});

Quand("je réutilise {string} comme glose", function (title) {
  cy.get('.select-document').click();
  cy.get('input[placeholder="Search documents"]').type(title);
  cy.get('.existingDocument').first().click();
});

Quand("je découpe la glose en passages numérotés et que je me focalise sur la glose", () => {
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Break into numbered passages');
  cy.get('.focus').click();
});

Quand("je remplace le contenu de la glose par ce qui suit et que je me focalise sur la glose :", (markdown) => {
  cy.click_on_text('content', '…');
  cy.get('textarea').type('{selectAll} ' + markdown.replaceAll(/[{}]/g, (x)=>`{${x}}`)).blur();
  cy.get('.focus').click();
});

Quand("j'essaie d'ouvrir l'URI {string} reçue par courriel", (uri) => {
  cy.visit(uri);
});

Quand("je souhaite modifier le contenu du document principal", () => {
  cy.get('.icon.edit').click();
  cy.click_on_text('content');
});

Quand("j'essaie de créer une glose en gardant {string} comme éditeur", (userName) => {
  cy.get('.open-editor-list').click();
  cy.get(`#editor-${userName}`).click();
  cy.get(".create-document").click();
});

Quand("j'essaie de créer une glose en gardant tous les éditeurs", () => {
  cy.get('.open-editor-list').click();
  cy.get(`#select-all-editor`).click();
  cy.get(".create-document").click();
});

Quand("j'essaie de créer une glose en gardant les métadonnées du document source", () => {
  cy.get('.open-metadata-list').click();
  cy.get(`#select-all-metadata`).click();
  cy.get(".create-document").click();
});

Quand("j'essaie de créer une glose en gardant la {string} du document source", (metadata) => {
  cy.get('.open-metadata-list').click();
  cy.get(`#metadata-${metadata}`).click();
  cy.get(".create-document").click();
});

Quand("je consulte les informations de création du document", function () {
  cy.get('.info-icon-container').trigger('mouseover');
});

Quand("je consulte le contenu de {string}", function (title) {
  const uris = {
    'Les fées (Charles Perrault)': '/37b4b9ba5cdb11ed887beb5c373fa643',
    'Vidéo Sherlock Jr. (Buster Keaton)': '/4e1a31e14b032f2fa9e161ee9b009125',
    'Treignes, le 8 septembre 2012 (Christophe Lejeune)': '/6b56ee657c870dfacd34e9ae4e0643dd',
    'Restaurer la vapeur': '/6b56ee657c870dfacd34e9ae4e050fcc',
    'Vestiges (diagramme de classes)': '/146e6e8442f0405b721b79357d0021e3',
    'Víly (Charles Perrault)' : '/420ab198674f11eda3b7a3fdd5ea984f',
    'Fairies (Charles Perrault)' : '/96bddee6-24b2-11ef-a1f4-5351a35fcaac',
    'Étiquetage de l\'entretien' : '/6327c5008d1f11ed9aa8e7ae771dee2e',
  };
  expect(uris).to.contain.key(title);
  cy.get(`a.icon.open[href*="#${uris[title].slice(1)}"]`).click();
}
);
