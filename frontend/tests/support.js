Cypress.Commands.add('sign_in', (username, page = '') => {
  if (page)
    cy.visit(page);
  switch (username) {
    case 'alice':
      password = 'whiterabbit';
      break;
    case 'bill':
      password = 'madhatter';
      break;
    case 'christophe':
      password = 'redqueen';
      break;
  }
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.get('.navbar').should('contain', username);
});

Cypress.Commands.add('sign_out', () => {
  cy.get('.navbar .dropdown-toggle').click();
  cy.contains('.dropdown-item', 'Sign out').click();
});

Cypress.Commands.add('click_on_text', (type, text) => {
  let elements = text
    ? cy.contains(`.editable.${type}`, text)
    : cy.get(`.editable.${type}`);
  cy.intercept('GET', '/api/*').as('getDocument');
  elements.first().click();
  cy.wait('@getDocument');
});

Cypress.Commands.add('create_glose', (random = false) => {
  cy.click_on_create();
  if (random) {
    cy.set_random_name();
  }
});

Cypress.Commands.add('create_glose_of_type', (random = false, option = "Adaptation") => {
  cy.get('#select-dropdown').select(option);
  cy.click_on_create();
  if (random) {
    cy.set_random_name();
  }
});

Cypress.Commands.add('create_document_from_scratch', () => {
  cy.click_on_create();
  cy.get('.lectern').should('exist');
});

Cypress.Commands.add('edit_metadata', (metadata) => {
  cy.click_on_text('metadata');
  cy.get('textarea').type('{selectAll}' + metadata).blur();
  cy.get('.scholium .metadata').should('exist');
});

Cypress.Commands.add('edit_content', (metadata) => {
  cy.click_on_text('content');
  cy.get('textarea').type('{selectAll}' + metadata).blur();
});

Cypress.Commands.add('set_random_name', function() {
  this.randomName = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
  cy.edit_metadata(`dc_title: ${this.randomName}`);
});

Cypress.Commands.add('click_on_contextual_menu_item', (context, item_name) => {
  if (typeof context === 'string') {
    context = cy.get(context);
  }
  context.find('.dropdown > .toggle').click({force: true});
  cy.contains(item_name).click({force: true});
});

Cypress.Commands.add('click_on_create', () => {
  cy.get('.create-document').click();
  cy.url().should('match', /\/[0-9a-f]+#[0-9a-f]+$/);
});

// From: https://github.com/decaporg/decap-cms/blob/a4b7481a99f58b9abe85ab5712d27593cde20096/cypress/support/commands.js#L374

Cypress.Commands.add('setSelection', { prevSubject: true }, (subject, query, endQuery) => {
  return cy.wrap(subject).selection($el => {
    if (typeof query === 'string') {
      const anchorNode = getTextNode($el[0], query);
      const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
      const anchorOffset = anchorNode.wholeText.indexOf(query);
      const focusOffset = endQuery
        ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
        : anchorOffset + query.length;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    } else if (typeof query === 'object') {
      const el = $el[0];
      const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
      const anchorOffset = query.anchorOffset || 0;
      const focusNode = query.focusQuery
        ? getTextNode(el.querySelector(query.focusQuery))
        : anchorNode;
      const focusOffset = query.focusOffset || 0;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    }
  });
});

// Used by setSelection
Cypress.Commands.add('selection', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject)
    .trigger('mousedown')
    .then(fn)
    .trigger('mouseup');
  cy.document().trigger('selectionchange');
  return cy.wrap(subject);
});

// Used by setSelection
function getTextNode(el, match) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  if (!match) {
    return walk.nextNode();
  }
  let node;
  while ((node = walk.nextNode())) {
    if (node.wholeText.includes(match)) {
      return node;
    }
  }
}

// Used by setSelection
function setBaseAndExtent(...args) {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
}

// Simplified YAML parser (does not handle complex YAML structures)
export function parseStrToObject(str) {
  const lines = str.trim().split('\n');
  const result = {};
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    if (key && value) {
      result[key] = value;
    }
  });
  return result;
}
