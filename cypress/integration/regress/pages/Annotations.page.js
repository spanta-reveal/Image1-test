/* ---
This file contains object identifiers on the Annotations page and functions for interacting with these objects
--- */
import { imageDx } from './imageDx.page.js';

export class Annotations extends imageDx {

    // Object identifiers
    // download links not needed, use cy.get('a').contains("Download PDF") etc.
    static annotationDialog = '.tooltip-inner';


    static selectAnnotation(index) {
        cy.get(':nth-child(' + index + ') > .trigger > .annot-preview > a').click();
    };

    static toggleAnnotationPreview(index) {
        cy.get(':nth-child(' + index + ') > .trigger > .annot-preview > .absolute').click();
    }

    

};