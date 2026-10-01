
// logs.jsx — Activity logs module

const LOGS_DATA = [
  { id:1, dt:'2024-01-15 14:32:18', user:'Sarah Wilson',    role:'admin', module:'Finances',         action:'update', desc:'Updated indicator ID #1234: value changed from 75 to 80', ip:'192.168.1.105', status:'success' },
  { id:2, dt:'2024-01-15 14:28:45', user:'Mike Johnson',    role:'user',  module:'Dashboard',        action:'login',  desc:'User logged into the system', ip:'10.0.0.24', status:'success' },
  { id:3, dt:'2024-01-15 14:25:12', user:'Emily Davis',     role:'admin', module:'User Management',  action:'change', desc:'Modified user permissions for john.doe@benka.com', ip:'192.168.1.87', status:'success' },
  { id:4, dt:'2024-01-15 14:20:33', user:'David Chen',      role:'user',  module:'Data Entry',       action:'create', desc:'Created new financial indicator for Q4 revenue', ip:'172.16.0.15', status:'success' },
  { id:5, dt:'2024-01-15 14:15:08', user:'Alex Turner',     role:'user',  module:'Settings',         action:'delete', desc:'Attempted to delete protected system setting', ip:'203.0.113.42', status:'failure' },
  { id:6, dt:'2024-01-15 14:12:56', user:'Lisa Rodriguez',  role:'admin', module:'Commercial',       action:'update', desc:'Updated sales targets for Q1 2024', ip:'192.168.1.203', status:'failure' },
];

const actionConfig = {
  update: { label:'Update', color:'#059669', bg:'#ECFDF5' },
  login:  { label:'Login',  color:'#2563EB', bg:'#EFF6FF' },
  change: { label:'Change', color:'#7C3AED', bg:'#F5F3FF' },
  create: { label:'Create', color:'#D97706', bg:'#FFFBEB' },
  delete: { label:'Delete', color:'#DC2626', bg:'#FEF2F2' },
  logout: { label:'Logout', color:'#6B7280', bg:'#F3F4F6' },
};

