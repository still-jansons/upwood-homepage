import {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_CONTACTS
} from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const schema = z.object({
    name   : z.string().trim().min(3).max(60),
    email  : z.string().email(),
    message: z.string().trim().min(10).max(250)
});

export const POST: RequestHandler = (async ({ request }) => {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
        return json({
            success: false,
            errors : result.error
        });
    }

    const { name, email, message } = result.data;

    const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_CONTACTS}`;

    const data = {
        records: [
            {
                fields: {
                    "Name"   : name,
                    "Email"  : email,
                    "Message": message,
                    "Status" : "To do"
                }
            }
        ]
    }

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Authorization : `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return json({
        success: response.ok
    });

}) satisfies RequestHandler;

