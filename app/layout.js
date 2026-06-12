import './globals.css';

export const metadata = {
  title: 'Sentinel Outbound | Autonomous Growth Intelligence Network',
  description: 'Surgical lead acquisition & outbound pipeline engine for Cybersecurity SaaS, MSPs, and MSSPs. Autonomous LinkedIn authority content, outreach, cold email campaigns, and CRM synchronization.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
