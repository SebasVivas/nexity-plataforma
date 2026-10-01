
// reports.jsx — Reports module (list, cards, detail, builder)

const REPORTS_DATA = [
  { id:1, name:'Q4 Financial Overview', desc:'Comprehensive quarterly analysis', date:'2024-01-15', edited:'2024-01-18', author:'John Doe', status:'active', type:'pdf' },
  { id:2, name:'Revenue Trends Analysis', desc:'Monthly revenue growth patterns', date:'2024-01-15', edited:'2024-01-18', author:'Sarah Wilson', status:'active', type:'xlsx' },
  { id:3, name:'Expense Breakdown', desc:'Department-wise expense distribution', date:'2024-01-15', edited:'2024-01-18', author:'Sarah Wilson', status:'archived', type:'csv' },
  { id:4, name:'Cash Flow Q3', desc:'Cash flow analysis for Q3', date:'2024-01-10', edited:'2024-01-12', author:'Mike Johnson', status:'draft', type:'pdf' },
  { id:5, name:'Budget Variance Report', desc:'Budget vs actual comparison', date:'2024-01-08', edited:'2024-01-09', author:'Emily Davis', status:'active', type:'xlsx' },
  { id:6, name:'Profit & Loss Statement', desc:'Monthly P&L breakdown', date:'2024-01-05', edited:'2024-01-06', author:'John Doe', status:'active', type:'pdf' },
];

const StatusBadge = ({ status }) => {
  const map = { active:'active', archived:'archived', draft:'draft' };
  return <Badge label={status.charAt(0).toUpperCase() + status.slice(1)} variant={map[status] || 'default'} dot />;
};

