import { test, expect } from '@playwright/test';

test.use({
    storageState: {
        cookies: [],
        origins: [],
    }
})

test.skip('Create a new user.', async({ request }) => {
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        form: {
            name: 'kai_api',
            email: 'kai_api@gmail99.com',
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
        }
    })

    // Verify response status
    console.log("Response status is: ", response.status());
    expect(response.status()).toBe(200);

    // verify response code from response JSON
    const responseBody = await response.json();
    console.log("Response body json is: ", responseBody);
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe("User created!");
})

test('Verify duplicated email cannot be registered.', async({ request }) => {

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

    await test.step('Create valid user first.', async() => {
        // Create user first
        const firstResponse = await request.post('https://automationexercise.com/api/createAccount', {
            form: userData
        });
        
        const firstBody = await firstResponse.json();

        expect(firstResponse.status()).toBe(200);
        expect(firstBody.responseCode).toBe(201);
    })
    
    await test.step('Test the duplicated user.', async() => {
        // Try to create the same user again
        const duplicatedResponse = await request.post('https://automationexercise.com/api/createAccount', {
            form: userData
        });

        const duplicatedBody = await duplicatedResponse.json();

        expect(duplicatedResponse.status()).toBe(200);
        expect(duplicatedBody.responseCode).toBe(400);
        expect(duplicatedBody.message).toBe('Email already exists!');

        console.log("Duplicated body is: ", duplicatedBody);
    })

    await test.step('Test get user details by email.', async() => {
        const getResponse = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
            params: {
                email: email
            }
        });

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

    await test.step('Delete the new created user.', async() => {
        const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: email,
                password: userData.password
            }
        });

        console.log("Delete user response: ", deleteResponse.status());
        expect(deleteResponse.status()).toBe(200);

        const deleteResponseData = await deleteResponse.json();
        console.log("Delete response: ", deleteResponseData);

        expect(deleteResponseData.responseCode).toBe(200);
        expect(deleteResponseData.message).toBe("Account deleted!");
        
    })
    
})