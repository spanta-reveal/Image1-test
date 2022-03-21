import { imageDx } from "../pages/imageDx.page";
import { ImageList } from '../pages/ImageList.page.js';

describe('Sandbox', () => {
    const imageDxPage = new imageDx();
    const imageListPage = new ImageList();
    const testSite = 'https://note-staging.revealbio.com/#/project/299435730/images';
    const testUser = String(Cypress.env("testAdminUser"));
    const testPw = String(Cypress.env("testAdminPassword"));

    beforeEach(() => {
        imageDxPage.login(testUser, testPw, true);
    });

    it.skip ('Load first image in project in Image Viewer', () => {
        cy.visit(testSite);
        //cy.get('div.flex > .control > .input').type('abcd').click();
        //cy.get('span').contains('abcd').should('be.visible');

        const imageListPage = new ImageList();
        imageListPage.clickImageByName("abc1.tiff");
        //cy.get('img[alt="abc1.tiff"]').click();
    });

    it ('Login and logout test', () => {
        cy.visit(imageDx.stagingSiteURL);
        imageListPage.logout();
        imageListPage.login(imageDx.testUser, imageDx.testPassword);
    });
});