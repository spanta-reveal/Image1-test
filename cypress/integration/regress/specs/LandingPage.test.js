import { imageDx } from '../pages/imageDx.page.js';

const projectID = '243169215';
const testAdminUser = 'qa_admin';
const testAdminPassword = 'QApassa1';
const testUser1 = 'qa_user1';
const testUser1Password = 'QApass01';
const timeoutVal = 60000; // timeout in ms

describe('Test search on imageDx landing page', () => {
    // TBD
});

describe('Test filtering on studies on the imageDx landing page', () => {
    const imageDxPage = new imageDx();
    //const testSite = Cypress.env('productionSiteUrl');
    const testSite = Cypress.config().baseUrl;

    beforeEach(() => {
        imageDxPage.login(testAdminUser, testAdminPassword, true);
        //cy.wait(2000);  
        cy.visit(testSite);
        //cy.get('p').contains('Studies', {timeout: 10000});
    });

    it('Test study pagination', () => {
        //cy.get('a[class="pagination-link"]', {timeout: 20000}).contains('2').click();
        cy.get('.pagination-next', {timeout: timeoutVal}).click();
        cy.wait(10000);
        cy.get('.pagination-previous', {timeout: timeoutVal}).click();
        
        // view 25 studies per page
        cy.get('.level-left > .control > .select > select').select('25', {force: true});

        //cy.wait(10000);

    });

    it('Search for projects starting with \'qa\'', () => {
        //cy.visit(stagingSite);
        cy.get('input[type="search"]', {timeout: 20000}).type('qa');
        cy.get('[data-label="Name"] > a', {timeout: timeoutVal}).contains("QA Study 1");
    });

    it('Search for projects in which user has manager role', () => {
        //cy.visit(stagingSite);//
        //cy.get('span').contains('Show filters').click();
        imageDxPage.toggleStudyFilter("show");
        cy.get(':nth-child(2) > .filter-body > .multiselect > .multiselect__tags > .multiselect__placeholder').click();
        cy.get('span').contains('Manager').click();
        cy.get('[data-label="Name"] > a', {timeout: timeoutVal}).contains("QA Study 1");
    });

    it('Search for projects in which user has contributor role', () => {
        imageDxPage.toggleStudyFilter("show");
        cy.get(':nth-child(2) > .filter-body > .multiselect > .multiselect__tags > .multiselect__placeholder').click();
        //cy.get('span').contains('Manager').click(); // deselect Manager role
        cy.get('span').contains('Contributor').click();
        cy.get('[data-label="Name"] > a', {timeout: timeoutVal}).contains("QA Test 2");
    });

    it('Search for projects that have no members', () => {
        imageDxPage.toggleStudyFilter("show");
        //cy.get('div[class="vue-slider-dot-tooltip-inner-right"]').click();
        cy.get('.vue-slider-dot-tooltip-inner').its(1).click();
        cy.get('.vue-slider-dot-tooltip-inner .input').clear().type('0{enter}');
        cy.get('.nb-active-filters').should('be.visible'); // check if value is 1
        // Bug IMDT-519 - currently /napi/project throws HTTP 400 error and break filtering until page reload
        cy.get('.media-content > .mb-3').contains('Error').should('not.exist');
        // Todo: create and check for empty project
        //cy.get('[data-label="Name"] > a', {timeout: timeoutVal}).contains("QA empty project");
        

    });

    it('Search for projects that contain 1 to 5 images', () => {
        cy.get('.button > :nth-child(2)').click(); // click Show filters button
        //cy.get('div[class="vue-slider-dot-tooltip-inner-right"]').click();
        cy.get('.vue-slider-dot-tooltip-inner').its(2).click();
        cy.get('.vue-slider-dot-tooltip-inner .input').clear().type('1{enter}');
        cy.get('.vue-slider-dot-tooltip-inner').its(3).click();
        cy.get('.vue-slider-dot-tooltip-inner .input').clear().type('5{enter}');
        //cy.wait(5000);
        cy.get('.nb-active-filters').should('be.visible')


    });

});