import gmailService from '@/util/GmailService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Email request body interface
 */
interface EmailRequestBody {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
}

/**
 * POST handler for sending emails
 */
export async function POST(req: NextRequest) {
    try {
        console.log('Email sending started...');
        // Parse the request body
        const body = await req.json() as EmailRequestBody;

        // Validate required fields
        if (!body.to || !body.subject) {
            console.log('Missing required fields: "to" and "subject" are required');
            return NextResponse.json(
                { error: 'Missing required fields: "to" and "subject" are required' },
                { status: 400 }
            );
        }

        // Validate that either text or html is provided
        if (!body.text && !body.html) {
            console.log('Either "text" or "html" content must be provided');
            return NextResponse.json(
                { error: 'Either "text" or "html" content must be provided' },
                { status: 400 }
            );
        }

        // Send the email
        const result = await gmailService.send({
            to: body.to,
            subject: body.subject,
            text: body.text,
            html: body.html
        });

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            messageId: result.messageId
        });

    } catch (error) {
        console.error('Email sending failed:', error);

        // Return error response
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            },
            { status: 500 }
        );
    }
}