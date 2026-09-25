import { test, expect } from '@playwright/test';
import { UserApi } from '../../api/userApi';

test.use({
    storageState: {
        cookies: [],
        origins: [],
    }
})

test('Verify new user creation, update, verify and delete.', async({ request }) => {

    const userApi = new UserApi(request);

    const email = `kai_api_${Date.now()}gmail99.com`;
    const userData = {
        name: 'kai_api',
        email: email,
        password: 'ILoveChatGPT',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1990',
        firstname: 'Kai',
        lastname: 'Smith',
        company: 'Test Company',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'Canada',
        zipcode: 'L4J 1A1',
        state: 'Ontario',
        city: 'Vaughan',
        mobile_number: '1234567890'
    };

    const updatedUserData = {
        ...userData,
        firstname: 'Kevin',
        lastname: 'Zhu',
    };

    await test.step('Create valid user first.', async() => {
        // Create user first
        const firstResponse = await userApi.createUser(userData);
        
        const firstBody = await firstResponse.json();

        expect(firstResponse.status()).toBe(200);
        expect(firstBody.responseCode).toBe(201);
    })
    
    await test.step('Test the duplicated user.', async() => {
        // Try to create the same user again
        const duplicatedResponse = await userApi.createUser(userData);

        const duplicatedBody = await duplicatedResponse.json();

        expect(duplicatedResponse.status()).toBe(200);
        expect(duplicatedBody.responseCode).toBe(400);
        expect(duplicatedBody.message).toBe('Email already exists!');

        console.log("Duplicated body is: ", duplicatedBody);
    })

    await test.step('Test get user details by email.', async() => {
        const getResponse = await userApi.getUser(email);

        console.log("Get user by email, get response status: ", getResponse.status());
        const getBody = await getResponse.json();
        console.log("GET Response body: ", getBody);

        // Assertion
        expect(getResponse.status()).toBe(200);
        expect(getBody.responseCode).toBe(200);

        expect(getBody.user.name).toBe(userData.name);
        expect(getBody.user.email).toBe(userData.email);
        expect(getBody.user.last_name).toBe(userData.lastname);
        expect(getBody.user.first_name).toBe(userData.firstname);
        expect(getBody.user.country).toBe(userData.country);

    })

    await test.step('Test update existing user profile.', async() => {
        const putResponse = await userApi.updateUser(updatedUserData);

        const putResponseData = await putResponse.json();
        console.log('Updated response JSON: ', putResponseData);

        // Assertion
        expect(putResponse.status()).toBe(200);
        expect(putResponseData.responseCode).toBe(200);
        expect(putResponseData.message).toBe('User updated!');

    })

    await test.step('Verify the user is actually updated.', async() => {
        const updatedResponse = await userApi.getUser(email);

        const updatedResponseData = await updatedResponse.json();

        // Assertion
        expect(updatedResponse.status()).toBe(200);
        expect(updatedResponseData.responseCode).toBe(200);
        expect(updatedResponseData.user.first_name).toBe(updatedUserData.firstname);
        expect(updatedResponseData.user.last_name).toBe(updatedUserData.lastname);
        
    })

    await test.step('Delete the new created user.', async() => {
        const deleteResponse = await userApi.deleteUser(email, updatedUserData.password);

        console.log("Delete user response: ", deleteResponse.status());
        expect(deleteResponse.status()).toBe(200);

        const deleteResponseData = await deleteResponse.json();
        console.log("Delete response: ", deleteResponseData);

        expect(deleteResponseData.responseCode).toBe(200);
        expect(deleteResponseData.message).toBe("Account deleted!");
        
    })
    
})