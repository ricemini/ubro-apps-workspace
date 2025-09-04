/**
 * Navigation data for the VendeMás platform
 * Defines primary and secondary navigation items
 */

export const PRIMARY = [
  {
    name: 'Productos',
    label: 'Productos',
    href: '#productos',
    description: 'Descubre nuestras soluciones para vendedores ambulantes',
  },
  {
    name: 'Características',
    label: 'Características',
    href: '/caracteristicas',
    description: 'Funcionalidades que impulsan tu negocio',
  },
  {
    name: 'Precios',
    label: 'Precios',
    href: '#precios',
    description: 'Planes flexibles para todos los tamaños de negocio',
  },
] as const;

export const SECONDARY = [
  {
    name: 'Soporte',
    label: 'Soporte',
    href: '#soporte',
    description: 'Ayuda y recursos para tu negocio',
  },
  {
    name: 'Blog',
    label: 'Blog',
    href: '#blog',
    description: 'Consejos y noticias del mundo del comercio',
  },
] as const;

export type PrimaryNav = typeof PRIMARY;
export type SecondaryNav = typeof SECONDARY;
