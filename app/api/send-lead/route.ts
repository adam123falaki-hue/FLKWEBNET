import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, company, budget, note, project_type, selected_features, estimated_total } = data;

    // إرسال الإيميل ليك فـ Gmail
    await resend.emails.send({
      from: 'Portfolio Leads <onboarding@resend.dev>',
      to: [process.env.MY_GMAIL_ADDRESS || 'your.email@gmail.com'],
      subject: `🚨 Nouveau Lead Client: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #22d3ee;">🚀 Nouveau Prospect Reçu!</h2>
          <hr style="border-color: #334155; margin-bottom: 20px;" />
          
          <p><strong>👤 Nom & Prénom:</strong> ${name}</p>
          <p><strong>📞 Téléphone / WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #22d3ee;">${phone}</a></p>
          <p><strong>✉️ E-mail:</strong> ${email}</p>
          ${company ? `<p><strong>🏢 Entreprise:</strong> ${company}</p>` : ''}
          ${budget ? `<p><strong>💰 Budget Prévu:</strong> ${budget}</p>` : ''}
          
          <hr style="border-color: #334155; margin: 20px 0;" />
          <p><strong>📌 Type de Projet:</strong> ${project_type}</p>
          <p><strong>🛠️ Options Sélectionnées:</strong> ${selected_features || 'Aucune'}</p>
          <p><strong>💵 Total Estimé:</strong> <span style="color: #22d3ee; font-size: 18px; font-weight: bold;">${estimated_total}</span></p>
          
          ${note ? `<p><strong>📝 Note / Remarque:</strong> ${note}</p>` : ''}
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur d\'envoi email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}