export default function setupCustomRoutes(router) {
  // Define your own custom routes here, just as you would in router.js but using 'router' instead of 'this'.
  // For example:
  // router.route('yourroute');
  this.route('tds-limits');
  this.route('tds-xp-costs');
  this.route('tdscombat-gear', { path: '/tdscombat/gear/' });
  this.route('tdscombat-gear-detail', { path: '/tdscombat/gear/:type/:name' });
  this.route('tdsskills-abilities', { path: '/tdsskills/abilities' });
  this.route('tdsskills-scan', { path: '/tdsskills/scan' });
  this.route('custom-chargen-char', { path: '/chargen/:char_id'});
}
