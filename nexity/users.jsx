
// users.jsx — User management module

const USERS = [
  { id:1, name:'John Doe',       email:'john.doe@benka.com',       role:'admin', areas:['Dashboard','Finance','Operations'], lastLogin:'2 hours ago',  created:'Jan 15, 2024', status:'active' },
  { id:2, name:'Sarah Wilson',   email:'sarah.wilson@benka.com',   role:'admin', areas:['Dashboard','Finance','Operations'], lastLogin:'2 hours ago',  created:'Jan 15, 2024', status:'active' },
  { id:3, name:'Maria García',   email:'maria.garcia@benka.com',   role:'user',  areas:['Finance','Commercial'],             lastLogin:'1 day ago',    created:'Feb 3, 2024',  status:'active' },
  { id:4, name:'Carlos Rodriguez',email:'carlos.rodriguez@benka.com',role:'user', areas:['Operations'],                    lastLogin:'3 days ago',   created:'Jan 28, 2024', status:'suspended' },
  { id:5, name:'Emily Davis',    email:'emily.davis@benka.com',    role:'user',  areas:['Finance','Dashboard'],             lastLogin:'5 hours ago',  created:'Mar 1, 2024',  status:'active' },
  { id:6, name:'Mike Johnson',   email:'mike.johnson@benka.com',   role:'user',  areas:['Dashboard'],                       lastLogin:'1 week ago',   created:'Dec 10, 2023', status:'active' },
];

const RoleBadge = ({ role }) => (
  <Badge label={role === 'admin' ? 'Admin' : 'User'} variant={role === 'admin' ? 'admin' : 'user'} dot />
);

const StatusBadgeUser = ({ status }) => {
  const map = { active:'active', suspended:'suspended', pending:'warning' };
  return <Badge label={status.charAt(0).toUpperCase()+status.slice(1)} variant={map[status]||'default'} dot />;
};

const UsersEmpty = ({ onAdd }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'24px' }}>
      {/* Current admin */}
      <Card style={{ display:'flex',alignItems:'center',gap:'16px' }}>
        <Avatar name="John Doe" size={48} />
        <div>
          <div style={{ fontWeight:'700',fontSize:'15px',color:tk.text }}>John Doe</div>
          <div style={{ fontSize:'13px',color:tk.textSub }}>john.doe@benka.com</div>
        </div>
        <div style={{ display:'flex',gap:'8px',marginLeft:'auto' }}>
          <RoleBadge role="admin" />
          <Badge label="Full Access" variant="info" />
          <Badge label="You" variant="purple" />
        </div>
      </Card>
      <EmptyState
        icon={<Icons.Users size={32} color="#0F7FFF"/>}
        title="You have not yet added new users"
        description="From here you can invite your team, assign them roles, and define which sections of the system they can use."
        action={onAdd} actionLabel="+ Add User"
      />
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px' }}>
        {[
          { icon:<Icons.Lock size={22} color="#2563EB"/>, bg:'#EFF6FF', title:'Define permissions by area', desc:'Control access to specific modules' },
          { icon:<Icons.Shield size={22} color="#7C3AED"/>, bg:'#F5F3FF', title:'Protect critical information', desc:'Ensure data security and integrity' },
          { icon:<Icons.Mail size={22} color="#059669"/>, bg:'#ECFDF5', title:'Easily invite your team', desc:'Send automatic invitations via email' },
        ].map((f,i)=>(
          <Card key={i} style={{ display:'flex',flexDirection:'column',gap:'10px',alignItems:'center',textAlign:'center' }}>
            <div style={{ width:'44px',height:'44px',borderRadius:'12px',background:f.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>{f.icon}</div>
            <div style={{ fontWeight:'700',fontSize:'14px',color:tk.text }}>{f.title}</div>
            <div style={{ fontSize:'12px',color:tk.textSub,lineHeight:1.5 }}>{f.desc}</div>
          </Card>
        ))}
      </div>
      <Card style={{ display:'flex',gap:'12px',alignItems:'flex-start',background:'#EFF6FF',border:'1px solid #BFDBFE' }}>
        <Icons.Info size={18} color="#2563EB" style={{ flexShrink:0,marginTop:'2px' }}/>
        <div>
          <div style={{ fontWeight:'700',fontSize:'13px',color:'#1E40AF' }}>Start collaborating with your team</div>
          <div style={{ fontSize:'12px',color:'#3B82F6',marginTop:'4px',lineHeight:1.5 }}>Users will receive an email with an invitation to set their credentials. You can assign specific permissions by module, ensuring appropriate access based on their role.</div>
        </div>
      </Card>
    </div>
  );
};

