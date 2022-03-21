const path = require('path');

const projectID = '15212186';
const testUser = 'qa_admin';
const testPassword = 'Viachem07';

function login(username, password) {
    cy.get("input").contains("username", { timeout: 5000} ).type(testUser);
    cy.get("input[name=password])").type(testPassword);
}

describe('Project permissions regression test', () => {
    const route = 'https://note-staging.revealbio.com/#/project/11656/images'; // TBD

    const downloadsFolder = Cypress.config('downloadsFolder');

    before(() => { // beforeEach
        //cy.intercept(`${API_ROOT}/api/user/current.json`, testUser);
        cy.visit(route);
        cy.log("Logging in to imageDx as " + testUser);
        cy.get("input[name=username]").type(testUser);
        cy.get("input[name=password]").type(testPassword); //.type("{enter}");
        cy.get("button").contains("Log in").click();
        cy.get("div").contains("Welcome to imageDx").should('exist');
        //cy.wait(2000);
    });

    it('Access a project where user is not a member', () => {
        
    });

    it('Access a project where user has Project contributor role', () => {
        
    });

    it('Access a project where user has Project manager role', () => {
        
    });

    it('Access a project where user has Project representive role', () => {
        
    });
});