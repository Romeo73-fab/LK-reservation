
export const COLORS = {
  primary: '#d97706', // amber-600
  background: '#09090b', // zinc-950
  text: '#fafafa',
};

export const ADMIN_EMAIL = 'koudjrakoromeofabrice@gmail.com';
export const ADMIN_PHONE = '+229 01 53 90 89 08';
export const LOCATION = 'Fidjossè, Atlantique Bich Hotel';
export const SLOGAN = 'Keep on Knocking';

export const getConfirmationEmailHTML = (res: any) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #ddd; }
        .header { background: #000000; color: #d97706; padding: 40px 20px; text-align: center; }
        .content { padding: 40px; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #777; }
        .details { background: #fdf6e3; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d97706; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin:0; font-size: 28px;">LIZARD KING BAR</h1>
            <p style="margin:10px 0 0 0; letter-spacing: 2px;">${SLOGAN}</p>
        </div>
        <div class="content">
            <h2 style="color: #000;">Réservation Confirmée !</h2>
            <p>Bonjour <strong>${res.fullName}</strong>,</p>
            <p>Votre accès pour la soirée live au Lizard King a été validé avec succès.</p>
            
            <div class="details">
                <p style="margin: 5px 0;"><strong>Ticket ID :</strong> ${res.id}</p>
                <p style="margin: 5px 0;"><strong>Date :</strong> ${res.date}</p>
                <p style="margin: 5px 0;"><strong>Heure d'arrivée :</strong> ${res.time}</p>
                <p style="margin: 5px 0;"><strong>Nombre de places :</strong> ${res.guests}</p>
            </div>

            <p>Lieu : <strong>${LOCATION}</strong></p>
            <p style="font-size: 14px; color: #666;">Veuillez présenter votre QR Code à votre arrivée.</p>
        </div>
        <div class="footer">
            <p>Lizard King Bar | Fidjossè | 📞 ${ADMIN_PHONE}</p>
        </div>
    </div>
</body>
</html>
`;
