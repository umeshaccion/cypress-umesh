import { defineConfig } from 'cypress';
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
        },
        specPattern: [
            'cypress/e2e/API_TESTING/pets/updatePet.cy.js',
            'cypress/e2e/API_TESTING/pets/addPet.cy.js',
            'cypress/e2e/API_TESTING/users/logoutUser.cy.js',
            'cypress/e2e/API_TESTING/users/updateUser.cy.js,',
        ],
        supportFile: false,
        screenshotOnRunFailure: false,
        env: {
            CYPRESS_BASE_URL: 'https://petstore.swagger.io/v2',
            fileuploadContentTypes: 'PLACEHOLDER_CONTENT_TYPES',
        },
    },
});
