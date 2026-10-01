
// ui.jsx — Atomic UI components for Nexity
// Requires: icons.jsx loaded first

// ── Theme context ─────────────────────────────────────────────────────────────
const ThemeContext = React.createContext({ dark: false, primary: '#0F7FFF' });
const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children, dark, primary = '#0F7FFF' }) => (
  <ThemeContext.Provider value={{ dark, primary }}>
    {children}
  </ThemeContext.Provider>
);

// ── Tokens ────────────────────────────────────────────────────────────────────
const t = (dark, overrides = {}) => ({
  bg:        dark ? '#0F172A' : '#F3F4F6',
  surface:   dark ? '#1E293B' : '#FFFFFF',
  surface2:  dark ? '#273449' : '#F8FAFC',
  border:    dark ? '#334155' : '#E5E7EB',
  text:      dark ? '#F1F5F9' : '#1F2937',
  textSub:   dark ? '#94A3B8' : '#6B7280',
  ...overrides,
});

// ── Button ────────────────────────────────────────────────────────────────────
const Btn = ({ children, variant = 'primary', size = 'md', onClick, disabled, loading, icon, style: s = {}, fullWidth }) => {
  const { dark, primary } = useTheme();
  const [hover, setHover] = React.useState(false);
  const sizes = { sm: { padding: '6px 12px', fontSize: '12px', gap: '5px' }, md: { padding: '9px 18px', fontSize: '13px', gap: '7px' }, lg: { padding: '12px 24px', fontSize: '15px', gap: '9px' } };
  const sz = sizes[size];
  const variants = {
    primary:   { background: disabled ? '#93C5FD' : hover ? '#0A6AE8' : primary, color: '#fff', border: 'none' },
    secondary: { background: hover ? (dark ? '#334155' : '#F1F5F9') : (dark ? '#1E293B' : '#fff'), color: dark ? '#CBD5E1' : '#374151', border: `1px solid ${dark ? '#475569' : '#D1D5DB'}` },
    danger:    { background: hover ? '#DC2626' : '#EF4444', color: '#fff', border: 'none' },
    ghost:     { background: hover ? (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)') : 'transparent', color: dark ? '#94A3B8' : '#6B7280', border: 'none' },
    success:   { background: hover ? '#059669' : '#10B981', color: '#fff', border: 'none' },
    purple:    { background: hover ? '#7C3AED' : '#8B5CF6', color: '#fff', border: 'none' },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={disabled || loading ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: sz.gap, padding: sz.padding, fontSize: sz.fontSize, fontWeight: '600', fontFamily: 'inherit', borderRadius: '8px', cursor: disabled || loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s', opacity: disabled ? 0.55 : 1, width: fullWidth ? '100%' : undefined, justifyContent: fullWidth ? 'center' : undefined, whiteSpace: 'nowrap', ...v, ...s }}>
      {loading ? <SpinnerInline /> : icon}
      {children}
    </button>
  );
};

const SpinnerInline = () => (
  <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite', flexShrink: 0, display: 'inline-block' }} />
);

// ── Input ─────────────────────────────────────────────────────────────────────
const NxInput = ({ label, placeholder, value, onChange, type = 'text', error, helper, icon, disabled, style: s = {} }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...s }}>
      {label && <label style={{ fontSize: '13px', fontWeight: '600', color: error ? '#EF4444' : tk.text }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: tk.textSub, display: 'flex' }}>{icon}</span>}
        <input type={type} value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', padding: icon ? '9px 12px 9px 34px' : '9px 12px', borderRadius: '8px', border: `1.5px solid ${error ? '#EF4444' : focused ? '#0F7FFF' : tk.border}`, background: tk.surface, color: tk.text, fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxShadow: focused && !error ? '0 0 0 3px rgba(15,127,255,0.12)' : 'none', transition: 'all 0.15s', boxSizing: 'border-box' }} />
      </div>
      {(error || helper) && <span style={{ fontSize: '12px', color: error ? '#EF4444' : tk.textSub }}>{error || helper}</span>}
    </div>
  );
};

