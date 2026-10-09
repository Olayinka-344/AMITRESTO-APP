import { createClient } from '@sanity/client';

export const client = 
createClient({
    projectId: '63odke4h',
    dataset: 'production',
    apiVersion: '2026-08-19',
    useCdn: false,
})