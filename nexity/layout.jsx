
// layout.jsx — Sidebar, TopBar and DashboardLayout (app shell)
// Replicates the shell of the Figma prototype (insumos/Nexity Benká Group .pdf, page 6),
// measured on a 1512-wide canvas, and adapts it to tablet and phone. Every section renders
// inside DashboardLayout, so the responsive rules here apply to all of them.

// Shell icons as drawn in the Figma file (page 6): [width, height, path]
const SHELL_GLYPHS = {
  menu: [17.86, 15.72, 'M 6.61 6.29L 17.32 6.29C 17.42 6.29 17.5 6.22 17.5 6.12L 17.5 4.87C 17.5 4.77 17.42 4.69 17.32 4.69L 6.61 4.69C 6.51 4.69 6.43 4.77 6.43 4.87L 6.43 6.12C 6.43 6.22 6.51 6.29 6.61 6.29ZM 6.43 10.86C 6.43 10.95 6.51 11.03 6.61 11.03L 17.32 11.03C 17.42 11.03 17.5 10.95 17.5 10.86L 17.5 9.6C 17.5 9.5 17.42 9.42 17.32 9.42L 6.61 9.42C 6.51 9.42 6.43 9.5 6.43 9.6ZM 17.68 0L 0.18 0C 0.08 0 0 0.07 0 0.17L 0 1.43C 0 1.53 0.08 1.6 0.18 1.6L 17.68 1.6C 17.77 1.6 17.86 1.53 17.86 1.43L 17.86 0.17C 17.86 0.07 17.77 0 17.68 0ZM 17.68 14.11L 0.18 14.11C 0.08 14.11 0 14.2 0 14.3L 0 15.54C 0 15.64 0.08 15.72 0.18 15.72L 17.68 15.72C 17.77 15.72 17.86 15.64 17.86 15.54L 17.86 14.3C 17.86 14.2 17.77 14.11 17.68 14.11ZM 0.07 8.01L 3.57 10.76C 3.7 10.86 3.89 10.77 3.89 10.61L 3.89 5.11C 3.89 4.94 3.7 4.85 3.57 4.96L 0.07 7.71C 0.06 7.73 0.04 7.75 0.02 7.77C 0.01 7.8 0 7.83 0 7.86C 0 7.89 0.01 7.92 0.02 7.95C 0.04 7.97 0.06 7.99 0.07 8.01ZM 0.07 8.01'],
  search: [17.87, 17.88, 'M 17.8 16.59L 12.01 10.78C 12.92 9.62 13.39 8.2 13.39 6.71C 13.39 4.91 12.7 3.23 11.44 1.97C 10.17 0.7 8.48 0 6.71 0C 4.91 0 3.24 0.7 1.97 1.97C 0.71 3.23 0 4.91 0 6.71C 0 8.49 0.71 10.17 1.97 11.44C 3.24 12.7 4.91 13.4 6.71 13.4C 8.2 13.4 9.61 12.92 10.77 12.01L 16.58 17.82C 16.6 17.84 16.61 17.85 16.63 17.86C 16.65 17.87 16.69 17.88 16.71 17.88C 16.73 17.88 16.75 17.87 16.77 17.86C 16.8 17.85 16.82 17.84 16.84 17.82L 17.8 16.84C 17.82 16.83 17.84 16.81 17.85 16.79C 17.86 16.76 17.87 16.74 17.87 16.72C 17.87 16.69 17.86 16.67 17.85 16.64C 17.84 16.62 17.82 16.61 17.8 16.59ZM 10.23 10.24C 9.29 11.19 8.03 11.7 6.71 11.7C 5.36 11.7 4.11 11.19 3.16 10.24C 2.23 9.29 1.7 8.04 1.7 6.71C 1.7 5.36 2.23 4.11 3.16 3.16C 4.11 2.22 5.36 1.7 6.71 1.7C 8.03 1.7 9.29 2.22 10.23 3.16C 11.19 4.11 11.7 5.36 11.7 6.71C 11.7 8.04 11.19 9.3 10.23 10.24ZM 10.23 10.24'],
  contrast: [19.16, 19.18, 'M 9.58 19.18C 14.87 19.18 19.16 14.89 19.16 9.59C 19.16 4.29 14.87 0 9.58 0C 4.29 0 0 4.29 0 9.59C 0 14.89 4.29 19.18 9.58 19.18ZM 9.58 17.26L 9.58 1.91C 13.81 1.91 17.25 5.35 17.25 9.59C 17.25 13.83 13.81 17.26 9.58 17.26ZM 9.58 17.26'],
  bell: [15.0, 19.65, 'M 14.28 15.54L 13.74 15.54L 13.74 7.95C 13.74 4.79 11.42 2.19 8.39 1.76L 8.39 0.89C 8.39 0.4 7.99 0 7.5 0C 7.01 0 6.61 0.4 6.61 0.89L 6.61 1.76C 3.58 2.19 1.25 4.79 1.25 7.95L 1.25 15.54L 0.71 15.54C 0.32 15.54 0 15.86 0 16.26L 0 16.97C 0 17.07 0.07 17.15 0.17 17.15L 5 17.15C 5 18.53 6.12 19.65 7.5 19.65C 8.88 19.65 10 18.53 10 17.15L 14.82 17.15C 14.92 17.15 15 17.07 15 16.97L 15 16.26C 15 15.86 14.67 15.54 14.28 15.54ZM 7.5 18.22C 6.91 18.22 6.43 17.75 6.43 17.15L 8.56 17.15C 8.56 17.75 8.09 18.22 7.5 18.22ZM 2.86 15.54L 2.86 7.95C 2.86 6.71 3.34 5.54 4.21 4.66C 5.09 3.78 6.26 3.3 7.5 3.3C 8.74 3.3 9.91 3.78 10.78 4.66C 11.66 5.54 12.13 6.71 12.13 7.95L 12.13 15.54ZM 2.86 15.54'],
  navDashboard: [14.0, 14.01, 'M 1.55 14.01C 1.13 14.01 0.76 13.85 0.46 13.55C 0.16 13.25 0 12.88 0 12.45L 0 1.55C 0 1.12 0.16 0.75 0.46 0.45C 0.76 0.15 1.13 0 1.55 0L 12.45 0C 12.87 0 13.24 0.15 13.54 0.45C 13.85 0.75 14 1.12 14 1.55L 14 12.45C 14 12.88 13.85 13.25 13.54 13.55C 13.24 13.85 12.87 14.01 12.45 14.01ZM 1.55 12.45L 6.23 12.45L 6.23 1.55L 1.55 1.55ZM 7.78 12.45L 12.45 12.45L 12.45 7L 7.78 7ZM 7.78 5.45L 12.45 5.45L 12.45 1.55L 7.78 1.55ZM 7.78 5.45'],
  navFinance: [12.0, 12.01, 'M 1.33 12.01C 0.97 12.01 0.65 11.88 0.39 11.61C 0.13 11.35 0 11.04 0 10.67L 0 0L 1.33 0L 1.33 10.67L 12 10.67L 12 12.01ZM 2 10L 2 4L 4.66 4L 4.66 10ZM 5.34 10L 5.34 0.66L 7.99 0.66L 7.99 10ZM 8.67 10L 8.67 6.67L 11.33 6.67L 11.33 10ZM 8.67 10'],
  navAlerts: [14.66, 12.68, 'M 7.33 2.66L 2.31 11.34L 12.36 11.34ZM 7.33 0L 14.66 12.68L 0 12.68ZM 6.67 9.34L 7.99 9.34L 7.99 10.67L 6.67 10.67ZM 6.67 5.34L 7.99 5.34L 7.99 8L 6.67 8ZM 6.67 5.34'],
  navUsers: [14.66, 10.67, 'M 9.33 5.34C 10.81 5.34 12 4.14 12 2.67C 12 1.2 10.81 0 9.33 0C 7.86 0 6.67 1.2 6.67 2.67C 6.67 4.14 7.86 5.34 9.33 5.34ZM 9.33 1.33C 10.06 1.33 10.66 1.93 10.66 2.67C 10.66 3.4 10.06 4 9.33 4C 8.6 4 7.99 3.4 7.99 2.67C 7.99 1.93 8.6 1.33 9.33 1.33ZM 9.33 6.67C 7.55 6.67 4 7.56 4 9.34L 4 10.67L 14.66 10.67L 14.66 9.34C 14.66 7.56 11.11 6.67 9.33 6.67ZM 5.34 9.34C 5.48 8.86 7.53 8 9.33 8C 11.13 8 13.2 8.87 13.33 9.34ZM 3.33 7.33L 3.33 5.34L 5.34 5.34L 5.34 4L 3.33 4L 3.33 2L 2 2L 2 4L 0 4L 0 5.34L 2 5.34L 2 7.33ZM 3.33 7.33'],
  navLogs: [12.0, 12.01, 'M 1.33 12.01C 0.97 12.01 0.65 11.88 0.39 11.62C 0.13 11.35 0 11.04 0 10.67L 0 1.33C 0 0.97 0.13 0.65 0.39 0.4C 0.65 0.13 0.97 0 1.33 0L 10.66 0C 11.03 0 11.34 0.13 11.61 0.4C 11.87 0.65 12 0.97 12 1.33L 12 10.67C 12 11.04 11.87 11.35 11.61 11.62C 11.34 11.88 11.03 12.01 10.66 12.01ZM 1.33 3.55L 10.66 3.55L 10.66 1.33L 1.33 1.33ZM 1.33 7.12L 10.66 7.12L 10.66 4.89L 1.33 4.89ZM 1.33 10.67L 10.66 10.67L 10.66 8.45L 1.33 8.45ZM 2 3.1L 2 1.77L 3.33 1.77L 3.33 3.1ZM 2 6.67L 2 5.34L 3.33 5.34L 3.33 6.67ZM 2 10.24L 2 8.91L 3.33 8.91L 3.33 10.24ZM 2 10.24'],
  navSettings: [13.05, 13.34, 'M 11.48 7.32C 11.5 7.11 11.53 6.9 11.53 6.67C 11.53 6.44 11.5 6.23 11.48 6.02L 12.88 4.91C 13.01 4.81 13.05 4.64 12.96 4.49L 11.63 2.18C 11.57 2.07 11.45 2.01 11.33 2.01C 11.3 2.01 11.26 2.01 11.22 2.03L 9.57 2.7C 9.22 2.43 8.84 2.21 8.44 2.04L 8.19 0.28C 8.16 0.12 8.02 0 7.86 0L 5.19 0C 5.02 0 4.89 0.12 4.87 0.28L 4.61 2.04C 4.2 2.21 3.83 2.44 3.49 2.7L 1.82 2.03C 1.78 2.01 1.75 2.01 1.7 2.01C 1.59 2.01 1.48 2.07 1.42 2.18L 0.08 4.49C 0 4.64 0.04 4.81 0.17 4.91L 1.57 6.02C 1.55 6.23 1.53 6.45 1.53 6.67C 1.53 6.89 1.55 7.11 1.57 7.32L 0.17 8.43C 0.04 8.52 0 8.7 0.08 8.85L 1.42 11.16C 1.48 11.26 1.59 11.32 1.71 11.32C 1.75 11.32 1.79 11.32 1.82 11.31L 3.49 10.63C 3.83 10.9 4.2 11.12 4.61 11.29L 4.87 13.06C 4.89 13.22 5.02 13.34 5.19 13.34L 7.86 13.34C 8.02 13.34 8.16 13.22 8.19 13.06L 8.44 11.29C 8.84 11.12 9.22 10.9 9.57 10.63L 11.22 11.31C 11.26 11.32 11.31 11.32 11.34 11.32C 11.45 11.32 11.57 11.26 11.63 11.16L 12.96 8.85C 13.05 8.7 13.01 8.52 12.88 8.43ZM 10.16 6.18C 10.18 6.38 10.19 6.53 10.19 6.67C 10.19 6.81 10.17 6.96 10.16 7.16L 10.06 7.91L 10.65 8.38L 11.38 8.93L 10.91 9.74L 10.06 9.4L 9.37 9.13L 8.77 9.58C 8.48 9.79 8.21 9.95 7.94 10.06L 7.23 10.35L 7.12 11.1L 6.99 12.01L 6.05 12.01L 5.93 11.1L 5.82 10.35L 5.12 10.06C 4.83 9.94 4.56 9.79 4.3 9.59L 3.69 9.13L 2.98 9.41L 2.13 9.75L 1.67 8.94L 2.39 8.38L 2.98 7.91L 2.89 7.16C 2.87 6.96 2.86 6.8 2.86 6.67C 2.86 6.53 2.87 6.38 2.89 6.18L 2.98 5.43L 2.39 4.96L 1.67 4.4L 2.13 3.6L 2.98 3.94L 3.68 4.21L 4.28 3.76C 4.56 3.54 4.84 3.39 5.11 3.28L 5.81 2.99L 5.92 2.24L 6.05 1.33L 6.98 1.33L 7.11 2.24L 7.21 2.99L 7.92 3.28C 8.21 3.39 8.47 3.54 8.74 3.74L 9.35 4.21L 10.06 3.93L 10.9 3.59L 11.37 4.4L 10.65 4.96L 10.06 5.43ZM 6.52 4C 5.05 4 3.85 5.2 3.85 6.67C 3.85 8.14 5.05 9.34 6.52 9.34C 7.99 9.34 9.19 8.14 9.19 6.67C 9.19 5.2 7.99 4 6.52 4ZM 6.52 8C 5.79 8 5.19 7.41 5.19 6.67C 5.19 5.93 5.79 5.34 6.52 5.34C 7.26 5.34 7.86 5.93 7.86 6.67C 7.86 7.41 7.26 8 6.52 8ZM 6.52 8'],
};

