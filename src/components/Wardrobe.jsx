import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Sparkles, Check, Plus, Minus, Move, 
  Info, SlidersHorizontal, LayoutGrid, Grid3X3, Tag, X
} from 'lucide-react';
import { MOCK_ITEMS } from '../data/mockItems.js';

export default function Wardrobe({ 
  equippedItems, 
  onEquip, 
  onUnequip, 
  modelType = 'female', 
  setModelType 
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [activeStyle, setActiveStyle] = useState('all');
  const [activeGender, setActiveGender] = useState('all'); // 'all' | 'female' | 'male' | 'unisex' | 'auto'
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDensity, setViewDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Gợi ý tag tìm kiếm nhanh
  const quickTags = [
    { label: '#NhậtBình', query: 'Nhật Bình' },
    { label: '#ÁoTấc', query: 'Áo Tấc' },
    { label: '#NgũThân', query: 'Ngũ Thân' },
    { label: '#Denim', query: 'Jeans' },
    { label: '#Techwear', query: 'Cargo' },
    { label: '#Sneaker', query: 'Sneaker' },
    { label: '#KinhBắc', query: 'Quai Thao' },
  ];

  // Lọc danh sách đồ theo Tab, Style, Phom Dáng Nam/Nữ & Từ khóa tìm kiếm
  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchCategory = activeTab === 'all' || item.category === activeTab;
      const matchStyle = activeStyle === 'all' || item.style === activeStyle;
      
      // Lọc phom dáng giới tính
      let matchGender = true;
      if (activeGender === 'auto') {
        if (modelType === 'male') {
          matchGender = item.gender === 'male' || item.gender === 'unisex';
        } else if (modelType === 'female') {
          matchGender = item.gender === 'female' || item.gender === 'unisex';
        }
      } else if (activeGender !== 'all') {
        matchGender = item.gender === activeGender || item.gender === 'unisex';
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.metadata_for_ai.toLowerCase().includes(q) ||
        (item.material && item.material.toLowerCase().includes(q)) ||
        (item.era && item.era.toLowerCase().includes(q));
      return matchCategory && matchStyle && matchGender && matchSearch;
    });
  }, [activeTab, activeStyle, activeGender, modelType, searchQuery]);

  // Kiểm tra xem item đã được trang bị chưa
  const isItemEquipped = (itemId) => {
    return equippedItems.some((equipped) => equipped.id === itemId);
  };

  // Khởi tạo kéo thả HTML5 Drag & Drop
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const tabs = [
    { id: 'all', label: t('wardrobe.tabs.all'), icon: '✨' },
    { id: 'top', label: t('wardrobe.tabs.top'), icon: '👘' },
    { id: 'bottom', label: t('wardrobe.tabs.bottom'), icon: '👖' },
    { id: 'shoes', label: t('wardrobe.tabs.shoes'), icon: '👟' },
    { id: 'accessory', label: t('wardrobe.tabs.accessory'), icon: '👒' },
  ];

  return (
    <section
      id="wardrobe-section"
      className="flex flex-col h-full bg-slate-900/95 rounded-2xl border border-slate-800 p-4 lg:p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Wardrobe */}
      <div className="pb-3.5 border-b border-slate-800/80 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide font-display flex items-center gap-2">
                <span className="text-amber-400">👘</span>
                {t('wardrobe.title')}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                {filteredItems.length} món
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{t('wardrobe.subtitle')}</p>
          </div>

          {/* Quick Style Filter (Việt Phục vs Streetwear) & View Density */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveStyle('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeStyle === 'all'
                    ? 'bg-slate-800 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t('wardrobe.styles.all')}
              </button>
              <button
                onClick={() => setActiveStyle('viet_phuc')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeStyle === 'viet_phuc'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                🇻🇳 {t('wardrobe.styles.viet_phuc')}
              </button>
              <button
                onClick={() => setActiveStyle('streetwear')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeStyle === 'streetwear'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                ⚡ {t('wardrobe.styles.streetwear')}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewDensity('comfortable')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewDensity === 'comfortable' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Lưới chi tiết"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewDensity('compact')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewDensity === 'compact' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Lưới thu nhỏ"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar with Quick Clear */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="wardrobe-search-input"
            type="text"
            placeholder={t('wardrobe.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-950/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[10px]">
          <span className="text-slate-500 flex items-center gap-0.5 flex-shrink-0">
            <Tag className="w-2.5 h-2.5" /> Gợi ý:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => setSearchQuery(tag.query)}
              className={`px-2 py-0.5 rounded-full border whitespace-nowrap transition-colors cursor-pointer ${
                searchQuery === tag.query
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-gold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Gender Silhouette Filter Sub-bar (Phom Dáng Nam / Nữ / Unisex) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-gold text-[11px]">
          <span className="text-slate-400 font-semibold flex items-center gap-1 flex-shrink-0 text-[10px]">
            Phom:
          </span>
          <button
            onClick={() => setActiveGender('all')}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeGender === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 font-bold'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveGender('female')}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeGender === 'female'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'bg-slate-950/60 text-slate-400 hover:text-rose-300 border border-slate-800/80'
            }`}
          >
            <span>🌸</span> Nữ
          </button>
          <button
            onClick={() => setActiveGender('male')}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeGender === 'male'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-950/60 text-slate-400 hover:text-cyan-300 border border-slate-800/80'
            }`}
          >
            <span>🎋</span> Nam
          </button>
          <button
            onClick={() => setActiveGender('unisex')}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeGender === 'unisex'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'bg-slate-950/60 text-slate-400 hover:text-purple-300 border border-slate-800/80'
            }`}
          >
            <span>✨</span> Unisex
          </button>
          <button
            onClick={() => setActiveGender('auto')}
            className={`px-2 py-0.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ml-auto ${
              activeGender === 'auto'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold'
                : 'bg-slate-950/60 text-amber-400/80 hover:text-amber-300 border border-slate-800/80'
            }`}
            title="Lọc tự động theo model đang chọn trên sàn diễn"
          >
            <span>🎯 Khớp Model ({modelType === 'male' ? 'Nam' : modelType === 'female' ? 'Nữ' : 'Studio'})</span>
          </button>
        </div>
      </div>

      {/* Items Grid Container */}
      <div className="flex-1 overflow-y-auto py-3.5 pr-1.5 z-10 custom-scrollbar">
        {filteredItems.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs">
            <span className="text-3xl mb-2">🔍</span>
            <p className="font-semibold text-slate-400">Không tìm thấy trang phục phù hợp</p>
            <p className="text-[11px] text-slate-600 mt-1">Thử xóa bộ lọc hoặc tìm từ khóa khác</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveStyle('all');
                setActiveTab('all');
                setActiveGender('all');
              }}
              className="mt-3 px-3 py-1 bg-slate-800 text-amber-400 rounded-lg text-xs hover:bg-slate-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-3 ${
              viewDensity === 'compact'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
            }`}
          >
            {filteredItems.map((item) => {
              const equipped = isItemEquipped(item.id);
              const isTraditional = item.style === 'viet_phuc';

              return (
                <div
                  key={item.id}
                  id={`item-card-${item.id}`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`group relative flex flex-col justify-between rounded-xl p-3 border transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
                    equipped
                      ? 'bg-slate-900/90 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase ${
                          isTraditional
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                        }`}
                      >
                        {isTraditional ? 'Cổ Phục' : 'Streetwear'}
                      </span>

                      {item.gender === 'female' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30" title="Thiết kế may đo phom Nữ">
                          🌸 Nữ
                        </span>
                      )}
                      {item.gender === 'male' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" title="Thiết kế may đo phom Nam">
                          🎋 Nam
                        </span>
                      )}
                      {item.gender === 'unisex' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30" title="Phom dáng Unisex Nam & Nữ">
                          ✨ Unisex
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDetailItem(item);
                        }}
                        className="text-slate-500 hover:text-amber-400 p-0.5 rounded transition-colors cursor-pointer"
                        title="Xem chi tiết văn hóa & may đo"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        z:{item.z_index}
                      </span>
                    </div>
                  </div>

                  {/* 2D Item Visual Thumbnail (Framed with studio podium gradient) */}
                  <div 
                    onClick={() => {
                      if (equipped) {
                        onUnequip(item.id);
                      } else {
                        onEquip(item);
                      }
                    }}
                    className="relative w-full h-32 sm:h-36 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-2 flex items-center justify-center border border-slate-800/80 group-hover:border-slate-700 overflow-hidden mb-2.5 cursor-pointer"
                  >
                    {/* Background glow circle */}
                    <div 
                      className="absolute w-24 h-24 rounded-full blur-xl opacity-20 pointer-events-none transition-transform group-hover:scale-125"
                      style={{ backgroundColor: item.color || '#EAB308' }}
                    />

                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                    />

                    {/* Equipped Checkmark Badge */}
                    {equipped && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 text-[10px] font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Đang mặc</span>
                      </div>
                    )}

                    {/* Quick drag indicator icon */}
                    <div className="absolute bottom-1 left-2 opacity-0 group-hover:opacity-70 transition-opacity text-[10px] text-slate-400 flex items-center gap-1">
                      <Move className="w-2.5 h-2.5" /> Kéo thả
                    </div>
                  </div>

                  {/* Name & metadata info */}
                  <div className="mb-2">
                    <h3 className="text-xs font-bold text-slate-100 line-clamp-1 mb-0.5 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    {item.material && (
                      <p className="text-[10px] text-amber-300/80 line-clamp-1 mb-1 font-medium">
                        ✨ {item.material}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.metadata_for_ai}
                    </p>
                  </div>

                  {/* Equip / Unequip Action Button */}
                  <button
                    id={`equip-btn-${item.id}`}
                    onClick={() => {
                      if (equipped) {
                        onUnequip(item.id);
                      } else {
                        onEquip(item);
                      }
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      equipped
                        ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-rose-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 hover:border-transparent shadow-sm'
                    }`}
                  >
                    {equipped ? (
                      <>
                        <Minus className="w-3.5 h-3.5" />
                        <span>{t('wardrobe.unequip', 'Gỡ bỏ')}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('wardrobe.equip', 'Mặc vào')}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cultural & Material Details Modal */}
      {selectedDetailItem && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 p-4 flex items-center justify-center animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedDetailItem(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full h-36 bg-slate-950 rounded-xl p-3 flex items-center justify-center mb-3 border border-slate-800">
              <img
                src={selectedDetailItem.image_url}
                alt={selectedDetailItem.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedDetailItem.style === 'viet_phuc' ? 'Việt Phục Cổ Phong' : 'Streetwear Đương Đại'}
              </span>
              {selectedDetailItem.era && (
                <span className="text-[10px] text-slate-400">
                  Thời kỳ: {selectedDetailItem.era}
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-white mb-2">
              {selectedDetailItem.name}
            </h3>

            {/* Thông số phom dáng may đo */}
            {selectedDetailItem.gender && (
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs mb-2 flex items-center justify-between">
                <span className="text-purple-300 font-semibold">Phom dáng may đo:</span>
                <span className="font-bold text-slate-200">
                  {selectedDetailItem.gender === 'female'
                    ? '🌸 Phom Nữ (Eo thắt, tà mềm mại)'
                    : selectedDetailItem.gender === 'male'
                    ? '🎋 Phom Nam (Vai rộng 44cm, vạt đứng)'
                    : '✨ Unisex (Phối chuẩn cả Nam & Nữ)'}
                </span>
              </div>
            )}

            {selectedDetailItem.material && (
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs mb-2">
                <span className="text-amber-400 font-semibold">Chất liệu: </span>
                <span className="text-slate-300">{selectedDetailItem.material}</span>
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs mb-4">
              <span className="text-cyan-400 font-semibold block mb-1">Mô tả văn hóa cho AI:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedDetailItem.metadata_for_ai}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (isItemEquipped(selectedDetailItem.id)) {
                    onUnequip(selectedDetailItem.id);
                  } else {
                    onEquip(selectedDetailItem);
                  }
                  setSelectedDetailItem(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                {isItemEquipped(selectedDetailItem.id) ? t('wardrobe.unequip', 'Gỡ bỏ') : t('wardrobe.equip', 'Mặc vào')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
