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
    'Restaurer la vapeur': '/6b56ee657c870dfacd34e9ae4e050fcc',
    'Vestiges (diagramme de classes)': '/146e6e8442f0405b721b79357d0021e3',
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

Soit("un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur", () => {
  cy.sign_in('alice');
  cy.get('.create-document').click();
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

Soit("qui n'a pas de document source", () => {
  cy.get('.sources').find('.card-body').should('not.exist');
});

Soit("qui a un document source", () => {
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
    const parseStrToObject = str => {
      const lines = str.trim().split('\n');
      const result = {};
      lines.forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key !== undefined && value !== undefined) {
          result[key] = value;
        }
      });
      return result;
    };
    const expectedMetadata = parseStrToObject(metadata);
    const actualMetadata = parseStrToObject(actual);
    expect(actualMetadata).to.deep.equal(expectedMetadata);
  });
  cy.get('.scholium>.icon.focus').click();
});
