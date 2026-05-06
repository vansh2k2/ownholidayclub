const nodemailer = require("nodemailer");

const getOptionalEnv = (name) => String(process.env[name] || "").trim();
const BRAND_LOGO_URL =
  "https://res.cloudinary.com/dd7e45deg/image/upload/v1774869458/logo_rfvmka.png";

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

module.exports = {
  sendOtpEmail,
  sendWelcomePasswordEmail,
};
