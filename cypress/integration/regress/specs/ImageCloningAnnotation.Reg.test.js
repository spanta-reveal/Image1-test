import { imageDx } from '../pages/imageDx.page.js';
import { ImageList } from '../pages/ImageList.page.js';
import { Analysis } from '..Admin.page';

const projectID = '147610055'; // QA Study 1
const testUser = 'qa_admin';
const testPassword = 'Viachem07';

// IMDT-265 - Image cloning and annotation copying smoke test
describe('Image cloning regression test', () => {

    const testProject = 'https://note-staging.revealbio.com/#/project/' + projectID +'/images';
    const imageListPage = new ImageList();

    const downloadsFolder = Cypress.config('downloadsFolder');

    beforeEach(() => {
        imageListPage.login(testUser, testPassword);
        cy.wait(2000); // for debugging only on staging env
        cy.visit(testProject, { timeout: 10000 });
        cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay').should('exist');
    });

    it ('Clone multiple image to another project',() => {

    });

    it.skip ('Copy multiple image annotations to another project',() => {

    });

    it.skip ('Copy image annotations to another project for missing images',() => {

    });

    

});