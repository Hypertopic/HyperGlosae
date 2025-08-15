import { Then as Alors, Step } from '@badeball/cypress-cucumber-preprocessor';
import { parseStrToObject } from './support';

Alors("la glose ouverte a le titre par défaut", () => {
  Step(this, "'…' est la glose ouverte");
});

Alors("{string} est la glose ouverte", (title) => {
  cy.get('.runningHead .scholium').should('contain', title);
});

Alors("je peux lire {string}", (text) => {
  cy.get('body').should('contain', text);
});

Alors("je ne peux pas lire {string}", (text) => {
  cy.get('body').should('not.contain', text);
});

Alors("je vois l'image {string} dans la glose", (alternative_text) => {
  cy.get('.row:not(.runningHead)>.scholium').should('have.descendants', `img[alt='${alternative_text}']`);
});

Alors("je vois l'image {string} dans le document principal", (alternative_text) => {
  cy.get('.row:not(.runningHead)>.main').should('have.descendants', `img[alt='${alternative_text}']`);
});

Alors("je ne vois pas l'image {string}", (alternative_text) => {
  cy.get(`img[alt='${alternative_text}']`).should('not.exist');
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

Alors("la langue est {string}", (language) => {
  cy.get('.metadata > .edition').first().should('contain', language);
});

Alors("la glose contient {string}", (text) => {
  cy.contains('.scholium .formatted-text', text).should('exist');
});

Alors("la glose contient :", (text) => {
  cy.contains('.scholium .formatted-text', text.replaceAll('\n', ' ')).should('exist');
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

Alors("le nouveau type est le type de la glose", function() {
  cy.contains('.typeSelected', this.randomType);
});

Alors("le texte du document principal est en surbrillance :", (text) => {
  cy.contains('mark', text.trim()).should('exist');
});

Alors("la vidéo du document principal se lance de {int} à {int} secondes", (start, end) => {
  cy.get(`iframe[src*="start=${start}&end=${end}"]`).should('exist');
});

Alors("la glose est ouverte en mode édition et contient :", (text) => {
  cy.get('.scholium textarea').should('contain', text);
});

Alors("la rubrique {string} est associée au passage {string}", (rubric, text) => {
  cy.contains('.row', text).contains('.rubric', rubric);
});

Alors("{string} est la glose ouverte en mode édition", (title) => {
  cy.get('.runningHead .scholium').should('contain', title);
  cy.get('.scholium').should('have.descendants', 'form');
});

Alors("la glose ouverte a {string} parmi les éditeurs par défaut", (userName) => {
  cy.get('.icon.edit').click()
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Invite editors...');

  cy.get('.list-group').should('contain', userName);
});

Alors("la glose ouverte a {string} et {string} parmi les éditeurs par défaut", (userName1, userName2) => {
  cy.get('.icon.edit').click()
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Invite editors...');

  cy.get('.list-group').should('contain', userName1);
  cy.get('.list-group').should('contain', userName2);
});

Alors("la glose ouverte a les métadonnées", (metadata) => {
  cy.get('.icon.edit').click();
  cy.get('.editable.metadata').click();
  cy.get('form textarea').invoke('val').then(actual => {
    const expectedMetadata = parseStrToObject(metadata);
    const actualMetadata = parseStrToObject(actual);
    Object.entries(expectedMetadata).forEach(([key, value]) => {
      expect(actualMetadata).to.have.property(key, value);
    });
  })
});

Alors("je peux voir l'auteur de la création du document {string} et sa date de création", (userName) => {
  cy.get('.text-document-creation')
    .should('contain.text', 'Created by ' + userName + ' on');
  cy.get('.text-document-creation').invoke('text')
    .then((fullText) => {
      const date = new Date(fullText.split('on')[1].trim());
      expect(date).not.to.be.NaN;
    });
});

Alors("je peux voir une modification effectuée par {string} et la date de cette modification", (userName) => {
  cy.get('.text-document-creation')
    .should('contain.text', 'Modified by :' + userName + ' on');
  cy.get('.text-document-creation').invoke('text')
    .then((fullText) => {
      const date = new Date(fullText.split('on')[1].trim());
      expect(date).not.to.be.NaN;
    });
});

Alors("aucun historique n'est affiché", () => {
  cy.get('.text-document-creation')
    .should('contain.text', 'No historical record exists for this document.');
});

Alors("la glose ouverte est le document reconnaissable", function (title) {
  cy.get('.runningHead .scholium').should('contain', this.randomName);
});
Alors("il n'y a aucun document principal affiché", () => {
  cy.get('.main').children().should('have.length', 0);
});

Alors("les références au document principal contenues dans la glose ne sont plus visibles", () => {
  cy.get('.scholium').should('not.contain', 'Les hommes naissent et demeurent libres et égaux en droits.');
});

Alors("le document comporte la vidéo {string}", (videoUrl) => {
  cy.get(`iframe[src="${videoUrl}"]`).should('exist');
});

Alors("le nom de la licence de la glose est {string}", (name) => {
  cy.get('.license').eq(1).should('contain', name);
});

Alors("le code de la licence de la glose est {string}", (code) => {
  cy.get('.license').eq(1).get(`img[alt="${code}"]`).should('be.visible');
});

Alors("l'image intégrée dans la page a pour légende {string}", (image_caption) => {
  cy.get('.lectern').should('contain', image_caption);
});

