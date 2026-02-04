export const COLORS = {
  primary: '#dc2626', // red-600
  background: '#ffffff', // white
  text: '#09090b',
};

export const ADMIN_EMAIL = 'koudjrakoromeofabrice@gmail.com';
export const ADMIN_PHONE = '+229 01 61 19 34 83';
export const LOCATION = 'Fidjrossè, Atlantique Beach Hotel';
export const SLOGAN = 'Keep on Knocking';

export const getConfirmationEmailHTML = (res: any) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #ddd; }
        .header { background: #dc2626; color: #ffffff; padding: 40px 20px; text-align: center; }
        .content { padding: 40px; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #777; }
        .details { background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin:0; font-size: 28px;">THE LIZARD KING Bar</h1>
            <p style="margin:10px 0 0 0; letter-spacing: 2px;">${SLOGAN}</p>
        </div>
        <div class="content">
            <h2 style="color: #000;">Réservation Confirmée !</h2>
            <p>Bonjour <strong>${res.fullName}</strong>,</p>
            <p>Votre accès pour la soirée live au bar <strong>THE LIZARD KING</strong> a été validé avec succès.</p>
            
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
            <p>THE LIZARD KING Bar | Fidjrossè | 📞 ${ADMIN_PHONE}</p>
        </div>
    </div>
</body>
</html>
`;