const UserModal = ({ onClose, onSave }) => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [form, setForm] = React.useState({ name:'',email:'',role:'user',areas:[] });
  const areaOptions = ['Dashboard','Finance','Operations','Commercial','Alerts','Reports'];
  const toggleArea = a => setForm(f => ({ ...f, areas: f.areas.includes(a) ? f.areas.filter(x=>x!==a) : [...f.areas,a] }));
  return (
    <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center' }} onClick={onClose}>
      <div style={{ background:tk.surface,borderRadius:'16px',padding:'28px',width:'440px',boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
          <div style={{ fontWeight:'800',fontSize:'17px',color:tk.text }}>Add New User</div>
          <button onClick={onClose} style={{ background:'none',border:'none',cursor:'pointer',color:tk.textSub,display:'flex' }}><Icons.X size={18}/></button>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
          <NxInput label="Full Name" placeholder="Jane Smith" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} icon={<Icons.User size={14}/>} />
          <NxInput label="Email Address" placeholder="jane@benka.com" value={form.email} onChange={v=>setForm(f=>({...f,email:v}))} type="email" icon={<Icons.Mail size={14}/>} />
          <NxSelect label="Role" value={form.role} onChange={v=>setForm(f=>({...f,role:v}))} options={[['user','User — Standard access'],['admin','Admin — Full access']]} />
          <div>
            <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'8px' }}>Access Areas</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:'8px' }}>
              {areaOptions.map(a=>(
                <button key={a} onClick={()=>toggleArea(a)} style={{ padding:'5px 12px',borderRadius:'20px',border:`1.5px solid ${form.areas.includes(a)?'#0F7FFF':tk.border}`,background:form.areas.includes(a)?'#EFF6FF':'transparent',color:form.areas.includes(a)?'#1D4ED8':tk.textSub,fontSize:'12px',fontWeight:'500',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s' }}>{a}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'24px' }}>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={()=>{ onSave(form); onClose(); }} disabled={!form.name||!form.email} icon={<Icons.Mail size={14}/>}>Send Invitation</Btn>
        </div>
      </div>
    </div>
  );
};

const UsersFilled = () => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [users, setUsers] = React.useState(USERS);
  const [page, setPage] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [toast, setToast] = React.useState(null);
  const PER = 5;

  const filtered = users
    .filter(u => roleFilter==='all' || u.role===roleFilter)
    .filter(u => statusFilter==='all' || u.status===statusFilter)
    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page-1)*PER, page*PER);

  const handleAdd = form => {
    setUsers(prev=>[...prev,{ id:Date.now(), name:form.name, email:form.email, role:form.role, areas:form.areas, lastLogin:'Never', created:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}), status:'pending' }]);
    setToast('Invitation sent to '+form.email);
  };

  const toggleStatus = id => setUsers(prev=>prev.map(u=>u.id===id?{...u,status:u.status==='active'?'suspended':'active'}:u));

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
      {toast && <Toast message={toast} type="success" onClose={()=>setToast(null)}/>}

      {/* Admin card */}
      <Card style={{ display:'flex',alignItems:'center',gap:'16px' }}>
        <Avatar name="John Doe" size={44}/>
        <div>
          <div style={{ fontWeight:'700',fontSize:'15px',color:tk.text }}>John Doe — Current Administrator</div>
          <div style={{ fontSize:'13px',color:tk.textSub }}>john.doe@benka.com</div>
        </div>
        <div style={{ display:'flex',gap:'8px',marginLeft:'auto' }}>
          <RoleBadge role="admin"/>
          <Badge label="You" variant="purple"/>
        </div>
      </Card>

      {/* Active users table */}
      <Card padding="0" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 16px',display:'flex',gap:'10px',alignItems:'center',borderBottom:`1px solid ${tk.border}`,flexWrap:'wrap' }}>
          <div style={{ fontWeight:'700',fontSize:'15px',color:tk.text,flex:1 }}>Active Users</div>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)' }}><Icons.Search size={14} color={tk.textSub}/></span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..." style={{ padding:'7px 12px 7px 32px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface2,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',width:'180px' }}/>
          </div>
          {[['all','All Types'],['admin','Admin'],['user','User']].map(([v,l])=>(
            <select key={v} value={roleFilter} onChange={e=>setRoleFilter(e.target.value)} style={{ padding:'7px 10px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',cursor:'pointer' }}>
              {[['all','All Types'],['admin','Admin'],['user','User']].map(([ov,ol])=><option key={ov} value={ov}>{ol}</option>)}
            </select>
          )).slice(0,1)}
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ padding:'7px 10px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface,color:tk.text,fontSize:'13px',fontFamily:'inherit',outline:'none',cursor:'pointer' }}>
            {[['all','All Status'],['active','Active'],['suspended','Suspended']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <Btn onClick={()=>setShowModal(true)} icon={<Icons.Plus size={15}/>}>Add New User</Btn>
        </div>

        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:tk.surface2 }}>
                {['Name','Email','Type','Access Areas','Last Login','Created','Status','Actions'].map(h=>(
                  <th key={h} style={{ padding:'10px 14px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:tk.textSub,textTransform:'uppercase',letterSpacing:'0.04em',borderBottom:`1px solid ${tk.border}`,whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((u,i)=>(
                <tr key={u.id} style={{ background:i%2===0?tk.surface:tk.surface2,transition:'background 0.1s' }}
                  onMouseEnter={e=>e.currentTarget.style.background=dark?'#273449':'#F0F9FF'}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?tk.surface:tk.surface2}>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
                      <Avatar name={u.name} size={32}/>
                      <span style={{ fontWeight:'600',fontSize:'13px',color:tk.text,whiteSpace:'nowrap' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px',fontSize:'12px',color:tk.textSub }}>{u.email}</td>
                  <td style={{ padding:'12px 14px' }}><RoleBadge role={u.role}/></td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex',gap:'4px',flexWrap:'wrap' }}>
                      {u.areas.slice(0,2).map(a=><Badge key={a} label={a} variant="default"/>)}
                      {u.areas.length>2&&<Badge label={`+${u.areas.length-2}`} variant="default"/>}
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px',fontSize:'12px',color:tk.textSub,whiteSpace:'nowrap' }}>{u.lastLogin}</td>
                  <td style={{ padding:'12px 14px',fontSize:'12px',color:tk.textSub,whiteSpace:'nowrap' }}>{u.created}</td>
                  <td style={{ padding:'12px 14px' }}><StatusBadgeUser status={u.status}/></td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex',gap:'2px' }}>
                      {[['Eye','View'],['Edit','Edit']].map(([ico,lbl])=>(
                        <button key={ico} title={lbl} style={{ background:'none',border:'none',cursor:'pointer',color:tk.textSub,padding:'5px',borderRadius:'6px',display:'flex' }}
                          onMouseEnter={e=>e.currentTarget.style.background=tk.surface2} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                          {React.createElement(Icons[ico],{size:15})}
                        </button>
                      ))}
                      <button title={u.status==='active'?'Suspend':'Activate'} onClick={()=>toggleStatus(u.id)} style={{ background:'none',border:'none',cursor:'pointer',color:u.status==='active'?'#D97706':'#059669',padding:'5px',borderRadius:'6px',display:'flex' }}
                        onMouseEnter={e=>e.currentTarget.style.background=tk.surface2} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                        {u.status==='active'?<Icons.Lock size={15}/>:<Icons.Check size={15}/>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage}/>
      </Card>

      {showModal && <UserModal onClose={()=>setShowModal(false)} onSave={handleAdd}/>}
    </div>
  );
};

Object.assign(window, { UsersEmpty, UsersFilled });