// ── Copy ──────────────────────────────────────────────────────────────────────
const SHELL_COPY = {
  en: { logo: 'Logo placeholder', home: 'Home', reports: 'Reports', application: 'Application',
        dashboard: 'Dashboard', finance: 'Finance', alerts: 'Alerts', users: 'User management', logs: 'Logs', settings: 'Settings',
        menu: 'Menu', search: 'Search', searchPlaceholder: 'Search...', contrast: 'Toggle dark mode', notifications: 'Notifications',
        noNotifications: 'No notifications yet', profile: 'Profile', logout: 'Log out', poweredBy: 'Powered by',
        roles: { admin: 'Administrator', user: 'User' } },
  es: { logo: 'Logo placeholder', home: 'Inicio', reports: 'Reportes', application: 'Aplicación',
        dashboard: 'Tablero', finance: 'Finanzas', alerts: 'Alertas', users: 'Gestión de usuarios', logs: 'Registros', settings: 'Configuración',
        menu: 'Menú', search: 'Buscar', searchPlaceholder: 'Buscar...', contrast: 'Cambiar modo oscuro', notifications: 'Notificaciones',
        noNotifications: 'Aún no hay notificaciones', profile: 'Perfil', logout: 'Cerrar sesión', poweredBy: 'Desarrollado por',
        roles: { admin: 'Administrador', user: 'Usuario' } },
};

