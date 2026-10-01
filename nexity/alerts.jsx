
// alerts.jsx — Alerts module

const ALERT_DATA = [
  { id:1, severity:'critical', module:'Finances', time:'2 minutes ago', title:'Revenue Target Threshold Exceeded', desc:'Monthly revenue has dropped below 85% of target threshold. Current: $847,500 | Target: $1,000,000', trigger:'System monitoring', read:false },
  { id:2, severity:'high', module:'Commercial', time:'15 minutes ago', title:'Sales Conversion Rate Alert', desc:'Weekly conversion rate has fallen to 2.1%, below the 3.5% threshold for optimal performance', trigger:'Sales Team Lead', read:false },
  { id:3, severity:'resolved', module:'System', time:'1 hour ago', title:'Data Sync Issue Resolved', desc:'Financial data synchronization between modules has been restored successfully', trigger:'System Administrator', read:true },
  { id:4, severity:'medium', module:'Operations', time:'3 hours ago', title:'Inventory Level Warning', desc:'Product SKU #4567 inventory has reached minimum threshold of 50 units', trigger:'Inventory Manager', read:true },
  { id:5, severity:'critical', module:'Finances', time:'5 hours ago', title:'Cash Flow Alert', desc:'Operating cash flow is 20% below projected levels for this quarter', trigger:'Finance Director', read:true },
];

const sevConfig = {
  critical: { label:'Critical', variant:'critical', color:'#DC2626', bg:'#FEF2F2' },
  high:     { label:'High',     variant:'high',     color:'#EA580C', bg:'#FFF7ED' },
  medium:   { label:'Medium',   variant:'warning',  color:'#D97706', bg:'#FFFBEB' },
  low:      { label:'Low',      variant:'low',      color:'#059669', bg:'#ECFDF5' },
  resolved: { label:'Resolved', variant:'resolved', color:'#059669', bg:'#ECFDF5' },
};

const AlertsEmpty = ({ onCreateAlert }) => (
  <div style={{ display:'flex',flexDirection:'column',gap:'24px' }}>
    <EmptyState
      icon={<Icons.Bell size={32} color="#0F7FFF"/>}
      title="You have not yet created alerts"
      description="Alerts help you stay on top of important changes in your metrics. Set up conditions so the system automatically notifies you when something relevant occurs."
      action={onCreateAlert} actionLabel="Create Alert"
    />
    <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px' }}>
      {[
        { icon:<Icons.BarChart2 size={22} color="#2563EB"/>, bg:'#EFF6FF', title:'Apply to any metric', desc:'Monitor any indicator in your reports and modules' },
        { icon:<Icons.AlertTriangle size={22} color="#D97706"/>, bg:'#FFFBEB', title:'Define custom conditions', desc:'Set thresholds and rules that fit your business needs' },
        { icon:<Icons.Mail size={22} color="#059669"/>, bg:'#ECFDF5', title:'Receive notifications', desc:'Get alerts by email or within the system' },
      ].map((f,i)=>(
        <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'10px',textAlign:'center',alignItems:'center' }}>
          <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:f.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>{f.icon}</div>
          <div style={{ fontWeight:'700',fontSize:'14px' }}>{f.title}</div>
          <div style={{ fontSize:'12px',lineHeight:1.5 }}>{f.desc}</div>
        </Card>
      ))}
    </div>
  </div>
);

