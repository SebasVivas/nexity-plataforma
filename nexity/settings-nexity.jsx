
// settings-nexity.jsx — Settings page

const NxSettingsPage = () => {
  const { dark } = useTheme();
  const tk = t(dark);
  const [activeTab, setActiveTab] = React.useState('preferences');
  const [toast, setToast] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [changed, setChanged] = React.useState(false);

  const [prefs, setPrefs] = React.useState({ language:'es', timezone:'UTC-5', dateFormat:'dd/mm/yyyy', currency:'COP', numberFormat:'1,234,567.89' });
  const [notifs, setNotifs] = React.useState({ emails:['john.doe@benka.com'], frequency:'immediate', alertTypes:{ indicatorChanges:true, loginFailures:true, errorLogs:false, userChanges:true } });
  const [modules, setModules] = React.useState([
    { id:'finances',   label:'Finances',   desc:'Financial indicators and reports', enabled:true },
    { id:'operations', label:'Operations', desc:'Operational metrics and tracking', enabled:true },
    { id:'commercial', label:'Commercial', desc:'Sales and commercial performance', enabled:false },
  ]);
  const [branding, setBranding] = React.useState({ primaryColor:'#0F7FFF', newEmail:'' });

  const set = (setter) => (key, val) => { setter(prev => ({ ...prev, [key]: val })); setChanged(true); };
  const setP = set(setPrefs);
  const setN = set(setNotifs);
  const setB = set(setBranding);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setChanged(false);
      setToast('Settings saved successfully!');
    }, 1400);
  };

  const addEmail = () => {
    if (branding.newEmail && !notifs.emails.includes(branding.newEmail)) {
      setNotifs(prev => ({ ...prev, emails: [...prev.emails, branding.newEmail] }));
      setB('newEmail', '');
      setChanged(true);
    }
  };

  const removeEmail = (email) => {
    setNotifs(prev => ({ ...prev, emails: prev.emails.filter(e => e !== email) }));
    setChanged(true);
  };

  const toggleModule = (id) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
    setChanged(true);
  };

  const tabs = [
    { id:'preferences', label:'User Preferences', icon:'User' },
    { id:'notifications', label:'Alerts & Notifications', icon:'Bell' },
    { id:'modules', label:'Module Management', icon:'Layers' },
    { id:'branding', label:'Visual Customization', icon:'Package' },
  ];

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'20px',maxWidth:'900px' }}>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      {/* Tab bar */}
      <div style={{ display:'flex',flexWrap:'wrap',gap:'4px',background:tk.surface,borderRadius:'12px',padding:'4px',border:`1px solid ${tk.border}`,width:'fit-content' }}>
        {tabs.map(tab => {
          const IcoComp = Icons[tab.icon];
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display:'flex',alignItems:'center',gap:'7px',padding:'8px 14px',borderRadius:'9px',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:'13px',fontWeight:active?'700':'400',background:active?'#0F7FFF':'transparent',color:active?'#fff':tk.textSub,transition:'all 0.15s',whiteSpace:'nowrap' }}>
              {IcoComp && <IcoComp size={15} color={active?'#fff':tk.textSub} />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* User Preferences */}
      {activeTab === 'preferences' && (
        <Card>
          <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px' }}>
            <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.User size={18} color="#0F7FFF"/></div>
            <div style={{ fontWeight:'800',fontSize:'16px',color:tk.text }}>User Preferences</div>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px' }}>
            <NxSelect label="Language" value={prefs.language} onChange={v=>setP('language',v)} options={[['es','Spanish'],['en','English'],['pt','Português']]} />
            <NxSelect label="Time Zone" value={prefs.timezone} onChange={v=>setP('timezone',v)} options={[['UTC-5','UTC-5 (Bogotá, Lima)'],['UTC-6','UTC-6 (Mexico City)'],['UTC-3','UTC-3 (Buenos Aires)'],['UTC+1','UTC+1 (Madrid)']]} />
            <NxSelect label="Date Format" value={prefs.dateFormat} onChange={v=>setP('dateFormat',v)} options={[['dd/mm/yyyy','dd/mm/yyyy'],['mm/dd/yyyy','mm/dd/yyyy'],['yyyy-mm-dd','yyyy-mm-dd']]} />
            <NxSelect label="Default Currency" value={prefs.currency} onChange={v=>setP('currency',v)} options={[['COP','COP - Colombian Peso'],['USD','USD - US Dollar'],['MXN','MXN - Mexican Peso'],['PEN','PEN - Peruvian Sol'],['CLP','CLP - Chilean Peso']]} />
            <div>
              <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'5px' }}>Number Format</div>
              <div style={{ padding:'9px 12px',borderRadius:'8px',border:`1.5px solid ${tk.border}`,background:tk.surface2,fontSize:'13px',color:tk.textSub }}>1,234,567.89</div>
            </div>
          </div>
        </Card>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <Card>
          <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px' }}>
            <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:'#FFFBEB',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.Bell size={18} color="#D97706"/></div>
            <div style={{ fontWeight:'800',fontSize:'16px',color:tk.text }}>Alerts and Notifications</div>
          </div>

          <div style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
            <div>
              <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'8px' }}>Email Notifications</div>
              <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
                {notifs.emails.map(email => (
                  <div key={email} style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                    <div style={{ flex:1,padding:'8px 12px',borderRadius:'8px',border:`1px solid ${tk.border}`,background:tk.surface2,fontSize:'13px',color:tk.text }}>{email}</div>
                    <button onClick={()=>removeEmail(email)} style={{ background:'none',border:'none',cursor:'pointer',color:'#DC2626',padding:'6px',borderRadius:'7px',display:'flex' }}><Icons.X size={15}/></button>
                  </div>
                ))}
                <div style={{ display:'flex',gap:'8px' }}>
                  <NxInput placeholder="Add email address" value={branding.newEmail} onChange={v=>setB('newEmail',v)} style={{ flex:1 }} icon={<Icons.Mail size={14}/>} />
                  <Btn onClick={addEmail} disabled={!branding.newEmail} icon={<Icons.Plus size={14}/>}>Add</Btn>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'10px' }}>Sending Frequency</div>
              <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
                {[['immediate','Immediate'],['daily','Daily'],['weekly','Weekly'],['critical','Only critical cases']].map(([v,l]) => (
                  <label key={v} style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer' }}>
                    <div onClick={()=>setN('frequency',v)} style={{ width:'18px',height:'18px',borderRadius:'50%',border:`2px solid ${notifs.frequency===v?'#0F7FFF':'#D1D5DB'}`,background:notifs.frequency===v?'#0F7FFF':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer',transition:'all 0.15s' }}>
                      {notifs.frequency===v && <div style={{ width:'7px',height:'7px',borderRadius:'50%',background:'#fff' }}/>}
                    </div>
                    <span style={{ fontSize:'13px',color:tk.text }}>{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'10px' }}>Alert Types</div>
              <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
                {[['indicatorChanges','Indicator changes'],['loginFailures','Login failures'],['errorLogs','Error logs'],['userChanges','User & role changes']].map(([key,label]) => (
                  <Checkbox key={key} checked={notifs.alertTypes[key]} onChange={v=>{ setNotifs(p=>({...p,alertTypes:{...p.alertTypes,[key]:v}})); setChanged(true); }} label={label} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Module Management */}
      {activeTab === 'modules' && (
        <Card>
          <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px' }}>
            <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:'#F5F3FF',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.Layers size={18} color="#7C3AED"/></div>
            <div style={{ fontWeight:'800',fontSize:'16px',color:tk.text }}>Module Management</div>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
            {modules.map(m => (
              <div key={m.id} style={{ display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'10px',border:`1px solid ${tk.border}`,background:tk.surface2 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:'600',fontSize:'14px',color:tk.text }}>{m.label}</div>
                  <div style={{ fontSize:'12px',color:tk.textSub,marginTop:'2px' }}>{m.desc}</div>
                </div>
                <Badge label={m.enabled ? 'Active' : 'Inactive'} variant={m.enabled ? 'success' : 'default'} />
                <Toggle checked={m.enabled} onChange={() => toggleModule(m.id)} />
              </div>
            ))}
            <Btn variant="secondary" icon={<Icons.Plus size={15}/>} style={{ marginTop:'4px' }}>Add New Module</Btn>
          </div>
        </Card>
      )}

      {/* Visual Customization */}
      {activeTab === 'branding' && (
        <Card>
          <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px' }}>
            <div style={{ width:'36px',height:'36px',borderRadius:'10px',background:'#ECFDF5',display:'flex',alignItems:'center',justifyContent:'center' }}><Icons.Package size={18} color="#059669"/></div>
            <div style={{ fontWeight:'800',fontSize:'16px',color:tk.text }}>Visual Platform Customization</div>
          </div>

          {/* Upload areas */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'20px' }}>
            {['Replace company logo','Upload company icon'].map(label => (
              <div key={label} style={{ border:`2px dashed ${tk.border}`,borderRadius:'12px',padding:'32px 20px',textAlign:'center',cursor:'pointer',transition:'border-color 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='#0F7FFF'}
                onMouseLeave={e=>e.currentTarget.style.borderColor=tk.border}>
                <div style={{ width:'48px',height:'48px',borderRadius:'12px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px' }}>
                  <Icons.Upload size={22} color="#0F7FFF"/>
                </div>
                <div style={{ fontWeight:'600',fontSize:'14px',color:tk.text,marginBottom:'4px' }}>{label}</div>
                <div style={{ fontSize:'12px',color:tk.textSub,marginBottom:'12px' }}>Drag and drop or click to browse</div>
                <div style={{ fontSize:'11px',color:tk.textSub,marginBottom:'14px' }}>Max 2 GB · .png, .svg, .jpg</div>
                <Btn variant="secondary" size="sm" icon={<Icons.Upload size={13}/>}>Choose File</Btn>
              </div>
            ))}
          </div>

          {/* Color picker */}
          <div>
            <div style={{ fontSize:'13px',fontWeight:'600',color:tk.text,marginBottom:'10px' }}>Platform Primary Color</div>
            <div style={{ display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap' }}>
              <input type="color" value={branding.primaryColor} onChange={e=>setB('primaryColor',e.target.value)} style={{ width:'44px',height:'44px',borderRadius:'10px',border:`1.5px solid ${tk.border}`,cursor:'pointer',padding:'3px',background:'transparent' }}/>
              <NxInput value={branding.primaryColor} onChange={v=>setB('primaryColor',v)} style={{ width:'130px' }}/>
              <div style={{ display:'flex',gap:'6px' }}>
                {['#0F7FFF','#8B5CF6','#10B981','#F59E0B','#EF4444','#06B6D4'].map(c=>(
                  <button key={c} onClick={()=>{ setB('primaryColor',c); setChanged(true); }} style={{ width:'28px',height:'28px',borderRadius:'7px',background:c,border:branding.primaryColor===c?'3px solid #0F172A':'2px solid transparent',cursor:'pointer',transition:'border 0.15s' }}/>
                ))}
              </div>
            </div>
            <div style={{ marginTop:'14px' }}>
              <div style={{ fontSize:'12px',color:tk.textSub,marginBottom:'8px' }}>Preview</div>
              <div style={{ display:'flex',gap:'8px',alignItems:'center' }}>
                <button style={{ padding:'9px 18px',borderRadius:'8px',background:branding.primaryColor,color:'#fff',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'600',cursor:'default' }}>Primary Button</button>
                <div style={{ width:'34px',height:'34px',borderRadius:'9px',background:branding.primaryColor+'18',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <Icons.BarChart2 size={18} color={branding.primaryColor}/>
                </div>
                <Badge label="Active" variant="info" size="lg" style={{ borderColor:branding.primaryColor }}/>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Save button */}
      <div style={{ display:'flex',justifyContent:'flex-end',gap:'10px' }}>
        <Btn variant="secondary" onClick={()=>setChanged(false)}>Discard Changes</Btn>
        <Btn onClick={handleSave} loading={saving} disabled={!changed} icon={<Icons.Check size={15}/>}>Save Changes</Btn>
      </div>
    </div>
  );
};

Object.assign(window, { NxSettingsPage });
