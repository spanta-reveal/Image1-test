/* ---
This file contains object identifiers on imageDx landing page and general-use functions
--- */

// ELEMENT IDENTIFIERS

// Top navbar
const WorkspaceLinkID = '.span.navbar-link[textContent=*Workspace*]';
const UploadsLinkID = '#/storage';
const OntologiesLinkID = '#/ontology';
const DigitalAssaysLinkID = '#/software';
const AdminLinkID = '#/admin';
const SearchID = 'input[placeholder=Search]';
const AdvancedSearchID = '#/advanced-search';

export class imageDx {

    // Test Constants
    static testUser = String(Cypress.env("testUser"));
    static testPassword = String(Cypress.env("testPassword"));
    static testAdminUser = String(Cypress.env("testAdminUser"));
    static testAdminPassword = String(Cypress.env("testAdminPassword"));

    static stagingSiteURL = String(Cypress.env("stagingSiteUrl"));
    static produdctionSiteURL = String(Cypress.env("productionSiteUrl"));

    login(username, password, adminFlag) {
        cy.session(username, () => {
            //cy.visit(Cypress.env('stagingSiteUrl'));
            cy.visit(Cypress.config().baseUrl);
            cy.get("input[name=username]").type(username);
            cy.get("input[name=password]").type(password); //.type("{enter}");
            cy.get("button").contains("Log in").click();
            cy.get("div").contains("Welcome to imageDx").should('exist');

            if (adminFlag) { // open admin sessions
                cy.get('.navbar-end > .has-dropdown > .navbar-link').click();
                cy.get('button').contains('Open admin session').click();
                cy.wait(1500);
                cy.get('a').contains('Admin').should('be.visible');
                //this.selectUserMenu("Open admin session");
            }
        })
    }
    
    logout() {
        this.selectUserMenu("Logout");
    }

    // loginNonAdmin(username, password) {
    //     cy.session(username, () => {
    //         cy.visit(productionSiteURL);
    //         cy.get("input[name=username]").type(username);
    //         cy.get("input[name=password]").type(password); //.type("{enter}");
    //         cy.get("button").contains("Log in").click();
    //         cy.get("div").contains("Welcome to imageDx").should('exist');
    //     })
    // }

    // loginAsAdmin(username, password) {
    //     this.login(username, password);
    //     this.openAdminSession();
    // }

    openAdminSession() {
        cy.get('.navbar-end > .has-dropdown > .navbar-link').click();
        cy.get('button').contains('Open admin session').click();
        cy.wait(1500);
        cy.get('a').contains('Admin').should('be.visible');
    }

    closeAdminSession() {
        cy.get('.navbar-end > .has-dropdown > .navbar-link').click();
        cy.get('button').contains('Close admin session').click();
        cy.wait(1500);
        cy.get('a').contains('Admin').should('not.exist');
    }

    clickTopNavBar(page) {
        let link = '';
        switch (page) {
            case 'Workspace':
                link = WorkspaceLinkID;
                break;
            case 'Uploads':
                link = UploadsLinkID;
                break;
            case 'Ontologies':
                link = OntologiesLinkID;
                break;
            case 'DigitalAssays':
                link = DigitalAssaysLinkID;
                break;
            default:
                console.log("WARNING: unknown page link \"" + page)
        }
        if (link != '') {
            cy.get(link).click(); 
        }
        else {
            cy.get('a').contains(page).click(); // if unknown page identifier, use param as link identifier directly
        }
    }

    // TBD
    checkTopNavBar(options) {
        
    };

    selectUserMenu(option) {
        cy.get('.navbar-end > .has-dropdown > .navbar-link').click();
        if (option == 'Account' || option == 'Activity history') {
            cy.get('a').contains(option).click()
        }
        else {
            cy.get('button').contains(option).click();
        }
    }

    search(query) {
        cy.get(SearchID).type(query + '{enter}');
    }

    advancedSearch(query) {
        cy.get(AdvancedSearchID).click();
        cy.get('p').contains('Advanced search');
        // need a way to distinguish between Search textfield in Advanced Search vs the one in top navbar
    }

    toggleStudyFilter(status) {
        if (status == "on" || status == "show") {
            cy.get('.button > span').contains(/Show filters/).click();
        }
        else if (status == "off" || status == "hide") {
            cy.get('.button > span').contains(/Hide filters/).click();
        }
        else {
            cy.get('.button > span').contains(/(Show filters)|(Hide filters)/).click();
        }
    }

};
