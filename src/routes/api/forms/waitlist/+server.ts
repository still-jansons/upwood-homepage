import {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_WAITLIST
} from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const schema = z.object({
    first_name: z.string().trim().min(3).max(60),
    last_name : z.string().trim().min(3).max(60),
    email     : z.string().email(),
    terms     : z.boolean().refine(value => value)
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

    const { first_name, last_name, email, terms } = result.data;

    const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_WAITLIST}`;

    const data = {
        records: [
            {
                fields: {
                    "Name"   : `${first_name} ${last_name}`,
                    "Email"  : email,
                    "Terms"  : terms,
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
        success: response.ok,
        data: await response.json()
    });

}) satisfies RequestHandler;

