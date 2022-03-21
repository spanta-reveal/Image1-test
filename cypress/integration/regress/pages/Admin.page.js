/* ---
This file contains object identifiers on the imageDx Admin page and functions for interacting with these objects
--- */
import { imageDx } from './imageDx.page.js';

export class AdminPage extends imageDx {
    clickAdminTab(tabName) {
        // legal values: Dashboard, Users, Trusted sources, Configuration
        cy.get('label').contains(tabName).click();
    }

    searchUsers(username) {
        cy.get('..has-icons-left > input').type(username);
    }

    findUsernameInTable(username) {
        cy.get('tr > [data-label="Username"]').contains(username);
    }
    // return contents of a row corresponding to specified username
    getUserTableContents(username) {
       
    }

    addNewUser()

}