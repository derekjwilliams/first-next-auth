import "./globals.css";
import * as stylex from "@stylexjs/stylex";

const layout = stylex.create({
  base: {
    fontFamily: 'Figtree, sans-serif',
    backgroundColor: '#FFFFFF',
    color: '#000',
  }
})
const layout_main = stylex.create({
  base: 
  {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  }
})


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Marigold",
  description: "Creating collaborative relationships between property owners and tenants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Figtree&display=swap" rel="stylesheet"/>
      </head>
      <body {...stylex.props(layout.base)}>
        <main {...stylex.props(layout_main.base)}>
          {children}
        </main>
      </body>
    </html>
  );
}
