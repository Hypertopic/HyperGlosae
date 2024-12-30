import { Given as Soit } from '@badeball/cypress-cucumber-preprocessor';

Soit("un document existant affiché comme document principal", () => {
  cy.visit('/');
  cy.sign_in('alice', 'whiterabbit');
  cy.get('.create-document').click();
  cy.get('.lectern').should('exist');
  cy.get('.focus').click();
  cy.sign_out();
});

Soit("une session active avec mon compte", () => {
  cy.sign_in('alice', 'whiterabbit');
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
  };
  expect(uris).to.have.keys(title);
  cy.visit(uris[title]);
});

