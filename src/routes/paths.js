// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = '';
// ----------------------------------------------------------------------
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components'
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dash: path(ROOTS_DASHBOARD, '/dashboard'),
  members: (uuid) => path(ROOTS_DASHBOARD, `/dash/${uuid}`),
  auctions: path(ROOTS_DASHBOARD, '/auctions'),
  bidplacements: path(ROOTS_DASHBOARD, '/bidplacements')
};
