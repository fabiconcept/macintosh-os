import gmailService from '@/util/GmailService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Email request body interface
 */
interface EmailRequestBody {
    from: string;
    subject: string;
    text?: string;
    html?: string;
}

/**
 * POST handler for sending emails
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as EmailRequestBody;

        if (!body.from || !body.subject) {
            return NextResponse.json(
                { error: 'Missing required fields: "from" and "subject" are required' },
                { status: 400 }
            );
        }

        if (!body.text && !body.html) {
            return NextResponse.json(
                { error: 'Either "text" or "html" content must be provided' },
                { status: 400 }
            );
        }

        // Send the email
        const result = await gmailService.send({
            from: body.from,
            subject: body.subject,
            text: `Email from ${body.from}:\n ${body.text}`,
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