// `roles` limits an entry to those profiles; without it, everyone sees it
const NAV_ITEMS = [
  { id: 'dashboard', label: 'dashboard', icon: 'navDashboard', section: 'home' },
  { id: 'reports',   label: 'finance',   icon: 'navFinance',   section: 'reports' },
  { id: 'alerts',    label: 'alerts',    icon: 'navAlerts',    section: 'application' },
  { id: 'users',     label: 'users',     icon: 'navUsers',     section: 'application', roles: ['admin'] },
  { id: 'logs',      label: 'logs',      icon: 'navLogs',      section: 'application', roles: ['admin'] },
  { id: 'settings',  label: 'settings',  icon: 'navSettings',  section: null },
];
const navItemsFor = (role) => NAV_ITEMS.filter((i) => !i.roles || i.roles.includes(role));
const DEFAULT_USER = { name: 'Juan Perez', email: 'juan.perez@nexity.co', role: 'admin' };

// ── Tokens ────────────────────────────────────────────────────────────────────
// Light values are the ones measured in the Figma file; dark ones reuse the app tokens.
const shellTokens = (dark) => dark
  ? { bg: '#0F172A', surface: '#1E293B', border: '#334155', text: '#F1F5F9', label: '#94A3B8', activeBg: 'rgba(15,145,255,0.16)', activeBorder: 'rgba(15,145,255,0.35)', active: '#5FB3FF', avatar: '#334155', footer: '#94A3B8', lockup: '#F1F5F9' }
  : { bg: '#FAFAFA', surface: '#FFFFFF', border: '#F0F0F0', text: '#262626', label: '#828282', activeBg: '#F0F7FF', activeBorder: '#B9DDFE', active: '#0F91FF', avatar: '#DFEEFF', footer: '#8C8C8C', lockup: null };

