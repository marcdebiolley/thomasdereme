import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { btnDark } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="py-28 md:py-40 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="display font-normal text-4xl md:text-5xl tracking-tight mt-5 text-ink">
        Page introuvable
      </h1>
      <p className="text-muted mt-4">Cette page n’existe pas ou a été déplacée.</p>
      <div className="mt-8">
        <Link href="/" className={btnDark}>
          Accueil
        </Link>
      </div>
    </Container>
  );
}