// ── Reports List View ─────────────────────────────────────────────────────────
const ReportsList = ({ onOpen, onNew }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [view, setView] = React.useState('list');
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const PER = 4;

  const filtered = REPORTS_DATA
    .filter(r => statusFilter === 'all' || r.status === statusFilter)
    .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.author.toLowerCase().includes(search.toLowerCase()));

  const paged = filtered.slice((page-1)*PER, page*PER);
  const toggleSelect = id => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  const allSel = paged.every(r => selected.includes(r.id));
  const toggleAll = () => setSelected(allSel ? selected.filter(id=>!paged.find(r=>r.id===id)) : [...new Set([...selected,...paged.map(r=>r.id)])]);

  const typeIcons = { pdf: '#EF4444', xlsx: '#10B981', csv: '#3B82F6' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: tk.text }}>Finance Report History</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: tk.textSub }}>Review, edit, or create new reports to visualize the behavior of your indicators over time.</p>
      </div>

      {/* Filters */}
      <Card padding="14px 16px">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}><Icons.Search size={15} color={tk.textSub} /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or author..." style={{ width: '100%', padding: '8px 12px 8px 33px', borderRadius: '8px', border: `1.5px solid ${tk.border}`, background: tk.surface2, color: tk.text, fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: `1.5px solid ${tk.border}`, background: tk.surface, color: tk.text, fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
            {[['all','All Status'],['active','Active'],['draft','Draft'],['archived','Archived']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <select style={{ padding: '8px 12px', borderRadius: '8px', border: `1.5px solid ${tk.border}`, background: tk.surface, color: tk.text, fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
            {[['30','Last 30 Days'],['7','Last 7 Days'],['90','Last 90 Days']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '2px', background: tk.surface2, borderRadius: '8px', padding: '3px', border: `1px solid ${tk.border}` }}>
            {[['list','≡'],['grid','⊞']].map(([v,ico])=>(
              <button key={v} onClick={()=>setView(v)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: view===v ? '#0F7FFF' : 'transparent', color: view===v ? '#fff' : tk.textSub, fontSize: '14px', fontFamily: 'inherit' }}>{ico}</button>
            ))}
          </div>
          <Btn onClick={onNew} icon={<Icons.Plus size={15} />}>New Report</Btn>
        </div>
      </Card>

      {/* List View */}
      {view === 'list' && (
        <Card padding="0" style={{ overflow: 'hidden' }}>
          {selected.length > 0 && (
            <div style={{ padding: '10px 16px', background: '#EFF6FF', borderBottom: `1px solid ${tk.border}`, display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#1D4ED8', fontWeight: '500' }}>{selected.length} selected</span>
              <Btn variant="secondary" size="sm">Archive Selected</Btn>
              <Btn variant="danger" size="sm">Delete</Btn>
            </div>
          )}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: tk.surface2 }}>
                  <th style={{ padding: '10px 16px', borderBottom: `1px solid ${tk.border}`, width: '40px' }}>
                    <input type="checkbox" checked={allSel} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                  </th>
                  {['Report Name','Date','Last Edited','Author','Status','Actions'].map(col => (
                    <th key={col} style={{ padding: '10px 14px', borderBottom: `1px solid ${tk.border}`, textAlign: 'left', fontSize: '11px', fontWeight: '700', color: tk.textSub, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((r, i) => (
                  <tr key={r.id} style={{ background: selected.includes(r.id) ? (dark ? '#1a2a3e' : '#EFF6FF') : i%2===0 ? tk.surface : tk.surface2, cursor: 'pointer' }}
                    onMouseEnter={e => { if(!selected.includes(r.id)) e.currentTarget.style.background = tk.surface2; }}
                    onMouseLeave={e => { if(!selected.includes(r.id)) e.currentTarget.style.background = i%2===0 ? tk.surface : tk.surface2; }}>
                    <td style={{ padding: '12px 16px' }}><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggleSelect(r.id)} style={{ cursor: 'pointer' }} /></td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: (typeIcons[r.type]||'#6B7280')+'18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icons.FileText size={16} color={typeIcons[r.type]||'#6B7280'} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <button onClick={()=>onOpen(r)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600', fontSize: '13px', color: tk.text, padding: 0, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', display: 'block' }}>{r.name}</button>
                          <div style={{ fontSize: '11px', color: tk.textSub, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>{r.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: tk.textSub, whiteSpace: 'nowrap' }}>{r.date}</td>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: tk.textSub, whiteSpace: 'nowrap' }}>{r.edited}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: tk.text }}>{r.author}</td>
                    <td style={{ padding: '12px 14px' }}><StatusBadge status={r.status} /></td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[['Eye','View'],['Edit','Edit'],['Download','Download'],['Copy','Duplicate'],['Trash','Delete']].map(([ico,lbl])=>(
                          <button key={ico} title={lbl} onClick={()=>ico==='Eye'&&onOpen(r)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: ico==='Trash'?'#EF4444':tk.textSub, padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={e=>e.currentTarget.style.background=tk.surface2}
                            onMouseLeave={e=>e.currentTarget.style.background='none'}>
                            {React.createElement(Icons[ico], { size: 15 })}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />
        </Card>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {filtered.map(r => (
            <Card key={r.id} hover style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }} onClick={()=>onOpen(r)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: (typeIcons[r.type]||'#6B7280')+'18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icons.FileText size={20} color={typeIcons[r.type]||'#6B7280'} />
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: tk.text }}>{r.name}</div>
                <div style={{ fontSize: '12px', color: tk.textSub, marginTop: '4px', lineHeight: 1.4 }}>{r.desc}</div>
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: tk.textSub }}>
                <span>{r.date}</span>
                <span>{r.author}</span>
              </div>
            </Card>
          ))}
          <Card hover style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', border: `2px dashed ${tk.border}`, background: 'transparent', minHeight: '160px' }} onClick={onNew}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.Plus size={20} color="#0F7FFF" /></div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#0F7FFF' }}>New Report</span>
          </Card>
        </div>
      )}
    </div>
  );
};

