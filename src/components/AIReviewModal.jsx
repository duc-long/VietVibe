import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertTriangle, Lightbulb, CheckCircle2, Copy, X, Terminal, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIReviewModal({ isOpen, onClose, equippedItems }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewResult, setReviewResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showRawPayload, setShowRawPayload] = useState(false);
  const [rawPayloadString, setRawPayloadString] = useState('');

  /**
   * Hàm generateAIReview() theo đúng yêu cầu:
   * 1. Lấy mảng equippedItems
   * 2. Trích xuất toàn bộ trường metadata_for_ai
   * 3. Gom thành một mảng string JSON (payload)
   * 4. In mảng string đó ra: console.log("Gửi lên Gemini API:", payload)
   * 5. Logic setTimeout 2 giây (giả lập call API)
   * 6. Trả về Mock JSON Data
   */
  const generateAIReview = () => {
    setIsLoading(true);
    setReviewResult(null);

    // 1 & 2: Trích xuất toàn bộ trường metadata_for_ai
    const metadataList = equippedItems.map((item) => item.metadata_for_ai);

    // 3: Gom thành một mảng string JSON
    const payload = JSON.stringify(metadataList, null, 2);
    setRawPayloadString(payload);

    // 4: In mảng string ra console theo yêu cầu
    console.log("Gửi lên Gemini API:", payload);

    // 5: Logic setTimeout 2 giây (giả lập call API)
    setTimeout(() => {
      // Đánh giá ngữ nghĩa thông minh dựa trên các món đồ đã mặc
      const hasImperialYellow = equippedItems.some((i) => i.id === 'top_ngu_than_vang');
      const hasNhatBinh = equippedItems.some((i) => i.id === 'top_nhat_binh_xanh');
      const hasGiaoLinh = equippedItems.some((i) => i.id === 'top_giao_linh_luc');
      const hasAoYem = equippedItems.some((i) => i.id === 'top_ao_yem_dao');
      const hasBlazer = equippedItems.some((i) => i.id === 'top_blazer_indochine');
      const hasNonLa = equippedItems.some((i) => i.id === 'acc_non_la_hue');
      const hasNonQuaiThao = equippedItems.some((i) => i.id === 'acc_non_quai_thao');
      const hasStreetwear = equippedItems.some((i) => i.style === 'streetwear');
      const hasTraditional = equippedItems.some((i) => i.style === 'viet_phuc');
      const hasSunglasses = equippedItems.some((i) => i.id === 'acc_kinh_ram_matrix');
      const hasChunkySneaker = equippedItems.some((i) => i.id === 'shoes_sneaker_chunky' || i.id === 'shoes_sneaker_high_thuyba');
      const hasGuocMoc = equippedItems.some((i) => i.id === 'shoes_guoc_moc_do');
      const hasCargo = equippedItems.some((i) => i.id === 'bottom_cargo_pants');

      let dynamicResult;

      if (hasTraditional && hasStreetwear) {
        let warning = 'Áo truyền thống mang tính lễ nghi tôn nghiêm, khi phối dạo phố cùng streetwear nên chọn form dáng tôn trọng nét tao nhã.';
        if (hasImperialYellow) {
          warning = 'Màu vàng chính sắc xưa chỉ dành cho hoàng đế triều Nguyễn. Phối cùng jeans baggy tạo độ tương phản vương quyền và tự do đường phố rất hút mắt!';
        } else if (hasNhatBinh) {
          warning = 'Áo Nhật Bình hoa văn ngũ hành cung tần triều Nguyễn là đỉnh cao phẩm phục. Khi phối cùng sneaker hoặc kính Matrix tạo khí chất nữ vương tương lai!';
        } else if (hasGiaoLinh) {
          warning = 'Áo Giao Lĩnh thời Lê Sơ mang cốt cách nho nhã văn nhân, kết hợp cùng sneaker mang lại luồng gió mới mẻ cho trang phục cổ.';
        } else if (hasAoYem) {
          warning = 'Áo yếm lụa đào phối cùng jeans baggy là bản phối kinh điển tôn vinh sự quyến rũ dân gian pha lẫn nét nổi loạn hiện đại.';
        }

        let advice = 'Set đồ có sự cân bằng đỉnh cao giữa phom dáng cổ phục và phụ kiện đương đại!';
        if (hasCargo) {
          advice = 'Phối cùng Quần Cargo Tactical tạo cảm giác Cyber-Indochine cực chiến và phá cách!';
        } else if (hasBlazer) {
          advice = 'Áo Blazer Indochine kết hợp hoàn hảo cùng phụ kiện truyền thống, mang lại phong thái doanh nhân thời thượng.';
        } else if (!hasSunglasses) {
          advice = 'Nên phối thêm kính râm Matrix Y2K hoặc kiềng bạc hoa sen để outfit tăng điểm thần thái!';
        }

        dynamicResult = {
          score: hasSunglasses || hasChunkySneaker ? 95 : 90,
          vibe: 'Tân Cổ Giao Duyên (Neo-Heritage Streetwear)',
          culturalWarning: warning,
          stylingAdvice: advice,
        };
      } else if (hasTraditional && !hasStreetwear) {
        let warning = 'Phục trang chuẩn mực lễ nghi truyền thống Việt Nam.';
        if (hasImperialYellow) {
          warning = 'Màu vàng chính sắc hoàng gia. Chuẩn phong phạm đại lễ cung đình Huế.';
        } else if (hasNonQuaiThao) {
          warning = 'Nón Quai Thao tơ vàng gợi nhắc không gian lễ hội Kinh Bắc và những làn điệu quan họ mượt mà.';
        } else if (hasNonLa) {
          warning = 'Nón lá bài thơ xứ Huế tôn lên vẻ dịu dàng đằm thắm của người phụ nữ Việt Nam.';
        } else if (hasGiaoLinh) {
          warning = 'Trang phục Giao Lĩnh tôn vinh vẻ đẹp văn hiến ngàn năm thời Lê Sơ.';
        }

        dynamicResult = {
          score: 98,
          vibe: 'Cổ Phong Thuần Khiết (Pure Heritage)',
          culturalWarning: warning,
          stylingAdvice: hasGuocMoc
            ? 'Set đồ cổ phục trọn vẹn từ đầu đến chân! Nếu muốn thử chút nổi loạn Gen Z, hãy thử thay bằng Sneaker Chunky!'
            : 'Thử phối thêm một đôi guốc mộc quai đỏ hoặc kiềng bạc cung đình để chuẩn bài chỉn chu nhất.',
        };
      } else {
        dynamicResult = {
          score: 80,
          vibe: 'Streetwear Phố Thị (Cyberpunk Vibe)',
          culturalWarning: 'Outfit mang đậm tính thời thượng phương Tây hiện đại, chưa có điểm nhấn bản sắc Việt phục.',
          stylingAdvice: 'Thử khoác thêm một chiếc Áo Nhật Bình, Áo Ngũ Thân hoặc cài Khăn Đóng để tạo DNA Việt Vibe độc bản!',
        };
      }

      setReviewResult(dynamicResult);
      setIsLoading(false);

      // Bắn pháo giấy mừng outfit điểm cao
      if (dynamicResult.score >= 85) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#06B6D4'],
        });
      }
    }, 2000);
  };

  // Kích hoạt thẩm định khi mở modal
  useEffect(() => {
    if (isOpen && equippedItems.length > 0) {
      generateAIReview();
    }
  }, [isOpen]);

  const handleCopyReview = () => {
    if (!reviewResult) return;
    const text = `[VietVibe AI Review]\n⭐ Điểm số: ${reviewResult.score}/100\n✨ Vibe: ${reviewResult.vibe}\n⚠️ Lưu ý văn hóa: ${reviewResult.culturalWarning}\n💡 Lời khuyên Stylist: ${reviewResult.stylingAdvice}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="ai-review-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          {/* Modal Container */}
          <motion.div
            id="ai-review-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100 max-h-[88vh] flex flex-col"
          >
            {/* Background Neon Highlights */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              id="close-ai-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {t('aiModal.title')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('aiModal.subtitle')}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto pr-1.5 custom-scrollbar">
            {/* Loading State: Giả lập call API 2 giây */}
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-rose-500 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <Sparkles className="w-6 h-6 text-amber-300 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-300">
                    {t('aiModal.analyzing')}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {t('aiModal.analyzingHint')}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>Payload: {equippedItems.length} items metadata ready</span>
                </div>
              </div>
            ) : reviewResult ? (
              /* Kết quả thẩm định trả về từ Mock AI */
              <div className="space-y-4">
                {/* Score & Vibe Hero Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  {/* Circular Score Gauge */}
                  <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-800 sm:pr-3">
                    <span className="text-xs text-slate-400 font-medium mb-1">
                      {t('aiModal.scoreLabel')}
                    </span>
                    <div className="relative flex items-center justify-center">
                      <span className="text-3xl font-black font-display bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                        {reviewResult.score}
                      </span>
                      <span className="text-xs text-slate-500 ml-0.5">/100</span>
                    </div>
                  </div>

                  {/* Vibe Verdict */}
                  <div className="sm:col-span-2 flex flex-col justify-center sm:pl-2">
                    <span className="text-xs text-slate-400 font-medium mb-1">
                      {t('aiModal.vibeLabel')}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-amber-300">
                        {reviewResult.vibe}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Đã qua bộ lọc đối chiếu quy chuẩn cổ phục & văn hóa đường phố
                    </span>
                  </div>
                </div>

                {/* Cultural Warning Card */}
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{t('aiModal.warningLabel')}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    {reviewResult.culturalWarning}
                  </p>
                </div>

                {/* Styling Advice Card */}
                <div className="p-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Lightbulb className="w-4 h-4 flex-shrink-0" />
                    <span>{t('aiModal.adviceLabel')}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    {reviewResult.stylingAdvice}
                  </p>
                </div>

                {/* Payload Inspector Accordion (Hiển thị mảng string gửi lên Gemini) */}
                <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden text-xs">
                  <button
                    onClick={() => setShowRawPayload(!showRawPayload)}
                    className="w-full px-3 py-2 flex items-center justify-between text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-mono text-[11px]">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      {t('aiModal.payloadLabel')} ({equippedItems.length} items)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {showRawPayload ? 'Ẩn' : 'Xem JSON'}
                    </span>
                  </button>

                  {showRawPayload && (
                    <div className="p-3 border-t border-slate-800 bg-slate-950 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{rawPayloadString}</pre>
                    </div>
                  )}
                </div>

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between gap-3 pt-3">
                  <button
                    onClick={handleCopyReview}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{t('aiModal.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép kết quả</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={generateAIReview}
                      className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      {t('aiModal.reanalyze')}
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      {t('aiModal.close')}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
