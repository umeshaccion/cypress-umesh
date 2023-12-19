import Ajv from 'ajv';
const ajv = new Ajv();
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
let requestInfo = JSON.parse(JSON.stringify({ url: '/user', method: 'POST' }));
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Create user', () => {
    it('This can only be done by the logged in user.', () => {
        cy.fixture('200__createUser').then((fixtureResponse) => {
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            cy.request(requestInfo).then((response) => {
                expect(response.status).to.eq(
                    parseInt(fixtureResponse.responseStatusCode)
                );
                if (
                    fixtureResponse.responseSchema &&
                    fixtureResponse.responseSchema != ''
                ) {
                    const validate = ajv.compile(
                        fixtureResponse.responseSchema
                    );
                    const isValid = validate(response.body);
                    expect(isValid).to.be.true;
                }
            });
        });
    });
});
