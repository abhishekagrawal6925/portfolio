import nodemailer from "nodemailer";
import { Booking } from "./consultationsDb";
import { format12Hour } from "./slotGenerator";

// Dynamic Environment Configuration Getters
function getResendApiKey(): string {
  return process.env.RESEND_API || process.env.RESEND_API_KEY || "";
}

function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "abhishekagrawal6925@gmail.com";
}

function getFromEmail(): string {
  return process.env.FROM_EMAIL || "Pankaj Agrawal & Co. <onboarding@resend.dev>";
}

function getSmtpCredentials() {
  const user = process.env.SMTP_EMAIL || process.env.SMTP_USER || process.env.GMAIL_USER || "";
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";
  const isGmail = user.endsWith("@gmail.com");
  const host = process.env.SMTP_HOST || (isGmail ? "smtp.gmail.com" : "smtp.resend.com");
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;

  return { user, pass, host, port, secure };
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * 1. Nodemailer SMTP Transport Handler (Used for Admin -> Client communications)
 */
function getSmtpTransporter() {
  const { user, pass, host, port, secure } = getSmtpCredentials();
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send Email via Nodemailer SMTP (Primary for Admin replies & status updates to client)
 */
async function sendViaSmtp({ to, subject, html }: SendEmailParams): Promise<EmailResult> {
  const { user } = getSmtpCredentials();
  const transporter = getSmtpTransporter();

  if (transporter && user) {
    try {
      const info = await transporter.sendMail({
        from: `Pankaj Agrawal & Co. <${user}>`,
        to,
        subject,
        html,
      });
      console.log(`[EmailService - SMTP] Email sent successfully to ${to}. MessageId: ${info.messageId}`);
      return { success: true, id: info.messageId };
    } catch (err: unknown) {
      const error = err as Error;
      console.error("[EmailService - SMTP] Error sending via SMTP:", error.message);
      // Fallback to Resend below if SMTP fails
    }
  } else {
    console.warn("[EmailService - SMTP] SMTP_EMAIL and SMTP_PASSWORD not configured. Falling back to Resend API.");
  }

  // Fallback to Resend API if SMTP unavailable or failed
  return sendViaResend({ to, subject, html });
}

/**
 * Send Email via Resend REST API (Primary for Client -> Admin slot booking notifications)
 */
async function sendViaResend({ to, subject, html }: SendEmailParams): Promise<EmailResult> {
  const resendApiKey = getResendApiKey().trim();
  const fromEmail = getFromEmail().trim();
  const adminEmail = getAdminEmail().trim();

  if (!resendApiKey) {
    console.warn("[EmailService - Resend] RESEND_API key not configured.");
    // Fallback to SMTP if Resend key is missing
    const { user } = getSmtpCredentials();
    const transporter = getSmtpTransporter();
    if (transporter && user) {
      try {
        const info = await transporter.sendMail({
          from: `Pankaj Agrawal & Co. <${user}>`,
          to,
          subject,
          html,
        });
        return { success: true, id: info.messageId };
      } catch (err: unknown) {
        const error = err as Error;
        return { success: false, error: error.message };
      }
    }
    return { success: false, error: "No email delivery service configured." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
      }),
    });

    const data = await res.json();
    const dataString = JSON.stringify(data).toLowerCase();

    if (!res.ok) {
      // Handle Resend testing restriction (free tier onboarding@resend.dev limits direct send to non-verified addresses)
      if (
        res.status === 403 &&
        (dataString.includes("testing email") || dataString.includes("only send") || dataString.includes("domain"))
      ) {
        console.warn(
          `[EmailService - Resend Sandbox] Resend restricted delivery to '${to}'. Forwarding to admin email '${adminEmail}'.`
        );

        const sandboxNoticeHtml = `
          <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #92400E; margin-bottom: 20px;">
            <strong>Resend Testing Mode Notice:</strong> This email was intended for recipient <code>${to}</code>.<br>
            Delivered to verified account owner email <code>${adminEmail}</code> because Resend is in free testing tier with <code>onboarding@resend.dev</code>.<br><br>
            <strong>To send to any recipient:</strong> Add and verify your custom domain in your Resend Dashboard (resend.com/domains).
          </div>
          ${html}
        `;

        const fallbackRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [adminEmail],
            subject: `[Sandbox -> ${to}] ${subject}`,
            html: sandboxNoticeHtml,
          }),
        });

        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok) {
          return { success: true, id: fallbackData.id };
        }
      }

      console.error("[EmailService - Resend] API error:", data);
      const errMsg = data.message || data.error?.message || data.error || "Failed to send email via Resend";
      return { success: false, error: typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg) };
    }

    console.log(`[EmailService - Resend] Email sent successfully to ${to}. Id: ${data.id}`);
    return { success: true, id: data.id };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[EmailService - Resend] Network error:", error.message);
    return { success: false, error: error.message };
  }
}

