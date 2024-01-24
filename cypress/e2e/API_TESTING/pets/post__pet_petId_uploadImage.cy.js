import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/pet/{petId}/uploadImage', method: 'POST' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('uploads an image', () => {
    it('successful operation', () => {
        cy.fixture(
            '200_application_json_multipart_form-data_post__pet_petId_uploadImage'
        ).then((fixtureResponse) => {
            cy.fixture('**filePath**').then((fileContent) => {
                const blob = new Blob([fileContent], {
                    type: requestInfo.headers['Content-Type'],
                });
                const formData = new FormData();
                formData.append('file', blob);
                requestInfo.body = formData;
                requestInfo.headers = fixtureResponse.headers
                    ? fixtureResponse.headers
                    : '';
                let pathParams = fixtureResponse.pathParam
                    ? fixtureResponse.pathParam
                    : '';
                for (const key in pathParams) {
                    if (pathParams.hasOwnProperty(key)) {
                        const placeholder = '{' + key + '}';
                        requestInfo.url = requestInfo.url.replace(
                            new RegExp(placeholder, 'g'),
                            pathParams[key]
                        );
                    }
                }
                requestInfo.qs = fixtureResponse.queryParam
                    ? fixtureResponse.queryParam
                    : '';
                requestInfo.cookies = fixtureResponse.cookie
                    ? fixtureResponse.cookie
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
});
