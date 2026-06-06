const nodemailer = require("nodemailer");

const getOptionalEnv = (name) => String(process.env[name] || "").trim();
const BRAND_LOGO_URL =
  "https://www.ownholidayclub.com/logo.png";


const requireEnv = (name) => {
  const value = getOptionalEnv(name);
  if (!value) {
    throw new Error(`${name} is missing.`);
  }
  return value;
};

const getPositiveNumber = (value, fallback) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const getEmailProvider = () => {
  const configuredProvider = getOptionalEnv("EMAIL_PROVIDER").toLowerCase();

  if (configuredProvider === "brevo_api") {
    return "brevo";
  }

  if (configuredProvider) {
    return configuredProvider;
  }

  if (getOptionalEnv("BREVO_SMTP_USER") && getOptionalEnv("SMTP_PASS")) {
    return "brevo";
  }

  return "smtp";
};

const getProviderDefaults = () => {
  const provider = getEmailProvider();

  if (provider === "gmail") {
    return {
      host: getOptionalEnv("GMAIL_SMTP_HOST") || "smtp.gmail.com",
      port: getPositiveNumber(
        getOptionalEnv("GMAIL_SMTP_PORT") || process.env.SMTP_PORT,
        587,
      ),
      user: getOptionalEnv("GMAIL_SMTP_USER") || getOptionalEnv("SMTP_USER"),
      pass: getOptionalEnv("GMAIL_SMTP_PASS") || getOptionalEnv("SMTP_PASS"),
      fromName:
        getOptionalEnv("GMAIL_FROM_NAME") ||
        getOptionalEnv("SMTP_FROM_NAME") ||
        "OwnHolidayClub",
      fromEmail:
        getOptionalEnv("GMAIL_FROM_EMAIL") ||
        getOptionalEnv("SMTP_FROM_EMAIL") ||
        getOptionalEnv("GMAIL_SMTP_USER") ||
        getOptionalEnv("SMTP_USER"),
      replyTo: getOptionalEnv("GMAIL_REPLY_TO") || getOptionalEnv("SMTP_REPLY_TO"),
    };
  }

  if (provider === "brevo") {
    return {
      host: getOptionalEnv("BREVO_SMTP_HOST") || "smtp-relay.brevo.com",
      port: getPositiveNumber(
        getOptionalEnv("BREVO_SMTP_PORT") || process.env.SMTP_PORT,
        587,
      ),
      user: getOptionalEnv("BREVO_SMTP_USER") || getOptionalEnv("SMTP_USER"),
      pass: getOptionalEnv("BREVO_SMTP_PASS") || getOptionalEnv("SMTP_PASS"),
      fromName:
        getOptionalEnv("BREVO_FROM_NAME") ||
        getOptionalEnv("SMTP_FROM_NAME") ||
        "OwnHolidayClub",
      fromEmail:
        getOptionalEnv("BREVO_FROM_EMAIL") ||
        getOptionalEnv("SMTP_FROM_EMAIL") ||
        getOptionalEnv("BREVO_SMTP_USER") ||
        getOptionalEnv("SMTP_USER"),
      replyTo: getOptionalEnv("BREVO_REPLY_TO") || getOptionalEnv("SMTP_REPLY_TO"),
    };
  }

  return {
    host: requireEnv("SMTP_HOST"),
    port: getPositiveNumber(process.env.SMTP_PORT, 587),
    user: requireEnv("SMTP_USER"),
    pass: requireEnv("SMTP_PASS"),
    fromName: getOptionalEnv("SMTP_FROM_NAME") || "OwnHolidayClub",
    fromEmail: getOptionalEnv("SMTP_FROM_EMAIL") || getOptionalEnv("SMTP_USER"),
    replyTo: getOptionalEnv("SMTP_REPLY_TO"),
  };
};

const getSmtpConfig = () => {
  const providerDefaults = getProviderDefaults();
  const host = providerDefaults.host;
  const port = getPositiveNumber(providerDefaults.port, 587);

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid number.");
  }

  return {
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 20000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 15000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000),
    auth: {
      user: providerDefaults.user || requireEnv("SMTP_USER"),
      pass: providerDefaults.pass || requireEnv("SMTP_PASS"),
    },
  };
};

const getTransporter = () => nodemailer.createTransport(getSmtpConfig());