// Format Date YYYY-MM-DD to human readable string e.g. "August 20, 2026"
function formatDateHeader(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

// Base HTML Wrapper Template
function wrapHtmlTemplate(title: string, bodyContent: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAF2EE; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1E293B;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF2EE; padding: 30px 10px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #E2E8F0; width: 100%; max-width: 600px;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #0F3040; padding: 30px 40px; text-align: left;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background-color: rgba(217, 155, 127, 0.2); color: #D99B7F; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            Pankaj Agrawal & Co.
                          </span>
                          <h1 style="color: #FFFFFF; font-size: 22px; margin: 12px 0 4px 0; font-weight: 700;">
                            ${title}
                          </h1>
                          <p style="color: #94A3B8; font-size: 13px; margin: 0;">
                            Chartered Accountants & Financial Advisory
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 35px 40px; font-size: 14px; line-height: 1.6; color: #334155;">
                    ${bodyContent}
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #F8FAFC; padding: 20px 40px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #64748B;">
                    <p style="margin: 0 0 4px 0; font-weight: 600; color: #0F3040;">Pankaj Agrawal & Co. (FCA)</p>
                    <p style="margin: 0;">Vikaspuri, New Delhi - 110018 | Phone: +91 82738 01105</p>
                    <p style="margin: 8px 0 0 0; font-size: 11px; color: #94A3B8;">Confidential financial communication. © ${new Date().getFullYear()} Pankaj Agrawal & Co.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/**
 * 1. Send email notification to Admin via Resend when a client books a slot.
 */
export async function sendNewBookingNotificationToAdmin(booking: Booking): Promise<EmailResult> {
  const title = "New Consultation Request Received";
  const dateFormatted = formatDateHeader(booking.requestedDate);
  const timeFormatted = format12Hour(booking.requestedTime);

  const html = wrapHtmlTemplate(
    title,
    `
    <p style="margin-top: 0;">You have received a new consultation request on your portfolio site:</p>

    <div style="background-color: #F1F5F9; border-left: 4px solid #0F3040; padding: 18px 20px; border-radius: 8px; margin: 20px 0;">
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #1E293B;">
        <tr>
          <td width="35%" style="font-weight: 700; color: #475569;">Customer Name:</td>
          <td style="font-weight: 600;">${booking.customerName}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Email:</td>
          <td><a href="mailto:${booking.customerEmail}" style="color: #0F3040; text-decoration: underline;">${booking.customerEmail}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Phone:</td>
          <td>${booking.customerPhone || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Requested Date:</td>
          <td style="font-weight: 600; color: #0F3040;">${dateFormatted}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Requested Time:</td>
          <td style="font-weight: 600; color: #0F3040;">${timeFormatted} (${booking.duration} mins)</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Mode:</td>
          <td>${booking.consultationMode}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #475569;">Service:</td>
          <td>${booking.service}</td>
        </tr>
      </table>
    </div>

    ${
      booking.message
        ? `
      <div style="margin-bottom: 25px;">
        <strong style="color: #0F3040; display: block; margin-bottom: 6px;">Customer Message:</strong>
        <p style="margin: 0; background-color: #FFF8F5; border: 1px solid #FDBA74; padding: 12px 16px; border-radius: 8px; font-style: italic; color: #7C2D12;">
          "${booking.message}"
        </p>
      </div>
      `
        : ""
    }

    <div style="text-align: center; margin-top: 30px;">
      <a href="http://localhost:3000/admin" style="background-color: #0F3040; color: #FFFFFF; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
        Review in Admin Panel &rarr;
      </a>
    </div>
    `
  );

  // Admin notification is explicitly sent via Resend API
  return sendViaResend({
    to: getAdminEmail(),
    subject: `[New Consultation] ${booking.customerName} - ${dateFormatted} @ ${timeFormatted}`,
    html,
  });
}

/**
 * 2. Send email notification to Customer via SMTP when booking is ACCEPTED.
 */
export async function sendBookingAcceptedToCustomer(booking: Booking): Promise<EmailResult> {
  const title = "Your Consultation Request Has Been Confirmed";
  const dateFormatted = formatDateHeader(booking.requestedDate);
  const timeFormatted = format12Hour(booking.requestedTime);

  const html = wrapHtmlTemplate(
    title,
    `
    <p style="margin-top: 0;">Hi <strong>${booking.customerName}</strong>,</p>
    <p>Great news! Your consultation request with <strong>Mr. Pankaj Agrawal (FCA)</strong> has been accepted and confirmed.</p>

    <div style="background-color: #ECFDF5; border-left: 4px solid #10B981; padding: 18px 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0; color: #065F46; font-size: 16px;">Confirmed Consultation Details</h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #064E3B;">
        <tr>
          <td width="35%" style="font-weight: 700;">Date:</td>
          <td style="font-weight: 700; font-size: 15px;">${dateFormatted}</td>
        </tr>
        <tr>
          <td style="font-weight: 700;">Time Slot:</td>
          <td style="font-weight: 700; font-size: 15px;">${timeFormatted} (IST)</td>
        </tr>
        <tr>
          <td style="font-weight: 700;">Duration:</td>
          <td>${booking.duration} Minutes</td>
        </tr>
        <tr>
          <td style="font-weight: 700;">Mode:</td>
          <td>${booking.consultationMode}</td>
        </tr>
        <tr>
          <td style="font-weight: 700;">Subject:</td>
          <td>${booking.service}</td>
        </tr>
      </table>
    </div>

    <p style="color: #475569;">
      If you selected an <strong>Online Video Call</strong>, our office will send the meeting link (Google Meet) shortly before the scheduled time. If you selected <strong>Office Visit</strong>, we look forward to receiving you at our Vikaspuri office.
    </p>

    <p style="margin-bottom: 0;">Looking forward to speaking with you!</p>
    <p style="margin-top: 5px; font-weight: 700; color: #0F3040;">Warm regards,<br>Pankaj Agrawal & Co. Team</p>
    `
  );

  // Client communications are sent via SMTP
  return sendViaSmtp({
    to: booking.customerEmail,
    subject: `Consultation Confirmed: ${dateFormatted} at ${timeFormatted} - Pankaj Agrawal & Co.`,
    html,
  });
}

/**
 * 3. Send email notification to Customer via SMTP when booking is DECLINED.
 */
export async function sendBookingDeclinedToCustomer(booking: Booking, reason?: string): Promise<EmailResult> {
  const title = "Consultation Schedule Update";
  const dateFormatted = formatDateHeader(booking.requestedDate);
  const timeFormatted = format12Hour(booking.requestedTime);

  const html = wrapHtmlTemplate(
    title,
    `
    <p style="margin-top: 0;">Hi <strong>${booking.customerName}</strong>,</p>
    <p>Thank you for reaching out to Pankaj Agrawal & Co.</p>
    
    <p>Unfortunately, Mr. Pankaj Agrawal is unavailable at your requested time slot (<strong>${dateFormatted} at ${timeFormatted}</strong>).</p>

    ${
      reason
        ? `
      <div style="background-color: #FEF2F2; border-left: 4px solid #EF4444; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: #991B1B; display: block; margin-bottom: 4px;">Note from Mr. Agrawal:</strong>
        <p style="margin: 0; color: #7F1D1D; font-style: italic;">"${reason}"</p>
      </div>
      `
        : ""
    }

    <p style="color: #475569;">
      We welcome you to choose another convenient date and time on our booking calendar, or reply directly to this email with your preferred availability.
    </p>

    <p style="margin-top: 25px; font-weight: 700; color: #0F3040;">Best regards,<br>Pankaj Agrawal & Co. Team</p>
    `
  );

  // Client communications are sent via SMTP
  return sendViaSmtp({
    to: booking.customerEmail,
    subject: `Update on your Consultation Request - Pankaj Agrawal & Co.`,
    html,
  });
}

/**
 * 4. Send email notification to Customer via SMTP when Admin sends a direct reply message.
 */
export async function sendAdminReplyToCustomer(booking: Booking, replyMessage: string): Promise<EmailResult> {
  const title = "Message from Pankaj Agrawal & Co.";
  const dateFormatted = formatDateHeader(booking.requestedDate);

  const html = wrapHtmlTemplate(
    title,
    `
    <p style="margin-top: 0;">Hi <strong>${booking.customerName}</strong>,</p>
    <p>You have received a new message regarding your consultation request for <strong>${dateFormatted} (${booking.service})</strong>:</p>

    <div style="background-color: #F8FAFC; border-left: 4px solid #0F3040; padding: 18px 20px; border-radius: 8px; margin: 20px 0; font-size: 15px; color: #0F172A; line-height: 1.6;">
      ${replyMessage.replace(/\n/g, "<br>")}
    </div>

    <p style="font-size: 13px; color: #64748B;">You can reply directly to this email if you need to share additional details.</p>

    <p style="margin-top: 25px; font-weight: 700; color: #0F3040;">Best regards,<br>Pankaj Agrawal & Co.</p>
    `
  );

  // Client communications are sent via SMTP
  return sendViaSmtp({
    to: booking.customerEmail,
    subject: `Re: Consultation (${booking.service}) - Pankaj Agrawal & Co.`,
    html,
  });
}

