import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

/**
 * Email options interface
 */
interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

/**
 * A simple Gmail service for sending emails in React applications
 */
class GmailService {
  private email: string;
  private transporter: Transporter;

  /**
   * Create a new GmailService instance
   * @param {string} email - Your Gmail email address
   * @param {string} password - Your Gmail password or app password
   */
  constructor(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    this.email = email;
    
    // Create Gmail transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
  }

  /**
   * Send an email using Gmail
   * @param {EmailOptions} options - Email options
   * @returns {Promise<any>} - Resolves with sending info
   */
  async send(options: EmailOptions): Promise<any> {
    const mailOptions: SendMailOptions = {
      from: this.email,
      to: options.to,
      subject: options.subject
    };

    // Add body content (text or HTML)
    if (options.html) {
      mailOptions.html = options.html;
    } else if (options.text) {
      mailOptions.text = options.text;
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

const gmailService = new GmailService(process.env.NEXT_PUBLIC_GMAIL_USER!, process.env.NEXT_PUBLIC_GMAIL_PASSWORD!);

export default gmailService;