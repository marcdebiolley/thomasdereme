export const metadata = {
  title: 'Studio — Thomas Derême',
  robots: { index: false, follow: false },
};

// Dedicated root layout for the Sanity Studio (separate <html> from the site).
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
