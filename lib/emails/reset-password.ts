interface ResetPasswordEmailProps {
  firstName: string;
  resetUrl: string;
}

export function resetPasswordEmail({
  firstName,
  resetUrl,
}: ResetPasswordEmailProps) {
  const appName = process.env.APP_NAME ?? "DLAR System";
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  const logoUrl = `${appUrl}/dlar-final-logo.png`;

  const subject = `Reset your ${appName} password`;

  const text = `
Hello ${firstName},

We received a request to reset your ${appName} password.

Reset your password:
${resetUrl}

This link will expire in 30 minutes.

If you didn't request a password reset, you can safely ignore this email.

© ${new Date().getFullYear()} ${appName}
${appUrl}
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${subject}</title>
</head>

<body
style="
margin:0;
padding:40px 20px;
background:#f4f7fb;
font-family:Arial,Helvetica,sans-serif;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="max-width:640px;margin:0 auto;">

<tr>
<td
style="
background:#ffffff;
border-radius:16px;
padding:48px;
box-shadow:0 6px 20px rgba(0,0,0,.06);
">

<div style="text-align:center;">

<img
src="${logoUrl}"
alt="${appName}"
style="
max-width:180px;
height:auto;
margin-bottom:32px;
"/>

<h1
style="
margin:0 0 16px;
font-size:28px;
color:#111827;
">
Reset Your Password
</h1>

<p
style="
margin:0 0 32px;
color:#4b5563;
font-size:16px;
line-height:1.7;
">
Hello <strong>${firstName}</strong>,
<br /><br />

We received a request to reset the password
for your account.
</p>

<a
href="${resetUrl}"
style="
display:inline-block;
padding:16px 34px;
background:#004AAD;
color:#ffffff;
text-decoration:none;
border-radius:10px;
font-weight:bold;
font-size:16px;
">
Reset Password
</a>

<p
style="
margin:40px 0 0;
font-size:14px;
line-height:1.8;
color:#6b7280;
">
This link will expire in
<strong>30 minutes</strong>.
</p>

<p
style="
margin-top:18px;
font-size:14px;
line-height:1.8;
color:#6b7280;
">
If you didn't request this password reset,
you can safely ignore this email.
Your password will remain unchanged.
</p>

<hr
style="
margin:40px 0;
border:none;
border-top:1px solid #e5e7eb;
"/>

<p
style="
font-size:13px;
color:#9ca3af;
line-height:1.8;
">
© ${new Date().getFullYear()} ${appName}

<br>

<a
href="${appUrl}"
style="
color:#004AAD;
text-decoration:none;
">
${appUrl}
</a>
</p>

</div>

</td>
</tr>

</table>

</body>
</html>
`;

  return {
    subject,
    html,
    text,
  };
}
