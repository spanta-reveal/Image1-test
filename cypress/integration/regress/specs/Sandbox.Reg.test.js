import { imageDx } from '../pages/imageDx.page.js';
import { ImageViewer } from '../pages/ImageViewer.page.js';
import { ImageList } from '../pages/ImageList.page.js';
import { Analysis } from '../pages/Analysis.page.js';
import { Annotations } from '../pages/Annotations.page.js';

const projectID = '243169215';
const testAdminUser = 'qa_admin';
const testAdminPassword = 'QApassa1';
const testUser1 = 'qa_user1';
const testUser1Password = 'QApass01';

describe('Sandbox test 1', () => {
    const imageDxPage = new imageDx();
    //const testSite = Cypress.env('productionSiteUrl');
    const testSite = 'https://note-staging.revealbio.com/#/project/15212186/results';

    beforeEach(() => {
        const imageDxPage = new imageDx();
        imageDxPage.login(testAdminUser, testAdminPassword, true);
        //cy.wait(2000);  
        //cy.visit(testSite);
        //cy.get('p').contains('Studies', {timeout: 10000});
        cy.wait(2000);
    });

    it.skip ('Sort by Name', () => {
        cy.visit(testSite);
        for (let n = 0; n <= 1; n++) { // click twice to toggle descending sort order
            cy.get("div.th-wrap").contains("Name", { timeout: 5000 }).click();
        }
        cy.log("Verify sorting - Name by descending order");
        cy.get("tbody tr:nth-child(3) td:nth-child(2)").contains('Ki67_14780008C0003S').should('be.visible');
        cy.get("tbody tr:nth-child(3) td:nth-child(4)").contains('3349').should('be.visible');

    });

    it ('Test element interaction in Image Viewer', () => {
        cy.visit('https://note-staging.revealbio.com/#/project/243169215/images'); // QA Study 1 - Prod
        cy.get('[data-label="Name"] > a > span').contains("NASH-134_2733_6141.svs").click();
        //const imageViewerPage = new imageViewer();
        cy.get(ImageViewer.info).click();

    });

    it.skip ('Test view annotations creator', () => {
        cy.visit('https://note-staging.revealbio.com/#/project/243169215/annotations'); // Annotations - QA Study 1 - Prod
        Annotations.toggleAnnotationPreview(1);
        cy.get('td').contains(imageDx.testAdminUser).should('be.visible');
        cy.wait(1000);
        Annotations.toggleAnnotationPreview(1);
        Annotations.selectAnnotation(1);
        //cy.get('td').contains(imageDx.testAdminUser).should('be.visible');
        cy.get('tbody > :nth-child(6) > :nth-child(2)').contains(imageDx.testAdminUser).should('be.visible');
        //cy.get('.button').contains('Center view');
    });

    // it('Search for projects that have no members', () => {
    //     imageDxPage.toggleStudyFilter("show");
    //     //cy.get('div[class="vue-slider-dot-tooltip-inner-right"]').click();
    //     cy.get('.vue-slider-dot-tooltip-inner').its(1).click();
    //     cy.get('.vue-slider-dot-tooltip-inner .input').clear().type('0{enter}');
    //     cy.get('.nb-active-filters').should('be.visible'); // check if value is 1
    //     // Bug IMDT-519 - currently /napi/project throws HTTP 400 error and break filtering until page reload
    //     cy.get('.media-content > .mb-3').contains('Error').should('not.exist');
    //     // Todo: create and check for empty project
    //     //cy.get('[data-label="Name"] > a', {timeout: 40000}).contains("QA empty project");
        

    // });

    // it('Test Show/Hide filters button toggle', () => {
    //     //cy.get('.button > :nth-child(2)').click(); // click Show filters button
    //     //cy.get('.button > span').contains(/(Show filters)|(Hide filters)/).click();
    //     //cy.get('.button > span').contains(/(Show filters)|(Hide filters)/).click();
    //     imageDxPage.toggleStudyFilter('on');
    //     imageDxPage.toggleStudyFilter('off');

    // });

        // it('Test study pagination', () => {
    //     cy.get('.pagination-previous', {timeout: 20000}).should('have.attr', 'disabled', 'disabled'); // previous button is disabled on first page
        
    //     cy.get('a[class="pagination-link"]', {timeout: 20000}).contains('2').click();
    //     cy.wait(10000);
    //     cy.get('.pagination-list > :nth-child(2)', {timeout: 20000}).contains('2').should('have.attr', 'aria-current', 'true');
    //     //cy.get('.pagination-next').should('have.attr', 'style', 'pointer-events: none;');
    //     cy.get('.pagination-next', {timeout: 20000}).click();
    //     cy.wait(10000);
    //     cy.get('.pagination-previous', {timeout: 20000}).click();


    //     // view 25 studies per page
    //     cy.get('.level-left > .control > .select > select').select('25', {force: true});

    //     cy.wait(10000);

    // });

});