const shouldLogEmailDebug = () =>
  process.env.EMAIL_DEBUG_LOGS === "true" || process.env.NODE_ENV !== "production";

const getFromAddress = () => {
  const providerDefaults = getProviderDefaults();
  const fromName = providerDefaults.fromName || "OwnHolidayClub";
  const fromEmail = providerDefaults.fromEmail || requireEnv("SMTP_USER");
  return `${fromName} <${fromEmail}>`;
};

const getReplyToAddress = () => getProviderDefaults().replyTo;

const sendMailWithLogging = async (mailOptions) => {
  const transporter = getTransporter();
  const info = await transporter.sendMail(mailOptions);

  if (shouldLogEmailDebug()) {
    console.log(
      "[email] sendMail accepted:",
      JSON.stringify(
        {
          to: mailOptions.to,
          subject: mailOptions.subject,
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
          messageId: info.messageId,
        },
        null,
        2,
      ),
    );
  }

  return info;
};

const sendOtpEmail = async (to, otp, ttlMinutes = 15) => {
  const from = getFromAddress();
  const replyTo = getReplyToAddress();

  const subject = "Your OwnHolidayClub OTP";
  const text = `Your OwnHolidayClub OTP is ${otp}. It expires in ${ttlMinutes} minutes.`;
  const html = `
    <div style="margin:0;padding:8px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,0.10);">
        <div style="padding:18px 24px;background:#ffffff;text-align:center;border-bottom:1px solid #e2e8f0;">
          <img src="${BRAND_LOGO_URL}" alt="Own Holiday Club" style="width:148px;max-width:100%;height:auto;display:block;margin:0 auto;" />
        </div>

        <div style="padding:28px 32px 24px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);text-align:center;">
          <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(245,158,11,0.14);color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">
            Verification Code
          </div>
          <h1 style="margin:18px 0 8px;font-size:30px;line-height:1.15;color:#ffffff;">Your OTP Is Ready</h1>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#cbd5e1;">
            Use the code below to continue your Own Holiday Club verification.
          </p>
        </div>

        <div style="padding:32px;">
          <p style="margin:0 0 22px;font-size:15px;line-height:1.8;color:#475569;text-align:center;">
            Enter this one-time password in the verification screen. It will expire in
            <strong style="color:#0f172a;"> ${ttlMinutes} minutes</strong>.
          </p>

          <div style="margin:0 auto 24px;max-width:320px;padding:18px 20px;border-radius:20px;border:1px solid #fde68a;background:linear-gradient(180deg,#fffdf6 0%,#fffbeb 100%);text-align:center;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#d97706;margin-bottom:10px;">
              One-Time Password
            </div>
            <div style="font-size:34px;font-weight:800;letter-spacing:0.28em;color:#0f172a;text-indent:0.28em;">
              ${otp}
            </div>
          </div>

          <div style="padding:18px 20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;margin-bottom:22px;">
            <div style="font-size:14px;line-height:1.8;color:#475569;">
              If you did not request this code, you can safely ignore this email.
            </div>
          </div>

          <p style="margin:0;font-size:13px;line-height:1.8;color:#64748b;text-align:center;">
            Need help? Reply to this email and our team will assist you.
          </p>
        </div>
      </div>
    </div>
  `;

  return sendMailWithLogging({
    from,
    ...(replyTo ? { replyTo } : {}),
    to,
    subject,
    text,
    html,
  });
};

