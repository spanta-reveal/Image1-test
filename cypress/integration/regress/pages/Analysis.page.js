/* ---
This file contains object identifiers on the imageDx Analysis page and functions for interacting with these objects
--- */
import { imageDx } from './imageDx.page.js';

export class AssayExecutionInfo extends imageDx {
    // object containing assay execution fields
}

export class Analysis extends imageDx {

    // Object identifiers

    getLatestAssayInfo() {
        let assayName = cy.get(':nth-child(1) > [data-label=" Digital Assay"]').then((text) => { assayName = text; });
        let assayStatus = cy.get(':nth-child(1) > [data-label="Status"] > .tag').then((text) => { assayStatus = text; });
        console.log("assay name: " + assayName);
        return [assayName, assayStatus];
    }

    getAssayStatus(index) {

    }
}