import { test, expect } from '@playwright/test';
import { LoginApi } from '../../api/loginApi';
import userData from '../../test-data/users.json';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('Verify Login API with user details.', async({ page, request }) => {

    const loginApi = new LoginApi(request);
    const validEmail = userData[0].email;
    const validPassword = userData[0].password;
    const invalidPassword = 'invalidpassword';

    await test.step('Verify Login API with valid user details.', async() => {
        const response = await loginApi.verifyLogin(validEmail, validPassword);
        const responseBody = await response.json();
        console.log('response body with valid user: ', responseBody);
        // Assert
        expect(response.status()).toBe(200);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    })

    await test.step('Verify Login API with invalid user details.', async() => {
        const response = await loginApi.verifyLogin(validEmail, invalidPassword);
        const responseBody = await response.json();
        console.log('response body with invalid user: ', responseBody);
        // Assert
        expect(response.status()).toBe(200);
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    })
})