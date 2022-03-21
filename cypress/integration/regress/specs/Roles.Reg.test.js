import { imageDx } from '../pages/imageDx.page.js';
import { ImageList } from '../pages/ImageList.page.js';
import { Analysis } from '../pages/Analysis.page.js';
  
//const path = require('path');

const projectID = '243169215';
const testAdminUser = 'qa_admin';
const testAdminPassword = 'QApassa1';
const testUser1 = 'qa_user1';
const testUser1Password = 'QApass01';

// Tests for user roles and access levels

describe('User Roles test', () => {
    const testProject = 'https://note-staging.revealbio.com/#/project/' + projectID + '/images'; // QA Study 1 - Prod
    const imageListPage = new ImageList();

    // beforeEach(() => {
    //     imageListPage.login(testUser, testPassword);
    //     cy.wait(2000);
    //     cy.visit(testProject, { timeout: 10000 });
    //     //imageListPage.selectUserMenu("Open admin session");
    //     //cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay', { timeout: 8000 }).should('exist');
    // });

    it('Login as admin user and check permissions on imageDx landing page', () => {
        // login as admin user and open admin session
        imageListPage.login(testAdminUser, testAdminPassword, true);
        cy.visit(testProject, { timeout: 10000 });
        cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay', { timeout: 8000 }).should('exist');
        
        // check top navbar options
        // if no admin session: Workspace, Uploads, Digital Assays
        // if admin session: Workspace, Uploads, Ontologies, Digital Assays, Admin
        imageListPage.checkTopNavBar(['Workspace', 'Uploads', 'Ontologies', 'Digital Assays', 'Admin']);

        // check left navbar options
        // if no admin session: Images, Annotations, Information
        // if admin session: Images, Annotations, Analysis, Activity, Information, Results, Configuration
        imageListPage.checkLeftNavBar(['Images', 'Annotations', 'Analysis', 'Activity', 'Information', 'Results', 'Configuration']);

        // Close admin session
        imageListPage.closeAdminSession();
        cy.visit(testProject, { timeout: 10000 });
        cy.wait(1500);

        imageListPage.checkTopNavBar(['Workspace', 'Uploads', 'Digital Assays']);
        imageListPage.checkLeftNavBar(['Images', 'Annotations', 'Information']);

        cy.visit(testProject, { timeout: 10000 });
        imageListPage.openAdminSession();

    });

    it('Login as non-admin user and check permissions on imageDx landing page', () => {
        imageListPage.login(testUser1, testUser1Password, false);
        cy.visit(testProject, { timeout: 10000 });
        //cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay', { timeout: 8000 }).should('not.be.visible');

        imageListPage.checkTopNavBar(['Workspace', 'Uploads', 'Digital Assays']);
        //imageListPage.checkLeftNavBar(['Images', 'Annotations', 'Information']);

    });

    /*
    Image List w/o admin session open - columns displayed:
    Overview, Name, Open buttons

    Image List w/ admin session open - columns displayed:
    Overview, Status, Name, QC, Results, Magnification, Manual Annotations, Last update, Analysis Annotations, Reviewed Annotations
    */
    it('Login as admin user and check permissions on imageDx image list page', () => {
        imageListPage.login(testAdminUser, testAdminPassword, true);
        cy.visit(testProject, { timeout: 10000 });
        cy.get('.th-wrap').contains('Name').should('be.visible');
        cy.get('.th-wrap').contains('Overview').should('be.visible');

        cy.get('.th-wrap').contains('Status').should('be.visible');
        cy.get('.th-wrap').contains('Magnification').should('exist');
        cy.get('.th-wrap').contains('Analysis Annotations').should('exist');

    });
    
    it('Login as non-admin user and check permissions on imageDx image list page', () => {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // prevents Cypress from failing the test due to HTTP 403 responses during page load
        
        imageListPage.login(testUser1, testUser1Password, false);
        cy.visit(testProject, { timeout: 10000 });
        cy.get('.th-wrap').contains('Name').should('exist');
        cy.get('.th-wrap').contains('Overview').should('exist');

        cy.get('.th-wrap').contains('Status').should('not.exist');
        cy.get('.th-wrap').contains('Magnification').should('not.exist');
        cy.get('.th-wrap').contains('Analysis Annotations').should('not.exist');

    });


});