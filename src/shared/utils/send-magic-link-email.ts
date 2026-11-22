import { env } from "@/shared/lib/env";
import { resend } from "@/shared/lib/resend";

type SendMagicLinkEmailParams = {
  to: string;
  url: string;
};

export const sendMagicLinkEmail = async ({
  to,
  url,
}: SendMagicLinkEmailParams) => {
  const { host } = new URL(url);

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: "Seu link de acesso ao Bookora",
    html: magicLinkHtml({ url, host }),
    text: magicLinkText({ url, host }),
  });

  if (error) {
    throw new Error(`Falha ao enviar o link de acesso: ${error.message}`);
  }
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const magicLinkHtml = ({ url, host }: { url: string; host: string }) => {
  const safeUrl = escapeHtml(url);
  const safeHost = escapeHtml(host);

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:32px 16px;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border-radius:12px;padding:32px;">
            <tr>
              <td>
                <h1 style="margin:0 0 8px;font-size:20px;line-height:1.3;">Entrar no Bookora</h1>
                <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555;">
                  Clique no botão abaixo para acessar sua conta em <strong>${safeHost}</strong>. O link expira em 24 horas e só pode ser usado uma vez.
                </p>
                <a href="${safeUrl}" style="display:inline-block;padding:12px 20px;background:#1a1a1a;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
                  Acessar minha conta
                </a>
                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#888;">
                  Se você não pediu este e-mail, pode ignorá-lo com segurança.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const magicLinkText = ({ url, host }: { url: string; host: string }) =>
  `Entrar no Bookora (${host})\n\nAcesse sua conta pelo link abaixo (expira em 24 horas):\n${url}\n\nSe você não pediu este e-mail, pode ignorá-lo.\n`;
