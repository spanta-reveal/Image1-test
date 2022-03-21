import { imageDx } from "../pages/imageDx.page";
import { ImageList } from "../pages/ImageList.page";
import { ImageViewer } from "../pages/ImageViewer.page";

describe('Image Viewer regression test', () => {

    const route = 'https://note-staging.revealbio.com/#/project/243169215/images'; // QA Study 1 - Prod
    const testEnv = 'staging'; // to be passed via command prompt or hardcoded in cypress.json
    const imageListPage = new ImageList();

    beforeEach(() => {
        imageListPage.login(imageDx.testAdminUser, imageDx.testAdminPassword, true);
        cy.visit(route);
        //cy.task('deleteFolder', downloadsFolder);
    });

    it ('Download images', () => {
        //imageListPage.clickImageByName("Tonsil_Crop_P25_S11.ome");
        
        imageListPage.selectImage(2);
        imageListPage.selectAction("Download");
        cy.get('div').contains('Links will be emailed');
        imageListPage.unselectAllImages();
        imageListPage.selectAllImages();
        imageListPage.selectAction("Download");
        cy.get('div').contains('Links will be emailed');

    });
    
});