describe(__filename, function () {
    it('Ensure the wikibase extension is loaded by default', function () {
        cy.loadAndVisitProject('food.mini');
        cy.get('#extension-bar-menu-container').should('to.contain', 'Wikibase');
        cy.get('#extension-bar-menu-container')
            .should('to.contain', 'Wikibase')
            .click();

        // we do only one assertion to ensure the menu appear properly
        cy.get('.menu-container').should('to.contain', 'Manage Wikibase instances');
    });

    //NB: copied from create-project/create_project.cy.js
    //FIXME: should this be a visual test instead?
    it('Bug number here:Test the parent element of input is proportionate', function () {
        cy.visitOpenRefine();
        cy.navigateTo('Create project');
        cy.get('#create-project-ui-source-selection-tabs > a').contains('Clipboard').click();
        cy.get('#or-import-clipboard').should('to.contain', 'Paste data from clipboard here:');
        // add file
        const csvFile = `Username; Identifier;First name;Last name
      booker12;9012;Rachel;Booker
      grey07;2070;Laura;Grey
      johnson81;4081;Craig;Johnson
      jenkins46;9346;Mary;Jenkins
      smith79;5079;Jamie;Smith`;
        cy.get('textarea').invoke('val', csvFile);
        cy.get('.create-project-ui-source-selection-tab-body.selected button.button-primary').contains('Next »').click();
        cy.get('.default-importing-wizard-header input[bind="projectNameInput"]', {
            timeout: 6000,
        }).should('have.value', 'Clipboard');

        // select wikibase extension
        cy.get('div[format="text/wiki"]').click();
        // NB: currently on windows machine the input measures at 13 and the td at 20,
        // this maxWidthDifference might have to be tuned to cover other browsers/platforms
        const maxWidthDifference = 8;
        cy.get('.default-importing-parsing-control-panel-options-panel input[type="checkbox"]').then(($element) => {
            const elementWidth = $element[0].clientWidth;
            const parentWidth = $element[0].parentElement.clientWidth;
            const widthDifference = Math.abs(elementWidth - parentWidth);

            expect(widthDifference).to.be.lessThan(maxWidthDifference);
        });
    });
});
