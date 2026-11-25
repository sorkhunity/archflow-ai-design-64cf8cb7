import React, { useState } from 'react';
import { Users, CheckCircle2, AlertCircle, ThumbsUp, Sparkles, MessageSquare, Plus } from 'lucide-react';
import { VoteItem } from '../types';

interface FamilyVoteRoomProps {
  voteItems: VoteItem[];
  onVote: (itemId: string, optionId: string) => void;
  onShowToast: (msg: string) => void;
}

export function FamilyVoteRoom({ voteItems, onVote, onShowToast }: FamilyVoteRoomProps) {
  const [newTopic, setNewTopic] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    onShowToast('موضوع اختلاف سلیقه جدید با موفقیت ثبت و برای اعضا ارسال شد.');
    setNewTopic('');
    setNewOptA('');
    setNewOptB('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E0A96D]/20 text-[#E0A96D] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>اتاق تصمیم‌گیری و حل تعارض خانوادگی</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">مدیریت سلیقه زوجین و توافق جمعی</h1>
          <p className="text-sm text-neutral-300">اختلاف سلیقه‌ها را با پیشنهادهای هوش مصنوعی و رأی‌گیری بی‌طرفانه به توافق شیرین تبدیل کنید.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#E0A96D] text-[#1E2229] font-black text-xs flex items-center gap-2 hover:bg-[#cc9153] transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن چالش جدید برای رأی‌گیری</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {voteItems.map((item) => {
          const totalVotes = item.options.reduce((acc, o) => acc + o.votes, 0);
          return (
            <div key={item.id} className="backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${item.status === 'conflict' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                    {item.status === 'conflict' ? '⚠️ نیاز به توافق مجدد' : '✅ توافق حاصل شد'}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">مجموع آرا: {totalVotes} نفر</span>
                </div>

                <h3 className="text-base font-black text-white mb-6 leading-relaxed">{item.topic}</h3>

                <div className="space-y-4 mb-6">
                  {item.options.map((opt) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 50;
                    return (
                      <div key={opt.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative overflow-hidden transition-all hover:border-[#E0A96D]/50">
                        <div className="absolute bottom-0 left-0 top-0 bg-[#E0A96D]/15 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                        <div className="relative z-10 flex items-center justify-between gap-4">
                          <div>
                            <span className="block text-xs font-bold text-white mb-1">{opt.label}</span>
                            <span className="text-[11px] text-neutral-400">{opt.votes} رأی ({percentage}٪)</span>
                          </div>
                          <button
                            onClick={() => {
                              onVote(item.id, opt.id);
                              onShowToast('رأی شما ثبت شد!');
                            }}
                            className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-[#E0A96D] hover:text-[#1E2229] transition-all flex items-center gap-1.5 border border-white/20"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>رأی می‌دهم</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
                  پیشنهاد هوش مصنوعی: تلفیق دو متریال با هارمونی گرم
                </span>
                <span className="text-[#E0A96D] font-bold">فعال</span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="backdrop-blur-2xl bg-[#1E2229] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">طرح اختلاف سلیقه جدید</h3>
            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">موضوع مورد اختلاف (مثلاً: رنگ کابینت آشپزخانه)</label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="موضوع را بنویسید..."
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">گزینه الف</label>
                  <input
                    type="text"
                    required
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    placeholder="پیشنهاد اول..."
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-2">گزینه ب</label>
                  <input
                    type="text"
                    required
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    placeholder="پیشنهاد دوم..."
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E0A96D] text-[#1E2229] font-black text-xs hover:bg-[#cc9153] transition-all shadow-lg"
                >
                  ثبت موضوع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
