import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, Trash2, Layers, Camera, ZoomIn, ZoomOut, 
  RotateCcw, Sliders, Check, User, Heart, Share2, Info,
  Eye, EyeOff, Compass, Palette, Play, Pause, GripVertical,
  ChevronUp, ChevronDown, SlidersHorizontal, RefreshCw, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import StudioBackdrop from './StudioBackdrop.jsx';
import { getGarmentImageUrl, getGarmentFittingTransform, getItemMixBlendMode } from '../utils/clothingPoseRenderer.js';

export const POSES = [
  { id: 'runway', icon: '🚶', label: 'Catwalk', desc: 'Dáng sải bước runway catwalk tự tin' },
  { id: 'hip', icon: '💃', label: 'Chống Hông', desc: 'Dáng chống hông High-Fashion kiêu sa' },
  { id: 'royal', icon: '🙏', label: 'Cung Đình', desc: 'Dáng chắp tay đoan trang cung đình / sĩ phu' },
  { id: 'grace', icon: '🌸', label: 'Nàng Thơ', desc: 'Dáng cầm quạt / lãng tử khoanh tay' },
];

export default function MannequinCanvas({
  equippedItems,
  onEquip,
  onUnequip,
  onClearAll,
  onOpenAIReview,
  skinTone = '#E0C8B1',
  onSaveLookbook,
  modelType: controlledModelType,
  setModelType: controlledSetModelType,
  fitSize: controlledFitSize,
  setFitSize: controlledSetFitSize,
  modelPose: controlledModelPose,
  setModelPose: controlledSetModelPose,
}) {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Hỗ trợ cả Controlled & Uncontrolled states
  const [internalModelType, setInternalModelType] = useState('female');
  const [internalFitSize, setInternalFitSize] = useState('M');
  const [internalModelPose, setInternalModelPose] = useState('runway');

  const modelType = controlledModelType !== undefined ? controlledModelType : internalModelType;
  const setModelType = controlledSetModelType || setInternalModelType;

  const fitSize = controlledFitSize !== undefined ? controlledFitSize : internalFitSize;
  const setFitSize = controlledSetFitSize || setInternalFitSize;

  const modelPose = controlledModelPose !== undefined ? controlledModelPose : internalModelPose;
  const setModelPose = controlledSetModelPose || setInternalModelPose;

  const [zoomMode, setZoomMode] = useState('full'); // 'full' | 'upper' | 'lower'
  const [studioBackdrop, setStudioBackdrop] = useState('minimal'); // 'minimal' | 'imperial' | 'cyber' | 'lantern'
  const [justSaved, setJustSaved] = useState(false);
  const [isRunwayBreathing, setIsRunwayBreathing] = useState(true);

  // Quản lý Layer Tương tác: Z-Index, Mix-Blend-Mode, Visibility, Opacity & Drag-Reorder
  const [customZIndexMap, setCustomZIndexMap] = useState({});
  const [customBlendModes, setCustomBlendModes] = useState({});
  const [layerVisibility, setLayerVisibility] = useState({});
  const [layerOpacity, setLayerOpacity] = useState({});
  const [draggedLayerId, setDraggedLayerId] = useState(null);
  const [dragOverLayerId, setDragOverLayerId] = useState(null);
  const [inspectingItemId, setInspectingItemId] = useState(null);
  const [isLayersExpanded, setIsLayersExpanded] = useState(false);

  // Căn chỉnh phom dáng may đo chân thực theo Giới tính người mẫu, Kích cỡ (S/M/L) & ĐẶC BIỆT LÀ TƯ THẾ (Pose Dynamic Morphing)
  const getItemFittingStyle = (item) => {
    let sizeFactor = 1.0;
    if (fitSize === 'S') sizeFactor = 0.95;
    if (fitSize === 'L') sizeFactor = 1.05;

    let scaleX = sizeFactor;
    let scaleY = sizeFactor;
    let translateY = 0;
    let translateX = 0;
    let rotate = 0;
    let skewX = 0;
    let skewY = 0;
    let transformOrigin = '160px 240px';

    // 1. Căn chỉnh theo phom khung xương Giới tính người mẫu (Model Morphology)
    if (modelType === 'male') {
      if (item.category === 'top') {
        // Nam vai rộng 44cm (x: 100 đến 220), ngực nở, thân chữ V
        scaleX = 1.07 * sizeFactor;
        scaleY = 1.01 * sizeFactor;
        translateY = -2;
        transformOrigin = '160px 140px';
      } else if (item.category === 'bottom') {
        // Quần nam cạp cao hơn, ống đứng đĩnh đạc
        scaleX = 1.04 * sizeFactor;
        scaleY = 1.01 * sizeFactor;
        translateY = 3;
        transformOrigin = '160px 280px';
      } else if (item.category === 'shoes') {
        // Bàn chân nam bè hơn, đế vững chãi
        scaleX = 1.05 * sizeFactor;
        scaleY = 1.02 * sizeFactor;
        transformOrigin = '160px 440px';
      } else if (item.category === 'accessory') {
        if (item.id === 'acc_khan_dong_den' || item.id === 'acc_kinh_ram_matrix') {
          scaleX = 1.05 * sizeFactor;
          scaleY = 1.02 * sizeFactor;
          transformOrigin = '160px 55px';
        } else if (item.id === 'acc_kieng_bac_sen') {
          scaleX = 1.08 * sizeFactor;
          scaleY = 1.02 * sizeFactor;
          translateY = 2;
          transformOrigin = '160px 115px';
        } else if (item.id === 'acc_quat_tram_huong') {
          translateX = -3;
          transformOrigin = '78px 258px';
        }
      }
    } else if (modelType === 'female') {
      if (item.category === 'top') {
        // Phom nữ: vai thon mềm 37cm, eo thắt 62cm thanh thoát
        scaleX = 0.98 * sizeFactor;
        scaleY = 0.99 * sizeFactor;
        transformOrigin = '160px 140px';
      } else if (item.category === 'bottom') {
        // Váy/quần nữ lượn nhẹ ôm hông
        scaleX = 1.0 * sizeFactor;
        transformOrigin = '160px 260px';
      } else if (item.category === 'accessory') {
        if (item.id === 'acc_kieng_bac_sen') {
          scaleX = 0.98 * sizeFactor;
          transformOrigin = '160px 112px';
        }
      }
    }

    // 2. BIẾN ĐỔI CHÂN THỰC THEO TỪNG DÁNG POSE (Dynamic Pose Drapery & Morphing)
    if (modelPose === 'hip') {
      // DÁNG CHỐNG HÔNG (HIGH-FASHION POSE):
      // Tay phải gập chống hông, hông phải đẩy sang phải và nhấc nhẹ, tạo đường cong S-curve
      if (item.category === 'top') {
        // Thân áo xoay nhẹ, nâng eo bên phải theo tay chống hông và siết eo
        rotate = modelType === 'male' ? 2.0 : 2.6;
        skewY = -2.2; // Co kéo nếp nhăn eo phải
        skewX = 1.2;
        translateX = 3.5;
        translateY = -1.5;
        scaleX = 0.985 * sizeFactor;
        transformOrigin = '160px 245px';
      } else if (item.category === 'bottom') {
        // Quần/váy đánh hông sang phải theo xương chậu
        rotate = -1.8;
        skewX = 2.8;
        skewY = 0.8;
        translateX = 4.5;
        translateY = -1;
        transformOrigin = '160px 260px';
      } else if (item.category === 'shoes') {
        // Trọng tâm dồn chân phải
        translateX = 2.5;
        rotate = 0.8;
        transformOrigin = '160px 440px';
      } else if (item.category === 'accessory') {
        if (item.id === 'acc_khan_dong_den' || item.id === 'acc_non_la_hue' || item.id === 'acc_non_quai_thao' || item.id === 'acc_kinh_ram_matrix') {
          // Nghiêng theo đầu người mẫu (+2.5deg)
          rotate = 2.5;
          translateX = 1.5;
          translateY = -0.5;
          transformOrigin = '160px 65px';
        } else if (item.id === 'acc_kieng_bac_sen') {
          rotate = 2.5;
          translateX = 1.5;
          translateY = 0.5;
          transformOrigin = '160px 115px';
        } else if (item.id === 'acc_quat_tram_huong') {
          // Quạt buông tự nhiên bên đùi trái phong cách runway
          translateX = 8;
          translateY = 16;
          rotate = 15;
          transformOrigin = '80px 260px';
        } else if (item.id === 'acc_tui_coi_hoa_sen') {
          translateX = -4;
          translateY = 6;
          rotate = -5;
        }
      }
    } else if (modelPose === 'royal') {
      // DÁNG CUNG ĐÌNH (ROYAL GRACE):
      // Hai tay chắp trang nghiêm trước bụng/ngực, tay thụ y gom lại ở trung tâm
      if (item.category === 'top') {
        // Áo gom nếp vào trung tâm rốn, tà áo buông thẳng trang trọng
        scaleX = 0.96 * sizeFactor;
        scaleY = 1.02 * sizeFactor;
        translateY = 2;
        rotate = 0;
        skewX = 0;
        skewY = 0;
        transformOrigin = '160px 160px';
      } else if (item.category === 'bottom') {
        scaleX = 0.985 * sizeFactor;
        translateY = 2;
        transformOrigin = '160px 260px';
      } else if (item.category === 'accessory') {
        if (item.id === 'acc_khan_dong_den' || item.id === 'acc_non_la_hue' || item.id === 'acc_non_quai_thao' || item.id === 'acc_kinh_ram_matrix') {
          rotate = 0;
          translateX = 0;
          translateY = 0;
          transformOrigin = '160px 65px';
        } else if (item.id === 'acc_kieng_bac_sen') {
          translateY = 1.5;
          transformOrigin = '160px 115px';
        } else if (item.id === 'acc_quat_tram_huong') {
          // Quạt trầm hương đặt CHÍNH GIỮA HAI TAY CHẮP trước bụng cực kỳ đoan trang!
          translateX = 82;
          translateY = -27;
          rotate = -16;
          scaleX = 0.92 * sizeFactor;
          scaleY = 0.92 * sizeFactor;
          transformOrigin = '160px 226px';
        }
      }
    } else if (modelPose === 'grace') {
      // DÁNG NÀNG THƠ / LÃNG TỬ:
      // Nữ: Tay phải nâng nhẹ thanh thoát trước ngực e ấp, đầu nghiêng nhẹ sang trái (-2.5deg)
      // Nam: Khoanh tay trước ngực lãng tử
      if (item.category === 'top') {
        if (modelType === 'male') {
          // Nam khoanh tay: lồng ngực căng nở, áo kéo căng ngang ngực
          scaleX = 1.03 * sizeFactor;
          scaleY = 0.98 * sizeFactor;
          translateY = 1.5;
          transformOrigin = '160px 170px';
        } else {
          // Nữ nâng tay: tay phải kéo nhẹ nếp áo lên
          rotate = -2.2;
          skewY = 2.2;
          skewX = -1.2;
          translateX = -2.5;
          translateY = -2;
          scaleX = 0.98 * sizeFactor;
          transformOrigin = '160px 145px';
        }
      } else if (item.category === 'bottom') {
        rotate = 1.2;
        skewX = -1.5;
        translateX = -2;
        transformOrigin = '160px 260px';
      } else if (item.category === 'accessory') {
        if (item.id === 'acc_khan_dong_den' || item.id === 'acc_non_la_hue' || item.id === 'acc_non_quai_thao' || item.id === 'acc_kinh_ram_matrix') {
          rotate = -2.5;
          translateX = -1.5;
          translateY = -0.5;
          transformOrigin = '160px 65px';
        } else if (item.id === 'acc_kieng_bac_sen') {
          rotate = -2.5;
          translateX = -1;
          transformOrigin = '160px 115px';
        } else if (item.id === 'acc_quat_tram_huong') {
          // Quạt nâng lên sát ngực/cằm "e ấp che hoa"
          translateX = 106;
          translateY = -116;
          rotate = -30;
          scaleX = 0.94 * sizeFactor;
          scaleY = 0.94 * sizeFactor;
          transformOrigin = '190px 140px';
        } else if (item.id === 'acc_tui_coi_hoa_sen') {
          translateX = -6;
          translateY = 4;
          rotate = -8;
        }
      }
    }

    return {
      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg) scale(${scaleX}, ${scaleY})`,
      transformOrigin,
    };
  };

  // Xử lý kéo thả HTML5 Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const rawData = e.dataTransfer.getData('application/json');
      if (rawData) {
        const item = JSON.parse(rawData);
        onEquip(item);
      }
    } catch (err) {
      console.error('Lỗi khi thả trang phục:', err);
    }
  };

  const getEffectiveZIndex = (item) => {
    if (customZIndexMap[item.id] !== undefined) {
      return customZIndexMap[item.id];
    }
    return item.z_index;
  };

  // Sắp xếp các lớp trang phục từ trên xuống dưới (Z-Index cao nhất trước)
  const sortedLayers = [...equippedItems].sort((a, b) => getEffectiveZIndex(b) - getEffectiveZIndex(a));

  // Bắt đầu kéo một layer trong danh sách Equipped Layers để reorder
  const handleLayerDragStart = (e, item) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedLayerId(item.id);
  };

  const handleLayerDragOver = (e, targetItem) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverLayerId !== targetItem.id) {
      setDragOverLayerId(targetItem.id);
    }
  };

  const handleLayerDrop = (e, targetItem) => {
    e.preventDefault();
    e.stopPropagation();
    const sourceId = draggedLayerId || e.dataTransfer.getData('text/plain');
    setDraggedLayerId(null);
    setDragOverLayerId(null);

    if (!sourceId || sourceId === targetItem.id) return;

    const sourceIndex = sortedLayers.findIndex((i) => i.id === sourceId);
    const targetIndex = sortedLayers.findIndex((i) => i.id === targetItem.id);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const newSorted = [...sortedLayers];
    const [movedItem] = newSorted.splice(sourceIndex, 1);
    newSorted.splice(targetIndex, 0, movedItem);

    // Gán lại z_index mới giảm dần từ trên xuống
    const maxZ = Math.max(...equippedItems.map((i) => i.z_index), 50);
    const updatedMap = { ...customZIndexMap };
    newSorted.forEach((item, idx) => {
      updatedMap[item.id] = maxZ - idx * 2;
    });
    setCustomZIndexMap(updatedMap);
  };

  const handleMoveLayer = (itemId, direction) => {
    const currentIndex = sortedLayers.findIndex((i) => i.id === itemId);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sortedLayers.length) return;

    const newSorted = [...sortedLayers];
    const [movedItem] = newSorted.splice(currentIndex, 1);
    newSorted.splice(targetIndex, 0, movedItem);

    const maxZ = Math.max(...equippedItems.map((i) => i.z_index), 50);
    const updatedMap = { ...customZIndexMap };
    newSorted.forEach((item, idx) => {
      updatedMap[item.id] = maxZ - idx * 2;
    });
    setCustomZIndexMap(updatedMap);
  };

  const handleToggleBlendMode = (itemId) => {
    const modes = ['multiply', 'normal', 'overlay', 'screen', 'soft-light'];
    const item = equippedItems.find((i) => i.id === itemId);
    if (!item) return;
    const currentMode = getItemMixBlendMode(item, customBlendModes);
    const nextIndex = (modes.indexOf(currentMode) + 1) % modes.length;
    setCustomBlendModes((prev) => ({ ...prev, [itemId]: modes[nextIndex] }));
  };

  const handleSetBlendMode = (itemId, mode) => {
    setCustomBlendModes((prev) => ({ ...prev, [itemId]: mode }));
  };

  const handleToggleVisibility = (itemId) => {
    setLayerVisibility((prev) => ({ ...prev, [itemId]: prev[itemId] === false ? true : false }));
  };

  const handleSetOpacity = (itemId, opacity) => {
    setLayerOpacity((prev) => ({ ...prev, [itemId]: opacity }));
  };

  const handleResetLayers = () => {
    setCustomZIndexMap({});
    setCustomBlendModes({});
    setLayerVisibility({});
    setLayerOpacity({});
    setInspectingItemId(null);
  };

  const handleQuickSnapshot = () => {
    setJustSaved(true);
    if (onSaveLookbook) {
      onSaveLookbook();
    }
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#F43F5E', '#06B6D4'],
    });
    setTimeout(() => setJustSaved(false), 2200);
  };

  // Zoom transform mapping
  const getZoomStyle = () => {
    switch (zoomMode) {
      case 'upper':
        return 'scale-[1.6] translate-y-28';
      case 'lower':
        return 'scale-[1.45] -translate-y-28';
      default:
        return 'scale-100 translate-y-0';
    }
  };

  return (
    <section className="h-full flex flex-col bg-slate-900/80 rounded-3xl border border-slate-800/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl relative overflow-y-auto scrollbar-gold">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide font-display">
                {t('mannequin.title')}
              </h2>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono border border-amber-500/30 font-semibold">
                Haute Couture
              </span>
            </div>
          </div>
        </div>

        {/* Model Type & Size Selectors & View Modes */}
        <div className="flex items-center gap-1.5">
          {/* Model Gender Selector */}
          <div className="flex items-center bg-slate-950/90 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => setModelType('female')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                modelType === 'female'
                  ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Model Nàng Thơ Cổ Phong"
            >
              🌸 Nữ
            </button>
            <button
              onClick={() => setModelType('male')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                modelType === 'male'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Model Nam Thần Lãng Tử"
            >
              🎋 Nam
            </button>
            <button
              onClick={() => setModelType('abstract')}
              className={`px-1.5 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                modelType === 'abstract'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mannequin Tối Giản Xưởng May"
            >
              📐 Atelier
            </button>
          </div>

          {/* Sizing Fit Controls */}
          <div className="flex items-center gap-0.5 bg-slate-950/90 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            {['S', 'M', 'L'].map((sz) => (
              <button
                key={sz}
                onClick={() => setFitSize(sz)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  fitSize === sz
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Size ${sz}`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Runway Live Animation & Zoom Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsRunwayBreathing(!isRunwayBreathing)}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                isRunwayBreathing
                  ? 'text-amber-300 bg-amber-500/20 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-300 bg-slate-950/80 border border-slate-800'
              }`}
              title={isRunwayBreathing ? 'Tắt nhịp thở runway' : 'Bật nhịp thở runway'}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </button>
            <button
              onClick={() => setZoomMode(zoomMode === 'upper' ? 'full' : 'upper')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                zoomMode === 'upper'
                  ? 'text-amber-400 bg-slate-800 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/80 border border-slate-800'
              }`}
              title="Phóng to chân dung"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Pose Selector Bar (Catwalk, Chống Hông, Cung Đình, Nàng Thơ) */}
      <div className="z-10 mt-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-slate-400 font-semibold flex items-center gap-1 text-[10px] pl-1">
            <Camera className="w-3 h-3 text-amber-400" /> Bộ Chọn Tư Thế (Model Pose):
          </span>
          <span className="text-[9px] text-amber-400/90 font-medium italic">
            ✨ Trang phục tự uốn lượn theo dáng
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {POSES.map((p) => (
            <button
              key={p.id}
              onClick={() => setModelPose(p.id)}
              className={`py-1 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                modelPose === p.id
                  ? 'bg-gradient-to-r from-amber-500/30 via-rose-500/30 to-amber-500/30 text-amber-300 border border-amber-400/80 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
              title={p.desc}
            >
              <span>{p.icon}</span>
              <span className="truncate">
                {p.id === 'grace' && modelType === 'male' ? 'Lãng Tử' : p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Fitting Stage - Centerpiece Canvas */}
      <div className="flex flex-col items-center justify-center py-2 z-10 relative">
        {/* Studio Canvas Box */}
        <div
          id="mannequin-drop-zone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-[280px] sm:w-[310px] h-[440px] sm:h-[465px] rounded-2xl border-2 transition-all duration-300 flex items-center justify-center shadow-2xl overflow-hidden select-none ${
            isDragOver
              ? 'border-amber-400 ring-4 ring-amber-400/30 scale-[1.015]'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
          }`}
        >
          {/* Subtle Measurements Spec Tag in Top-Left */}
          <div className="absolute top-2.5 left-2.5 z-20 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-[10px] text-slate-300 flex items-center gap-1.5 shadow-md pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              {modelType === 'female' ? '🌸 Phom Nữ' : modelType === 'male' ? '🎋 Phom Nam' : '📐 Atelier'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-bold">Size {fitSize}</span>
            <span className="text-slate-500">•</span>
            <span className="text-rose-300 font-semibold">{POSES.find(p => p.id === modelPose)?.label || 'Catwalk'}</span>
          </div>

          {/* ======================================================== */}
          {/* REALISTIC VIETNAMESE CULTURAL BACKDROP SCENERY */}
          {/* ======================================================== */}
          <StudioBackdrop backdropType={studioBackdrop} />

          {/* Circular Runway Podium with Mirror Floor Reflection */}
          <div className="absolute bottom-4 w-56 h-16 bg-gradient-to-t from-amber-500/25 to-transparent rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-6 w-48 h-9 rounded-full border border-amber-500/40 bg-slate-950/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] pointer-events-none flex items-center justify-center">
            <div className="w-36 h-4 rounded-full border border-amber-500/25 bg-slate-900/80 shadow-inner" />
          </div>

          {/* Quick Snapshot Flash Indicator */}
          {justSaved && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-50 flex items-center justify-center animate-fade-out pointer-events-none">
              <div className="bg-slate-950/90 text-amber-300 px-4 py-2 rounded-xl border border-amber-400 flex items-center gap-2 text-xs font-bold shadow-2xl">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Đã chụp ảnh vào Lookbook!</span>
              </div>
            </div>
          )}

          {/* Drag Overlay with Glow */}
          {isDragOver && (
            <div className="absolute inset-0 bg-amber-500/25 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center text-amber-300 font-semibold text-sm border-2 border-dashed border-amber-400 rounded-2xl animate-pulse">
              <Sparkles className="w-8 h-8 mb-2 animate-bounce" />
              <span>Thả trang phục để mặc thử ngay!</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCALABLE STAGE LAYER HOLDER (Smooth Camera Zoom & Runway Breathe) */}
          {/* ======================================================== */}
          <div 
            id="mannequin-stage-viewport"
            className={`w-full h-full relative transition-transform duration-500 ease-out ${getZoomStyle()} ${isRunwayBreathing ? 'animate-runway-breathe' : ''}`}
            style={{ isolation: 'isolate' }}
          >
            {/* ======================================================== */}
            {/* HIGH FASHION RUNWAY MODEL (z-index = 0) */}
            {/* ======================================================== */}
            <div
              id="mannequin-body-container"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <svg
                viewBox="0 0 320 540"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Skin gradient with dimensional warmth & lighting */}
                  <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={skinTone} />
                    <stop offset="65%" stopColor={skinTone} />
                    <stop offset="100%" stopColor="#8C674E" stopOpacity="0.45" />
                  </linearGradient>

                  {/* Ánh sáng ven viền cơ thể (Studio Rim Lighting) */}
                  <linearGradient id="rim-light" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.45" />
                    <stop offset="25%" stopColor="#FFFBEB" stopOpacity="0.08" />
                    <stop offset="80%" stopColor="#000000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.35" />
                  </linearGradient>

                  {/* Shading cho khuôn mặt */}
                  <radialGradient id="face-shading" cx="50%" cy="45%" r="50%">
                    <stop offset="60%" stopColor={skinTone} />
                    <stop offset="100%" stopColor="#A77A5B" stopOpacity="0.35" />
                  </radialGradient>

                  {/* Má hồng phấn má đào duyên dáng */}
                  <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                  </radialGradient>

                  {/* Đôi môi mọng son đào ombre */}
                  <linearGradient id="lips-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="50%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#881337" />
                  </linearGradient>

                  {/* Highlight bóng môi lipgloss */}
                  <linearGradient id="lip-gloss" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Mắt phượng Á Đông huyền bí */}
                  <linearGradient id="iris-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#27272A" />
                    <stop offset="50%" stopColor="#451A03" />
                    <stop offset="100%" stopColor="#18181B" />
                  </linearGradient>

                  {/* Highlight tóc bồng bềnh bắt sáng */}
                  <linearGradient id="hair-highlight" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#18181B" />
                    <stop offset="35%" stopColor="#3F3F46" />
                    <stop offset="50%" stopColor="#71717A" />
                    <stop offset="65%" stopColor="#3F3F46" />
                    <stop offset="100%" stopColor="#09090B" />
                  </linearGradient>

                  {/* Trâm vàng hoàng gia */}
                  <linearGradient id="gold-pin-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="50%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>

                  {/* Bóng đổ khối mềm mại 3D */}
                  <filter id="body-shadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* ======================================================== */}
                {/* 1. MODEL NỮ RUNWAY (HIGH-FASHION VIETNAMESE MUSE) */}
                {/* ======================================================== */}
                {modelType === 'female' && (
                  <g id="model-female-editorial" filter="url(#body-shadow)">
                    {/* Head & Neck with Pose Head Tilt */}
                    <g transform={modelPose === 'hip' ? 'rotate(2.5 160 65)' : modelPose === 'grace' ? 'rotate(-2.5 160 65)' : ''}>
                      {/* Cổ ba ngấn ngọc ngà & Vệt bóng đổ dưới cằm */}
                      <rect x="153" y="86" width="14" height="28" rx="4" fill="url(#skin-gradient)" />
                      <path d="M148,94 Q160,102 172,94" stroke="#8C674E" strokeWidth="1.2" opacity="0.4" fill="none" />
                      {/* Xương quai xanh mềm mại thanh tú có highlight */}
                      <path d="M143,114 Q153,119 160,116 Q167,119 177,114" stroke="#8C674E" strokeWidth="1.2" opacity="0.6" fill="none" />
                      <path d="M143,113.5 Q153,118 160,115.5 Q167,118 177,113.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" fill="none" />

                      {/* Khuôn mặt trái xoan Á Đông thanh tú */}
                      <path
                        d="M140,54 Q140,38 160,38 Q180,38 180,54 Q180,72 168,84 Q160,88 152,84 Q140,72 140,54 Z"
                        fill="url(#face-shading)"
                        stroke="#8C674E"
                        strokeWidth="0.8"
                      />

                      {/* Má hồng phấn e ấp kiêu sa */}
                      <ellipse cx="147" cy="67" rx="6.5" ry="4" fill="url(#blush-grad)" />
                      <ellipse cx="173" cy="67" rx="6.5" ry="4" fill="url(#blush-grad)" />

                      {/* Cặp chân mày lá liễu mềm mại thanh thoát */}
                      <path d="M145,55 Q151,51.5 156,54" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                      <path d="M164,54 Q169,51.5 175,55" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" fill="none" />

                      {/* Đôi mắt phượng Á Đông huyền ảo có 2 điểm sáng catchlight & viền mi cong vút */}
                      <g id="female-eyes">
                        {/* Mắt trái */}
                        <path d="M146,59 Q151.5,55.5 156.5,59.5 Q151.5,63.5 146,59 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.8" />
                        <circle cx="152" cy="59.5" r="2.2" fill="url(#iris-grad)" />
                        <circle cx="152" cy="59.5" r="1.1" fill="#09090B" />
                        <circle cx="151.2" cy="58.7" r="0.65" fill="#FFFFFF" />
                        <circle cx="152.8" cy="60.2" r="0.35" fill="#FFFFFF" />
                        <path d="M145,58.5 Q152,55 157.5,58" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                        <line x1="156.5" y1="58" x2="158.5" y2="56.5" stroke="#18181B" strokeWidth="0.8" strokeLinecap="round" />

                        {/* Mắt phải */}
                        <path d="M163.5,59.5 Q168.5,55.5 174,59 Q168.5,63.5 163.5,59.5 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.8" />
                        <circle cx="168" cy="59.5" r="2.2" fill="url(#iris-grad)" />
                        <circle cx="168" cy="59.5" r="1.1" fill="#09090B" />
                        <circle cx="167.2" cy="58.7" r="0.65" fill="#FFFFFF" />
                        <circle cx="168.8" cy="60.2" r="0.35" fill="#FFFFFF" />
                        <path d="M162.5,58 Q168,55 175,58.5" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                        <line x1="173.5" y1="58" x2="175.5" y2="56.5" stroke="#18181B" strokeWidth="0.8" strokeLinecap="round" />
                      </g>

                      {/* Sống mũi thon gọn nhỏ nhắn có highlight đầu mũi */}
                      <path d="M160,57 L159.5,69 Q160,70.5 162,69.5" stroke="#8C674E" strokeWidth="0.9" fill="none" opacity="0.6" />
                      <ellipse cx="160.2" cy="68.5" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.5" />

                      {/* Đôi môi trái tim mọng son đào chuyển sắc ombre & highlight bóng môi */}
                      <path d="M154.5,75 Q160,73.5 165.5,75 Q160,79.5 154.5,75 Z" fill="url(#lips-grad)" stroke="#9F1239" strokeWidth="0.6" />
                      <line x1="155" y1="75" x2="165" y2="75" stroke="#881337" strokeWidth="0.7" />
                      <ellipse cx="160" cy="76.2" rx="3.5" ry="1.2" fill="url(#lip-gloss)" />

                      {/* Mái tóc óng ả búi trâm ngọc sen cung đình */}
                      <g id="female-hair">
                        <ellipse cx="160" cy="34" rx="15" ry="12" fill="#18181B" />
                        <ellipse cx="160" cy="34" rx="12" ry="9" fill="url(#hair-highlight)" />
                        {/* Trâm cài hoa sen vàng & chuỗi ngọc hoàng gia */}
                        <line x1="142" y1="32" x2="178" y2="30" stroke="url(#gold-pin-grad)" strokeWidth="2.4" strokeLinecap="round" />
                        <circle cx="178" cy="30" r="3.5" fill="#10B981" stroke="#FEF08A" strokeWidth="1.2" />
                        <path d="M178,30 Q183,45 180,54" stroke="#F59E0B" strokeWidth="1.2" fill="none" strokeDasharray="2,1.5" />
                        <circle cx="180" cy="54" r="2.2" fill="#F43F5E" />

                        {/* Mái tóc rẽ ngôi buông nhẹ ôm hai bên má */}
                        <path d="M141,52 Q150,37 160,41 Q170,37 179,52 Q181,64 177,68 Q174,56 160,45 Q146,56 143,68 Q139,64 141,52 Z" fill="#09090B" />
                        <path d="M152,43 Q160,41 168,43" stroke="#52525B" strokeWidth="1" fill="none" opacity="0.6" />
                        {/* Hai lọn tóc mai buông lơi tự nhiên */}
                        <path d="M142,66 Q139,78 141,88" stroke="#18181B" strokeWidth="1.2" fill="none" />
                        <path d="M178,66 Q181,78 179,88" stroke="#18181B" strokeWidth="1.2" fill="none" />
                      </g>
                    </g>

                    {/* Thân hình đường cong mềm mại chuẩn Haute Couture (Vai thon 37cm, eo con kiến) */}
                    <path
                      d={modelPose === 'hip'
                        ? "M124,114 C116,118 110,128 110,142 L116,255 C116,260 123,262 128,262 L194,262 C199,262 206,260 206,255 L210,142 C210,128 205,118 197,114 Z"
                        : "M125,114 C117,118 112,128 112,142 L118,255 C118,260 125,262 130,262 L190,262 C195,262 202,260 202,255 L208,142 C208,128 203,118 195,114 Z"
                      }
                      fill="url(#skin-gradient)"
                    />

                    {/* Đường viền ánh sáng phản chiếu cơ thể 3D (Rim Light) */}
                    <path d="M113,136 C112,160 116,230 119,255" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" />
                    <path d="M207,136 C208,160 204,230 201,255" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />

                    {/* Vùng eo thon & hông nở tự nhiên */}
                    <path
                      d={modelPose === 'hip' ? "M126,258 L196,258 L202,302 L122,302 Z" : "M126,258 L194,258 L199,302 L121,302 Z"}
                      fill="url(#skin-gradient)"
                    />

                    {/* CÁNH TAY & BÀN TAY THEO POSE DÁNG */}
                    {/* POSE 1: RUNWAY (Catwalk) */}
                    {modelPose === 'runway' && (
                      <g id="female-arms-runway">
                        {/* Tay trái buông tự nhiên */}
                        <path d="M112,126 L90,178 L78,258 L90,260 L104,188 L120,138 Z" fill="url(#skin-gradient)" />
                        {/* Bàn tay búp măng trái */}
                        <path d="M78,258 Q74,272 79,278 Q85,280 88,272 Q89,265 89,260 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <ellipse cx="80" cy="275" rx="1" ry="1.5" fill="#F43F5E" opacity="0.6" />

                        {/* Tay phải buông tự nhiên */}
                        <path d="M208,126 L230,178 L242,258 L230,260 L216,188 L200,138 Z" fill="url(#skin-gradient)" />
                        {/* Bàn tay búp măng phải */}
                        <path d="M242,258 Q246,272 241,278 Q235,280 232,272 Q231,265 231,260 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <ellipse cx="240" cy="275" rx="1" ry="1.5" fill="#F43F5E" opacity="0.6" />
                      </g>
                    )}

                    {/* POSE 2: HIP (Chống Hông High-Fashion Kiêu Sa) */}
                    {modelPose === 'hip' && (
                      <g id="female-arms-hip">
                        {/* Tay trái buông lơi thanh tao */}
                        <path d="M112,126 L88,180 L76,260 L88,262 L102,188 L118,138 Z" fill="url(#skin-gradient)" />
                        <path d="M76,260 Q72,274 77,280 Q83,282 86,274 Q87,266 87,261 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />

                        {/* Tay phải chống hông kiêu kỳ: Khuỷu tay gập ra ngoài, bàn tay tựa eo */}
                        <path d="M208,126 L246,182 L248,194 L204,244 L194,236 L236,184 L200,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.5" />
                        <circle cx="244" cy="188" r="4.5" fill="url(#skin-gradient)" />
                        <path d="M194,236 Q190,244 194,250 Q200,252 204,244 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <path d="M192,242 L188,248" stroke="#8C674E" strokeWidth="0.8" strokeLinecap="round" />
                      </g>
                    )}

                    {/* POSE 3: ROYAL (Chắp Tay Cung Đình Đoan Trang) */}
                    {modelPose === 'royal' && (
                      <g id="female-arms-royal">
                        <path d="M112,126 L102,185 L148,230 L156,220 L114,178 L122,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.4" />
                        <path d="M208,126 L218,185 L172,230 L164,220 L206,178 L198,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.4" />
                        <ellipse cx="160" cy="226" rx="14" ry="7" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.7" />
                        <path d="M152,224 Q160,220 168,224" stroke="#8C674E" strokeWidth="0.9" fill="none" />
                        <ellipse cx="157" cy="223" rx="1" ry="1.2" fill="#F43F5E" opacity="0.6" />
                        <ellipse cx="163" cy="223" rx="1" ry="1.2" fill="#F43F5E" opacity="0.6" />
                      </g>
                    )}

                    {/* POSE 4: GRACE (Nàng Thơ E Ấp Nâng Quạt / Chạm Mai Tóc) */}
                    {modelPose === 'grace' && (
                      <g id="female-arms-grace">
                        <path d="M112,126 L90,178 L78,258 L90,260 L104,188 L120,138 Z" fill="url(#skin-gradient)" />
                        <path d="M78,258 Q74,272 79,278 Q85,280 88,272 Q89,265 89,260 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />

                        {/* Tay phải nâng nhẹ thanh thoát trước xương quai xanh */}
                        <path d="M208,126 L238,172 L234,184 L196,152 L192,140 L226,170 L200,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.5" />
                        <path d="M192,140 Q186,134 190,128 Q196,126 198,136 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <path d="M188,132 Q183,128 186,124" stroke="#8C674E" strokeWidth="0.8" strokeLinecap="round" />
                        <ellipse cx="187" cy="126" rx="0.8" ry="1" fill="#F43F5E" opacity="0.7" />
                      </g>
                    )}

                    {/* ĐÔI CHÂN DÀI MIÊN MAN THEO TỪNG POSE DÁNG */}
                    {modelPose === 'hip' ? (
                      <g id="female-legs-hip">
                        <path d="M124,300 L126,380 L134,438 L152,438 L146,380 L152,300 Z" fill="url(#skin-gradient)" />
                        <path d="M165,300 L174,382 L178,438 L198,438 L200,382 L198,300 Z" fill="url(#skin-gradient)" />
                        <ellipse cx="138" cy="380" rx="5.5" ry="3" fill="#8C674E" opacity="0.2" />
                        <ellipse cx="187" cy="380" rx="6" ry="3" fill="#8C674E" opacity="0.2" />
                        <ellipse cx="142" cy="445" rx="11" ry="5" fill="url(#skin-gradient)" />
                        <ellipse cx="188" cy="445" rx="12" ry="5.5" fill="url(#skin-gradient)" />
                      </g>
                    ) : (
                      <g id="female-legs-standard">
                        <path d="M123,300 L121,382 L123,438 L143,438 L147,382 L155,300 Z" fill="url(#skin-gradient)" />
                        <path d="M165,300 L173,382 L177,438 L197,438 L199,382 L197,300 Z" fill="url(#skin-gradient)" />
                        <ellipse cx="134" cy="380" rx="6" ry="3" fill="#8C674E" opacity="0.2" />
                        <ellipse cx="186" cy="380" rx="6" ry="3" fill="#8C674E" opacity="0.2" />
                        <ellipse cx="133" cy="445" rx="12" ry="5.5" fill="url(#skin-gradient)" />
                        <ellipse cx="187" cy="445" rx="12" ry="5.5" fill="url(#skin-gradient)" />
                      </g>
                    )}
                  </g>
                )}

                {/* ======================================================== */}
                {/* 2. MODEL NAM EDITORIAL (LÃNG TỬ, NAM TÍNH, VAI RỘNG) */}
                {/* ======================================================== */}
                {modelType === 'male' && (
                  <g id="model-male-editorial" filter="url(#body-shadow)">
                    {/* Head & Neck with Pose Head Angle */}
                    <g transform={modelPose === 'hip' ? 'rotate(1.5 160 65)' : modelPose === 'grace' ? 'rotate(-1.5 160 65)' : ''}>
                      {/* Cổ rắn rỏi & Xương quai xanh nam tính */}
                      <rect x="151" y="86" width="18" height="28" rx="4" fill="url(#skin-gradient)" />
                      <path d="M142,114 Q153,118 160,116 Q167,118 178,114" stroke="#8C674E" strokeWidth="1.5" opacity="0.7" fill="none" />
                      <path d="M142,113.5 Q153,117.5 160,115.5 Q167,117.5 178,113.5" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" fill="none" />

                      {/* Khuôn mặt góc cạnh, xương hàm sắc sảo (Jawline) */}
                      <path
                        d="M138,50 Q138,36 160,36 Q182,36 182,50 Q182,68 172,82 Q160,89 148,82 Q138,68 138,50 Z"
                        fill="url(#face-shading)"
                        stroke="#8C674E"
                        strokeWidth="1"
                      />

                      {/* Chân mày rậm cương nghị */}
                      <path d="M144,53 L157,53" stroke="#18181B" strokeWidth="2.3" strokeLinecap="round" />
                      <path d="M163,53 L176,53" stroke="#18181B" strokeWidth="2.3" strokeLinecap="round" />

                      {/* Đôi mắt sáng kiên định có catchlight */}
                      <g id="male-eyes">
                        <path d="M145.5,58 Q151,54.5 156.5,58 Q151,61.5 145.5,58 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.9" />
                        <circle cx="151.5" cy="58" r="2.2" fill="url(#iris-grad)" />
                        <circle cx="151.5" cy="58" r="1.2" fill="#09090B" />
                        <circle cx="150.8" cy="57.3" r="0.6" fill="#FFFFFF" />

                        <path d="M163.5,58 Q169,54.5 174.5,58 Q169,61.5 163.5,58 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="0.9" />
                        <circle cx="168.5" cy="58" r="2.2" fill="url(#iris-grad)" />
                        <circle cx="168.5" cy="58" r="1.2" fill="#09090B" />
                        <circle cx="167.8" cy="57.3" r="0.6" fill="#FFFFFF" />
                      </g>

                      {/* Sống mũi cao thẳng tắp có highlight */}
                      <path d="M160,55 L159,68 L163,68" stroke="#8C674E" strokeWidth="1.2" fill="none" opacity="0.7" />
                      <line x1="159.5" y1="57" x2="159.5" y2="66" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />

                      {/* Bờ môi nam tính */}
                      <path d="M153.5,75 Q160,74 166.5,75" stroke="#9F1239" strokeWidth="1.5" fill="none" />
                      <path d="M156,77 Q160,78.2 164,77" stroke="#BE123C" strokeWidth="1" fill="none" />

                      {/* Kiểu tóc vuốt Side-Part lãng tử hiện đại với vệt highlight bắt sáng */}
                      <g id="male-hair">
                        <path d="M136,52 Q138,32 160,28 Q182,32 184,52 Q180,42 160,34 Q140,42 136,52 Z" fill="#18181B" />
                        <path d="M138,48 Q155,30 180,44" stroke="#3F3F46" strokeWidth="2.5" fill="none" />
                        <path d="M142,42 Q158,32 174,38" stroke="url(#hair-highlight)" strokeWidth="1.8" fill="none" />
                        <path d="M136,50 Q144,38 158,35" stroke="#71717A" strokeWidth="1.2" fill="none" />
                      </g>
                    </g>

                    {/* Khung Thân Trên Vai Ngang Vạm Vỡ Chuẩn Catwalk (Vai 44cm) */}
                    <path
                      d="M120,112 C110,116 106,126 106,140 L114,255 C114,260 122,262 128,262 L192,262 C198,262 206,260 206,255 L214,140 C214,126 210,116 200,112 Z"
                      fill="url(#skin-gradient)"
                    />
                    {/* Cơ bắp ngực & bụng 3D săn chắc */}
                    <path d="M136,155 Q160,165 184,155" stroke="#8C674E" strokeWidth="1.2" opacity="0.4" fill="none" />
                    <line x1="160" y1="160" x2="160" y2="230" stroke="#8C674E" strokeWidth="1" opacity="0.25" />
                    {/* Ánh sáng ven vai nam tính */}
                    <path d="M108,128 C107,150 112,240 115,255" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" fill="none" />
                    <path d="M212,128 C213,150 208,240 205,255" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" fill="none" />

                    {/* TAY NAM THEO TỪNG POSE DÁNG */}
                    {modelPose === 'runway' && (
                      <g id="male-arms-runway">
                        <path d="M106,124 L84,178 L72,258 L86,262 L100,188 L114,138 Z" fill="url(#skin-gradient)" />
                        <circle cx="79" cy="268" r="7.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />

                        <path d="M214,124 L236,178 L248,258 L234,262 L220,188 L206,138 Z" fill="url(#skin-gradient)" />
                        <circle cx="241" cy="268" r="7.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                      </g>
                    )}

                    {modelPose === 'hip' && (
                      <g id="male-arms-hip">
                        <path d="M106,124 L82,180 L70,260 L84,262 L98,188 L114,138 Z" fill="url(#skin-gradient)" />
                        <circle cx="77" cy="268" r="7.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />

                        {/* Tay phải chống hông / đút túi quần phong cách thời thượng */}
                        <path d="M214,124 L252,182 L254,196 L208,248 L196,240 L242,184 L206,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.5" />
                        <circle cx="204" cy="245" r="7.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                      </g>
                    )}

                    {modelPose === 'royal' && (
                      <g id="male-arms-royal">
                        {/* Hai tay chắp trước bụng cung kính phong thái sĩ phu */}
                        <path d="M106,124 L96,185 L146,230 L156,218 L110,178 L118,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.4" />
                        <path d="M214,124 L224,185 L174,230 L164,218 L210,178 L202,138 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.4" />
                        <ellipse cx="160" cy="226" rx="16" ry="8" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.8" />
                        <path d="M150,224 Q160,220 170,224" stroke="#8C674E" strokeWidth="1" fill="none" />
                      </g>
                    )}

                    {modelPose === 'grace' && (
                      <g id="male-arms-cross">
                        {/* Khoanh tay lãng tử trước ngực (Arms folded across broad chest) */}
                        <path d="M106,124 L94,170 L140,195 L200,195 L190,180 L140,180 L112,140 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <path d="M214,124 L226,170 L180,202 L120,202 L130,188 L180,188 L208,140 Z" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.6" />
                        <circle cx="126" cy="198" r="6.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.5" />
                        <circle cx="194" cy="192" r="6.5" fill="url(#skin-gradient)" stroke="#8C674E" strokeWidth="0.5" />
                      </g>
                    )}

                    {/* Khung Hông Cân Đối */}
                    <path d="M124,258 L196,258 L200,302 L120,302 Z" fill="url(#skin-gradient)" />

                    {/* Đôi Chân Thẳng Tắp Khỏe Khoắn */}
                    <path d="M121,300 L119,382 L121,438 L143,438 L147,382 L155,300 Z" fill="url(#skin-gradient)" />
                    <path d="M165,300 L173,382 L177,438 L199,438 L201,382 L199,300 Z" fill="url(#skin-gradient)" />
                    <ellipse cx="132" cy="445" rx="14" ry="6" fill="url(#skin-gradient)" />
                    <ellipse cx="188" cy="445" rx="14" ry="6" fill="url(#skin-gradient)" />
                  </g>
                )}

                {/* ======================================================== */}
                {/* 3. MANNEQUIN NGHỆ THUẬT GỖ ÓC CHÓ (ATELIER COUTURE) */}
                {/* ======================================================== */}
                {modelType === 'abstract' && (
                  <g id="model-abstract-atelier" filter="url(#body-shadow)">
                    {/* Đầu ma-nơ-canh tối giản bóng loáng */}
                    <ellipse cx="160" cy="62" rx="18" ry="24" fill="#3E2723" stroke="#D7CCC8" strokeWidth="1.5" />
                    <ellipse cx="160" cy="38" rx="5" ry="3" fill="#D4AF37" /> {/* Chốt kim loại vàng */}

                    {/* Khung cổ gỗ tiện nghệ thuật */}
                    <rect x="154" y="86" width="12" height="26" rx="3" fill="#4E342E" stroke="#8D6E63" strokeWidth="1" />

                    {/* Thân may đo bọc vải canvas cao cấp với đường chỉ may couture */}
                    <path
                      d="M124,114 C116,118 110,130 110,144 L117,255 C117,260 124,262 130,262 L190,262 C196,262 203,260 203,255 L210,144 C210,130 204,118 196,114 Z"
                      fill="#5D4037"
                      stroke="#8D6E63"
                      strokeWidth="1.5"
                    />
                    {/* Đường chỉ may dọc sống lưng chuẩn thợ may */}
                    <line x1="160" y1="116" x2="160" y2="260" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,2" />

                    {/* Khớp nối cánh tay kim loại đồng thau */}
                    <circle cx="108" cy="130" r="7" fill="#B8860B" stroke="#FFD700" strokeWidth="1" />
                    <circle cx="212" cy="130" r="7" fill="#B8860B" stroke="#FFD700" strokeWidth="1" />

                    {/* Cánh tay gỗ khớp nối theo từng Pose */}
                    {modelPose === 'hip' ? (
                      <g>
                        <path d="M106,134 L88,180 L76,258 L88,260 L100,188 L114,140 Z" fill="#4E342E" />
                        <path d="M214,134 L244,180 L204,242 L196,236 L234,180 L206,140 Z" fill="#4E342E" />
                      </g>
                    ) : modelPose === 'royal' ? (
                      <g>
                        <path d="M106,134 L98,180 L146,226 L154,218 L112,176 L114,140 Z" fill="#4E342E" />
                        <path d="M214,134 L222,180 L174,226 L166,218 L208,176 L206,140 Z" fill="#4E342E" />
                        <ellipse cx="160" cy="224" rx="12" ry="6" fill="#B8860B" />
                      </g>
                    ) : (
                      <g>
                        <path d="M106,134 L88,180 L78,258 L90,260 L102,188 L114,140 Z" fill="#4E342E" />
                        <path d="M214,134 L232,178 L242,258 L230,260 L218,188 L206,140 Z" fill="#4E342E" />
                      </g>
                    )}

                    {/* Khung hông và chân trụ kim loại atelier */}
                    <path d="M125,258 L195,258 L198,300 L122,300 Z" fill="#5D4037" />
                    {/* Đôi chân gỗ */}
                    <path d="M124,298 L122,380 L124,435 L144,435 L148,380 L156,298 Z" fill="#4E342E" />
                    <path d="M164,298 L172,380 L176,435 L196,435 L198,380 L196,298 Z" fill="#4E342E" />
                    <ellipse cx="134" cy="445" rx="12" ry="5" fill="#3E2723" />
                    <ellipse cx="186" cy="445" rx="12" ry="5" fill="#3E2723" />
                  </g>
                )}
              </svg>
            </div>

            {/* ======================================================== */}
            {/* 2D CLOTHING LAYERS (Realistic Drape Animation, Blend Mode & Z-Index) */}
            {/* ======================================================== */}
            <AnimatePresence mode="sync">
              {equippedItems.map((item) => {
                const isVisible = layerVisibility[item.id] !== false;
                const opacityVal = isVisible ? (layerOpacity[item.id] ?? 1) : 0;
                const garmentImg = getGarmentImageUrl(item, modelPose);
                const fitTransform = getGarmentFittingTransform(item, modelPose, modelType, fitSize);
                const effectiveZIndex = getEffectiveZIndex(item);
                const itemMixBlendMode = getItemMixBlendMode(item, customBlendModes);

                return (
                  <motion.div
                    key={item.id}
                    id={`equipped-layer-${item.id}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 1.04, 
                      filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.5))' 
                    }}
                    animate={{ 
                      opacity: opacityVal, 
                      scale: 1, 
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35))' 
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.96, 
                      filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))' 
                    }}
                    transition={{ 
                      duration: 0.25,
                      ease: 'easeOut'
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: effectiveZIndex,
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                    }}
                    className="w-full h-full"
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        transformOrigin: fitTransform.transformOrigin,
                        transform: fitTransform.transform,
                        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      className="w-full h-full transform-gpu will-change-transform"
                    >
                      <img
                        src={garmentImg}
                        alt={item.name}
                        style={{
                          mixBlendMode: itemMixBlendMode,
                        }}
                        className="w-full h-full object-contain pointer-events-none select-none transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty hint */}
          {equippedItems.length === 0 && (
            <div className="absolute inset-x-6 bottom-16 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-center text-xs text-slate-300 backdrop-blur-md shadow-2xl pointer-events-none">
              <span className="text-lg mb-0.5 block">✨</span>
              <p className="font-bold text-amber-300 mb-0.5">{t('mannequin.title')}</p>
              <p className="text-[11px] text-slate-400">Chọn đồ từ Tủ bên phải hoặc kéo thả trực tiếp vào Mannequin</p>
            </div>
          )}
        </div>
      </div>

      {/* Studio Bottom Controls (Backdrop Selector, Equipped Layers Strip, & Action CTAs) */}
      <div className="w-full space-y-2 mt-1 z-10">
        {/* Backdrop Scene Buttons */}
        <div className="bg-slate-950/70 rounded-xl p-1.5 sm:p-2 border border-slate-800 flex items-center justify-between gap-1 text-[10px]">
          <span className="text-slate-400 font-semibold flex items-center gap-1 whitespace-nowrap pl-1">
            <Compass className="w-3 h-3 text-amber-400" /> Bối cảnh:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-gold">
            <button
              onClick={() => setStudioBackdrop('minimal')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                studioBackdrop === 'minimal'
                  ? 'bg-slate-800 text-amber-300 font-bold border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>🏛️</span>
              <span>Indochine</span>
            </button>
            <button
              onClick={() => setStudioBackdrop('imperial')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                studioBackdrop === 'imperial'
                  ? 'bg-red-950/90 text-rose-300 font-bold border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>👑</span>
              <span>Cố đô Huế</span>
            </button>
            <button
              onClick={() => setStudioBackdrop('lantern')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                studioBackdrop === 'lantern'
                  ? 'bg-amber-950/90 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>🏮</span>
              <span>Hội An</span>
            </button>
            <button
              onClick={() => setStudioBackdrop('cyber')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                studioBackdrop === 'cyber'
                  ? 'bg-cyan-950/90 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <span>⚡</span>
              <span>Cyber</span>
            </button>
          </div>
        </div>

        {/* Equipped Layers Management Panel (Drag-and-Drop Reordering, Mix-Blend-Mode & Visibility) */}
        <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2 px-0.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                {t('mannequin.equippedLayers')} ({equippedItems.length})
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                • Kéo thẻ để đổi thứ tự lớp chồng
              </span>
            </div>

            <div className="flex items-center gap-2">
              {equippedItems.length > 0 && (
                <>
                  <button
                    onClick={() => setIsLayersExpanded(!isLayersExpanded)}
                    className="text-[10px] text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 cursor-pointer"
                    title="Mở rộng tùy chỉnh chi tiết từng lớp"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>{isLayersExpanded ? 'Thu gọn' : 'Chỉnh nâng cao'}</span>
                  </button>

                  <button
                    onClick={handleResetLayers}
                    className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 cursor-pointer"
                    title="Đặt lại thứ tự & hiệu ứng hòa trộn mặc định từ metadata"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Mặc định</span>
                  </button>

                  <button
                    onClick={onClearAll}
                    className="text-[10px] text-rose-400 hover:text-rose-300 transition-colors cursor-pointer font-medium hover:underline pl-1"
                  >
                    Lột đồ
                  </button>
                </>
              )}
            </div>
          </div>

          {equippedItems.length === 0 ? (
            <div className="py-3 text-center text-[11px] text-slate-500 italic bg-slate-900/50 rounded-lg border border-dashed border-slate-800/80">
              Chưa trang bị món nào • Kéo thả từ Tủ Đồ hoặc click vào món đồ để thử
            </div>
          ) : (
            <div className="space-y-1.5">
              {/* Horizontal / Grid Draggable Layer Strips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-gold">
                {sortedLayers.map((item, index) => {
                  const effectiveZ = getEffectiveZIndex(item);
                  const layerBlendMode = getItemMixBlendMode(item, customBlendModes);
                  const isVisible = layerVisibility[item.id] !== false;
                  const isDraggingThis = draggedLayerId === item.id;
                  const isDragOverThis = dragOverLayerId === item.id;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleLayerDragStart(e, item)}
                      onDragOver={(e) => handleLayerDragOver(e, item)}
                      onDrop={(e) => handleLayerDrop(e, item)}
                      className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg border text-xs text-slate-200 flex-shrink-0 transition-all select-none cursor-grab active:cursor-grabbing ${
                        isDraggingThis
                          ? 'opacity-40 border-dashed border-amber-400 scale-95 bg-slate-800/80'
                          : isDragOverThis
                          ? 'border-amber-400 bg-amber-950/30 scale-102 ring-1 ring-amber-400/50 shadow-lg'
                          : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      {/* Drag Handle Icon */}
                      <GripVertical className="w-3.5 h-3.5 text-slate-500 hover:text-amber-400 flex-shrink-0" />

                      {/* Item Swatch */}
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/20"
                        style={{ backgroundColor: item.color || '#F43F5E' }}
                      />

                      {/* Name & Z-Index */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-[11px] max-w-[105px] truncate leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          Lớp {index + 1} • z:{effectiveZ}
                        </span>
                      </div>

                      {/* Move Up / Down Buttons */}
                      <div className="flex flex-col items-center gap-0.5 pl-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveLayer(item.id, 'up');
                          }}
                          disabled={index === 0}
                          className={`p-0.5 rounded text-slate-400 hover:text-amber-300 hover:bg-slate-800 ${
                            index === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Đưa lên lớp trên"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveLayer(item.id, 'down');
                          }}
                          disabled={index === sortedLayers.length - 1}
                          className={`p-0.5 rounded text-slate-400 hover:text-amber-300 hover:bg-slate-800 ${
                            index === sortedLayers.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Hạ xuống lớp dưới"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Blend Mode Badge / Toggle Pill */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBlendMode(item.id);
                        }}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-all cursor-pointer ${
                          layerBlendMode === 'multiply'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/40 hover:bg-amber-900/80 font-bold'
                            : layerBlendMode === 'overlay'
                            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/80 font-bold'
                            : layerBlendMode === 'screen'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-500/40 hover:bg-purple-900/80 font-bold'
                            : layerBlendMode === 'soft-light'
                            ? 'bg-rose-950/80 text-rose-300 border-rose-500/40 hover:bg-rose-900/80 font-bold'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                        title={`mix-blend-mode: ${layerBlendMode} (Click để đổi)`}
                      >
                        {layerBlendMode}
                      </button>

                      {/* Visibility Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleVisibility(item.id);
                        }}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isVisible ? 'text-slate-400 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400 bg-slate-950'
                        }`}
                        title={isVisible ? 'Ẩn lớp này' : 'Hiện lớp này'}
                      >
                        {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-rose-400" />}
                      </button>

                      {/* Inspect / Settings Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingItemId(inspectingItemId === item.id ? null : item.id);
                        }}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          inspectingItemId === item.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                        }`}
                        title="Tùy chỉnh chi tiết (Độ mờ, Blend Mode)"
                      >
                        <Sliders className="w-3 h-3" />
                      </button>

                      {/* Unequip Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUnequip(item.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer p-0.5"
                        title={t('mannequin.unequip')}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Advanced Layer Detail Inspector Popover/Section */}
              {(isLayersExpanded || inspectingItemId) && (
                <div className="bg-slate-900/95 rounded-lg border border-slate-800 p-3 mt-1 space-y-2 text-xs">
                  {(() => {
                    const activeInspectItem = inspectingItemId 
                      ? equippedItems.find((i) => i.id === inspectingItemId) 
                      : sortedLayers[0];
                    
                    if (!activeInspectItem) return null;

                    const curBlend = getItemMixBlendMode(activeInspectItem, customBlendModes);
                    const curOpacity = Math.round((layerOpacity[activeInspectItem.id] ?? 1) * 100);
                    const curZ = getEffectiveZIndex(activeInspectItem);

                    return (
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                          <div className="flex items-center gap-1.5">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                            <span className="font-bold text-white">Chỉnh Lớp: {activeInspectItem.name}</span>
                            <span className="text-[10px] text-slate-400">({activeInspectItem.category})</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                            Metadata: {activeInspectItem.mix_blend_mode || 'auto'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Blend Mode Picker */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-medium text-slate-300 block">
                              Hiệu ứng hòa trộn vải (mix-blend-mode):
                            </label>
                            <div className="flex items-center gap-1 flex-wrap">
                              {['multiply', 'normal', 'overlay', 'screen', 'soft-light'].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => handleSetBlendMode(activeInspectItem.id, mode)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                                    curBlend === mode
                                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                                  }`}
                                >
                                  {mode}
                                </button>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-500 italic mt-0.5">
                              {curBlend === 'multiply' && '• Multiply: Hòa nếp vải & hoa văn in vào khối giải phẫu body.'}
                              {curBlend === 'normal' && '• Normal: Giữ nguyên vẹn độ đục của lụa trắng, kim loại & da giày.'}
                              {curBlend === 'overlay' && '• Overlay: Tăng độ tương phản ánh sáng giữa gấm và da.'}
                              {curBlend === 'screen' && '• Screen: Giúp trang sức & phản quang phát sáng lung linh.'}
                              {curBlend === 'soft-light' && '• Soft-Light: Nhuộm màu tơ tằm thanh thoát, nhẹ nhàng.'}
                            </p>
                          </div>

                          {/* Opacity & Stacking Level */}
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                                <span>Độ mờ đục vải (Opacity):</span>
                                <span className="font-mono text-amber-400">{curOpacity}%</span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                value={curOpacity}
                                onChange={(e) => handleSetOpacity(activeInspectItem.id, Number(e.target.value) / 100)}
                                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                              />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                              <span>Thứ tự chồng lớp (Z-Index):</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {curZ}
                                </span>
                                <button
                                  onClick={() => handleMoveLayer(activeInspectItem.id, 'up')}
                                  className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] cursor-pointer"
                                  title="Đưa lên trên 1 bậc"
                                >
                                  Lên
                                </button>
                                <button
                                  onClick={() => handleMoveLayer(activeInspectItem.id, 'down')}
                                  className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] cursor-pointer"
                                  title="Hạ xuống dưới 1 bậc"
                                >
                                  Xuống
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions: Snapshot & AI Review */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={handleQuickSnapshot}
            disabled={equippedItems.length === 0}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              equippedItems.length > 0
                ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30 active:scale-98 shadow-sm'
                : 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Chụp Lookbook</span>
          </button>

          <button
            id="trigger-ai-review-btn"
            onClick={onOpenAIReview}
            disabled={equippedItems.length === 0}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide shadow-lg transition-all transform cursor-pointer ${
              equippedItems.length > 0
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 text-slate-950 font-black hover:shadow-amber-500/25 active:scale-98'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('mannequin.aiCheckBtn')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
