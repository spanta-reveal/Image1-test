const path = require('path');

const projectID = '15212186';
const testUser = 'qa_admin';
const testPassword = 'QApassa1';

function login(username, password) {
    cy.get("input").contains("username", { timeout: 5000} ).type(testUser);
    cy.get("input[name=password])").type(testPassword);
}

describe('Project Results Page Test', () => {
    const testSite = 'https://note-staging.revealbio.com/#/project/15212186/results'; // 20-494 C Bio Ki67 on staging, need prod equiv

    const downloadsFolder = Cypress.config('downloadsFolder');

    beforeEach(() => { // beforeEach
        cy.visit(testSite);
        cy.log("Logging in to imageDx as " + testUser);
        cy.get("input[name=username]").type(testUser);
        cy.get("input[name=password]").type(testPassword); //.type("{enter}");
        cy.get("button").contains("Log in").click();
        cy.get("div").contains("Welcome to imageDx").should('exist');
        cy.wait(2000);
        // Delete all the files in the downloads folder before each test
        //cy.task('deleteFolder', downloadsFolder);
    });

    // it('Test interactions - deleteme', () => {
    //     cy.get("div.th-wrap").contains("Positive Cell Count").click();
    //     cy.wait(10000);
    // });

    it('Sort by Positive Cell Count', () => {
        cy.log("Click on Positive Cell Count header");
        cy.get(':nth-child(4) > .th-wrap').click();
        cy.log("Verify sorting - Positive Cell Count by ascending order");
        cy.get("tbody tr:nth-child(4) td:nth-child(4)").contains('3349').should('be.visible');
    });

    it('Sort by Name', () => {
        for (let n = 0; n <= 1; n++) { // click twice to toggle descending sort order
            cy.get("div.th-wrap").contains("Name", { timeout: 5000 }).click();
        }
        cy.log("Verify sorting - Name by descending order");
        cy.get("tbody tr:nth-child(3) td:nth-child(2)").contains('Ki67_14780008C0003S').should('be.visible');
        cy.get("tbody tr:nth-child(3) td:nth-child(4)").contains('3349').should('be.visible');

    });

});

