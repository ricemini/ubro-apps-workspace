import Navigation from '../components/Navigation';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Preguntas Frecuentes - VendeMás | POS Móvil para Vendedores',
  description: 'Encuentra respuestas a las preguntas más comunes sobre VendeMás, el sistema POS móvil para vendedores ambulantes en México y LATAM.',
  keywords: 'FAQ, preguntas frecuentes, VendeMás, POS móvil, soporte, ayuda',
};

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}