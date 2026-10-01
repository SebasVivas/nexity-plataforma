
// dashboard.jsx — Dashboard views (empty + with data)

const KPICard = ({ title, value, icon, color, bgColor, change, changeDir, period = 'vs last month' }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const up = changeDir === 'up';
  const trendBg = up ? (dark ? 'rgba(16,185,129,0.15)' : '#ECFDF5') : (dark ? 'rgba(239,68,68,0.15)' : '#FEF2F2');
  const trendColor = up ? '#10B981' : '#EF4444';
  return (
    <Card hover style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color, opacity: 0.9 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: '600', color: tk.textSub, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.25, minWidth: 0 }}>{title}</div>
        <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: '34px', fontWeight: '800', color: tk.text, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 8px', borderRadius: '20px', background: trendBg, color: trendColor, fontWeight: '700' }}>
            {up ? <Icons.TrendingUp size={12} color={trendColor} /> : <Icons.TrendingDown size={12} color={trendColor} />}
            {change}
          </span>
          <span style={{ color: tk.textSub, whiteSpace: 'nowrap' }}>{period}</span>
        </div>
      )}
    </Card>
  );
};

const QuickActionCard = ({ label, icon, color, bgColor, onClick }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: hover ? (dark ? '#273449' : '#F8FAFC') : tk.surface, border: `1px solid ${tk.border}`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', boxShadow: hover ? '0 4px 14px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.06)', transform: hover ? 'translateY(-2px)' : 'none' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <span style={{ fontSize: '12px', fontWeight: '600', color: tk.text }}>{label}</span>
    </button>
  );
};

