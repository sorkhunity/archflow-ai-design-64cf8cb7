import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, Box, Users, DollarSign, Layers, ShieldCheck, Heart, Sliders, ChevronRight } from 'lucide-react';
import { PERSONAS, INITIAL_PROJECTS, PRICING_PLANS, TOKEN_PACKAGES, INITIAL_VOTE_ITEMS } from './data/sampleData';
import { Project } from './types';
import { GlassNavbar } from './components/GlassNavbar';
import { Toast, Modal } from './components/CommonUI';
import { FamilyVoteRoom } from './components/FamilyVoteRoom';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'landing' | 'profiling' | 'studio' | 'vote' | 'pricing' | 'dashboard'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Profiling state
  const [selectedPersona, setSelectedPersona] = React.useState(PERSONAS[0].id);
  const [coupleStyleA, setCoupleStyleA] = React.useState('مدرن ایرانی');
  const [coupleStyleB, setCoupleStyleB] = React.useState('مینیمال اسکاندیناوی');
  const [budgetVal, setBudgetVal] = React.useState(350000000);
  const [cadFileUploaded, setCadFileUploaded] = React.useState(false);

  // Studio / AI Render state
  const [selectedProject, setSelectedProject] = React.useState<Project>(INITIAL_PROJECTS[0]);
  const [isRendering, setIsRendering] = React.useState(false);
  const [generatedRenders, setGeneratedRenders] = React.useState<string[]>([
    '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
    '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg'
  ]);

  // Vote state
  const [voteItems, setVoteItems] = React.useState(INITIAL_VOTE_ITEMS);

  // Projects state
  const [projects, setProjects] = React.useState<Project[]>(INITIAL_PROJECTS);
  const [showNewProjModal, setShowNewProjModal] = React.useState(false);
  const [newProjName, setNewProjName] = React.useState('');
  const [newProjBudget, setNewProjBudget] = React.useState('400000000');
  const [newProjStyle, setNewProjStyle] = React.useState('مدرن گرم');

  // Pricing & Tokens
  const [userTokens, setUserTokens] = React.useState(15);
  const [selectedPlanModal, setSelectedPlanModal] = React.useState<string | null>(null);

  // URL hash sync
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      if (['landing', 'profiling', 'studio', 'vote', 'pricing', 'dashboard'].includes(hash)) {
        setActiveTab(hash as any);
      }
    };
    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const changeTab = (tab: any) => {
    setActiveTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAiAnalysis = () => {
    setToastMessage('هوش مصنوعی در حال تحلیل سلیقه زوجین و تطابق بودجه است...');
    setTimeout(() => {
      setToastMessage('گزارش هماهنگی سلیقه و پالت متریال اختصاصی آماده شد!');
      changeTab('studio');
    }, 2000);
  };

  const handleGenerateAiRender = () => {
    if (userTokens < 2) {
      setToastMessage('توکن شما کافی نیست! لطفاً بسته توکن تهیه کنید.');
      changeTab('pricing');
      return;
    }
    setIsRendering(true);
    setToastMessage('موتور هوش مصنوعی در حال رندرینگ سه‌بعدی و چیدمان مبلمان است...');
    setTimeout(() => {
      setIsRendering(false);
      setUserTokens(prev => prev - 2);
      setGeneratedRenders(prev => [
        '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg',
        ...prev
      ]);
      setToastMessage('رندر جدید با موفقیت تولید و به گالری اضافه شد!');
    }, 2500);
  };

  const handleVote = (itemId: string, optionId: string) => {
    setVoteItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedOpts = item.options.map(opt => ({
          ...opt,
          votes: opt.id === optionId ? opt.votes + 1 : opt.votes
        }));
        return { ...item, options: updatedOpts };
      }
      return item;
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;
    const created: Project = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      persona: 'سارا احمدی',
      budget: Number(newProjBudget) || 350000000,
      style: newProjStyle,
      materials: ['چوب بلوط', 'سنگ مرمر', 'فلز طلایی'],
      status: 'pending_approval',
      renderCount: 3,
      area: 130,
      createdAt: '۱۴۰۳/۰۸/۲۰',
      image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
      description: 'پروژه جدید ثبت شده در پنل آرک‌فلو با تحلیل خودکار هوش مصنوعی.'
    };
    setProjects([created, ...projects]);
    setSelectedProject(created);
    setShowNewProjModal(false);
    setNewProjName('');
    setToastMessage('پروژه جدید با موفقیت ایجاد شد.');
    changeTab('studio');
  };

  return (
    <div className="min-h-dvh bg-[#1E2229] text-white font-sans selection:bg-[#E0A96D] selection:text-[#1E2229] pb-20">
      <GlassNavbar 
        activeTab={activeTab} 
        setActiveTab={changeTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <main>
        {/* LANDING TAB */}
        {activeTab === 'landing' && (
          <div className="space-y-20 pb-16">
            {/* Hero Section */}
            <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E0A96D]/10 to-transparent rounded-3xl filter blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6 text-start">
                  <div className="inline-flex items-center gap-2 bg-[#E0A96D]/15 border border-[#E0A96D]/30 text-[#E0A96D] px-4 py-1.5 rounded-full text-xs font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>هوش مصنوعی نسل جدید طراحی داخلی و بازسازی منزل</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                    پایان اختلاف سلیقه زوجین در <span className="text-[#E0A96D]">بازسازی منزل</span>
                  </h1>

                  <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                    با آرک‌فلو، سلیقه شما و همسرتان در قالب یک طراحی ۳بعدی هماهنگ می‌شود، بودجه۵۰۰ میلیونی شما دقیق مدیریت می‌گردد و نیازی به جلسات طولانی با معمار نیست.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => changeTab('profiling')}
                      className="px-8 py-4 rounded-2xl bg-[#E0A96D] text-[#1E2229] font-black text-sm flex items-center gap-3 hover:bg-[#cc9153] transition-all shadow-xl hover:scale-105"
                    >
                      <span>شروع پرسشنامه هوشمند سلیقه</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => changeTab('studio')}
                      className="px-8 py-4 rounded-2xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
                    >
                      مشاهده رندرهای زنده AI
                    </button>
                  </div>

                  {/* Trust Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                    <div>
                      <span className="block text-2xl sm:text-3xl font-black text-[#E0A96D]">+۱,۴۰۰</span>
                      <span className="text-xs text-neutral-400">پروژه موفق بازسازی</span>
                    </div>
                    <div>
                      <span className="block text-2xl sm:text-3xl font-black text-white">۹۸٪</span>
                      <span className="text-xs text-neutral-400">رضایت زوجین در توافق سلیقه</span>
                    </div>
                    <div>
                      <span className="block text-2xl sm:text-3xl font-black text-[#E0A96D]">۴.۹/۵</span>
                      <span className="text-xs text-neutral-400">امتیاز کاربران معمار</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                    <img 
                      src="/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg" 
                      alt="طراحی داخلی هوشمند آرک‌فلو"
                      className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-black/40 border border-white/20 p-5 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#E0A96D]">پروژه نمونه: آپارتمان سعادت‌آباد</span>
                        <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">توافق شده</span>
                      </div>
                      <p className="text-xs text-neutral-200">تلفیق سبک کلاسیک ایرانی و مدرن با بودجه ۳۵۰ میلیون تومان</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Personas Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold text-[#E0A96D] uppercase tracking-wider mb-2 block">پرسونای کاربران ما</span>
                <h2 className="text-3xl font-black text-white mb-4">آرک‌فلو برای چه کسانی طراحی شده است؟</h2>
                <p className="text-sm text-neutral-300">فرقی نمی‌کند خانواده‌ای در حال بازسازی باشید، معمار حرفه‌ای یا خریدار مسکن نوساز؛ آرک‌فلو برای شماست.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PERSONAS.map((p) => (
                  <div key={p.id} className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-[#E0A96D]/50 transition-all shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E0A96D]" />
                        <div>
                          <h3 className="text-base font-black text-white">{p.name}</h3>
                          <span className="text-xs text-[#E0A96D] font-bold">{p.title}</span>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs text-neutral-300 mb-6">
                        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                          <span className="font-bold text-white block mb-1">🎯 هدف اصلی:</span>
                          {p.goal}
                        </div>
                        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                          <span className="font-bold text-white block mb-1">⚠️ چالش اصلی:</span>
                          {p.challenge}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPersona(p.id);
                        changeTab('profiling');
                      }}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#E0A96D] hover:text-[#1E2229] transition-all font-bold text-xs text-white border border-white/20"
                    >
                      شبیه‌سازی با این پرسونا
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROFILING TAB */}
        {activeTab === 'profiling' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#E0A96D] mb-2 block">پرسشنامه هوشمند سلیقه و آپلود CAD</span>
              <h1 className="text-3xl font-black text-white mb-3">کشف اختلاف سلیقه و هماهنگی زوجین</h1>
              <p className="text-sm text-neutral-300">سلیقه خود و همسرتان را وارد کنید تا هوش مصنوعی آرک‌فلو بهترین نقطه تعادل را پیدا کند.</p>
            </div>

            <div className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Persona selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-3">انتخاب کاربر / پرسونا</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id)}
                      className={`p-4 rounded-2xl border text-start transition-all flex items-center gap-3 ${
                        selectedPersona === p.id 
                          ? 'bg-[#E0A96D]/20 border-[#E0A96D] text-white' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="block text-xs font-bold text-white">{p.name}</span>
                        <span className="text-[10px] text-neutral-400">{p.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Couple styles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">سبک دلخواه نفر اول (مثلاً: سارا)</label>
                  <input
                    type="text"
                    value={coupleStyleA}
                    onChange={(e) => setCoupleStyleA(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">سبک دلخواه نفر دوم (مثلاً: همسر)</label>
                  <input
                    type="text"
                    value={coupleStyleB}
                    onChange={(e) => setCoupleStyleB(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-300">بودجه بازسازی (تومان)</label>
                  <span className="text-sm font-black text-[#E0A96D]">{budgetVal.toLocaleString('fa-IR')} تومان</span>
                </div>
                <input
                  type="range"
                  min="100000000"
                  max="2000000000"
                  step="50000000"
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(Number(e.target.value))}
                  className="w-full accent-[#E0A96D] bg-white/10 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* CAD Upload Simulation */}
              <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center bg-white/5 hover:border-[#E0A96D] transition-all">
                <Layers className="w-10 h-10 text-[#E0A96D] mx-auto mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">آپلود نقشه اتوکد (CAD) یا پلان دستی</h3>
                <p className="text-xs text-neutral-400 mb-4">فایل‌های dwg, pdf, jpg را بکشید و رها کنید</p>
                <button
                  type="button"
                  onClick={() => {
                    setCadFileUploaded(true);
                    setToastMessage('نقشه پلان با موفقیت اسکن شد!');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-[#E0A96D] hover:text-[#1E2229] transition-all border border-white/20"
                >
                  {cadFileUploaded ? '✅ پلان بارگذاری شد' : 'انتخاب و آپلود فایل پلان'}
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleRunAiAnalysis}
                  className="px-8 py-4 rounded-2xl bg-[#E0A96D] text-[#1E2229] font-black text-xs hover:bg-[#cc9153] transition-all shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تحلیل هوش مصنوعی و تولید پالت تعارض</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STUDIO / AI ENGINE TAB */}
        {activeTab === 'studio' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-bold text-[#E0A96D] mb-2 block">موتور رندرینگ و متریال هوش مصنوعی</span>
                <h1 className="text-3xl font-black text-white mb-2">{selectedProject.name}</h1>
                <p className="text-sm text-neutral-300">سبک: {selectedProject.style} | بودجه: {selectedProject.budget.toLocaleString('fa-IR')} تومان</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowNewProjModal(true)}
                  className="px-5 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/20"
                >
                  + پروژه جدید
                </button>
                <button
                  disabled={isRendering}
                  onClick={handleGenerateAiRender}
                  className="px-6 py-3 rounded-2xl bg-[#E0A96D] text-[#1E2229] font-black text-xs hover:bg-[#cc9153] transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isRendering ? 'در حال رندر هوش مصنوعی...' : 'تولید رندر جدید (۲ توکن)'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left sidebar: Projects & Materials */}
              <div className="lg:col-span-4 space-y-6">
                <div className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-sm font-black text-white mb-4">پروژه‌های شما</h3>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProject(p)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          selectedProject.id === p.id 
                            ? 'bg-[#E0A96D]/20 border-[#E0A96D]' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <span className="block text-xs font-bold text-white">{p.name}</span>
                          <span className="text-[10px] text-neutral-400">{p.persona}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-sm font-black text-white mb-4">پالت متریال پیشنهادی AI</h3>
                  <div className="space-y-3">
                    {selectedProject.materials.map((mat, idx) => (
                      <div key={idx} className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{mat}</span>
                        <span className="text-[#E0A96D] text-[11px]">درجه یک بازار</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main render gallery */}
              <div className="lg:col-span-8 space-y-6">
                <div className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-base font-black text-white mb-6">خروجی‌های ۳بعدی و رندرهای تولید شده</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {generatedRenders.map((renderUrl, idx) => (
                      <div key={idx} className="group relative rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                        <img src={renderUrl} alt={`رندر ${idx+1}`} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-bold text-white">رندر هوش مصنوعی شماره {idx+1} (کیفیت 4K)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VOTE TAB */}
        {activeTab === 'vote' && (
          <FamilyVoteRoom 
            voteItems={voteItems} 
            onVote={handleVote} 
            onShowToast={(msg) => setToastMessage(msg)} 
          />
        )}

        {/* PRICING TAB */}
        {activeTab === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#E0A96D] mb-2 block">پلن‌های اشتراک و توکن رندر</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">تعرفه‌های شفاف برای بازسازی هوشمند</h1>
              <p className="text-sm text-neutral-300">پلن مناسب خود را انتخاب کنید و از امکانات کامل آرک‌فلو بهره‌مند شوید.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {PRICING_PLANS.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`backdrop-blur-2xl rounded-3xl p-8 border relative flex flex-col justify-between shadow-2xl ${
                    plan.popular 
                      ? 'bg-[#E0A96D]/10 border-[#E0A96D]' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 right-8 bg-[#E0A96D] text-[#1E2229] px-4 py-1 rounded-full text-[11px] font-black shadow-lg">
                      پرفروش‌ترین معماران
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{plan.name}</h3>
                    <p className="text-xs text-neutral-300 mb-6">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-[#E0A96D]">{plan.price}</span>
                      <span className="text-xs text-neutral-400">تومان / {plan.period}</span>
                    </div>

                    <div className="space-y-3.5 mb-8">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#E0A96D] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlanModal(plan.name);
                      setToastMessage(`اشتراک «${plan.name}» با موفقیت فعال شد!`);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all shadow-lg ${
                      plan.popular 
                        ? 'bg-[#E0A96D] text-[#1E2229] hover:bg-[#cc9153]' 
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    خرید اشتراک {plan.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Token Packages */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-lg font-black text-white mb-2 text-center">خرید بسته‌های توکن اضافه رندر</h3>
              <p className="text-xs text-neutral-300 mb-8 text-center">اگر به رندرهای بیشتری نیاز دارید، توکن تهیه کنید.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {TOKEN_PACKAGES.map((tp) => (
                  <div key={tp.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#E0A96D]/50 transition-all">
                    <span className="text-xs font-bold text-[#E0A96D] block mb-1">{tp.name}</span>
                    <h4 className="text-xl font-black text-white mb-2">{tp.tokens} توکن</h4>
                    <span className="block text-sm text-neutral-300 mb-4">{tp.price}</span>
                    <button
                      onClick={() => {
                        setUserTokens(prev => prev + tp.tokens);
                        setToastMessage(`بسته ${tp.name} (${tp.tokens} توکن) اضافه شد!`);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#E0A96D] hover:text-[#1E2229] transition-all font-bold text-xs text-white border border-white/20"
                    >
                      خرید بسته
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-bold text-[#E0A96D] mb-2 block">داشبورد جامع مدیریت پروژه‌ها</span>
                <h1 className="text-3xl font-black text-white mb-2">سبد پروژه‌های بازسازی و طراحی</h1>
                <p className="text-sm text-neutral-300">موجودی توکن شما: <span className="text-[#E0A96D] font-black">{userTokens} توکن</span></p>
              </div>

              <button
                onClick={() => setShowNewProjModal(true)}
                className="px-6 py-3 rounded-2xl bg-[#E0A96D] text-[#1E2229] font-black text-xs hover:bg-[#cc9153] transition-all shadow-xl flex items-center gap-2"
              >
                <span>+ ایجاد پروژه جدید بازسازی</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="relative h-48">
                      <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 backdrop-blur-md bg-black/60 px-3 py-1 rounded-full text-[11px] font-bold text-[#E0A96D]">
                        {proj.persona}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-base font-black text-white mb-2">{proj.name}</h3>
                      <p className="text-xs text-neutral-300 mb-4 line-clamp-2">{proj.description}</p>
                      
                      <div className="space-y-2 text-xs text-neutral-400 mb-6">
                        <div className="flex justify-between">
                          <span>بودجه:</span>
                          <span className="text-white font-bold">{proj.budget.toLocaleString('fa-IR')} تومان</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متراژ:</span>
                          <span className="text-white font-bold">{proj.area} متر مربع</span>
                        </div>
                        <div className="flex justify-between">
                          <span>تعداد رندر:</span>
                          <span className="text-[#E0A96D] font-black">{proj.renderCount} رندر</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        changeTab('studio');
                      }}
                      className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-[#E0A96D] hover:text-[#1E2229] transition-all border border-white/20 flex items-center justify-center gap-2"
                    >
                      <span>ورود به استودیوی رندر</span>
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* New Project Modal */}
      <Modal isOpen={showNewProjModal} onClose={() => setShowNewProjModal(false)} title="ایجاد پروژه جدید بازسازی">
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-2">نام پروژه (مثلاً: بازسازی ویلای لواسان)</label>
            <input
              type="text"
              required
              value={newProjName}
              onChange={(e) => setNewProjName(e.target.value)}
              placeholder="نام پروژه..."
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-2">بودجه تقریبی (تومان)</label>
            <input
              type="text"
              required
              value={newProjBudget}
              onChange={(e) => setNewProjBudget(e.target.value)}
              placeholder="400000000"
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-2">سبک مد نظر</label>
            <input
              type="text"
              required
              value={newProjStyle}
              onChange={(e) => setNewProjStyle(e.target.value)}
              placeholder="مدرن / مینیمال / کلاسیک"
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowNewProjModal(false)}
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#E0A96D] text-[#1E2229] font-black text-xs hover:bg-[#cc9153] transition-all shadow-lg"
            >
              ایجاد و شروع طراحی
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
