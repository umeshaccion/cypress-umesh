import Ajv from 'ajv';
const ajv = new Ajv();
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
let requestInfo = JSON.parse(
    JSON.stringify({ url: '/store/order/{orderId}', method: 'GET' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Find purchase order by ID', () => {
    it('For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions', () => {
        cy.fixture('200_application_json__getOrderById').then(
            (fixtureResponse) => {
                requestInfo.body = fixtureResponse.payload
                    ? fixtureResponse.payload
                    : '';
                requestInfo.headers = fixtureResponse.headers
                    ? fixtureResponse.headers
                    : '';

                requestInfo.qs = fixtureResponse.queryParam
                    ? fixtureResponse.queryParam
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
            }
        );
    });
});
