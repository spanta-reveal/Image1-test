import { imageDx } from "../pages/imageDx.page";
import { ImageList } from "../pages/ImageList.page";
import { ImageViewer } from "../pages/ImageViewer.page";

const projectID = '15212186';
const testUser = 'qa_admin';
const testPassword = 'Viachem07';

function login(username, password) {
    cy.get("input").contains("username", { timeout: 5000} ).type(testUser);
    cy.get("input[name=password])").type(testPassword);
}

function verifyZoom(screenShotFilter) { // relocate to ImageViewer class?
    // compare screenshots and return true/false
};

describe('Image Viewer regression test', () => {
    const imageDxPage = new ImageList();
    //const route = 'https://note-staging.revealbio.com/#/project/147610055/images';
    const route = 'https://note-staging.revealbio.com/#/project/243169215/images'; // QA Study 1 - Prod

    // TODO
    // Create project (named QA Test Image Formats ?) containing an image from each supported image format
    // https://revealbio.atlassian.net/wiki/spaces/IMDx/pages/153747457/Supported+File+Formats 
    // tiff, isx, ome, mrxs, svs, etc.

    const screenshotsFolder = Cypress.config('screenshotsFolder');

    beforeEach(() => {
        imageDxPage.login(imageDx.testAdminUser, imageDx.testAdminPassword, true);
        //cy.task('deleteFolder', downloadsFolder);
    });

    it ('Load an IF OME image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("Tonsil_Crop_P25_S11").click();
        imageDxPage.clickImageByName("Tonsil_Crop_P25_S11.ome");
        cy.get('canvas.ol-unselectable').should('be.visible');
        cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff

    });

    it ('Load an SVS image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("NASH-134_2733_6141.svs").click();
        imageDxPage.clickImageByName("NASH-134_2733_6141.svs");
        cy.get('canvas.ol-unselectable').should('be.visible');
        //cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        //cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        //cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff
    });

    it ('Load a TIFF image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("70310299999.tif").click();
        imageDxPage.clickImageByName("70310299999.tif"); // currently fails since image magnification undefined, need to re-upload img once IMDT-378 is fixed
        cy.get('canvas.ol-unselectable').should('be.visible');
        cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff
    });

    it ('Load a PNG image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("im_on.png").click();
        imageDxPage.clickImageByName("im_on.png");
        cy.get('canvas.ol-unselectable').should('be.visible');
        cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff
    });

    it ('Load a JPG image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("High1_1section.jpg").click();
        imageDxPage.clickImageByName("High1_1section.jpg");
        cy.get('canvas.ol-unselectable').should('be.visible');
        cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff
    });

    it.skip ('Load an MRXS image', () => {
        cy.visit(route);
        //cy.get('[data-label="Name"] > a > span').contains("21-478 GPR35 (NBP) 2 ER1 neg IF.mrxs").click();
        imageDxPage.clickImageByName("21-478 GPR35 (NBP) 2 ER1 neg IF.mrxs");
        cy.get('canvas.ol-unselectable').should('be.visible');
        cy.wait(2000);
        cy.screenshot('initialLoadFullView');
        cy.get(ImageViewer.mag5Xbtn).click();
        cy.wait(2000);
        cy.screenshot('Zoom5X');
        cy.get(ImageViewer.fullViewBtn).click();
        cy.wait(2000);
        cy.screenshot('zoomToFullView');

        // TODO: verify screenshot diff
    });

    // evaluate percy.io module for visual testing
    it.skip ('Draw an annotation', () => {
        
    });


});

