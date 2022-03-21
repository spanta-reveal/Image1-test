/* ---
This file contains object identifiers on the imageDx image list page and functions for interacting with these objects
--- */
import { imageDx } from './imageDx.page.js';

export class ImageList extends imageDx {

    // Object identifiers
    launchDigitalAssayBtn = '.flex-wrap > .vts-btn';
    digitalAssayDropDownList = '#select-algorithm';

    clickLeftNavBarLink(link) {
        // TODO: validate link, must be one of: 
        // Images, Annotations, Analysis, Activity, Information, Results, Configuration
        cy.get('a').contains(link).click();
    }

    // Select image based on index by clicking its checkbox
    selectImage(index) {
        cy.get(':nth-child(' + index + ') > .checkbox-cell > .b-checkbox > .check').its(0).click();
    }

    // selectImageByName(name) {
    //     cy.get('table > tr').each(($el, index, $list) => {
    //         if ()
    //     });
    // }
 
    selectAllImages() {
        for (let i = 0; i <=2; i++) {
            cy.get('[type="checkbox"]').first().check( {force: true} );
        }
        cy.get('[type="checkbox"]').first().should('be.checked');
    }

    unselectAllImages() {
        for (let i = 0; i <=2; i++) {
            cy.get('[type="checkbox"]').first().uncheck( {force: true} );
        }
        cy.get('[type="checkbox"]').first().should('not.be.checked');
    }

    // Find an image in the Image Viewer using alt text and click to load in Image Viewer
    clickImageByName(name) {
        cy.get('[alt=\"' + name + '\"]', {timeout: 10000} ).click();
    }

    // Select an action from Actions drop-down menu; requires >= 1 image to be selected to be enabled
    selectAction(action) {
        cy.get('span').contains('Actions').click();
        cy.get('.dropdown-content').contains(action).click();
        switch (action) {
            case "Download":
                cy.get('div').contains('Links will be emailed to you shortly');
                break;
            case "Clone":
                cy.get('.modal-card-title').contains('Select project');
                break;
            case "Delete":
                // TBD, currently no confirmation displayed
                break;
        }

    }

    toggleImageInfoPanel(index) {
        cy.get(':nth-child(' + index + ') > .chevron-cell > a > .icon > .fas').click();
    }

    selectDigitalAssay(assayName) {
        //cy.get(this.digitalAssayDropDownList).contains(assayName);
        cy.get(this.digitalAssayDropDownList).select(assayName);
        //cy.get(this.digitalAssayDropDownList).contains(assayName).click();
    }

    launchDigitalAssay() {
        cy.get('.flex-wrap > .vts-btn').contains('Launch digital assay').click();
        //cy.get('.modal-card-title').contains("Launch digital assay");
    }

    launchDigitalAssayInParamDialog() {
        cy.get('.content > .vts-btn').contains('Launch digital assay').click();
        cy.get('div').contains('Digital assay image analysis initiated');
        // verify param dialog is not longer displayed
        cy.get('.modal-card-title').contains("Launch digital assay").should('not.exist'); 
    }

    toggleShowHideFilters() {
        try {
            cy.contains('Show filters').click();
        }
        catch {
            // do nothing
        }
        finally {
            cy.contains('Hide filters').click();
        }
    }

    checkAssayParamForValue(paramName, paramValue) {
        // DEBUG
        // cy.get('input[name=' + paramName + ']').should(($p) => {
        //     console.log($p)
        // });
        //cy.get('input[name=' + paramName + ']').invoke('val').then(txtVal => cy.log(txtVal));

        cy.get('input[name=' + paramName + ']').invoke('val').should('eq', paramValue);
    }

    addImage() {
        cy.get('button').contains('Add').click();
        cy.get('.modal-card-title').contains("Add images");
    }

    getImageStatus(index) {
        let status;
        // cy.get(':nth-child(' + index + ') > [data-label="Status"] > .tag').invoke('val').then(($tag) => {
        //     status = $tag.text();
        // });
        cy.get(':nth-child(' + index + ') > [data-label="Status"] > .tag').invoke('text').then(($txt => {
            status = $txt;
        }));
        console.log("image " + index + " status: " + status);
        return status;
    }

    checkLeftNavBar(options) {
        if (options.length > 0) {
            for (var i = 0; i < options.length; i++) {
                var arg = options[i];
                cy.get('a').contains(arg).should('exist');
            }
        }
    };
}

//export default ImageList;