const ReportItem = ({ name, date, size, type }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const typeColors = { pdf: '#EF4444', xlsx: '#10B981', csv: '#3B82F6' };
  const color = typeColors[type?.toLowerCase()] || '#6B7280';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${tk.border}` }}
      onMouseEnter={e => e.currentTarget.style.background = tk.surface2}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icons.FileText size={18} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: '600', fontSize: '13px', color: tk.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: '11px', color: tk.textSub, marginTop: '2px' }}>{date} · {size}</div>
      </div>
      <Btn variant="secondary" size="sm" icon={<Icons.Download size={13} />}>Download</Btn>
    </div>
  );
};

const ActivityItem = ({ name, action, time }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: `1px solid ${tk.border}` }}>
      <Avatar name={name} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', color: tk.text, lineHeight: 1.4 }}>
          <strong>{name}</strong> {action}
        </div>
        <div style={{ fontSize: '11px', color: tk.textSub, marginTop: '2px' }}>{time}</div>
      </div>
    </div>
  );
};

// ── Home (first time sign in) — Figma page 6 ──────────────────────────────────
// Home icons as drawn in the Figma file (page 6): [width, height, path]
const HOME_GLYPHS = {
  hero: [36.0, 31.53, 'M 4.5 2.25C 4.5 1.01 3.5 0 2.24 0C 1 0 0 1.01 0 2.25L 0 25.9C 0 29.01 2.51 31.53 5.62 31.53L 33.74 31.53C 35 31.53 36 30.52 36 29.27C 36 28.02 35 27.02 33.74 27.02L 5.62 27.02C 5 27.02 4.5 26.51 4.5 25.9ZM 33.08 8.34C 33.97 7.47 33.97 6.04 33.08 5.16C 32.21 4.28 30.78 4.28 29.9 5.16L 22.49 12.58L 18.46 8.54C 17.58 7.65 16.15 7.65 15.28 8.54L 7.41 16.42C 6.52 17.3 6.52 18.72 7.41 19.6C 8.28 20.49 9.71 20.49 10.59 19.6L 16.87 13.32L 20.91 17.36C 21.79 18.24 23.21 18.24 24.09 17.36L 33.09 8.35ZM 33.08 8.34'],
  heroSmall: [16.0, 16.02, 'M 2 1.15C 2 0.52 1.55 0 1 0C 0.44 0 0 0.52 0 1.15L 0 13.16C 0 14.73 1.11 16.02 2.5 16.02L 15 16.02C 15.55 16.02 16 15.5 16 14.87C 16 14.24 15.55 13.73 15 13.73L 2.5 13.73C 2.23 13.73 2 13.47 2 13.16ZM 14.7 4.24C 15.1 3.79 15.1 3.07 14.7 2.62C 14.31 2.17 13.68 2.17 13.29 2.62L 10 6.38L 8.21 4.33C 7.81 3.89 7.18 3.89 6.79 4.33L 3.29 8.34C 2.9 8.79 2.9 9.51 3.29 9.96C 3.68 10.4 4.31 10.4 4.7 9.96L 7.5 6.77L 9.29 8.82C 9.68 9.26 10.32 9.26 10.71 8.82L 14.71 4.24ZM 14.7 4.24'],
  exclam: [2.19, 12.26, 'M 1.97 0.88C 1.97 0.4 1.58 0 1.09 0C 0.61 0 0.22 0.4 0.22 0.88L 0.22 7.88C 0.22 8.37 0.61 8.76 1.09 8.76C 1.58 8.76 1.97 8.37 1.97 7.88ZM 1.09 12.26C 1.39 12.26 1.67 12.14 1.87 11.94C 2.08 11.74 2.19 11.45 2.19 11.17C 2.19 10.87 2.08 10.6 1.87 10.4C 1.67 10.18 1.39 10.07 1.09 10.07C 0.81 10.07 0.52 10.18 0.32 10.4C 0.12 10.6 0 10.87 0 11.17C 0 11.45 0.12 11.74 0.32 11.94C 0.52 12.14 0.81 12.26 1.09 12.26ZM 1.09 12.26'],
  cardSettings: [18.99, 20.01, 'M 18.87 6.51C 18.99 6.84 18.89 7.23 18.62 7.47L 16.93 9.01C 16.96 9.34 16.99 9.67 16.99 10C 16.99 10.34 16.96 10.67 16.93 10.99L 18.62 12.54C 18.89 12.78 18.99 13.16 18.87 13.5C 18.69 13.97 18.49 14.41 18.25 14.84L 18.07 15.15C 17.81 15.58 17.52 15.99 17.2 16.38C 16.97 16.65 16.59 16.75 16.25 16.64L 14.07 15.95C 13.54 16.35 12.97 16.69 12.36 16.95L 11.86 19.17C 11.78 19.53 11.51 19.81 11.15 19.87C 10.62 19.96 10.06 20.01 9.49 20.01C 8.92 20.01 8.37 19.96 7.83 19.87C 7.47 19.81 7.2 19.53 7.12 19.17L 6.63 16.95C 6.02 16.69 5.44 16.35 4.91 15.95L 2.74 16.64C 2.4 16.75 2.01 16.65 1.78 16.38C 1.47 16 1.18 15.59 0.92 15.16L 0.74 14.84C 0.5 14.42 0.29 13.97 0.12 13.51C 0 13.16 0.1 12.78 0.37 12.54L 2.06 11C 2.01 10.67 2 10.34 2 10C 2 9.67 2.01 9.34 2.06 9.01L 0.37 7.47C 0.1 7.23 0 6.84 0.12 6.51C 0.29 6.04 0.5 5.6 0.74 5.17L 0.92 4.85C 1.18 4.43 1.47 4.01 1.78 3.63C 2.01 3.35 2.4 3.26 2.74 3.37L 4.91 4.06C 5.44 3.65 6.02 3.32 6.63 3.06L 7.12 0.84C 7.2 0.48 7.48 0.19 7.84 0.14C 8.37 0.05 8.93 0 9.49 0C 10.06 0 10.62 0.05 11.16 0.14C 11.52 0.19 11.78 0.48 11.87 0.83L 12.36 3.06C 12.97 3.31 13.55 3.65 14.08 4.06L 16.25 3.36C 16.6 3.26 16.97 3.35 17.2 3.62C 17.53 4.01 17.81 4.42 18.07 4.85L 18.25 5.16C 18.49 5.59 18.7 6.04 18.87 6.5ZM 9.49 13.13C 10.32 13.13 11.12 12.8 11.7 12.22C 12.29 11.63 12.62 10.84 12.62 10C 12.62 9.17 12.29 8.38 11.7 7.79C 11.12 7.2 10.32 6.87 9.49 6.87C 8.67 6.87 7.87 7.2 7.29 7.79C 6.7 8.38 6.38 9.17 6.38 10C 6.38 10.84 6.7 11.63 7.29 12.22C 7.87 12.8 8.67 13.13 9.49 13.13ZM 9.49 13.13'],
  cardChart: [20.0, 17.52, 'M 1.25 0C 1.94 0 2.49 0.56 2.49 1.25L 2.49 14.39C 2.49 14.73 2.78 15.01 3.12 15.01L 18.75 15.01C 19.44 15.01 20 15.58 20 16.27C 20 16.96 19.44 17.52 18.75 17.52L 3.12 17.52C 1.4 17.52 0 16.12 0 14.39L 0 1.25C 0 0.56 0.56 0 1.25 0ZM 5 3.75C 5 3.06 5.56 2.5 6.25 2.5L 13.74 2.5C 14.43 2.5 15 3.06 15 3.75C 15 4.45 14.43 5 13.74 5L 6.25 5C 5.56 5 5 4.45 5 3.75ZM 6.25 6.26L 11.25 6.26C 11.94 6.26 12.49 6.82 12.49 7.51C 12.49 8.2 11.94 8.76 11.25 8.76L 6.25 8.76C 5.56 8.76 5 8.2 5 7.51C 5 6.82 5.56 6.26 6.25 6.26ZM 6.25 10.01L 16.25 10.01C 16.94 10.01 17.5 10.57 17.5 11.26C 17.5 11.95 16.94 12.51 16.25 12.51L 6.25 12.51C 5.56 12.51 5 11.95 5 11.26C 5 10.57 5.56 10.01 6.25 10.01ZM 6.25 10.01'],
  cardModules: [20.0, 20.02, 'M 7.5 4.1C 7.5 3.74 7.27 3.42 6.98 3.21C 6.53 2.87 6.26 2.4 6.26 1.88C 6.26 0.85 7.37 0 8.75 0C 10.13 0 11.25 0.85 11.25 1.88C 11.25 2.4 10.98 2.87 10.52 3.21C 10.22 3.42 10 3.74 10 4.1C 10 4.6 10.4 5 10.9 5L 13.12 5C 14.16 5 15 5.85 15 6.88L 15 9.11C 15 9.6 15.4 10.01 15.91 10.01C 16.27 10.01 16.58 9.78 16.79 9.49C 17.13 9.04 17.6 8.76 18.12 8.76C 19.16 8.76 20 9.88 20 11.26C 20 12.64 19.16 13.76 18.12 13.76C 17.6 13.76 17.13 13.48 16.79 13.03C 16.58 12.74 16.27 12.51 15.91 12.51C 15.4 12.51 15 12.92 15 13.42L 15 18.14C 15 19.18 14.16 20.02 13.12 20.02L 10.9 20.02C 10.4 20.02 10 19.61 10 19.11C 10 18.75 10.22 18.44 10.52 18.22C 10.98 17.88 11.25 17.42 11.25 16.89C 11.25 15.85 10.13 15.01 8.75 15.01C 7.37 15.01 6.26 15.85 6.26 16.89C 6.26 17.42 6.53 17.88 6.98 18.22C 7.27 18.44 7.5 18.75 7.5 19.11C 7.5 19.61 7.09 20.02 6.6 20.02L 1.88 20.02C 0.85 20.02 0 19.18 0 18.14L 0 13.42C 0 12.92 0.4 12.51 0.9 12.51C 1.26 12.51 1.58 12.74 1.79 13.03C 2.13 13.48 2.6 13.76 3.12 13.76C 4.16 13.76 5 12.64 5 11.26C 5 9.88 4.16 8.76 3.12 8.76C 2.6 8.76 2.13 9.04 1.79 9.49C 1.58 9.78 1.26 10.01 0.9 10.01C 0.4 10.01 0 9.6 0 9.11L 0 6.88C 0 5.85 0.85 5 1.88 5L 6.6 5C 7.09 5 7.5 4.6 7.5 4.1ZM 7.5 4.1'],
  checklist: [18.09, 15.3, 'M 5.44 0.32C 5.79 0.63 5.81 1.17 5.5 1.51L 2.97 4.32C 2.82 4.5 2.59 4.6 2.36 4.61C 2.13 4.61 1.91 4.52 1.75 4.36L 0.33 2.95C 0.01 2.62 0.01 2.09 0.33 1.76C 0.66 1.43 1.2 1.43 1.53 1.76L 2.3 2.53L 4.24 0.38C 4.55 0.03 5.09 0 5.43 0.31ZM 5.44 5.95C 5.79 6.27 5.81 6.79 5.5 7.14L 2.97 9.95C 2.82 10.13 2.59 10.23 2.36 10.23C 2.13 10.24 1.91 10.15 1.75 9.99L 0.33 8.58C 0 8.25 0 7.72 0.33 7.39C 0.66 7.06 1.2 7.06 1.53 7.39L 2.3 8.17L 4.24 6.01C 4.55 5.67 5.09 5.64 5.43 5.95ZM 7.97 2.36C 7.97 1.73 8.46 1.22 9.09 1.22L 16.96 1.22C 17.58 1.22 18.09 1.73 18.09 2.36C 18.09 2.97 17.58 3.48 16.96 3.48L 9.09 3.48C 8.46 3.48 7.97 2.97 7.97 2.36ZM 7.97 7.99C 7.97 7.36 8.46 6.85 9.09 6.85L 16.96 6.85C 17.58 6.85 18.09 7.36 18.09 7.99C 18.09 8.6 17.58 9.11 16.96 9.11L 9.09 9.11C 8.46 9.11 7.97 8.6 7.97 7.99ZM 5.71 13.61C 5.71 12.99 6.22 12.48 6.84 12.48L 16.96 12.48C 17.58 12.48 18.09 12.99 18.09 13.61C 18.09 14.23 17.58 14.74 16.96 14.74L 6.84 14.74C 6.22 14.74 5.71 14.23 5.71 13.61ZM 1.78 11.92C 2.23 11.92 2.65 12.1 2.97 12.42C 3.28 12.73 3.46 13.16 3.46 13.61C 3.46 14.06 3.28 14.49 2.97 14.8C 2.65 15.12 2.23 15.3 1.78 15.3C 1.32 15.3 0.9 15.12 0.58 14.8C 0.27 14.49 0.09 14.06 0.09 13.61C 0.09 13.16 0.27 12.73 0.58 12.42C 0.9 12.1 1.32 11.92 1.78 11.92ZM 1.78 11.92'],
  check: [10.64, 7.65, 'M 10.35 0.29C 10.64 0.59 10.64 1.06 10.35 1.35L 4.35 7.36C 4.06 7.65 3.59 7.65 3.29 7.36L 0.29 4.35C 0 4.07 0 3.59 0.29 3.29C 0.58 3 1.06 3 1.35 3.29L 3.82 5.77L 9.29 0.29C 9.59 0 10.06 0 10.36 0.29ZM 10.35 0.29'],
};

// ── Copy ──────────────────────────────────────────────────────────────────────
const HOME_COPY = {
  en: {
    welcome: 'Welcome to', intro: "Here you'll see your reports and key indicators organized visually and dynamically. You haven't configured your experience yet.",
    cards: [
      { title: 'Configure Platform', body: 'Go to Settings to customize your experience: upload your logo, select the main color, and create your first custom modules.', btn: 'Go to Settings' },
      { title: 'Create First Report', body: 'Start creating your financial or trading visualizations. You can add data, select the chart type, and preview it before saving.', btn: 'Create Report' },
      { title: 'Add Modules', body: 'Create new modules to organize your indicators by area: Finance, Operations, Strategic Indicators, and more.', btn: 'Add Module' },
    ],
    checklist: 'Getting Started Checklist',
    items: ['Customize your environment (logo, colors, language)', 'Create your first financial report', 'Activate automatic alerts', 'Share reports with your team'],
  },
  es: {
    welcome: 'Bienvenido a', intro: 'Aquí verás tus reportes e indicadores clave organizados de forma visual y dinámica. Todavía no has configurado tu experiencia.',
    cards: [
      { title: 'Configura la plataforma', body: 'Ve a Configuración para personalizar tu experiencia: sube tu logo, elige el color principal y crea tus primeros módulos.', btn: 'Ir a configuración' },
      { title: 'Crea el primer reporte', body: 'Empieza a crear tus visualizaciones financieras o comerciales. Puedes agregar datos, elegir el tipo de gráfico y previsualizarlo antes de guardar.', btn: 'Crear reporte' },
      { title: 'Agrega módulos', body: 'Crea módulos nuevos para organizar tus indicadores por área: finanzas, operaciones, indicadores estratégicos y más.', btn: 'Agregar módulo' },
    ],
    checklist: 'Lista para empezar',
    items: ['Personaliza tu entorno (logo, colores, idioma)', 'Crea tu primer reporte financiero', 'Activa las alertas automáticas', 'Comparte los reportes con tu equipo'],
  },
};

const HOME_CSS = `
.nx-home{border:1px solid var(--nx-line);border-radius:8px;padding:31px 40px 30px;text-align:center}
.nx-home-hero{position:relative;width:200px;height:200px;margin:0 auto}
.nx-home-title{margin:12px 0 0;font:400 36px/40px Inter,sans-serif;letter-spacing:0}
.nx-home-intro{margin:17px auto 0;max-width:560px;font:300 16px/28px Inter,sans-serif}
.nx-home-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:30px;text-align:left}
.nx-home-card{display:flex;flex-direction:column;border:1px solid var(--nx-line);border-radius:8px;padding:24px;min-height:290px}
.nx-home-card h3{margin:16px 0 0;font:500 16px/24px Inter,sans-serif}
.nx-home-card p{margin:14px 0 30px;max-width:262px;font:300 12px/17px Inter,sans-serif}
.nx-home-btn{margin-top:auto;width:180px;max-width:100%;height:40px;border:0;border-radius:6px;background:#0F91FF;color:#fff;font:500 14px/20px Inter,sans-serif;cursor:pointer;transition:background .15s}
.nx-home-btn:hover{background:#0B84EC}
.nx-home-btn:focus-visible,.nx-home-item:focus-visible{outline:2px solid #0F91FF;outline-offset:2px}
.nx-home-check{border:1px solid var(--nx-line);border-radius:8px;padding:24px;margin-top:30px;text-align:left}
.nx-home-check h3{display:flex;align-items:center;gap:9px;margin:0;font:600 18px/24px Inter,sans-serif}
.nx-home-items{display:flex;flex-direction:column;gap:13px;margin:20px 0 0}
.nx-home-item{display:flex;align-items:center;gap:13px;padding:0;border:0;background:none;font:400 14px/19px Inter,sans-serif;color:inherit;cursor:pointer;text-align:left}
.nx-home-box{width:19px;height:19px;border:1px solid #D1D5DB;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s,border-color .15s}
@media (max-width:1279px){.nx-home-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}}
@media (max-width:767px){
  .nx-home{padding:20px 16px 24px}
  .nx-home-hero{transform:scale(.8);margin:-20px auto}
  .nx-home-title{font-size:28px;line-height:34px}
  .nx-home-intro{font-size:15px;line-height:24px}
  .nx-home-grid{grid-template-columns:minmax(0,1fr);gap:16px;margin-top:24px}
  .nx-home-card{min-height:0}
  .nx-home-btn{width:100%}
  .nx-home-check{margin-top:16px;padding:20px 16px}
}
`;

const HomeGlyph = ({ name, color, style }) => {
  const [w, h, d] = HOME_GLYPHS[name];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block', flexShrink: 0, ...style }}>
      <path d={d} fill={color} />
    </svg>
  );
};

// Illustration: gradient ring, white disc with the chart icon, a small disc and the yellow "!" badge
const HomeHero = ({ dark }) => (
  <div className="nx-home-hero" aria-hidden="true">
    <div style={{ position: 'absolute', left: '30px', top: '30px', width: '140px', height: '140px', borderRadius: '50%', background: 'linear-gradient(165deg, #D9EAFA 0%, #B7DBFC 48%, #9FC3E5 100%)', boxShadow: '0 22px 28px -12px rgba(0,0,0,0.10)' }} />
    <div style={{ position: 'absolute', left: '56px', top: '56px', width: '88px', height: '88px', borderRadius: '50%', background: dark ? '#1E293B' : '#FFFFFF', boxShadow: '0 9px 22px rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HomeGlyph name="hero" color="#0F91FF" style={{ marginTop: '-1px' }} />
    </div>
    <div style={{ position: 'absolute', left: '7px', top: '149px', width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(15,145,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HomeGlyph name="heroSmall" color="#0F91FF" />
    </div>
    <div style={{ position: 'absolute', left: '152px', top: '19px', width: '32px', height: '32px', borderRadius: '50%', background: '#FACC15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HomeGlyph name="exclam" color="#FFFFFF" style={{ marginLeft: '-1px' }} />
    </div>
  </div>
);

const HOME_CARDS = [
  { icon: 'cardSettings', color: '#0F91FF', bg: 'rgba(15,145,255,0.1)', to: 'settings' },
  { icon: 'cardChart',    color: '#16A34A', bg: '#DCFCE7', to: 'reports' },
  { icon: 'cardModules',  color: '#9333EA', bg: '#F3E8FF', to: 'settings' },
];

// ── Dashboard (first time sign in) ────────────────────────────────────────────
const DashboardEmpty = ({ onNavigate, lang = 'en' }) => {
  const { dark } = useTheme();
  const t = HOME_COPY[lang] || HOME_COPY.en;
  const c = dark
    ? { line: '#334155', title: '#F1F5F9', body: '#94A3B8', item: '#CBD5E1' }
    : { line: '#E3E6EA', title: '#111827', body: '#4B5563', item: '#374151' };
  const [done, setDone] = React.useState(() => t.items.map(() => false));
  const toggle = (i) => setDone((d) => d.map((v, k) => (k === i ? !v : v)));

  return (
    <div className="nx-home" style={{ '--nx-line': c.line }}>
      <style>{HOME_CSS}</style>
      <HomeHero dark={dark} />
      <h1 className="nx-home-title" style={{ color: c.title }}>{t.welcome} <span style={{ fontWeight: 600 }}>Nexity</span></h1>
      <p className="nx-home-intro" style={{ color: c.body }}>{t.intro}</p>

      <div className="nx-home-grid">
        {HOME_CARDS.map((card, i) => (
          <div key={card.icon} className="nx-home-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HomeGlyph name={card.icon} color={card.color} />
            </div>
            <h3 style={{ color: c.title }}>{t.cards[i].title}</h3>
            <p style={{ color: c.body }}>{t.cards[i].body}</p>
            <button className="nx-home-btn" onClick={() => onNavigate(card.to)}>{t.cards[i].btn}</button>
          </div>
        ))}
      </div>

      <div className="nx-home-check">
        <h3 style={{ color: c.title }}><HomeGlyph name="checklist" color="#0F91FF" />{t.checklist}</h3>
        <div className="nx-home-items" role="list">
          {t.items.map((label, i) => (
            <button key={i} className="nx-home-item" role="listitem" aria-pressed={done[i]} onClick={() => toggle(i)} style={{ color: done[i] ? c.body : c.item, textDecoration: done[i] ? 'line-through' : 'none' }}>
              <span className="nx-home-box" style={done[i] ? { background: '#0F91FF', borderColor: '#0F91FF' } : undefined}>
                <HomeGlyph name="check" color={done[i] ? '#FFFFFF' : '#9CA3AF'} />
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Dashboard (with data) ─────────────────────────────────────────────────────
const DashboardData = ({ onNavigate }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const kpis = [
    { title: 'Active Users', value: '1', icon: <Icons.Users size={20} color="#059669" />, color: '#10B981', bgColor: '#ECFDF5', change: '+1', changeDir: 'up', period: 'vs last month' },
    { title: 'Total Reports', value: '25', icon: <Icons.BarChart2 size={20} color="#2563EB" />, color: '#2563EB', bgColor: '#EFF6FF', change: '+5', changeDir: 'up', period: 'vs last month' },
    { title: 'Total Alerts', value: '12', icon: <Icons.Bell size={20} color="#DC2626" />, color: '#EF4444', bgColor: '#FEF2F2', change: '+3', changeDir: 'up', period: 'today' },
    { title: 'Total Activity', value: '142', icon: <Icons.Activity size={20} color="#D97706" />, color: '#F59E0B', bgColor: '#FFFBEB', change: '+18%', changeDir: 'up', period: 'today' },
  ];
  const quickActions = [
    { label: 'New Report', icon: <Icons.Plus size={20} color="#2563EB" />, bgColor: '#EFF6FF', onClick: () => onNavigate('reports') },
    { label: 'Import Data', icon: <Icons.Upload size={20} color="#7C3AED" />, bgColor: '#F5F3FF', onClick: () => {} },
    { label: 'Settings', icon: <Icons.Settings size={20} color="#059669" />, bgColor: '#ECFDF5', onClick: () => onNavigate('settings') },
    { label: 'Share Report', icon: <Icons.Share size={20} color="#D97706" />, bgColor: '#FFFBEB', onClick: () => {} },
  ];
  const reports = [
    { name: 'Q4 Financial Report', date: 'Dec 15, 2024', size: '2.3 MB', type: 'pdf' },
    { name: 'Revenue Trends Q3', date: 'Nov 10, 2024', size: '1.1 MB', type: 'xlsx' },
    { name: 'Expense Breakdown', date: 'Oct 28, 2024', size: '890 KB', type: 'csv' },
  ];
  const activities = [
    { name: 'John Doe', action: 'created a new report Q4 Financial Overview', time: '2 hours ago' },
    { name: 'Sarah Wilson', action: 'updated indicator Revenue Target', time: '5 hours ago' },
    { name: 'Mike Johnson', action: 'logged into the system', time: '1 day ago' },
    { name: 'Emily Davis', action: 'modified user permissions', time: '2 days ago' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Hero banner */}
      <div style={{ borderRadius: '16px', padding: '26px 30px', background: 'linear-gradient(115deg, #0B2FD6 0%, #0F7FFF 70%, #2A9BFF 100%)', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-30px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-90px', right: '120px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '500', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Icons.Clock size={14} color="rgba(255,255,255,0.85)" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h2 style={{ margin: '6px 0 0', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em' }}>Good to see you, John</h2>
          <p style={{ margin: '6px 0 0', fontSize: '14px', opacity: 0.9, maxWidth: '460px', lineHeight: 1.5 }}>Here's a real-time snapshot of your key indicators and recent activity across the platform.</p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button onClick={() => onNavigate('reports')} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '9px', border: 'none', background: '#fff', color: '#0B2FD6', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}><Icons.Plus size={15} color="#0B2FD6" />New Report</button>
          <button onClick={() => onNavigate('settings')} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '9px', border: '1.5px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}><Icons.Settings size={15} color="#fff" />Configure</button>
        </div>
      </div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {kpis.map((k, i) => <KPICard key={i} {...k} />)}
      </div>
      {/* Quick Actions */}
      <div>
        <div style={{ fontWeight: '700', fontSize: '15px', color: tk.text, marginBottom: '12px' }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {quickActions.map((a, i) => <QuickActionCard key={i} {...a} />)}
        </div>
      </div>
      {/* Recent content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '16px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ fontWeight: '700', fontSize: '15px', color: tk.text }}>Recent Reports</div>
            <button onClick={() => onNavigate('reports')} style={{ background: 'none', border: 'none', color: '#0F7FFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>Download all</button>
          </div>
          {reports.map((r, i) => <ReportItem key={i} {...r} />)}
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ fontWeight: '700', fontSize: '15px', color: tk.text }}>Recent Activity</div>
            <button style={{ background: 'none', border: 'none', color: '#0F7FFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>View all</button>
          </div>
          {activities.map((a, i) => <ActivityItem key={i} {...a} />)}
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { DashboardEmpty, DashboardData, KPICard });