// ── Breakpoints ───────────────────────────────────────────────────────────────
// desktop ≥ 1280 · tablet 768–1279 · phone < 768. Same cuts as the CSS below.
const NX_BREAKPOINTS = { tablet: 1280, phone: 768 };
const getBreakpoint = () => {
  const w = window.innerWidth;
  return w < NX_BREAKPOINTS.phone ? 'phone' : w < NX_BREAKPOINTS.tablet ? 'tablet' : 'desktop';
};
const useBreakpoint = () => {
  const [bp, setBp] = React.useState(getBreakpoint);
  React.useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return bp;
};

const SHELL_CSS = `
.nx-shell{min-height:100vh;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;--nx-side:244px}
.nx-shell *{box-sizing:border-box}
.nx-shell.is-collapsed{--nx-side:64px}
.nx-side{position:fixed;top:0;left:0;bottom:0;width:var(--nx-side);display:flex;flex-direction:column;z-index:90;transition:width .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:auto;scrollbar-width:none}
.nx-side::-webkit-scrollbar{display:none}
.nx-side-logo{height:65px;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:0 16px;font:600 16px/20px Inter,sans-serif;color:#6B6A6A;white-space:nowrap;overflow:hidden}
.nx-side-label{margin:11px 0;padding:0 25px;font:400 12px/16px Inter,sans-serif;white-space:nowrap}
.nx-side-label:first-child{margin-top:26px}
.nx-nav-item{display:flex;align-items:center;gap:12px;width:100%;height:44.7px;padding:0 25px;border:0;border-top:1px solid transparent;border-bottom:1px solid transparent;background:transparent;font:400 13px/16px Inter,sans-serif;cursor:pointer;text-align:left;white-space:nowrap;transition:background .15s}
.nx-nav-item:hover{background:var(--nx-hover)}
.nx-nav-item:focus-visible{outline:2px solid #0F91FF;outline-offset:-2px}
.nx-nav-item.is-active{cursor:default}
.nx-nav-icon{width:14px;height:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nx-nav-badge{margin-left:auto;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#0F91FF;color:#fff;font:600 10px/18px Inter,sans-serif;text-align:center}
.nx-top{position:sticky;top:0;z-index:80;height:65px;display:flex;align-items:center;padding:0 37px 0 17px;gap:0;border-bottom:1px solid}
.nx-top-btn{display:flex;align-items:center;justify-content:center;height:44px;padding:0;margin:0;border:0;background:none;cursor:pointer;color:inherit;flex-shrink:0;border-radius:6px}
.nx-top-btn:focus-visible{outline:2px solid #0F91FF;outline-offset:2px}
.nx-top-right{margin-left:auto;display:flex;align-items:center}
.nx-top-user{display:flex;align-items:center;gap:11px;height:44px;padding:0;border:0;background:none;cursor:pointer;font:500 13px/16px Inter,sans-serif;color:inherit}
.nx-top-menu{position:absolute;right:0;top:52px;width:280px;border-radius:12px;border:1px solid;box-shadow:0 12px 40px rgba(0,0,0,.14);z-index:200;overflow:hidden}
.nx-top-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:11px 16px;border:0;background:transparent;font:400 13px/16px Inter,sans-serif;color:inherit;cursor:pointer;text-align:left}
.nx-top-menu button:hover{background:var(--nx-hover)}
.nx-top-search{position:absolute;right:0;top:52px;width:280px;padding:8px;border-radius:12px;border:1px solid;box-shadow:0 12px 40px rgba(0,0,0,.14);z-index:200}
.nx-top-search input{width:100%;height:36px;padding:0 12px;border-radius:8px;border:1px solid;font:400 13px/20px Inter,sans-serif;outline:none;background:transparent;color:inherit}
.nx-body{margin-left:var(--nx-side);min-height:100vh;display:flex;flex-direction:column;transition:margin-left .25s cubic-bezier(.4,0,.2,1)}
.nx-main{flex:1;padding:25px 34px 0;min-width:0}
.nx-main > .nx-animate{display:flex;flex-direction:column}
/* Centred on the whole viewport, not on the content column (as in Figma) */
.nx-foot{display:flex;justify-content:center;align-items:flex-end;gap:5.8px;padding:82px 16px 31px;margin-left:calc(-1 * var(--nx-side));transition:margin-left .25s cubic-bezier(.4,0,.2,1)}
.nx-backdrop{display:none}
/* Inline grids from the older sections collapse instead of squeezing */
@media (max-width:1279px){
  .nx-shell{--nx-side:64px}
  .nx-shell.is-expanded{--nx-side:244px}
  .nx-main [style*="repeat(4"],.nx-main [style*="repeat(3"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media (max-width:767px){
  .nx-shell,.nx-shell.is-expanded{--nx-side:0px}
  .nx-side{width:244px;transform:translateX(-100%);box-shadow:none}
  .nx-shell.is-open .nx-side{transform:none;box-shadow:0 0 40px rgba(0,0,0,.2)}
  .nx-backdrop{display:block;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:85;opacity:0;pointer-events:none;transition:opacity .25s}
  .nx-shell.is-open .nx-backdrop{opacity:1;pointer-events:auto}
  .nx-top{padding:0 16px}
  .nx-top-user span{display:none}
  .nx-top-menu,.nx-top-search{width:min(300px,calc(100vw - 32px))}
  .nx-main{padding:16px 16px 0}
  .nx-main [style*="repeat("],.nx-main [style*="1fr 1fr"]{grid-template-columns:minmax(0,1fr)!important}
  .nx-main table{display:block;overflow-x:auto;max-width:100%}
  .nx-foot{padding:48px 16px 24px}
}
`;