const sendWelcomePasswordEmail = async ({
  to,
  fullName,
  membershipId,
  password,
  invoiceAttachment,
}) => {
  const from = getFromAddress();
  const replyTo = getReplyToAddress();
  const safeName = String(fullName || "Member").trim() || "Member";
  const frontendBaseUrl =
    getOptionalEnv("FRONTEND_BASE_URL") || "https://www.ownholidayclub.com";
  const loginUrl = `${frontendBaseUrl.replace(/\/+$/, "")}/`;
  const baseAttachments = [];

  if (invoiceAttachment) {
    baseAttachments.push({
      filename: invoiceAttachment.filename,
      content: invoiceAttachment.content,
      contentType: invoiceAttachment.contentType || "application/pdf",
    });
  }

  return sendMailWithLogging({
    from,
    ...(replyTo ? { replyTo } : {}),
    to,
    subject: "Your OwnHolidayClub member account is ready",
    text: `Hello ${safeName}, your OwnHolidayClub member account is ready. Membership / Login ID: ${membershipId}. Password: ${password}. Please log in and change your password after signing in. Your membership invoice is attached with this email.`,
    html: `
      <div style="margin:0;padding:8px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,0.10);">
          <div style="padding:18px 24px;background:#ffffff;text-align:center;border-bottom:1px solid #e2e8f0;">
            <img src="${BRAND_LOGO_URL}" alt="Own Holiday Club" style="width:148px;max-width:100%;height:auto;display:block;margin:0 auto;" />
          </div>

          <div style="padding:28px 32px 24px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);text-align:center;">
            <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(245,158,11,0.14);color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">
              Membership Activated
            </div>
            <h1 style="margin:18px 0 8px;font-size:30px;line-height:1.15;color:#ffffff;">Welcome to Own Holiday Club</h1>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#cbd5e1;">
              Your membership purchase was successful and your account is now ready.
            </p>
          </div>

          <div style="padding:32px;">
            <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#334155;">
              Hello <strong style="color:#0f172a;">${safeName}</strong>,
            </p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#475569;">
              Thank you for joining Own Holiday Club. We have created your member account and attached your membership invoice with this email.
            </p>

            <div style="border:1px solid #fde68a;border-radius:20px;background:linear-gradient(180deg,#fffdf6 0%,#fffbeb 100%);padding:22px 20px;margin:0 0 24px;">
              <div style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#d97706;">
                Your Login Details
              </div>
              <div style="margin:0 0 14px;padding:14px 16px;border-radius:16px;background:#ffffff;border:1px solid #f8e7a7;">
                <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;margin-bottom:6px;">
                  Membership / Login ID
                </div>
                <div style="font-size:18px;font-weight:700;color:#0f172a;word-break:break-word;">
                  ${membershipId}
                </div>
              </div>
              <div style="padding:14px 16px;border-radius:16px;background:#ffffff;border:1px solid #f8e7a7;">
                <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;margin-bottom:6px;">
                  Password
                </div>
                <div style="font-size:18px;font-weight:700;color:#0f172a;word-break:break-word;">
                  ${password}
                </div>
              </div>
            </div>

            <div style="padding:18px 20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;margin-bottom:24px;">
              <div style="font-size:14px;line-height:1.8;color:#475569;">
                Please log in using your email or membership / login ID and change your password after signing in for security.
              </div>
            </div>

            <div style="text-align:center;margin-bottom:24px;">
              <a href="${loginUrl}" style="display:inline-block;padding:14px 24px;border-radius:999px;background:#f59e0b;color:#0f172a;text-decoration:none;font-size:14px;font-weight:700;">
                Visit Own Holiday Club
              </a>
            </div>

            <p style="margin:0;font-size:13px;line-height:1.8;color:#64748b;text-align:center;">
              Need help? Reply to this email and our team will assist you.
            </p>
          </div>
        </div>
      </div>
    `,
    ...(baseAttachments.length > 0 ? { attachments: baseAttachments } : {}),
  });
};

