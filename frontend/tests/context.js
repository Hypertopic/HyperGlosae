import { Given as Soit, Step } from '@badeball/cypress-cucumber-preprocessor';
import { parseStrToObject } from './support';

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

Soit("un document dont je ne suis pas l'auteur affiché comme document principal et contenant :", (text) => {
  cy.sign_in('bill', '/');
  cy.create_document_from_scratch();
  cy.edit_content(text);
  cy.get('.focus').click();
  cy.sign_out();
});

Soit("un document dont je ne suis pas l'auteur affiché comme document principal et qui a parmi ses éditeurs {string}", (userName) => {
  cy.sign_in('bill', '/');
  cy.create_document_from_scratch();
  cy.set_random_name();

  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Invite editors...');

  cy.get('.modal-dialog input').type(userName);
  cy.contains('button', 'Invite').click();
  cy.get('.list-group').should('contain', userName);

  cy.get('.btn-close').click();
  cy.get('.icon.focus').click();

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
    'Restaurer la vapeur': '/6b56ee657c870dfacd34e9ae4e050fcc',
    'Vestiges (diagramme de classes)': '/146e6e8442f0405b721b79357d0021e3',
    "Entretien avec un responsable d'opération": '/05b61f5285c711ed97bf6b9b56808c45',
    "Étiquetage de l'entretien": '/6327c5008d1f11ed9aa8e7ae771dee2e',
    'Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes': '/b8cc79d8abba11edb9ee53989bc96c06',
  };
  expect(uris).to.contain.key(title);
  cy.visit(uris[title]);
  cy.get('body').should('contain', title);
});

Soit("un document dont je suis l'auteur affiché comme glose", () => {
  cy.sign_in('alice', '/');
  cy.create_glose();
  cy.sign_out();
});

Soit("avec un document reconnaissable dont je suis l'auteur affiché comme glose", () => {
  cy.sign_in('alice');
  cy.create_glose(true);
  cy.sign_out();
});

Soit("avec un document reconnaissable dont je ne suis pas l'auteur affiché comme glose", () => {
  cy.sign_in('bill');
  cy.create_glose(true);
  cy.sign_out();
});

Soit("un document reconnaissable dont je suis l'auteur affiché comme glose", () => {
  cy.sign_in('alice', '/');
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
  cy.click_on_create();
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

Soit("un document reconnaissable dont je suis l'auteur affiché comme glose et dont le type est {string}", (option) => {
  cy.sign_in('alice', '/420ab198674f11eda3b7a3fdd5ea984f');
  cy.create_glose_of_type(true,option);
  cy.sign_out();
});

Soit("{string} la glose ouverte", (title) => {
  cy.contains('span:not(.work)', title).prevAll('a.open').click();
});

Soit("un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur", () => {
  cy.sign_in('alice');
  cy.click_on_create();
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Break into numbered passages');
  cy.get('.lectern .row:not(.runningHead) .scholium').should('have.length.greaterThan', 1);
  cy.sign_out();
});

Soit("un document dont je suis l'auteur affiché comme glose et contenant :", (text) => {
  cy.sign_in('alice', '/');
  cy.create_document_from_scratch();
  cy.edit_content(text);
  cy.sign_out();
});

Soit ("qui n'a pas de document source", () => {
  cy.get('.sources').find('.card-body').should('not.exist');
});

Soit ("qui a un document source", () => {
  cy.get('.sources').find('.card-body').should('exist');
});

Soit("ayant parmi les éditeurs {string} et {string}", (userName1, userName2) => {
  cy.get('.icon.edit').click()
  cy.click_on_contextual_menu_item('.runningHead .scholium', 'Invite editors...');

  cy.get('.modal-dialog input').type(userName1);
  cy.contains('button', 'Invite').click();
  cy.get('.list-group').should('contain', userName1);

  cy.get('.modal-dialog input').type(userName2);
  cy.contains('button', 'Invite').click();
  cy.get('.list-group').should('contain', userName2);

  cy.get('.btn-close').click();
  cy.get('.icon.focus').click()
});

Soit("un document sans champ {string} affiché comme document principal", (field) => {
  cy.sign_in('alice', '/');
  cy.create_document_from_scratch();
  cy.url().then((url) => {
    const id = url.split('#')[1];
    cy.request(`/api/${id}`)
      .then(({ body: doc }) => {
        delete doc[field];
        cy.request('PUT', `/api/${id}`, doc)
          .then(() => {
            cy.visit(`/${id}`);
          });
      });
  });
  cy.get('.lectern').should('exist');
  cy.sign_out();
});

Soit("ayant les métadonnées", (metadata) => {
  cy.get('.icon.edit').click();
  cy.get('.editable.metadata').click();
  cy.get('form textarea').invoke('val').then(actual => {
    const expectedMetadata = parseStrToObject(metadata);
    const actualMetadata = parseStrToObject(actual);
    expect(actualMetadata).to.deep.equal(expectedMetadata);
  });
  cy.get('.scholium>.icon.focus').click();
});

Soit("je choisis {string} comme type de reférence", (gloseType) => {
  cy.get('.select-document').click();
  cy.get('#select-dropdown').select(gloseType);
});

Soit("je réutilise ma glose reconnaissable", function (){
  cy.get('input[placeholder="Search documents"]').type(this.randomName);
  cy.get('.existingDocument').first().click();
});

Soit("je modifie le document", () => {
  cy.get('.icon.edit').click()
  cy.edit_content("test");
  cy.get('.focus').click();
});

Soit("{string} le nom de la licence du document principal", (license) => {
  cy.get('.license').eq(0).should('contain', license);
});