// ── Pieces ────────────────────────────────────────────────────────────────────
const ShellGlyph = ({ name, color, style }) => {
  const [w, h, d] = SHELL_GLYPHS[name];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block', flexShrink: 0, ...style }}>
      <path d={d} fill={color} />
    </svg>
  );
};

// "Powered by Benká Group", same lockup as the login (AUTH_ART, loaded from auth.jsx)
const PoweredBy = ({ t, tk }) => {
  const art = window.AUTH_ART;
  return (
    <div className="nx-foot">
      <span style={{ font: '300 12px/16px Inter, sans-serif', color: tk.footer }}>{t.poweredBy}</span>
      {art && (
        <svg width="118.85" height="14.52" viewBox="0 0 118.85 14.52" role="img" aria-label="Benká Group" style={{ display: 'block', marginBottom: '0.6px' }}>
          {art.lockup.map(([fill, d], i) => <path key={i} d={d} fill={tk.lockup && fill === '#000000' ? tk.lockup : fill} />)}
        </svg>
      )}
    </div>
  );
};

// ── TopBar ────────────────────────────────────────────────────────────────────
const TopBar = ({ onToggleSidebar, onToggleDark, dark, onNavigate, t, tk, notifications = [], user }) => {
  const [open, setOpen] = React.useState(null); // search | notifs | user
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  const toggle = (k) => setOpen((v) => (v === k ? null : k));
  const panel = { background: tk.surface, borderColor: tk.border, color: tk.text };

  return (
    <header className="nx-top" style={{ background: tk.surface, borderColor: tk.border, color: tk.text }}>
      <button className="nx-top-btn" onClick={onToggleSidebar} aria-label={t.menu}>
        <ShellGlyph name="menu" color={tk.text} />
      </button>
      <div className="nx-top-right" ref={wrapRef}>
        <div style={{ position: 'relative' }}>
          <button className="nx-top-btn" onClick={() => toggle('search')} aria-label={t.search} aria-expanded={open === 'search'}>
            <ShellGlyph name="search" color={tk.text} />
          </button>
          {open === 'search' && (
            <div className="nx-top-search" style={panel}>
              <input autoFocus placeholder={t.searchPlaceholder} style={{ borderColor: tk.border }} />
            </div>
          )}
        </div>
        <button className="nx-top-btn" onClick={onToggleDark} aria-label={t.contrast} aria-pressed={dark} style={{ marginLeft: '25px' }}>
          <ShellGlyph name="contrast" color={tk.text} />
        </button>
        <div style={{ position: 'relative', marginLeft: '26px' }}>
          <button className="nx-top-btn" onClick={() => toggle('notifs')} aria-label={`${t.notifications} (${notifications.length})`} aria-expanded={open === 'notifs'} style={{ position: 'relative', width: '25px', justifyContent: 'flex-start' }}>
            <ShellGlyph name="bell" color={tk.text} />
            <span style={{ position: 'absolute', left: '9.5px', top: '4.3px', width: '16px', height: '16px', borderRadius: '50%', background: '#34A5FC', color: '#fff', font: '600 9px/16px Inter, sans-serif', textAlign: 'center' }}>{notifications.length}</span>
          </button>
          {open === 'notifs' && (
            <div className="nx-top-menu" style={panel}>
              <div style={{ padding: '13px 16px', font: '600 13px/16px Inter, sans-serif', borderBottom: `1px solid ${tk.border}` }}>{t.notifications}</div>
              {notifications.length === 0 && <div style={{ padding: '18px 16px', font: '300 13px/18px Inter, sans-serif', color: tk.label }}>{t.noNotifications}</div>}
              {notifications.map((n, i) => (
                <button key={i} style={{ borderBottom: i < notifications.length - 1 ? `1px solid ${tk.border}` : 'none', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ lineHeight: '18px' }}>{n.text}</div>
                    <div style={{ marginTop: '2px', font: '300 11px/14px Inter, sans-serif', color: tk.label }}>{n.time}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: 'relative', marginLeft: '36px' }}>
          <button className="nx-top-user" onClick={() => toggle('user')} aria-expanded={open === 'user'} aria-haspopup="menu">
            <span aria-hidden="true" style={{ display: 'block', width: '32px', height: '32px', borderRadius: '50%', background: tk.avatar, flexShrink: 0 }} />
            <span>{user.name}</span>
          </button>
          {open === 'user' && (
            <div className="nx-top-menu" role="menu" style={{ ...panel, width: '240px' }}>
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${tk.border}` }}>
                <div style={{ font: '600 13px/18px Inter, sans-serif' }}>{user.name}</div>
                <div style={{ font: '300 12px/16px Inter, sans-serif', color: tk.label, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                <div style={{ marginTop: '6px', display: 'inline-block', padding: '1px 8px', borderRadius: '9px', background: tk.activeBg, color: tk.active, font: '500 11px/16px Inter, sans-serif' }}>{t.roles[user.role] || user.role}</div>
              </div>
              <button role="menuitem" onClick={() => setOpen(null)}>{t.profile}</button>
              <button role="menuitem" onClick={() => { setOpen(null); onNavigate('settings'); }}>{t.settings}</button>
              <button role="menuitem" onClick={() => { setOpen(null); if (window.nxLogout) window.nxLogout(); }} style={{ color: '#EF4444' }}>{t.logout}</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ active, onNavigate, iconsOnly, t, tk, badges = {}, role = 'admin' }) => {
  const items = navItemsFor(role);
  const sections = [...new Set(items.filter((i) => i.section).map((i) => i.section))];
  const bottomItems = items.filter((i) => !i.section);
  const NavItem = ({ item }) => {
    const isActive = active === item.id;
    return (
      <button className={`nx-nav-item${isActive ? ' is-active' : ''}`} onClick={() => onNavigate(item.id)} title={iconsOnly ? t[item.label] : undefined}
        aria-current={isActive ? 'page' : undefined}
        style={{ color: isActive ? tk.active : tk.text, background: isActive ? tk.activeBg : undefined, borderColor: isActive ? tk.activeBorder : 'transparent', justifyContent: iconsOnly ? 'center' : 'flex-start', padding: iconsOnly ? 0 : undefined }}>
        <span className="nx-nav-icon"><ShellGlyph name={item.icon} color={isActive ? tk.active : tk.text} /></span>
        {!iconsOnly && <span>{t[item.label]}</span>}
        {!iconsOnly && badges[item.id] && <span className="nx-nav-badge">{badges[item.id]}</span>}
      </button>
    );
  };
  return (
    <aside className="nx-side" style={{ background: tk.surface, borderRight: `1px solid ${tk.border}`, '--nx-hover': tk.bg }} aria-label={t.menu}>
      <div className="nx-side-logo">{iconsOnly ? 'Logo' : t.logo}</div>
      <nav>
        {sections.map((section) => (
          <React.Fragment key={section}>
            {!iconsOnly && <div className="nx-side-label" style={{ color: tk.label }}>{t[section]}</div>}
            {items.filter((i) => i.section === section).map((item) => <NavItem key={item.id} item={item} />)}
          </React.Fragment>
        ))}
        {bottomItems.map((item) => <NavItem key={item.id} item={item} />)}
      </nav>
    </aside>
  );
};

// ── DashboardLayout ───────────────────────────────────────────────────────────
const DashboardLayout = ({ children, active, onNavigate, dark, onToggleDark, badges = {}, lang = 'en', notifications = [], user = DEFAULT_USER }) => {
  const t = SHELL_COPY[lang] || SHELL_COPY.en;
  const tk = shellTokens(dark);
  const bp = useBreakpoint();
  const [collapsed, setCollapsed] = React.useState(false); // desktop: icons only
  const [expanded, setExpanded] = React.useState(false);   // tablet: full labels
  const [open, setOpen] = React.useState(false);           // phone: drawer

  const toggleSidebar = () => {
    if (bp === 'phone') setOpen((v) => !v);
    else if (bp === 'tablet') setExpanded((v) => !v);
    else setCollapsed((v) => !v);
  };
  const navigate = (id) => { setOpen(false); onNavigate(id); };
  React.useEffect(() => { setOpen(false); }, [bp]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const iconsOnly = bp === 'desktop' ? collapsed : bp === 'tablet' ? !expanded : false;
  const cls = ['nx-shell', collapsed && bp === 'desktop' ? 'is-collapsed' : '', expanded && bp === 'tablet' ? 'is-expanded' : '', open ? 'is-open' : ''].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ background: tk.bg, color: tk.text }}>
      <style>{SHELL_CSS}</style>
      <Sidebar active={active} onNavigate={navigate} iconsOnly={iconsOnly} t={t} tk={tk} badges={badges} role={user.role} />
      <div className="nx-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="nx-body">
        <TopBar onToggleSidebar={toggleSidebar} dark={dark} onToggleDark={onToggleDark} onNavigate={navigate} t={t} tk={tk} notifications={notifications} user={user} />
        <main className="nx-main">
          <div key={active} className="nx-animate">
            {children}
          </div>
        </main>
        <PoweredBy t={t} tk={tk} />
      </div>
    </div>
  );
};

Object.assign(window, { TopBar, Sidebar, DashboardLayout, NAV_ITEMS, navItemsFor, DEFAULT_USER, SHELL_COPY, useBreakpoint, getBreakpoint, NX_BREAKPOINTS, shellTokens });