const LogsEmpty = () => {
  const { dark } = useTheme();
  const tk = t(dark);
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'24px' }}>
      <EmptyState
        icon={<Icons.Clock size={32} color="#0F7FFF"/>}
        title="No activity recorded yet"
        description="Here you will see a detailed log of user actions, system errors, indicator changes, and other important activities."
        action={()=>{}} actionLabel="Explore the Platform"
        secondaryAction={()=>{}} secondaryLabel="Configure Activity Alerts"
      />
      <Card style={{ background:dark?'#1a2a3e':'#EFF6FF',border:`1px solid ${dark?'#2a3f5f':'#BFDBFE'}` }}>
        <div style={{ display:'flex',gap:'12px',alignItems:'flex-start' }}>
          <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:'#DBEAFE',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><Icons.Info size={18} color="#2563EB"/></div>
          <div>
            <div style={{ fontWeight:'700',fontSize:'14px',color:dark?'#93C5FD':'#1E40AF' }}>What are Activity Logs?</div>
            <div style={{ fontSize:'13px',color:dark?'#60A5FA':'#3B82F6',marginTop:'6px',lineHeight:1.6 }}>The Logs section allows you to audit important events in the platform: who did what, when, and from where. It is useful for tracking changes, debugging errors, or strengthening traceability. Once activity begins, you'll see detailed records of user logins, data modifications, report generations, and system events.</div>
          </div>
        </div>
      </Card>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px' }}>
        {[
          { icon:<Icons.Users size={22} color="#2563EB"/>, bg:'#EFF6FF', title:'User Activity', desc:'Track login sessions, data entries, and user interactions' },
          { icon:<Icons.Edit size={22} color="#7C3AED"/>, bg:'#F5F3FF', title:'Data Changes', desc:'Monitor indicator updates and data modifications' },
          { icon:<Icons.AlertTriangle size={22} color="#D97706"/>, bg:'#FFFBEB', title:'System Events', desc:'View errors, alerts, and system notifications' },
        ].map((f,i)=>(
          <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'10px',alignItems:'center',textAlign:'center' }}>
            <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:f.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>{f.icon}</div>
            <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text }}>{f.title}</div>
            <div style={{ fontSize:'12px',color:tk.textSub,lineHeight:1.5 }}>{f.desc}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const LogsFilled = () => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [page, setPage] = React.useState(1);
  const [actionFilter, setActionFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [refreshing, setRefreshing] = React.useState(false);
  const PER = 6;

  const kpis = [
    { label:'Total Activities', value:'2,847', sub:'+12% today', icon:<Icons.Activity size={20} color="#2563EB"/>, bg:'#EFF6FF' },
    { label:'Active Users',     value:'20',    sub:'Online now', icon:<Icons.Users size={20} color="#059669"/>,   bg:'#ECFDF5' },
    { label:'Failed Actions',   value:'23',    sub:'Last 24h',   icon:<Icons.XCircle size={20} color="#DC2626"/>, bg:'#FEF2F2' },
    { label:'Success Rate',     value:'98.2%', sub:'Excellent',  icon:<Icons.CheckCircle size={20} color="#D97706"/>, bg:'#FFFBEB' },
  ];

  const filtered = LOGS_DATA
    .filter(l => actionFilter==='all' || l.action===actionFilter)
    .filter(l => statusFilter==='all' || l.status===statusFilter);
  const paged = filtered.slice((page-1)*PER, page*PER);

  const handleRefresh = () => { setRefreshing(true); setTimeout(()=>setRefreshing(false),1200); };

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

      {/* Logs table */}
      <Card padding="0" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 16px',display:'flex',gap:'10px',alignItems:'center',borderBottom:`1px solid ${tk.border}`,flexWrap:'wrap' }}>
          <div style={{ fontWeight:'700',fontSize:'15px',color:tk.text,flex:1 }}>Activity Log Details</div>
          <select value={actionFilter} onChange={e=>setActionFilter(e.target.value)} style={{ padding:'7px 10px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',cursor:'pointer' }}>
            {[['all','All Actions'],['login','Login'],['update','Update'],['create','Create'],['delete','Delete'],['change','Change']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ padding:'7px 10px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',cursor:'pointer' }}>
            {[['all','All Status'],['success','Success'],['failure','Failure']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <Btn variant="secondary" size="sm" icon={<Icons.Download size={14}/>}>Export</Btn>
          <Btn size="sm" loading={refreshing} onClick={handleRefresh} icon={<Icons.RefreshCw size={14}/>}>Refresh</Btn>
        </div>

        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',minWidth:'900px' }}>
            <thead>
              <tr style={{ background:tk.surface2 }}>
                {['Date & Time','User','Role','Module','Action','Description','IP Address','Status'].map(h=>(
                  <th key={h} style={{ padding:'10px 12px',textAlign:'left',fontSize:'10px',fontWeight:'700',color:tk.textSub,textTransform:'uppercase',letterSpacing:'0.04em',borderBottom:`1px solid ${tk.border}`,whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((log,i)=>{
                const ac = actionConfig[log.action]||actionConfig.update;
                return (
                  <tr key={log.id} style={{ background:i%2===0?tk.surface:tk.surface2,transition:'background 0.1s' }}
                    onMouseEnter={e=>e.currentTarget.style.background=dark?'#273449':'#F0F9FF'}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?tk.surface:tk.surface2}>
                    <td style={{ padding:'10px 12px',fontSize:'11px',color:tk.textSub,whiteSpace:'nowrap',fontFamily:'monospace' }}>{log.dt}</td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex',alignItems:'center',gap:'7px' }}>
                        <Avatar name={log.user} size={26}/>
                        <span style={{ fontSize:'12px',fontWeight:'600',color:tk.text,whiteSpace:'nowrap' }}>{log.user}</span>
                      </div>
                    </td>
                    <td style={{ padding:'10px 12px' }}><Badge label={log.role.charAt(0).toUpperCase()+log.role.slice(1)} variant={log.role==='admin'?'admin':'user'}/></td>
                    <td style={{ padding:'10px 12px',fontSize:'12px',color:tk.text,whiteSpace:'nowrap' }}>{log.module}</td>
                    <td style={{ padding:'10px 12px' }}>
                      <span style={{ padding:'3px 8px',borderRadius:'6px',background:ac.bg,color:ac.color,fontSize:'11px',fontWeight:'700',display:'inline-flex',alignItems:'center',gap:'3px' }}>
                        ● {ac.label}
                      </span>
                    </td>
                    <td style={{ padding:'10px 12px',fontSize:'12px',color:tk.textSub,maxWidth:'240px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{log.desc}</td>
                    <td style={{ padding:'10px 12px',fontSize:'11px',color:tk.textSub,fontFamily:'monospace',whiteSpace:'nowrap' }}>{log.ip}</td>
                    <td style={{ padding:'10px 12px' }}>
                      {log.status==='success'
                        ? <Badge label="Success" variant="success" dot/>
                        : <Badge label="Failure" variant="danger" dot/>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage}/>
      </Card>
    </div>
  );
};

Object.assign(window, { LogsEmpty, LogsFilled });
