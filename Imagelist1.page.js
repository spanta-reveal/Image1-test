
import { imageDx } from './imageDx.page.js';
export default class imagedx extends imageDx {
    getimagelink(para) {
        cy.get('.word-break-all.min-w-320 > a').each((el,index) => {
            if (index == para) {
                cy.visit((el.prop('href')))
            }

        })

    }

    imageserchbox(string){
        cy.get("[class='control mr-4 has-icons-left is-clearfix'] > input[class='input']").type(string)
        
    }

    addImage(string) {
        cy.contains('Add').click();
        cy.wait(3000)
        cy.get("[class='control search-images has-icons-left is-clearfix'] > input[class='input']").type(string, {force: true})
        cy.contains("Add").click({force: true})
    }

    selectAction(action,string) {
        this.imageserchbox(string)
        cy.get('.check').eq(0).click()
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
                cy.get('.dropdown-content').contains("Delete");
                // TBD, currently no confirmation displayed
                break;
        }
    }


    removeimage(string){
        this.imageserchbox(string)
        cy.get('.check').eq(0).click()
        cy.get('span').contains('Actions').click();
        cy.get('.dropdown-content').contains("Delete").click();

    }
    launchDigitalAssay() {
        cy.get('span.navbar-link').eq(0).click()
        cy.contains('Open admin session').click({force: true})
        cy.contains('Digital Assays').click();
        //cy.get('.modal-card-title').contains("Launch digital assay");
    }
}