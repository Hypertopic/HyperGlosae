import { Given as Soit, Step } from '@badeball/cypress-cucumber-preprocessor';

Soit("un document existant affiché comme document principal", () => {
  cy.sign_in('alice', '/');
  cy.create_document_from_scratch();
  cy.get('.focus').click();
  cy.sign_out();
});

Soit("un document dont je ne suis pas l'auteur affiché comme document principal", () => {
  cy.sign_in('bill', '/');
  cy.create_document_from_scratch();
  cy.set_random_name();
  cy.get('.focus').click();
  cy.sign_out();
});

Soit("une session active avec mon compte", () => {
  cy.sign_in('alice');
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
    'Vidéo Sherlock Jr. (Buster Keaton)': '/4e1a31e14b032f2fa9e161ee9b009125',
    'Treignes, le 8 septembre 2012 (Christophe Lejeune)': '/6b56ee657c870dfacd34e9ae4e0643dd',
  };
  expect(uris).to.contain.key(title);
  cy.visit(uris[title]);
  cy.get('body').should('contain', title);
});

Soit("un document dont je suis l'auteur affiché comme glose", () => {
  cy.sign_in('alice', '/4e1a31e14b032f2fa9e161ee9b123456');
  cy.create_glose(true);
  cy.sign_out();
});

Soit("un document dont je ne suis pas l'auteur affiché comme glose", () => {
  cy.sign_in('bill', '/4e1a31e14b032f2fa9e161ee9b123456');
  cy.create_glose();
  cy.sign_out();
});

Soit("un document en deux passages affiché comme document principal", () => {
  cy.visit('/05b61f5285c711ed97bf6b9b56808c45');
});

Soit("une glose dont je suis l'auteur faisant référence uniquement au premier passage", () => {
  cy.sign_in('alice');
  cy.get('.create-document').click();
  Step(this, "j'essaie de remplacer le contenu de la glose par :", '{1} First side passage');
  cy.contains('.formatted-text', 'First side passage');
  cy.sign_out();
});

Soit("un document dont je suis l'auteur affiché comme glose et dont le type est {string}", (name) => {
  cy.sign_in('alice', '/4e1a31e14b032f2fa9e161ee9b123456');
  cy.create_glose();
  cy.get('.typeIcon').click();
  cy.contains('.list-group-item', name).click();
  cy.sign_out();
});

Soit("{string} la glose ouverte", (title) => {
  cy.contains('span:not(.work)', title).prevAll('a.open').click();
});