const sendLeadNotificationEmail = async ({
  leadType,
  leadDetails,
  message,
}) => {
  const from = getFromAddress();
  const to = "Info@ownholidayclub.com";
  const subject = `New Lead: [${leadType}] - ${leadDetails.Name || leadDetails.fullName || 'User'}`;

  // Format details into HTML table rows
  let detailsHtml = "";
  for (const [key, value] of Object.entries(leadDetails)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      detailsHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569; width: 180px; text-transform: uppercase;">${key}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; word-break: break-all;">${value}</td>
        </tr>
      `;
    }
  }

  const html = `
    <div style="margin:0;padding:20px;background:#f8fafc;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:650px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.05);">
        <!-- Header Banner -->
        <div style="padding:24px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);text-align:center;">
          <img src="${BRAND_LOGO_URL}" alt="Own Holiday Club" style="width:140px;height:auto;margin-bottom:12px;" />
          <div style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(245,158,11,0.15);color:#fbbf24;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">
            Sales & Leads CRM
          </div>
          <h1 style="margin:12px 0 0;font-size:22px;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">New Lead Received</h1>
        </div>

        <!-- Body Section -->
        <div style="padding:32px;">
          <div style="margin-bottom:24px;padding:16px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:8px;">
            <p style="margin:0;font-size:14px;color:#15803d;font-weight:600;display:flex;align-items:center;gap:6px;">
              ⚡ A new <strong>${leadType}</strong> has been successfully submitted from the website.
            </p>
          </div>

          <h2 style="font-size:16px;color:#0f172a;margin:0 0 16px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.05em;">Lead Information</h2>
          
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tbody>
              ${detailsHtml}
            </tbody>
          </table>

          ${message ? `
            <h2 style="font-size:16px;color:#0f172a;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.05em;">User Message / Remarks</h2>
            <div style="padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;color:#334155;line-height:1.6;font-style:italic;">
              "${message}"
            </div>
          ` : ""}

          <!-- Footer -->
          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">
              This email was automatically generated by the Own Holiday Club Lead Capture System.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  return sendMailWithLogging({
    from,
    to,
    subject,
    text: `New Lead: ${leadType}\n\n${JSON.stringify(leadDetails, null, 2)}\n\nMessage: ${message || ''}`,
    html,
  });
};

const sendGenericThankYouEmail = async ({ to, name, type = "Holiday" }) => {
  const from = getFromAddress();
  const subject = "Thank you for contacting Own Holiday Club";
  const safeName = String(name || "Traveler").trim() || "Traveler";
 
  let subtext = "We've received your inquiry and our experts are already reviewing it.";
  let bodyText = "Thank you for choosing <strong style=\"color:#0c1a2e;\">Own Holiday Club</strong>. We've successfully received your inquiry and our team will reach out to you <strong style=\"color:#0c1a2e;\">within 24 hours</strong> to assist you.";
  let step3Icon = "✅";
  let step3Title = "Resolved";
  let step3Desc = "Your query is resolved";
  let plainText = `Hello ${safeName}, thank you for contacting Own Holiday Club. We have received your inquiry and our team will reach out to you within 24 hours.`;

  if (type === "Holiday" || type === "Destination") {
    subtext = "We've received your inquiry and our luxury travel experts are already reviewing it.";
    bodyText = "Thank you for choosing <strong style=\"color:#0c1a2e;\">Own Holiday Club</strong>. We've successfully received your inquiry and our dedicated luxury travel concierge team will reach out to you <strong style=\"color:#0c1a2e;\">within 24 hours</strong> to help craft your perfect holiday escape.";
    step3Icon = "✈️";
    step3Title = "Escape";
    step3Desc = "Your dream holiday is planned";
    plainText = `Hello ${safeName}, thank you for contacting Own Holiday Club. We have received your inquiry and our luxury travel concierge team will reach out to you within 24 hours.`;
  } else if (type === "Service") {
    bodyText = "Thank you for choosing <strong style=\"color:#0c1a2e;\">Own Holiday Club</strong>. We've successfully received your service inquiry and our dedicated team will reach out to you <strong style=\"color:#0c1a2e;\">within 24 hours</strong>.";
    step3Title = "Service";
    step3Desc = "Your required service is delivered";
  } else if (type === "Contact") {
    bodyText = "Thank you for reaching out to <strong style=\"color:#0c1a2e;\">Own Holiday Club</strong>. We've successfully received your message and our support team will get back to you <strong style=\"color:#0c1a2e;\">within 24 hours</strong>.";
    step3Title = "Support";
    step3Desc = "We assist you promptly";
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Thank You – Own Holiday Club</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
 
      <!-- Outer wrapper -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;padding:32px 16px;">
        <tr>
          <td align="center">
 
            <!-- Email card -->
            <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">
 
              <!-- ═══════════════════════════════════════ -->
              <!-- TOP ACCENT BAR -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td style="height:5px;background:linear-gradient(90deg,#c8960c 0%,#f5c842 50%,#c8960c 100%);"></td>
              </tr>
 
              <!-- ═══════════════════════════════════════ -->
              <!-- LOGO HEADER -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td align="center" style="padding:28px 32px 22px;background:#ffffff;border-bottom:1px solid #eef0f3;">
                  <img src="${BRAND_LOGO_URL}"
                    alt="Own Holiday Club"
                    width="150"
                    style="display:block;height:auto;margin:0 auto;" />
                </td>
              </tr>
 
              <!-- ═══════════════════════════════════════ -->
              <!-- HERO DARK BANNER -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td style="background:#0c1a2e;padding:44px 40px 40px;text-align:center;">
 
                  <!-- Golden badge pill -->
                  <div style="display:inline-block;background:rgba(245,200,66,0.12);border:1px solid rgba(245,200,66,0.30);border-radius:999px;padding:6px 18px;margin-bottom:22px;">
                    <span style="font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:#f5c842;">
                      ✦ &nbsp; Inquiry Received
                    </span>
                  </div>
 
                  <!-- Main heading -->
                  <h1 style="margin:0 0 14px;font-size:32px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-0.5px;">
                    Thank You, ${safeName}!
                  </h1>
 
                  <!-- Subtext -->
                  <p style="margin:0;font-size:15px;line-height:1.7;color:#94a3b8;max-width:420px;margin:0 auto;">
                    ${subtext}
                  </p>
 
                </td>
              </tr>
 
              <!-- ═══════════════════════════════════════ -->
              <!-- GOLDEN DIVIDER LINE -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td style="height:3px;background:linear-gradient(90deg,transparent,#f5c842,transparent);"></td>
              </tr>
 
              <!-- ═══════════════════════════════════════ -->
              <!-- BODY CONTENT -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td style="padding:40px 40px 32px;background:#ffffff;">
 
                  <!-- Greeting message -->
                  <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:#1e2a3a;">
                    Hello <strong style="color:#0c1a2e;">${safeName}</strong>,
                  </p>
                  <p style="margin:0 0 32px;font-size:15px;line-height:1.85;color:#4a5568;">
                    ${bodyText}
                  </p>
 
                  <!-- ─── 3-step promise block ─── -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                    <tr>
 
                      <!-- Step 1 -->
                      <td width="33%" style="padding:0 8px 0 0;vertical-align:top;">
                        <div style="background:#fafbfc;border:1px solid #eef0f3;border-top:3px solid #f5c842;border-radius:12px;padding:20px 16px;text-align:center;">
                          <div style="font-size:22px;margin-bottom:10px;">📋</div>
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0c1a2e;margin-bottom:6px;">Review</div>
                          <div style="font-size:12px;color:#64748b;line-height:1.6;">Our team reviews your inquiry</div>
                        </div>
                      </td>
 
                      <!-- Step 2 -->
                      <td width="33%" style="padding:0 4px;vertical-align:top;">
                        <div style="background:#fafbfc;border:1px solid #eef0f3;border-top:3px solid #f5c842;border-radius:12px;padding:20px 16px;text-align:center;">
                          <div style="font-size:22px;margin-bottom:10px;">📞</div>
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0c1a2e;margin-bottom:6px;">Connect</div>
                          <div style="font-size:12px;color:#64748b;line-height:1.6;">Expert contacts you within 24 hrs</div>
                        </div>
                      </td>
 
                      <!-- Step 3 -->
                      <td width="33%" style="padding:0 0 0 8px;vertical-align:top;">
                        <div style="background:#fafbfc;border:1px solid #eef0f3;border-top:3px solid #f5c842;border-radius:12px;padding:20px 16px;text-align:center;">
                          <div style="font-size:22px;margin-bottom:10px;">${step3Icon}</div>
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0c1a2e;margin-bottom:6px;">${step3Title}</div>
                          <div style="font-size:12px;color:#64748b;line-height:1.6;">${step3Desc}</div>
                        </div>
                      </td>
 
                    </tr>
                  </table>
 
                  <!-- ─── Contact info block ─── -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fb;border:1px solid #eef0f3;border-left:4px solid #f5c842;border-radius:0 12px 12px 0;margin-bottom:32px;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0c1a2e;">Need urgent help?</p>
                        <p style="margin:0;font-size:14px;line-height:1.8;color:#4a5568;">
                          Reply to this email or call us at
                          <a href="tel:+919871984074" style="color:#c8960c;font-weight:600;text-decoration:none;">+91 98719 84074</a>.
                          Our concierge team is available to assist you.
                        </p>
                      </td>
                    </tr>
                  </table>
 
                  <!-- ─── CTA Button ─── -->
                  <div style="text-align:center;margin-bottom:8px;">
                    <a href="https://www.ownholidayclub.com"
                      style="display:inline-block;background:linear-gradient(135deg,#c8960c,#f5c842);color:#0c1a2e;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.05em;padding:15px 36px;border-radius:999px;box-shadow:0 4px 16px rgba(200,150,12,0.30);">
                      EXPLORE OUR DESTINATIONS &nbsp;→
                    </a>
                  </div>
 
                </td>
              </tr>
 
              <!-- ═══════════════════════════════════════ -->
              <!-- FOOTER -->
              <!-- ═══════════════════════════════════════ -->
              <tr>
                <td style="background:#0c1a2e;padding:28px 40px;text-align:center;">
 
                  <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.7;">
                    © 2024 Own Holiday Club. All rights reserved.<br />
                    <a href="mailto:info@ownholidayclub.com" style="color:#f5c842;text-decoration:none;">info@ownholidayclub.com</a>
                    &nbsp;·&nbsp;
                    <a href="https://www.ownholidayclub.com" style="color:#f5c842;text-decoration:none;">www.ownholidayclub.com</a>
                  </p>
 
                  <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">
                    You're receiving this because you submitted an inquiry on our website.
                  </p>
 
                </td>
              </tr>
 
              <!-- BOTTOM ACCENT BAR -->
              <tr>
                <td style="height:4px;background:linear-gradient(90deg,#c8960c 0%,#f5c842 50%,#c8960c 100%);"></td>
              </tr>
 
            </table>
            <!-- /Email card -->
 
          </td>
        </tr>
      </table>
 
    </body>
    </html>
  `;
 
  return sendMailWithLogging({
    from,
    to,
    subject,
    text: plainText,
    html,
  });
};

const sendLeadThankYouEmail = async ({ to, name }) => {
  return sendGenericThankYouEmail({ to, name, type: "Holiday" });
};

const sendHolidayBookingAdminEmail = async ({
  user,
  booking,
  stayAllowance,
  validFrom,
  validTo
}) => {
  const from = getFromAddress();
  const to = "Info@ownholidayclub.com";
  const subject = `New Holiday Booking Request - ${user.name || "Member"}`;

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatDateTime = (dateInput) => {
    if (!dateInput) return "N/A";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString("en-US", { 
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  const html = `
    <div style="margin:0;padding:8px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,0.10);">
        <div style="padding:18px 24px;background:#ffffff;text-align:center;border-bottom:1px solid #e2e8f0;">
          <img src="${BRAND_LOGO_URL}" alt="Own Holiday Club" style="width:148px;max-width:100%;height:auto;display:block;margin:0 auto;" />
        </div>

        <div style="padding:28px 32px 24px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);text-align:center;">
          <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(245,158,11,0.14);color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">
            New Booking Request
          </div>
          <h1 style="margin:18px 0 8px;font-size:30px;line-height:1.15;color:#ffffff;">Holiday Request Received</h1>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#cbd5e1;">
            A member has requested to book a holiday.
          </p>
        </div>

        <div style="padding:32px;">
          <p style="margin:0 0 22px;font-size:15px;line-height:1.8;color:#475569;text-align:center;">
            <strong>${user.name || "Member"}</strong> (${user.email}, ${user.mobile}) has submitted a holiday booking request. Details are below:
          </p>

          <div style="margin:0 auto 24px;padding:20px;border-radius:20px;border:1px solid #fde68a;background:linear-gradient(180deg,#fffdf6 0%,#fffbeb 100%);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Holiday No.</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; font-weight: 700; color: #0f172a;">#${booking.slotNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Length Of Stay</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${stayAllowance?.label || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Valid From</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${formatDate(validFrom)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Valid To</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${formatDate(validTo)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Destination</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a; font-weight: 700;">${booking.place}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Check-In</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${formatDateTime(booking.checkIn)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Check-Out</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${formatDateTime(booking.checkOut)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Guests</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f8e7a7; color: #0f172a;">${booking.adults} Adults / ${booking.kids} Kids</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #92400e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Status</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">Requested</td>
              </tr>
            </table>
          </div>

          <div style="padding:18px 20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;margin-bottom:22px;">
            <div style="font-size:14px;line-height:1.8;color:#475569; text-align: center;">
              Please log in to the admin panel to review and approve/reject this booking request.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return sendMailWithLogging({
    from,
    to,
    subject,
    text: `New Holiday Booking Request from ${user.name}. Destination: ${booking.place}. Check-In: ${formatDateTime(booking.checkIn)}.`,
    html,
  });
};

module.exports = {
  sendOtpEmail,
  sendWelcomePasswordEmail,
  sendLeadNotificationEmail,
  sendLeadThankYouEmail,
  sendGenericThankYouEmail,
  sendHolidayBookingAdminEmail,
};

