import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, Globe, Shirt, RefreshCcw, Palette, HelpCircle, 
  Flame, Bookmark, Volume2, VolumeX, Eye, Share2, Check,
  Camera, X, Trash2, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import MannequinCanvas from './components/MannequinCanvas.jsx';
import Wardrobe from './components/Wardrobe.jsx';
import AIReviewModal from './components/AIReviewModal.jsx';
import { MOCK_ITEMS, PRESETS } from './data/mockItems.js';

// Sound effects synthesizer using Web Audio API (Zero external dependency)
class SoundPlayer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }
  playEquip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Ignored if sound blocked by browser policy
    }
  }
  playUnequip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {}
  }
}

const soundManager = new SoundPlayer();

export default function App() {
  const { t, i18n } = useTranslation();

  // State danh sách các món đồ đang mặc trên búp bê Mannequin
  const [equippedItems, setEquippedItems] = useState([
    MOCK_ITEMS.find((i) => i.id === 'top_nhat_binh_xanh'),
    MOCK_ITEMS.find((i) => i.id === 'bottom_quan_lua_trang'),
    MOCK_ITEMS.find((i) => i.id === 'shoes_guoc_moc_do'),
    MOCK_ITEMS.find((i) => i.id === 'acc_kinh_ram_matrix'),
  ].filter(Boolean));

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [skinTone, setSkinTone] = useState('#E0C8B1');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Model Silhouette, Sizing & Pose State (Chia sẻ giữa Mannequin & Wardrobe)
  const [modelType, setModelType] = useState('female'); // 'female' | 'male' | 'abstract'
  const [fitSize, setFitSize] = useState('M'); // 'S' | 'M' | 'L'
  const [modelPose, setModelPose] = useState('runway'); // 'runway' | 'hip' | 'royal' | 'grace'

  // Responsive tab view cho mobile (< lg)
  const [mobileActiveTab, setMobileActiveTab] = useState('model'); // 'model' | 'wardrobe'

  // Lookbook State (Lưu trữ các outfit yêu thích)
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [savedLooks, setSavedLooks] = useState([
    {
      id: 'look_1',
      title: 'Nhật Bình Cyber Queen',
      timestamp: 'Vừa xong',
      items: [
        MOCK_ITEMS.find((i) => i.id === 'top_nhat_binh_xanh'),
        MOCK_ITEMS.find((i) => i.id === 'bottom_quan_lua_trang'),
        MOCK_ITEMS.find((i) => i.id === 'shoes_guoc_moc_do'),
        MOCK_ITEMS.find((i) => i.id === 'acc_kinh_ram_matrix'),
      ].filter(Boolean),
    },
    {
      id: 'look_2',
      title: 'Ngũ Thân Hoàng Gia x Chunky',
      timestamp: 'Hôm nay',
      items: [
        MOCK_ITEMS.find((i) => i.id === 'top_ngu_than_vang'),
        MOCK_ITEMS.find((i) => i.id === 'bottom_jeans_baggy'),
        MOCK_ITEMS.find((i) => i.id === 'shoes_sneaker_chunky'),
        MOCK_ITEMS.find((i) => i.id === 'acc_kinh_ram_matrix'),
      ].filter(Boolean),
    },
  ]);

  // Toggle Sound
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  // Đổi ngôn ngữ (vi <-> en)
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  // Mặc thêm đồ vào Canvas (Click-to-Equip hoặc Drag-and-Drop)
  const handleEquip = (item) => {
    soundManager.playEquip();
    setEquippedItems((prev) => {
      if (item.category !== 'accessory') {
        const filtered = prev.filter((i) => i.category !== item.category);
        return [...filtered, item];
      }
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  // Tháo một món đồ
  const handleUnequip = (itemId) => {
    soundManager.playUnequip();
    setEquippedItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Lột sạch đồ / Reset
  const handleClearAll = () => {
    soundManager.playUnequip();
    setEquippedItems([]);
  };

  // Nạp trang phục mẫu (Preset)
  const applyPreset = (preset) => {
    soundManager.playEquip();
    const items = MOCK_ITEMS.filter((i) => preset.itemIds.includes(i.id));
    setEquippedItems(items);
    if (preset.gender === 'male' || preset.gender === 'female') {
      setModelType(preset.gender);
    }
  };

  // Lưu outfit hiện tại vào Lookbook
  const handleSaveToLookbook = () => {
    if (equippedItems.length === 0) return;
    const newLook = {
      id: `look_${Date.now()}`,
      title: `Outfit Phối #${savedLooks.length + 1}`,
      timestamp: 'Vừa lưu',
      items: [...equippedItems],
    };
    setSavedLooks([newLook, ...savedLooks]);
  };

  const skinTones = [
    { label: 'Sáng', value: '#F3DFC8' },
    { label: 'Tự nhiên', value: '#E0C8B1' },
    { label: 'Bánh mật', value: '#C9A383' },
    { label: 'Nâu ấm', value: '#8D5B4C' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white relative">
      {/* ======================================================== */}
      {/* HEADER: LOGO, PRESETS & CONTROLS */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Logo & Brand Identity */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <span className="text-lg">🇻🇳</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent">
                    VietVibe
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5" /> 2D Virtual Studio
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Phối Cổ Phục Hoàng Triều & Streetwear Gen Z
                </p>
              </div>
            </div>

            {/* Mobile quick actions in header */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setIsLookbookOpen(true)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
                title="Lookbook"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 text-xs font-bold rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                {i18n.language === 'vi' ? 'VI' : 'EN'}
              </button>
            </div>
          </div>

          {/* Preset Outfits Bar (Curated Fast Try) */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-1 scrollbar-gold w-full md:w-auto justify-start">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1 flex-shrink-0">
              <Shirt className="w-3.5 h-3.5 text-amber-400" />
              Gợi ý phối:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-slate-700 transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
                title={preset.subtitle}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Right Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Skin tone selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5" />
              {skinTones.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => setSkinTone(tone.value)}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                    skinTone === tone.value
                      ? 'scale-125 ring-2 ring-amber-400 border-white'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: tone.value }}
                  title={`Tone da: ${tone.label}`}
                />
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 text-xs rounded-xl border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-900 text-amber-400 border-slate-800 hover:bg-slate-800'
                  : 'bg-slate-900 text-slate-600 border-slate-800'
              }`}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Lookbook Button */}
            <button
              onClick={() => setIsLookbookOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-rose-400" />
              <span>Lookbook ({savedLooks.length})</span>
            </button>

            {/* Language Switcher */}
            <button
              id="lang-switcher-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{i18n.language === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {/* AI Review Header Shortcut */}
            <button
              id="header-ai-review-btn"
              onClick={() => setIsAIModalOpen(true)}
              disabled={equippedItems.length === 0}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                equippedItems.length > 0
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 text-slate-950 hover:brightness-110 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Review</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MOBILE SEGMENTED VIEW SWITCHER (< lg) */}
      {/* ======================================================== */}
      <div className="lg:hidden px-4 pt-3 pb-1 max-w-md mx-auto w-full z-20">
        <div className="grid grid-cols-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-lg">
          <button
            onClick={() => setMobileActiveTab('model')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileActiveTab === 'model'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🪞</span>
            <span>Phòng Thử Đồ ({equippedItems.length})</span>
          </button>
          <button
            onClick={() => setMobileActiveTab('wardrobe')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileActiveTab === 'wardrobe'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>👗</span>
            <span>Tủ Đồ Boutique</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN BODY: 2 COLUMNS (MANNEQUIN CANVAS & WARDROBE) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CỘT TRÁI (5 cols): Canvas búp bê Mannequin & 2D Layering */}
        <div
          className={`lg:col-span-5 h-[680px] sm:h-[720px] lg:h-[760px] lg:sticky lg:top-20 ${
            mobileActiveTab === 'model' ? 'block' : 'hidden lg:block'
          }`}
        >
          <MannequinCanvas
            equippedItems={equippedItems}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
            onClearAll={handleClearAll}
            onOpenAIReview={() => setIsAIModalOpen(true)}
            skinTone={skinTone}
            onSaveLookbook={handleSaveToLookbook}
            modelType={modelType}
            setModelType={setModelType}
            fitSize={fitSize}
            setFitSize={setFitSize}
            modelPose={modelPose}
            setModelPose={setModelPose}
          />
        </div>

        {/* CỘT PHẢI (7 cols): Tủ đồ Wardrobe Grid & Filter */}
        <div
          className={`lg:col-span-7 h-[680px] sm:h-[720px] lg:h-[760px] ${
            mobileActiveTab === 'wardrobe' ? 'block' : 'hidden lg:block'
          }`}
        >
          <Wardrobe
            equippedItems={equippedItems}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
            modelType={modelType}
            setModelType={setModelType}
          />
        </div>
      </main>

      {/* ======================================================== */}
      {/* FLOATING ACTION BAR FOR MOBILE */}
      {/* ======================================================== */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-30 max-w-md mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 pl-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">
              Đang mặc: <strong className="text-amber-400">{equippedItems.length}</strong> món
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileActiveTab(mobileActiveTab === 'model' ? 'wardrobe' : 'model')}
              className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700"
            >
              {mobileActiveTab === 'model' ? '👗 Mở Tủ Đồ' : '🪞 Xem Model'}
            </button>

            <button
              onClick={() => setIsAIModalOpen(true)}
              disabled={equippedItems.length === 0}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LOOKBOOK MODAL (SAVED OUTFITS) */}
      {/* ======================================================== */}
      {isLookbookOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 max-w-lg w-full shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Lookbook Đã Phối</h3>
                  <p className="text-[11px] text-slate-400">Các set đồ được lưu trong phiên thử nghiệm</p>
                </div>
              </div>
              <button
                onClick={() => setIsLookbookOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Saved Looks List with Luxury Scrollbar */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {savedLooks.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  Chưa lưu bộ trang phục nào vào Lookbook
                </div>
              ) : (
                savedLooks.map((look) => (
                  <div
                    key={look.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xs font-bold text-amber-300">{look.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{look.timestamp}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {look.items.map((it) => (
                          <span
                            key={it.id}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300"
                          >
                            {it.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEquippedItems(look.items);
                          soundManager.playEquip();
                          setIsLookbookOpen(false);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold rounded-lg text-xs hover:brightness-110 transition-all cursor-pointer"
                      >
                        Mặc lại
                      </button>
                      <button
                        onClick={() => setSavedLooks(savedLooks.filter((l) => l.id !== look.id))}
                        className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-900 rounded-lg transition-colors cursor-pointer"
                        title="Xóa khỏi Lookbook"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer quick action */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center mt-3">
              <span className="text-xs text-slate-400">
                Hiện có <strong className="text-white">{savedLooks.length}</strong> set đồ
              </span>
              <button
                onClick={() => {
                  handleSaveToLookbook();
                  confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
                }}
                disabled={equippedItems.length === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                + Lưu set hiện tại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* AI REVIEW MODAL */}
      {/* ======================================================== */}
      <AIReviewModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        equippedItems={equippedItems}
      />
    </div>
  );
}
