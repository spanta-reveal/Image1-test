import {
    API_ROOT,
    MOCK_USER_ADMIN,
    MOCK_PROJECT,
    MOCK_ONTOLOGY,
    MOCK_IMAGE,
  } from '../utils.js';

import 'cypress-file-upload';
  
const path = require('path');

const projectID = '15212186';
const testUser = 'qa_admin';
const testPassword = 'Viachem07';

function login(username, password) {
    cy.get("input").contains("username", { timeout: 5000} ).type(testUser);
    cy.get("input[name=password])").type(testPassword);
}

describe('Digital Assay regression test', () => {
    const route = 'https://note-staging.revealbio.com/#/software';

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
        
        // Delete all the files in the downloads folder before each test
        cy.task('deleteFolder', downloadsFolder);
    });

    it('Upload a new digital assay', () => {
        cy.get('.vts-btn').contains("New").click();
        cy.get('header').contains("Add Digital Assay").should('be.visible');
        cy.get('button').contains("Save").should('be.disabled');
        cy.get('input[type=file]').click();
        cy.get('input[type=file]').click();
        //Desktop.type('C:\temp\DigitalAssays\focus_upload_annotations_2.json');


    });

});