// ── Report Detail (simplified chart view) ────────────────────────────────────
const ReportDetail = ({ report, onBack }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [title, setTitle] = React.useState(report?.name || 'Q4 Financial Overview');
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => { setSaving(true); setTimeout(()=>{setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2000);},1200); };

  const kpis = [
    { label:'Total Revenue', value:'$2,847,500', change:'+12.5%', dir:'up', color:'#059669' },
    { label:'Total Expenses', value:'$1,943,200', change:'+3.2%', dir:'down', color:'#DC2626' },
    { label:'Net Income', value:'$904,300', change:'+10.7%', dir:'up', color:'#059669' },
    { label:'Profit Margin', value:'31.8%', change:'+2.3%', dir:'up', color:'#D97706' },
  ];

  // Simple bar chart with SVG
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const income =  [180,210,190,240,220,260];
  const expenses=[140,160,150,180,170,200];
  const maxVal = 300;
  const W=400,H=120,px=30,py=10,barW=30,gap=18;
  const mapY=v=>H-py-(v/maxVal)*(H-py*2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button onClick={onBack} style={{ background: tk.surface, border: `1px solid ${tk.border}`, borderRadius: '8px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.ChevronLeft size={18} color={tk.textSub} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} style={{ fontSize: '18px', fontWeight: '800', color: tk.text, background: 'transparent', border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '2px' }}>
            <Badge label="Draft" variant="draft" />
            <span style={{ fontSize: '11px', color: tk.textSub }}>Last saved 2 minutes ago</span>
          </div>
        </div>
        <Btn onClick={handleSave} loading={saving} icon={saved ? <Icons.Check size={15} /> : null}>{saved ? 'Saved!' : 'Save Report'}</Btn>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {kpis.map((k,i)=>(
          <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'6px' }}>
            <div style={{ fontSize:'11px',fontWeight:'600',color:tk.textSub,textTransform:'uppercase',letterSpacing:'0.04em' }}>{k.label}</div>
            <div style={{ fontSize:'22px',fontWeight:'800',color:tk.text,letterSpacing:'-0.03em' }}>{k.value}</div>
            <div style={{ display:'flex',alignItems:'center',gap:'4px',fontSize:'12px' }}>
              {k.dir==='up'?<Icons.TrendingUp size={13} color={k.color}/>:<Icons.TrendingDown size={13} color={k.color}/>}
              <span style={{ color:k.color,fontWeight:'600' }}>{k.change}</span>
              <span style={{ color:tk.textSub }}>from last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
        {/* Bar chart */}
        <Card>
          <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text,marginBottom:'14px' }}>Monthly Income vs Expenses</div>
          <svg width="100%" viewBox={`0 0 ${W} ${H+28}`} style={{ display:'block', overflow:'visible' }}>
            {[0,100,200,300].map(v=>(
              <g key={v}>
                <line x1={px} y1={mapY(v)} x2={W-px} y2={mapY(v)} stroke={tk.border} strokeWidth="1" />
                <text x={px-4} y={mapY(v)+4} textAnchor="end" fontSize="9" fill={tk.textSub}>{v}k</text>
              </g>
            ))}
            {months.map((m,i)=>{
              const x=px+i*(barW*2+gap);
              return (
                <g key={m}>
                  <rect x={x} y={mapY(income[i])} width={barW} height={H-py-mapY(income[i])} fill="#0F7FFF" rx="3" />
                  <rect x={x+barW+2} y={mapY(expenses[i])} width={barW} height={H-py-mapY(expenses[i])} fill="#EF4444" rx="3" />
                  <text x={x+barW} y={H+20} textAnchor="middle" fontSize="10" fill={tk.textSub}>{m}</text>
                </g>
              );
            })}
          </svg>
          <div style={{ display:'flex',gap:'16px',marginTop:'8px' }}>
            {[['Income','#0F7FFF'],['Expenses','#EF4444']].map(([l,c])=>(
              <div key={l} style={{ display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',color:tk.textSub }}>
                <div style={{ width:'12px',height:'3px',background:c,borderRadius:'2px' }}/>{l}
              </div>
            ))}
          </div>
        </Card>

        {/* Pie chart */}
        <Card>
          <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text,marginBottom:'14px' }}>Expense Distribution</div>
          <div style={{ display:'flex',alignItems:'center',gap:'16px' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              {(()=>{
                const data=[{v:42,c:'#0F7FFF'},{v:25,c:'#F59E0B'},{v:20,c:'#06B6D4'},{v:13,c:'#94A3B8'}];
                let start=0;
                return data.map((d,i)=>{
                  const angle=d.v/100*2*Math.PI;
                  const x1=60+55*Math.sin(start), y1=60-55*Math.cos(start);
                  const x2=60+55*Math.sin(start+angle), y2=60-55*Math.cos(start+angle);
                  const large=d.v>50?1:0;
                  const path=`M60,60 L${x1},${y1} A55,55 0 ${large},1 ${x2},${y2} Z`;
                  start+=angle;
                  return <path key={i} d={path} fill={d.c} stroke="#fff" strokeWidth="2"/>;
                });
              })()}
            </svg>
            <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
              {[['Salaries','42%','#0F7FFF'],['Marketing','25%','#F59E0B'],['Operations','20%','#06B6D4'],['Commercial','13%','#94A3B8']].map(([l,v,c])=>(
                <div key={l} style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'12px' }}>
                  <div style={{ width:'10px',height:'10px',borderRadius:'2px',background:c,flexShrink:0 }}/>
                  <span style={{ color:tk.text,fontWeight:'500' }}>{l}</span>
                  <span style={{ color:tk.textSub,marginLeft:'auto' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Financial details table */}
      <Card padding="0" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 16px',fontWeight:'700',fontSize:'14px',color:tk.text,borderBottom:`1px solid ${tk.border}` }}>Financial Details</div>
        <table style={{ width:'100%',borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:tk.surface2 }}>
              {['Date','Category','Description','Amount','Status','Actions'].map(h=>(
                <th key={h} style={{ padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:tk.textSub,textTransform:'uppercase',letterSpacing:'0.04em',borderBottom:`1px solid ${tk.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { date:'2024-01-15',cat:'Revenue',desc:'Product Sales Q1',amount:'+$125,000',status:'active' },
              { date:'2024-01-14',cat:'Expense',desc:'Marketing Campaign',amount:'-$45,000',status:'archived' },
              { date:'2024-01-13',cat:'Revenue',desc:'Service Revenue',amount:'+$88,000',status:'active' },
            ].map((row,i)=>(
              <tr key={i} style={{ borderBottom:`1px solid ${tk.border}` }}
                onMouseEnter={e=>e.currentTarget.style.background=tk.surface2}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{ padding:'11px 14px',fontSize:'12px',color:tk.textSub }}>{row.date}</td>
                <td style={{ padding:'11px 14px',fontSize:'13px',color:tk.text,fontWeight:'500' }}>{row.cat}</td>
                <td style={{ padding:'11px 14px',fontSize:'13px',color:tk.text }}>{row.desc}</td>
                <td style={{ padding:'11px 14px',fontSize:'13px',fontWeight:'700',color:row.amount.startsWith('+')?'#059669':'#DC2626' }}>{row.amount}</td>
                <td style={{ padding:'11px 14px' }}><StatusBadge status={row.status} /></td>
                <td style={{ padding:'11px 14px' }}>
                  <div style={{ display:'flex',gap:'4px' }}>
                    <button style={{ background:'none',border:'none',cursor:'pointer',color:tk.textSub,padding:'4px',borderRadius:'6px' }}><Icons.Edit size={14}/></button>
                    <button style={{ background:'none',border:'none',cursor:'pointer',color:'#EF4444',padding:'4px',borderRadius:'6px' }}><Icons.Trash size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ── New Report ────────────────────────────────────────────────────────────────
const NewReport = ({ onBack }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const features = [
    { icon:<Icons.Activity size={20} color="#2563EB"/>, bg:'#EFF6FF', title:'Real-time KPI Monitoring', desc:'Track key performance indicators with live updates and automated calculations.' },
    { icon:<Icons.Download size={20} color="#7C3AED"/>, bg:'#F5F3FF', title:'Data Export', desc:'Export reports and charts in multiple formats for external analysis.' },
    { icon:<Icons.Bell size={20} color="#DC2626"/>, bg:'#FEF2F2', title:'Automated Alerts', desc:'Get notified when metrics exceed thresholds or show unusual patterns.' },
    { icon:<Icons.Smartphone size={20} color="#059669"/>, bg:'#ECFDF5', title:'Mobile Responsive', desc:'Access your financial data anywhere with full mobile compatibility.' },
    { icon:<Icons.Filter size={20} color="#D97706"/>, bg:'#FFFBEB', title:'Advanced Filtering', desc:'Segment data by time periods, categories, and custom parameters.' },
    { icon:<Icons.Globe size={20} color="#06B6D4"/>, bg:'#ECFEFF', title:'Multi-language Support', desc:'Use the platform in your preferred language with localized formatting.' },
  ];
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'14px' }}>
        <button onClick={onBack} style={{ background:tk.surface,border:`1px solid ${tk.border}`,borderRadius:'8px',width:'36px',height:'36px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.ChevronLeft size={18} color={tk.textSub}/></button>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex',gap:'10px',alignItems:'center' }}>
            <Badge label="Draft" variant="draft" />
            <span style={{ fontSize:'11px',color:tk.textSub }}>Last saved 2 minutes ago</span>
          </div>
        </div>
        <Btn icon={<Icons.Check size={15}/>}>Save Report</Btn>
      </div>
      <Card>
        <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
          <NxInput label="Report Title" placeholder="Q3 Budget" value={title} onChange={setTitle} />
          <div style={{ display:'flex',flexDirection:'column',gap:'5px' }}>
            <label style={{ fontSize:'13px',fontWeight:'600',color:tk.text }}>Description</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Report to show the Q3 of 2025 Budget of the finance area" rows={3} style={{ padding:'9px 12px',borderRadius:'8px',border:`1.5px solid ${tk.border}`,background:tk.surface2,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',resize:'vertical' }} />
          </div>
        </div>
      </Card>
      <Card style={{ textAlign:'center' }}>
        <div style={{ width:'56px',height:'56px',borderRadius:'16px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px' }}>
          <Icons.BarChart2 size={28} color="#0F7FFF"/>
        </div>
        <h3 style={{ margin:0,fontSize:'17px',fontWeight:'800',color:tk.text }}>{title||'Welcome to your new report'}</h3>
        <p style={{ margin:'8px 0 20px',fontSize:'13px',color:tk.textSub,maxWidth:'420px',marginLeft:'auto',marginRight:'auto',lineHeight:1.6 }}>Start visualizing report data by creating your first charts and indicators. Monitor your key performance metrics in real-time.</p>
        <div style={{ display:'flex',gap:'10px',justifyContent:'center' }}>
          <Btn icon={<Icons.Plus size={15}/>}>Create first chart</Btn>
          <Btn variant="secondary" icon={<Icons.Zap size={15}/>}>Use popular charts</Btn>
        </div>
      </Card>
      <div>
        <div style={{ fontWeight:'700',fontSize:'15px',color:tk.text,marginBottom:'12px' }}>What you can do with your report</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px' }}>
          {features.map((f,i)=>(
            <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
              <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:f.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight:'600',fontSize:'13px',color:tk.text }}>{f.title}</div>
                <div style={{ fontSize:'12px',color:tk.textSub,marginTop:'4px',lineHeight:1.5 }}>{f.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card>
        <div style={{ display:'flex',gap:'16px',alignItems:'center' }}>
          <Icons.HelpCircle size={24} color="#0F7FFF"/>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text }}>Need help getting started?</div>
            <div style={{ fontSize:'13px',color:tk.textSub }}>Check our documentation or contact support for assistance.</div>
          </div>
          <div style={{ display:'flex',gap:'8px' }}>
            <Btn variant="secondary" size="sm" icon={<Icons.BookOpen size={14}/>}>Documentation</Btn>
            <Btn variant="secondary" size="sm" icon={<Icons.HelpCircle size={14}/>}>Support</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

Object.assign(window, { ReportsList, ReportDetail, NewReport, StatusBadge });