const AlertsFilled = ({ empty }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [page, setPage] = React.useState(1);
  const [sevFilter, setSevFilter] = React.useState('all');
  const [alerts, setAlerts] = React.useState(ALERT_DATA);

  const kpis = [
    { label:'Active Alerts', value:'47', sub:'+5 new', icon:<Icons.AlertTriangle size={20} color="#DC2626"/>, bg:'#FEF2F2' },
    { label:'Critical Alerts', value:'12', sub:'Immediate action', icon:<Icons.Zap size={20} color="#DC2626"/>, bg:'#FEF2F2' },
    { label:'Resolved Today', value:'23', sub:'Good progress', icon:<Icons.CheckCircle size={20} color="#059669"/>, bg:'#ECFDF5' },
    { label:'Response Time', value:'2.3h', sub:'Average', icon:<Icons.Clock size={20} color="#2563EB"/>, bg:'#EFF6FF' },
  ];

  const filtered = alerts.filter(a => sevFilter === 'all' || a.severity === sevFilter);

  const markResolved = id => setAlerts(prev => prev.map(a => a.id===id ? {...a, severity:'resolved', read:true} : a));
  const dismiss = id => setAlerts(prev => prev.filter(a => a.id!==id));

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
      {/* KPI row */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px' }}>
        {kpis.map((k,i)=>(
          <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <span style={{ fontSize:'12px',fontWeight:'600',color:tk.textSub,textTransform:'uppercase',letterSpacing:'0.04em' }}>{k.label}</span>
              <div style={{ width:'34px',height:'34px',borderRadius:'9px',background:k.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>{k.icon}</div>
            </div>
            <div style={{ fontSize:'28px',fontWeight:'800',color:tk.text,letterSpacing:'-0.03em' }}>{k.value}</div>
            <div style={{ fontSize:'12px',color:tk.textSub }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Filters + list */}
      <Card padding="0" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 16px',display:'flex',gap:'10px',alignItems:'center',borderBottom:`1px solid ${tk.border}`,flexWrap:'wrap' }}>
          <select value={sevFilter} onChange={e=>setSevFilter(e.target.value)} style={{ padding:'7px 12px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',cursor:'pointer' }}>
            {[['all','All Severity'],['critical','Critical'],['high','High'],['medium','Medium'],['resolved','Resolved']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          {['All Modules','Finances','Commercial','Operations','System'].map(m=>(
            <button key={m} style={{ padding:'7px 12px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.textSub,fontSize:'13px',fontFamily:'inherit',cursor:'pointer' }}>{m}</button>
          )).slice(0,2)}
          <div style={{ flex:1 }}/>
          <button style={{ background:'none',border:'none',color:'#0F7FFF',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'inherit' }}>Mark All Read</button>
          <Btn icon={<Icons.Plus size={15}/>}>Create Alert</Btn>
        </div>

        {empty ? (
          <div style={{ padding:'48px 24px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:'14px' }}>
            <div style={{ width:'56px',height:'56px',borderRadius:'50%',background:'#ECFDF5',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.CheckCircle size={28} color="#059669"/></div>
            <div style={{ fontWeight:'700',fontSize:'17px',color:tk.text }}>No Alerts at the Moment</div>
            <div style={{ fontSize:'13px',color:tk.textSub,maxWidth:'400px',lineHeight:1.6 }}>Great news! There are currently no active alerts in your system. All indicators are running smoothly within their configured thresholds.</div>
            <div style={{ display:'flex',gap:'8px' }}>
              <Badge label="✓ All systems operational" variant="success" size="lg" />
              <Badge label="◎ Monitoring active" variant="info" size="lg" />
            </div>
            <Btn icon={<Icons.Plus size={15}/>}>Create New Alert</Btn>
          </div>
        ) : (
          <>
            {filtered.map((a,i)=>{
              const sc = sevConfig[a.severity]||sevConfig.medium;
              return (
                <div key={a.id} style={{ padding:'16px 20px',borderBottom:`1px solid ${tk.border}`,display:'flex',gap:'14px',alignItems:'flex-start',opacity:a.read?0.75:1,background:a.read?'transparent':dark?'rgba(15,127,255,0.04)':'rgba(15,127,255,0.02)' }}
                  onMouseEnter={e=>e.currentTarget.style.background=tk.surface2}
                  onMouseLeave={e=>e.currentTarget.style.background=a.read?'transparent':dark?'rgba(15,127,255,0.04)':'rgba(15,127,255,0.02)'}>
                  {!a.read && <div style={{ width:'7px',height:'7px',borderRadius:'50%',background:sc.color,flexShrink:0,marginTop:'6px' }}/>}
                  <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:sc.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <Icons.AlertTriangle size={18} color={sc.color}/>
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px',flexWrap:'wrap' }}>
                      <Badge label={sc.label} variant={sc.variant} dot />
                      <Badge label={a.module} variant="default" />
                      <span style={{ fontSize:'11px',color:tk.textSub }}>{a.time}</span>
                    </div>
                    <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text,marginBottom:'4px' }}>{a.title}</div>
                    <div style={{ fontSize:'12px',color:tk.textSub,lineHeight:1.5,marginBottom:'6px' }}>{a.desc}</div>
                    <div style={{ fontSize:'11px',color:tk.textSub }}>Triggered by <strong>{a.trigger}</strong></div>
                  </div>
                  <div style={{ display:'flex',gap:'4px',flexShrink:0 }}>
                    <button title="View" style={{ background:'none',border:'none',cursor:'pointer',color:tk.textSub,padding:'6px',borderRadius:'6px',display:'flex' }}
                      onMouseEnter={e=>e.currentTarget.style.background=tk.surface2} onMouseLeave={e=>e.currentTarget.style.background='none'}><Icons.Eye size={15}/></button>
                    {a.severity!=='resolved'&&<button title="Resolve" onClick={()=>markResolved(a.id)} style={{ background:'none',border:'none',cursor:'pointer',color:'#059669',padding:'6px',borderRadius:'6px',display:'flex' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#ECFDF5'} onMouseLeave={e=>e.currentTarget.style.background='none'}><Icons.Check size={15}/></button>}
                    <button title="Dismiss" onClick={()=>dismiss(a.id)} style={{ background:'none',border:'none',cursor:'pointer',color:'#DC2626',padding:'6px',borderRadius:'6px',display:'flex' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#FEF2F2'} onMouseLeave={e=>e.currentTarget.style.background='none'}><Icons.X size={15}/></button>
                  </div>
                </div>
              );
            })}
            <Pagination page={page} total={filtered.length} perPage={4} onChange={setPage}/>
          </>
        )}
      </Card>
    </div>
  );
};

Object.assign(window, { AlertsEmpty, AlertsFilled });
