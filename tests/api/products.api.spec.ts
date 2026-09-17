import { test, expect } from '@playwright/test';
import { request } from 'node:http';

test ('Get all products list.', async({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
    expect (response.status()).toBe(200);
})