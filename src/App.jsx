import React, { useState, useEffect, useRef } from 'react';

// --- 原生 SVG 图标 ---
const Icons = {
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  User: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Hash: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>,
  Play: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Pause: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>,
  // 新增 Stop 图标 (实心正方形)
  Stop: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="5" width="14" height="14"></rect></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  List: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Book: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Upload: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Star: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
};

const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;
const scanline = `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))`;

const INITIAL_DATA = [
  { 
    id: 1, 
    title: "哎呀！皇后娘娘来打工", 
    totalEpisodes: 80, 
    watchedEpisodes: 45, 
    status: "watching", 
    platform: "抖音", 
    rating: 4.5, 
    group: "皇后宇宙", 
    actors: "徐艺真, 孙樾", 
    tags: "甜宠, 穿越, 搞笑", 
    note: "反转很多，第12集超神！" 
  },
];

const statusConfig = {
  watching: { label: "ON AIR", color: "bg-[#4ade80]", text: "text-[#4ade80]", screen: "bg-[#e0f2e9]" },
  completed: { label: "ENDED", color: "bg-[#60a5fa]", text: "text-[#60a5fa]", screen: "bg-[#e0f0ff]" },
  wishlist: { label: "STANDBY", color: "bg-[#fbbf24]", text: "text-[#fbbf24]", screen: "bg-[#fffbeb]" },
  dropped: { label: "NO SIGNAL", color: "bg-[#f87171]", text: "text-[#f87171]", screen: "bg-[#ffe4e6]" },
};

