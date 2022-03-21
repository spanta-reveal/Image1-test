import { imageDx } from '../pages/imageDx.page.js';
import { ImageList } from '../pages/ImageList.page.js';
import { Analysis } from '../pages/Analysis.page.js';
  
const path = require('path');

const projectID = '243169215'; // '11656' - PDL1 // '299435730' // '243169215' - QA Study 1 - Prod // 147610055;
const testUser = 'qa_admin';
const testPassword = 'QApassa1';

// IMDT-408 - Digital assay execution and analysis smoke test
describe('Digital Assay execution regression test', () => {
    const testProject = 'https://note-staging.revealbio.com/#/project/' + projectID + '/images';
    //const testProject = 'https://note.revealbio.com/#/project/' + projectID + '/images';
    const imageListPage = new ImageList();

    const downloadsFolder = Cypress.config('downloadsFolder');

    beforeEach(() => {
        imageListPage.login(testUser, testPassword, true);
        cy.wait(2000);
        cy.visit(testProject, { timeout: 10000 });
        cy.visit(testProject, { timeout: 10000 });
        //imageListPage.selectUserMenu("Open admin session");
        cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay', { timeout: 8000 }).should('exist');
    });

    it('Run a digital assay with custom parameters', () => {
        imageListPage.selectImage(2);
        imageListPage.selectImage(3);
        imageListPage.selectImage(4);

        imageListPage.selectDigitalAssay('parameter_promotions');

        imageListPage.launchDigitalAssay();
        cy.get('.modal-card-title').contains("Launch digital assay");
        imageListPage.checkAssayParamForValue('input_color_space', 'rgb');
        imageListPage.checkAssayParamForValue('x', '2,1');

        // launch the digital assay
        imageListPage.launchDigitalAssayInParamDialog();
        
    });

    it('Verify assay execution of parameterized assay', () => {        
        // Check execution in Analysis page
        imageListPage.clickLeftNavBarLink('Analysis');
        cy.get('div').contains('Analysis');
        cy.get(':nth-child(1) > [data-label=" Digital Assay"]').contains('parameter_promotions');
        const acceptedStatus = ['Success', 'Running'];
        const regex = new RegExp(`${acceptedStatus.join('|')}`);
        cy.get(':nth-child(1) > [data-label="Status"] > .tag').contains(regex); // assumes assay completed within default 4000ms
 
        // Check image's status update in Image List
        imageListPage.clickLeftNavBarLink('Images');
        cy.assert(imageListPage.getImageStatus(1), 'Success');
    });

    it ('Run a digital assay that takes no parameters', () => {
        // assay name: test_no_parameters

        // imageListPage.selectAllImages();
        // cy.wait(2000);
        // imageListPage.unselectAllImages();
        //cy.visit('https://note-staging.revealbio.com/#/project/147667213'); // QA Study 2, only contains test_no_params assay
        imageListPage.selectImage(1);
        imageListPage.selectDigitalAssay('test_no_params');
        imageListPage.launchDigitalAssay();
        //cy.get('.modal-card-title').contains("Launch digital assay").should('not.exist'); // doesn't work since modal dialog never exists, which causes get to throw error

    });

    it('Verify assay execution of no-param assay', () => {        
        // Check execution in Analysis page
        //cy.visit('https://note-staging.revealbio.com/#/project/147667213');
        imageListPage.clickLeftNavBarLink('Analysis');
        cy.get('div').contains('Analysis');
        cy.get(':nth-child(1) > [data-label=" Digital Assay"]').contains('test_no_params');
        const acceptedStatus = ['Success', 'Running'];
        const regex = new RegExp(`${acceptedStatus.join('|')}`);
        cy.get(':nth-child(1) > [data-label="Status"] > .tag').contains(regex); // assumes assay completed within default 4000ms
 
        // Check image's status update in Image List
        imageListPage.clickLeftNavBarLink('Images');
        cy.assert(imageListPage.getImageStatus(5), 'Success');
    });

    // it ('Sandbox', () => {
    //     //imageListPage.selectAllImages();
    //     //imageListPage.selectImage(5);
    //     //imageListPage.selectAction("Download");

    //     imageListPage.toggleShowHideFilters();
    //     cy.wait(2000);
    //     imageListPage.toggleShowHideFilters();

    //     imageListPage.selectUserMenu("Close admin session");
    // });

    // it ('Sandbox2', () => {
    //     imageListPage.clickLeftNavBarLink('Analysis');
    //     const analysisPage = new Analysis();
    //     let assayInfo = analysisPage.getLatestAssayInfo();
    //     cy.assert(assayInfo.assayName = 'parameter_promotions');
    //     cy.assert(assayInfo.assayStatus =
    //          'Success');
    // });

    // TODO: move assays to fixtures so they will always be available


});