// ── Select ────────────────────────────────────────────────────────────────────
const NxSelect = ({ label, value, onChange, options = [], style: s = {} }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...s }}>
      {label && <label style={{ fontSize: '13px', fontWeight: '600', color: tk.text }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '9px 12px', borderRadius: '8px', border: `1.5px solid ${tk.border}`, background: tk.surface, color: tk.text, fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', boxSizing: 'border-box', width: '100%' }}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
};

// ── Badge ─────────────────────────────────────────────────────────────────────
const Badge = ({ label, variant = 'default', size = 'sm', dot }) => {
  const palettes = {
    success: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    danger:  { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
    warning: { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
    info:    { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
    purple:  { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
    default: { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
    critical:{ bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
    medium:  { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
    low:     { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    resolved:{ bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    draft:   { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
    active:  { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
    archived:{ bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
    admin:   { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
    user:    { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' },
    suspended:{ bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
    high:    { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  };
  const p = palettes[variant] || palettes.default;
  const sz = size === 'lg' ? { padding: '4px 12px', fontSize: '13px' } : { padding: '2px 9px', fontSize: '11px' };
  return (
    <span style={{ ...sz, borderRadius: '20px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px', ...p, border: `1px solid ${p.border}`, whiteSpace: 'nowrap' }}>
      {dot && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />}
      {label}
    </span>
  );
};

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ name = '?', size = 36, src }) => {
  const colors = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EF4444','#06B6D4','#EC4899'];
  const idx = name.charCodeAt(0) % colors.length;
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  return src
    ? <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
    : <div style={{ width: size, height: size, borderRadius: '50%', background: `linear-gradient(135deg, ${colors[idx]}, ${colors[(idx+2)%colors.length]})`, color: '#fff', fontSize: size * 0.35, fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{initials}</div>;
};

// ── Card ──────────────────────────────────────────────────────────────────────
const Card = ({ children, style: s = {}, padding = '20px', onClick, hover: hoverEffect = false }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => hoverEffect && setHover(true)}
      onMouseLeave={() => hoverEffect && setHover(false)}
      style={{ background: tk.surface, borderRadius: '12px', border: `1px solid ${tk.border}`, padding, boxShadow: hover ? (dark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 8px 28px rgba(15,127,255,0.12)') : (dark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.06)'), transition: 'box-shadow 0.2s, transform 0.2s', transform: hover ? 'translateY(-2px)' : 'none', cursor: onClick ? 'pointer' : 'default', ...s }}>
      {children}
    </div>
  );
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = ({ style: s = {} }) => {
  const { dark } = useTheme();
  return <div style={{ height: '1px', background: t(dark).border, ...s }} />;
};

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = ({ size = 40, color = '#0F7FFF' }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', border: `3px solid rgba(15,127,255,0.15)`, borderTopColor: color, animation: 'spin 0.7s linear infinite' }} />
);

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => {
  const icons = { success: <Icons.CheckCircle size={18} color="#059669" />, error: <Icons.XCircle size={18} color="#DC2626" />, info: <Icons.Info size={18} color="#2563EB" /> };
  const colors = { success: '#ECFDF5', error: '#FEF2F2', info: '#EFF6FF' };
  React.useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, background: colors[type], border: `1px solid ${type === 'success' ? '#A7F3D0' : type === 'error' ? '#FECACA' : '#BFDBFE'}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: '280px', animation: 'slideUp 0.3s ease' }}>
      {icons[type]}
      <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' }}><Icons.X size={14} /></button>
    </div>
  );
};

// ── EmptyState ────────────────────────────────────────────────────────────────
const EmptyState = ({ icon, title, description, action, actionLabel, secondaryAction, secondaryLabel }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', gap: '16px' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: tk.text }}>{title}</h3>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: tk.textSub, maxWidth: '420px', lineHeight: 1.6 }}>{description}</p>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {action && <Btn onClick={action}>{actionLabel}</Btn>}
        {secondaryAction && <Btn variant="secondary" onClick={secondaryAction}>{secondaryLabel}</Btn>}
      </div>
    </div>
  );
};

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ page, total, perPage = 6, onChange }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const totalPages = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: `1px solid ${tk.border}` }}>
      <span style={{ fontSize: '12px', color: tk.textSub }}>Showing {from}–{to} of {total}</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        <Btn variant="secondary" size="sm" onClick={() => onChange(page - 1)} disabled={page <= 1}><Icons.ChevronLeft size={14} />Previous</Btn>
        {[...Array(Math.min(totalPages, 5))].map((_, i) => (
          <button key={i} onClick={() => onChange(i + 1)} style={{ width: '32px', height: '32px', borderRadius: '7px', border: `1px solid ${page === i+1 ? '#0F7FFF' : tk.border}`, background: page === i+1 ? '#0F7FFF' : tk.surface, color: page === i+1 ? '#fff' : tk.textSub, fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>{i + 1}</button>
        ))}
        <Btn variant="secondary" size="sm" onClick={() => onChange(page + 1)} disabled={page >= totalPages}>Next<Icons.ChevronRight size={14} /></Btn>
      </div>
    </div>
  );
};

// ── ProgressBar ───────────────────────────────────────────────────────────────
const ProgressBar = ({ value = 0, color = '#0F7FFF', label, animated }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    {label && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
      <span>{label}</span><span style={{ fontWeight: '700', color }}>{value}%</span>
    </div>}
    <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: '4px', transition: 'width 0.8s ease', animation: animated ? 'pulse 2s ease infinite' : 'none' }} />
    </div>
  </div>
);

// ── Toggle ────────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', background: checked ? '#0F7FFF' : '#D1D5DB', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
    <span style={{ position: 'absolute', top: '3px', left: checked ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
  </button>
);

// ── Checkbox ──────────────────────────────────────────────────────────────────
const Checkbox = ({ checked, onChange, label, style: s = {} }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', ...s }}>
    <div onClick={() => onChange(!checked)} style={{ width: '18px', height: '18px', borderRadius: '5px', border: `2px solid ${checked ? '#0F7FFF' : '#D1D5DB'}`, background: checked ? '#0F7FFF' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', transition: 'all 0.15s' }}>
      {checked && <Icons.Check size={12} color="#fff" />}
    </div>
    {label}
  </label>
);

// Global animation style
const globalStyle = document.createElement('style');
globalStyle.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
  @keyframes nxFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
  @media (prefers-reduced-motion: no-preference) {
    .nx-animate > div > * { animation: nxFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) backwards; }
    .nx-animate > div > *:nth-child(1) { animation-delay: 0.02s; }
    .nx-animate > div > *:nth-child(2) { animation-delay: 0.09s; }
    .nx-animate > div > *:nth-child(3) { animation-delay: 0.16s; }
    .nx-animate > div > *:nth-child(4) { animation-delay: 0.23s; }
    .nx-animate > div > *:nth-child(5) { animation-delay: 0.30s; }
    .nx-animate > div > *:nth-child(6) { animation-delay: 0.37s; }
  }
  * { box-sizing: border-box; }
`;
document.head.appendChild(globalStyle);

Object.assign(window, { ThemeProvider, useTheme, t, Btn, NxInput, NxSelect, Badge, Avatar, Card, Divider, Spinner, SpinnerInline, Toast, EmptyState, Pagination, ProgressBar, Toggle, Checkbox });