export default function App() {
  const [dramas, setDramas] = useState(() => {
    try {
      const saved = localStorage.getItem('retro_tv_drama_list_v9'); 
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch { return INITIAL_DATA; }
  });

  const [hiddenSuggestions, setHiddenSuggestions] = useState(() => {
    try {
      const saved = localStorage.getItem('retro_tv_hidden_v3');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrama, setCurrentDrama] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const fileInputRef = useRef(null);

  useEffect(() => { localStorage.setItem('retro_tv_drama_list_v9', JSON.stringify(dramas)); }, [dramas]);
  useEffect(() => { localStorage.setItem('retro_tv_hidden_v3', JSON.stringify(hiddenSuggestions)); }, [hiddenSuggestions]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW Registered'))
        .catch(err => console.log('SW Fail', err));
    }
  }, []);

  const getUniqueValues = (field) => {
    const counts = {};
    dramas.forEach(d => {
      const rawVal = d[field];
      if (rawVal) {
        if (field === 'tags' || field === 'actors') {
          String(rawVal).split(/[,，]/).forEach(v => {
            const trimmed = v.trim();
            if (trimmed && !hiddenSuggestions.includes(trimmed)) {
              counts[trimmed] = (counts[trimmed] || 0) + 1;
            }
          });
        } else {
          const trimmed = String(rawVal).trim();
          if (trimmed && !hiddenSuggestions.includes(trimmed)) {
            counts[trimmed] = (counts[trimmed] || 0) + 1;
          }
        }
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
  };

  const handleEdit = (drama) => { setCurrentDrama(drama); setActiveDropdown(null); setIsModalOpen(true); };
  
  const handleDelete = (id) => { 
    if (!id && id !== 0) return;
    if(window.confirm("要关闭这台电视(删除记录)吗？")) {
      setDramas(prev => prev.filter(d => d.id !== id)); 
    }
  };
  
  const handleAddNew = () => {
    setCurrentDrama({ 
      id: null, title: "", totalEpisodes: "", watchedEpisodes: 0, status: "watching", 
      platform: "", rating: 0, group: "", actors: "", tags: "", note: "" 
    });
    setActiveDropdown(null);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newItem = {
      id: currentDrama.id || Date.now(),
      title: fd.get('title') || "未命名频道",
      totalEpisodes: Number(fd.get('totalEpisodes')),
      watchedEpisodes: Number(fd.get('watchedEpisodes')),
      status: fd.get('status'),
      platform: fd.get('platform'),
      rating: Number(fd.get('rating')),
      group: fd.get('group'),
      actors: fd.get('actors'),
      tags: fd.get('tags'),
      note: fd.get('note'),
    };
    if (newItem.totalEpisodes > 0 && newItem.watchedEpisodes >= newItem.totalEpisodes && newItem.status === 'watching') {
      newItem.status = 'completed';
    }
    setDramas(prev => currentDrama.id ? prev.map(d => d.id === currentDrama.id ? newItem : d) : [newItem, ...prev]);
    setIsModalOpen(false);
  };

  // --- 万能评分解析函数 (修复版) ---
  const parseRating = (val) => {
    if (!val) return 0;
    const strVal = String(val).trim();
    if (!strVal) return 0;

    let normalized = strVal.replace(/[\uff01-\uff5e]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
    normalized = normalized.replace(',', '.');

    const numMatch = normalized.match(/(\d+(\.\d+)?)/);
    if (numMatch) {
      const num = parseFloat(numMatch[0]);
      if (!isNaN(num) && num > 0) return num;
    }

    if (strVal.includes('★')) {
      return (strVal.match(/★/g) || []).length;
    }

    return 0;
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        if (lines.length < 2) return alert("CSV 似乎是空的或格式不正确");
        
        const headers = lines[0].replace(/^\ufeff/, '').split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
        const newDramas = [];
        let successCount = 0;
        
        for(let i=1; i<lines.length; i++) {
          if(!lines[i].trim()) continue;
          
          const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          const entry = { 
            id: Date.now() + i + Math.random(), 
            title: "", totalEpisodes: 0, watchedEpisodes: 0, status: "watching",
            platform: "", rating: 0, group: "", actors: "", tags: "", note: "" 
          };
          
          headers.forEach((h, index) => {
            let val = values[index] ? values[index].trim().replace(/^"|"$/g, '').trim() : '';
            if (!val) return;

            if(h.includes('title') || h.includes('剧名') || h.includes('name')) entry.title = val;
            else if(h.includes('total') || h.includes('总集')) entry.totalEpisodes = Number(val) || 0;
            else if(h.includes('watch') || h.includes('已看') || h.includes('progress')) entry.watchedEpisodes = Number(val) || 0;
            else if(h.includes('status') || h.includes('状态')) {
               const v = val.toLowerCase();
               if(v === 'completed' || v === '是' || v.includes('完')) entry.status = 'completed';
               else if(v === 'watching' || v === '否' || v.includes('追')) entry.status = 'watching';
               else if(v === 'dropped' || v.includes('弃')) entry.status = 'dropped';
               else if(v === 'wishlist' || v.includes('想')) entry.status = 'wishlist';
            }
            else if(h.includes('rate') || h.includes('评分') || h.includes('score') || h.includes('star') || h.includes('推荐')) {
               entry.rating = parseRating(val);
            }
            else if(h.includes('plat') || h.includes('平台')) entry.platform = val;
            else if(h.includes('group') || h.includes('系列') || h.includes('原作') || h.includes('original')) entry.group = val;
            else if(h.includes('actor') || h.includes('主演') || h.includes('cast')) entry.actors = val;
            else if(h.includes('tag') || h.includes('标签')) entry.tags = val;
            else if(h.includes('note') || h.includes('备注')) entry.note = val;
          });

          if(entry.title) {
            newDramas.push(entry);
            successCount++;
          }
        }
        
        if (successCount > 0) {
          setDramas(prev => [...prev, ...newDramas]);
          alert(`成功导入 ${successCount} 条记录！`);
        } else {
          alert("未能识别有效数据，请检查CSV格式。");
        }
      } catch (err) {
        alert("导入解析出错：" + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleExport = () => {
    const headers = ["剧名", "原作", "主演", "标签", "已看", "总集", "状态", "评分", "平台", "备注"];
    const csvContent = [
      headers.join(","),
      ...dramas.map(d => [
        `"${d.title || ''}"`,
        `"${d.group || ''}"`, 
        `"${d.actors || ''}"`,
        `"${d.tags || ''}"`,
        d.watchedEpisodes,
        d.totalEpisodes,
        d.status,
        d.rating,
        `"${d.platform || ''}"`,
        `"${d.note || ''}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `tv_log_backup_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = dramas.filter(d => {
    const s = searchQuery.toLowerCase();
    const match = (val) => String(val || "").toLowerCase().includes(s);
    
    return (filterStatus === 'all' || d.status === filterStatus) && 
           (match(d.title) || 
            match(d.group) || 
            match(d.actors) || 
            match(d.tags)
           );
  });

  const handleHideSuggestion = (val) => {
    setHiddenSuggestions(prev => [...prev, val]);
  };

  const RetroDropdown = ({ field, currentValue, onSelect }) => {
    const suggestions = getUniqueValues(field);
    if (suggestions.length === 0) return null;

    return (
      <div className="absolute top-full left-0 w-full mt-1 bg-[#fdfbf7] border-2 border-[#ccc] shadow-[4px_4px_0px_rgba(0,0,0,0.15)] max-h-32 overflow-y-auto z-50 rounded-sm scrollbar-thin">
        {suggestions.map(val => (
          <div key={val} className="flex justify-between items-center border-b border-[#eee] last:border-0 hover:bg-[#f2efe9] group">
            <button 
              type="button"
              onClick={() => onSelect(val)}
              className="flex-1 text-left px-3 py-2 text-xs font-mono text-[#555] hover:text-[#000]"
            >
              {val}
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleHideSuggestion(val); }}
              className="px-3 py-2 text-[#aaa] hover:text-[#f87171] opacity-0 group-hover:opacity-100 transition-opacity"
              title="删除"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  };

  const FilterKnob = ({ status, icon, label }) => {
    const isActive = filterStatus === status;
    return (
      <button
        onClick={() => setFilterStatus(status)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative group
          ${isActive 
            ? 'bg-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] translate-y-[1px]' 
            : 'bg-[#222] shadow-[0_4px_8px_rgba(0,0,0,0.5),0_2px_0_#000,inset_0_1px_0_rgba(255,255,255,0.1)] -translate-y-[2px] hover:-translate-y-[3px]' 
          }`}
        title={label}
      >
        <div className={`absolute top-1 w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#4ade80] shadow-[0_0_5px_#4ade80]' : 'bg-[#333]'}`}></div>
        <div className={`font-bold text-xs ${isActive ? 'text-[#eee]' : 'text-[#666] group-hover:text-[#999]'}`}>
           {icon}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#d8d3cd] p-4 md:p-8 font-sans pb-24 relative overflow-hidden text-[#333]">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: paperTexture }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#2b2b2b] tracking-tight mb-1" style={{textShadow: '1px 1px 0px rgba(255,255,255,0.5)'}}>
              TV-LOG <span className="text-[#888] font-serif italic text-lg font-normal">Retro System</span>
            </h1>
            <p className="text-[#777] font-medium text-sm ml-1">SIGNAL STRENGTH: {dramas.length} CHANNELS</p>
          </div>
          
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <button onClick={handleExport} className="bg-[#dcd8cf] text-[#555] px-4 py-3 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-all flex items-center gap-2 font-bold active:translate-y-[2px] active:shadow-none border-2 border-[#bbb] group">
              <Icons.Download /> 
              <span className="hidden sm:inline text-xs tracking-wider">BACKUP</span>
            </button>

            <button onClick={() => fileInputRef.current?.click()} className="bg-[#dcd8cf] text-[#555] px-4 py-3 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-all flex items-center gap-2 font-bold active:translate-y-[2px] active:shadow-none border-2 border-[#bbb] group">
              <Icons.Upload /> 
              <span className="hidden sm:inline text-xs tracking-wider">IMPORT</span>
            </button>
            <input type="file" ref={fileInputRef} accept=".csv" className="hidden" onChange={handleImport} />

            <button onClick={handleAddNew} className="bg-[#2b2b2b] text-[#f0f0f0] px-6 py-3 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-all flex items-center gap-2 font-bold active:translate-y-[2px] active:shadow-none border-2 border-[#111]">
              <Icons.Plus /> NEW TV
            </button>
          </div>
        </div>

        {/* Search Console */}
        <div className="bg-[#2b2b2b] p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6 mb-8 max-w-2xl border-b-4 border-b-[#111]">
          <div className="flex-1 w-full flex items-center bg-[#1a1a1a] rounded-lg border-2 border-[#444] px-3 shadow-inner h-12">
            <div className="text-[#666] mr-2"><Icons.Search /></div>
            <input 
              type="text" 
              placeholder="SEARCH CHANNEL..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-[#4ade80] placeholder:text-[#444] h-full font-mono text-sm tracking-wider"
              style={{textShadow: '0 0 5px rgba(74, 222, 128, 0.5)'}}
            />
          </div>
          <div className="flex gap-4 p-2 bg-[#1a1a1a] rounded-xl border border-[#333] shadow-inner">
            <FilterKnob status="all" icon="ALL" label="全部" />
            <FilterKnob status="watching" icon={<Icons.Play />} label="追剧中" />
            <FilterKnob status="wishlist" icon={<Icons.Pause />} label="待办/暂停" />
            <FilterKnob status="completed" icon={<Icons.Check />} label="已看完" />
            {/* 修复：这里改成 Icons.Stop */}
            <FilterKnob status="dropped" icon={<Icons.Stop />} label="弃剧" />
          </div>
        </div>

        {/* TV Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center text-[#999] bg-[#e5e2dd] border-4 border-dashed border-[#ccc] rounded-3xl">
               <p className="font-mono text-xl">NO SIGNAL...</p>
             </div>
          ) : (
             filtered.map((drama, index) => {
               const cfg = statusConfig[drama.status] || statusConfig['watching'];
               const progress = drama.totalEpisodes ? Math.min(100, (drama.watchedEpisodes/drama.totalEpisodes)*100) : 0;
               
               return (
                 <div key={drama.id} className="relative group">
                    <div className="bg-[#333] rounded-3xl p-4 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.1)] border-b-8 border-r-4 border-[#111] relative">
                      {/* Antenna */}
                      <div className="absolute -top-6 left-8 w-1 h-8 bg-[#444] -rotate-12 z-0 origin-bottom transition-transform group-hover:rotate-0"></div>
                      <div className="absolute -top-6 left-12 w-1 h-8 bg-[#444] rotate-12 z-0 origin-bottom transition-transform group-hover:rotate-0"></div>
                      
                      <div className="flex gap-4">
                        {/* Screen */}
                        <div className={`flex-1 ${cfg.screen} rounded-2xl border-4 border-[#111] relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]`} style={{ minHeight: '160px' }}>
                           <div className="absolute inset-0 pointer-events-none z-10" style={{ background: scanline, backgroundSize: '100% 4px' }}></div>
                           <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                           <div className="p-4 relative z-0 h-full flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-[10px] bg-black/10 px-1.5 rounded text-black/60">CH-{String(drama.id).slice(-2)}</span>
                                <div className={`flex items-center gap-1 font-mono text-[10px] font-bold ${cfg.text} bg-black/80 px-2 py-0.5 rounded-full border border-white/10`}>
                                   <div className={`w-1.5 h-1.5 rounded-full ${cfg.color} animate-pulse`}></div>
                                   {cfg.label}
                                </div>
                              </div>
                              <h3 className="font-bold text-[#2b2b2b] text-lg leading-tight tracking-wide line-clamp-2" style={{textShadow: '1px 1px 0 rgba(255,255,255,0.5)'}}>
                                {drama.title}
                              </h3>
                              
                              {/* Rating Display */}
                              {drama.rating > 0 && (
                                <div className="flex items-center gap-1 mb-2 mt-1">
                                  <div className="flex text-[10px]">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                      let fill = 0;
                                      if (drama.rating >= star) fill = 100;
                                      else if (drama.rating >= star - 0.5) fill = 50;

                                      return (
                                        <svg key={star} width="12" height="12" viewBox="0 0 24 24" className="text-[#fbbf24]">
                                          <defs>
                                            <linearGradient id={`grad-${drama.id}-${star}`}>
                                              <stop offset={`${fill}%`} stopColor="currentColor"/>
                                              <stop offset={`${fill}%`} stopColor="#d1d5db"/>
                                            </linearGradient>
                                          </defs>
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#grad-${drama.id}-${star})`} />
                                        </svg>
                                      );
                                    })}
                                  </div>
                                  <span className="text-[10px] font-mono text-[#666] font-bold pt-0.5 opacity-60 ml-0.5">{drama.rating}</span>
                                </div>
                              )}

                              {drama.actors && (
                                <div className="flex items-center gap-1 text-[10px] text-[#555] font-mono mt-0 mb-1">
                                  <Icons.User />
                                  <span className="truncate">{drama.actors}</span>
                                </div>
                              )}
                              {drama.group && (
                                <div className="mt-1 mb-2 inline-block px-2 py-0.5 bg-[#2b2b2b] text-white text-[10px] font-mono rounded-sm truncate max-w-full opacity-80">
                                  原作: {drama.group}
                                </div>
                              )}
                              <div className="mt-auto mb-2">
                                <div className="flex justify-between text-[10px] font-mono text-[#555] mb-1">
                                  <span>VOL: {drama.watchedEpisodes}</span>
                                  <span>MAX: {drama.totalEpisodes || '??'}</span>
                                </div>
                                <div className="h-1.5 bg-[#000]/10 w-full rounded-sm overflow-hidden flex gap-[1px]">
                                   {Array.from({length: 20}).map((_, i) => (
                                      <div key={i} className={`flex-1 h-full ${i/20 * 100 < progress ? 'bg-[#2b2b2b]' : 'bg-transparent'}`}></div>
                                   ))}
                                </div>
                              </div>
                              {drama.note && (
                                <div className="mt-1 text-[9px] text-center bg-black/80 text-white/90 px-1 py-0.5 rounded font-mono truncate border-x-4 border-transparent">
                                  {drama.note}
                                </div>
                              )}
                           </div>
                        </div>

                        {/* Controls */}
                        <div className="w-12 flex flex-col items-center gap-4 py-2 bg-[#222] rounded-xl border border-[#444] shadow-inner relative z-20">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleEdit(drama); }} 
                             className="w-8 h-8 rounded-full bg-[#111] border-b-2 border-[#444] shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#666] hover:text-[#4ade80] hover:rotate-45 transition-all active:scale-95 group/btn cursor-pointer"
                           >
                              <Icons.Edit />
                           </button>
                           <button 
                             type="button" 
                             onClick={(e) => { 
                               e.stopPropagation(); 
                               handleDelete(drama.id); 
                             }} 
                             className="w-8 h-8 rounded-full bg-[#111] border-b-2 border-[#444] shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#666] hover:text-[#f87171] hover:-rotate-45 transition-all active:scale-95 cursor-pointer"
                           >
                              <Icons.Trash />
                           </button>
                           <div className="mt-auto space-y-1 w-full px-2 pointer-events-none">
                             {[1,2,3,4].map(i => <div key={i} className="h-0.5 bg-[#000] w-full rounded-full shadow-[0_1px_0_#333]"></div>)}
                           </div>
                        </div>
                      </div>
                      
                      {/* Feet */}
                      <div className="absolute -bottom-2 left-6 w-4 h-3 bg-[#111] rounded-b-lg"></div>
                      <div className="absolute -bottom-2 right-6 w-4 h-3 bg-[#111] rounded-b-lg"></div>
                    </div>
                 </div>
               );
             })
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentDrama && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#f2efe9] w-full max-w-md shadow-2xl relative z-10 rounded-sm overflow-hidden" style={{ backgroundImage: paperTexture }}>
            <div className="relative bg-[#e3ded6] p-4 border-b-2 border-dashed border-[#ccc]">
              <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#000]/60"></div> 
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#000]/60"></div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-[#888] tracking-widest uppercase">SYSTEM INPUT</span>
                  <h3 className="font-black text-xl text-[#333] uppercase">EDIT DATA</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-[#888] hover:text-[#333]"><Icons.Close /></button>
              </div>
            </div>
            
            <div className="px-8 py-6 max-h-[80vh] overflow-y-auto no-scrollbar" onClick={() => setActiveDropdown(null)}>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#999] uppercase">TITLE</label>
                  <input 
                    name="title" required 
                    value={currentDrama.title || ''} 
                    onChange={e => setCurrentDrama({...currentDrama, title: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#ccc] focus:border-[#333] outline-none py-2 text-lg font-serif font-bold text-[#333] placeholder:text-[#ccc]" 
                  />
                </div>

                {/* Original Work */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#999] uppercase flex items-center gap-1"><Icons.Book /> Original Work (原作)</label>
                  <input 
                    name="group" 
                    value={currentDrama.group || ''} 
                    onChange={e => setCurrentDrama({...currentDrama, group: e.target.value})} 
                    className="w-full bg-transparent border-b border-[#ccc] py-1 text-sm font-mono outline-none" 
                    placeholder="改编自..." 
                  />
                </div>

                {/* Actors */}
                <div className="space-y-1 relative">
                  <label className="text-xs font-bold text-[#999] uppercase flex items-center gap-1"><Icons.User /> Cast (主演)</label>
                  <div className="flex items-center border-b border-[#ccc]">
                    <input 
                      name="actors" 
                      value={currentDrama.actors || ''} 
                      onChange={e => setCurrentDrama({...currentDrama, actors: e.target.value})} 
                      className="w-full bg-transparent py-1 text-sm font-mono outline-none" 
                      placeholder="主演..." 
                    />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'actors' ? null : 'actors'); }}
                      className="text-[#999] hover:text-[#333] px-2"
                    >
                      <Icons.List />
                    </button>
                  </div>
                  {activeDropdown === 'actors' && (
                    <RetroDropdown 
                      field="actors" 
                      currentValue={currentDrama.actors}
                      onSelect={(v) => {
                        const newVal = currentDrama.actors ? `${currentDrama.actors}, ${v}` : v;
                        setCurrentDrama(prev => ({...prev, actors: newVal}));
                        setActiveDropdown(null);
                      }}
                    />
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-1 relative">
                  <label className="text-xs font-bold text-[#999] uppercase flex items-center gap-1"><Icons.Hash /> Tags (标签)</label>
                  <div className="flex items-center border-b border-[#ccc]">
                    <input 
                      name="tags" 
                      value={currentDrama.tags || ''} 
                      onChange={e => setCurrentDrama({...currentDrama, tags: e.target.value})} 
                      className="w-full bg-transparent py-1 text-sm font-mono outline-none" 
                      placeholder="标签..." 
                    />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'tags' ? null : 'tags'); }}
                      className="text-[#999] hover:text-[#333] px-2"
                    >
                      <Icons.List />
                    </button>
                  </div>
                  {activeDropdown === 'tags' && (
                    <RetroDropdown 
                      field="tags" 
                      currentValue={currentDrama.tags}
                      onSelect={(v) => {
                        const newVal = currentDrama.tags ? `${currentDrama.tags}, ${v}` : v;
                        setCurrentDrama(prev => ({...prev, tags: newVal}));
                        setActiveDropdown(null);
                      }}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#999] uppercase">Watched</label>
                    <input type="number" name="watchedEpisodes" min="0" value={currentDrama.watchedEpisodes} onChange={e => setCurrentDrama({...currentDrama, watchedEpisodes: Number(e.target.value)})} className="w-full bg-[#e8e4dc] border border-[#d1cec7] p-2 text-center font-mono font-bold outline-none rounded-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#999] uppercase">Total</label>
                    <input type="number" name="totalEpisodes" min="0" value={currentDrama.totalEpisodes} onChange={e => setCurrentDrama({...currentDrama, totalEpisodes: Number(e.target.value)})} className="w-full bg-[#e8e4dc] border border-[#d1cec7] p-2 text-center font-mono font-bold outline-none rounded-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="relative">
                      <select 
                        name="status" 
                        value={currentDrama.status} 
                        onChange={e => setCurrentDrama({...currentDrama, status: e.target.value})}
                        className="w-full appearance-none bg-[#e8e4dc] border border-[#d1cec7] rounded-full py-2 pl-4 pr-10 text-sm font-bold text-[#555] outline-none shadow-sm cursor-pointer hover:bg-[#dedad2]"
                      >
                        {Object.keys(statusConfig).map(k => <option key={k} value={k}>{statusConfig[k].label}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#999]">
                        <Icons.ChevronDown />
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-bold text-[#999]"><span>RATING: {currentDrama.rating}</span></div>
                      <input type="range" name="rating" min="0" max="5" step="0.5" value={currentDrama.rating} onChange={(e) => setCurrentDrama({...currentDrama, rating: Number(e.target.value)})} className="w-full h-1 bg-[#ccc] mt-3 appearance-none rounded-full accent-[#333]" />
                  </div>
                </div>
                
                {/* Platform */}
                <div className="space-y-1 relative">
                  <label className="text-xs font-bold text-[#999] uppercase">Platform</label>
                  <div className="flex items-center border-b border-[#ccc]">
                    <input 
                      name="platform" 
                      value={currentDrama.platform || ''} 
                      onChange={e => setCurrentDrama({...currentDrama, platform: e.target.value})} 
                      className="w-full bg-transparent py-1 text-sm font-mono outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'platform' ? null : 'platform'); }}
                      className="text-[#999] hover:text-[#333] px-2"
                    >
                      <Icons.List />
                    </button>
                  </div>
                  {activeDropdown === 'platform' && (
                    <RetroDropdown 
                      field="platform" 
                      currentValue={currentDrama.platform}
                      onSelect={(v) => {
                        setCurrentDrama(prev => ({...prev, platform: v}));
                        setActiveDropdown(null);
                      }}
                    />
                  )}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-[#999] uppercase">Memo</label>
                    <textarea name="note" rows="2" value={currentDrama.note || ''} onChange={e => setCurrentDrama({...currentDrama, note: e.target.value})} className="w-full bg-[#fcf8e3] border border-[#faebcc] p-2 text-sm font-mono text-[#8a6d3b] outline-none resize-none rounded-sm" />
                </div>

                <button type="submit" className="w-full py-4 bg-[#2b2b2b] text-[#eee] font-bold tracking-widest shadow-lg hover:bg-[#000] transition-colors mt-4 rounded-sm border border-[#111]">SAVE DATA</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
