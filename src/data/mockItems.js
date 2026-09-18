/**
 * mockItems.js
 * Danh sách trang phục phục vụ hệ thống 2D Layering & AI Cultural Review
 * Đồ họa vector chuẩn Haute Couture Runway 320x540
 * Thiết kế ôm sát phom người mẫu, tạo khối 3D chân thực, bóng đổ tiếp xúc và animation tự nhiên
 */

// Helper tạo SVG Data URI định dạng chuẩn vector 2D trong suốt khớp khung Mannequin 320x540
const createLayerSvg = (svgContent) => {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 540" width="100%" height="100%">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
};

export const MOCK_ITEMS = [
  // ===================== TOPS (ÁO / THƯỢNG Y) =====================
  {
    id: 'top_nhat_binh_xanh',
    name: 'Áo Nhật Bình Ngũ Hành Cung Đình',
    category: 'top',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Gấm Sa Tinh dệt sợi ngũ sắc & chỉ vàng ròng',
    era: 'Triều Nguyễn (TK 19)',
    z_index: 26,
    color: '#0284C7',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="ao-nhat-binh-xanh">
        <defs>
          <style>
            @keyframes shimmerGold {
              0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 1px rgba(245,158,11,0.4)); }
              50% { opacity: 1; filter: drop-shadow(0 0 3px rgba(254,240,138,0.8)); }
            }
            .gold-glow { animation: shimmerGold 3s ease-in-out infinite; }
          </style>
          <!-- Gradient gấm xanh thiên thanh óng ả có ánh sáng chiếu xiên -->
          <linearGradient id="silk-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284C7" />
            <stop offset="35%" stop-color="#0369A1" />
            <stop offset="70%" stop-color="#075985" />
            <stop offset="100%" stop-color="#082f49" />
          </linearGradient>
          <linearGradient id="silk-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.4" />
            <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#0284C7" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="gold-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#D97706" />
            <stop offset="50%" stop-color="#FEF08A" />
            <stop offset="100%" stop-color="#B45309" />
          </linearGradient>
          <filter id="cloth-depth" x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Lớp lót áo bên trong trắng ngọc -->
        <path d="M142,98 L178,98 L174,130 L146,130 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />

        <!-- Thân áo Nhật Bình ôm bờ vai và buông rủ chuẩn Haute Couture -->
        <g filter="url(#cloth-depth)">
          <!-- Cánh tay thụng buông dài mềm mại từ vai qua khuỷu tay -->
          <path d="M120,108 C100,114 74,138 60,165 L36,275 C34,282 42,286 48,285 L98,282 L116,215 L118,348 C118,354 125,356 130,356 L190,356 C195,356 202,354 202,348 L204,215 L222,282 L272,285 C278,286 286,282 284,275 L260,165 C246,138 220,114 200,108 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          <!-- Vạt vải bóng sáng tự nhiên trên ngực và vai -->
          <path d="M120,108 L142,108 L138,220 L118,215 Z" fill="url(#silk-sheen)" />
          <path d="M200,108 L178,108 L182,220 L202,215 Z" fill="url(#silk-sheen)" />
        </g>

        <!-- Các nếp nhăn và đường may rủ tự nhiên của tà áo gấm -->
        <path d="M136,215 C132,260 130,305 128,355" stroke="#082F49" stroke-width="1.8" fill="none" opacity="0.6" />
        <path d="M184,215 C188,260 190,305 192,355" stroke="#082F49" stroke-width="1.8" fill="none" opacity="0.6" />
        <path d="M160,230 L160,356" stroke="#075985" stroke-width="1.5" opacity="0.5" />

        <!-- Nẹp cổ hình chữ nhật đặc trưng cung tần: Dải Ngũ Hành (Lục - Đỏ - Vàng - Trắng - Xanh) -->
        <g id="nep-co-ngu-hanh" filter="url(#cloth-depth)">
          <path d="M140,100 L180,100 L180,240 L140,240 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5" />
          <line x1="144" y1="104" x2="144" y2="238" stroke="#10B981" stroke-width="2.5" /> <!-- Mộc (Lục) -->
          <line x1="150" y1="104" x2="150" y2="238" stroke="#EF4444" stroke-width="2.5" /> <!-- Hỏa (Đỏ) -->
          <line x1="156" y1="104" x2="156" y2="238" stroke="#F59E0B" stroke-width="2.5" /> <!-- Thổ (Vàng) -->
          <line x1="164" y1="104" x2="164" y2="238" stroke="#F8FAFC" stroke-width="2.5" /> <!-- Kim (Trắng) -->
          <line x1="170" y1="104" x2="170" y2="238" stroke="#0284C7" stroke-width="2.5" /> <!-- Thủy (Xanh) -->
          <line x1="176" y1="104" x2="176" y2="238" stroke="#CA8A04" stroke-width="1" />
        </g>

        <!-- Cúc ngọc bích bọc vàng chạm hoa sen cài áo -->
        <g id="cuc-ngoc-bich">
          <circle cx="160" cy="120" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="159" cy="119" r="1" fill="#A7F3D0" />
          <circle cx="160" cy="156" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="159" cy="155" r="1" fill="#A7F3D0" />
          <circle cx="160" cy="192" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="159" cy="191" r="1" fill="#A7F3D0" />
        </g>

        <!-- Dải hoa văn Ngũ Hành bo gấu tay áo thụng -->
        <g id="gau-tay-ngu-hanh">
          <path d="M38,272 L96,280" stroke="#10B981" stroke-width="3" />
          <path d="M37,276 L95,284" stroke="#EF4444" stroke-width="3.5" />
          <path d="M36,280 L94,288" stroke="#FEF08A" stroke-width="3" />
          <path d="M224,288 L284,280" stroke="#FEF08A" stroke-width="3" />
          <path d="M225,284 L283,276" stroke="#EF4444" stroke-width="3.5" />
          <path d="M226,280 L282,272" stroke="#10B981" stroke-width="3" />
        </g>

        <!-- Họa tiết Loan Phượng Dát Vàng thêu trước bụng rực rỡ lấp lánh -->
        <g className="gold-glow">
          <circle cx="160" cy="300" r="22" fill="none" stroke="url(#gold-thread)" stroke-width="2" stroke-dasharray="4,2" />
          <circle cx="160" cy="300" r="10" fill="#B45309" stroke="#FEF08A" stroke-width="1" />
          <path d="M146,296 Q160,282 174,296 Q160,320 146,296 Z" fill="#FDE047" opacity="0.9" />
          <!-- Đám mây lành cát tường ngũ sắc dưới chân áo -->
          <path d="M136,346 Q146,338 160,344 Q174,338 184,346" stroke="url(#gold-thread)" stroke-width="2" fill="none" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Áo Nhật Bình sắc xanh thiên thanh, vạt cổ dệt dải ngũ sắc tượng trưng cho Ngũ Hành (Kim Mộc Thủy Hỏa Thổ), họa tiết loan phượng dát vàng chuẩn phẩm phục cung tần triều Nguyễn.',
  },

  {
    id: 'top_giao_linh_luc',
    name: 'Áo Giao Lĩnh Lục Ngọc Cổ Phong',
    category: 'top',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Lụa Tơ Tằm Dệt Chìm Vân Hạc',
    era: 'Triều Lê Sơ (TK 15)',
    z_index: 23,
    color: '#059669',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="ao-giao-linh-luc">
        <defs>
          <style>
            @keyframes tasselSwing {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            .tassel-sway { transform-origin: 160px 230px; animation: tasselSwing 3.5s ease-in-out infinite; }
          </style>
          <linearGradient id="grad-giao-linh" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="40%" stop-color="#059669" />
            <stop offset="85%" stop-color="#047857" />
            <stop offset="100%" stop-color="#064E3B" />
          </linearGradient>
          <linearGradient id="amber-belt" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#D97706" />
            <stop offset="50%" stop-color="#FDE047" />
            <stop offset="100%" stop-color="#B45309" />
          </linearGradient>
          <filter id="garment-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Thân áo vạt chéo Giao Lĩnh ôm sát cổ và cơ thể người mẫu -->
        <g filter="url(#garment-shadow)">
          <path d="M122,106 C104,112 78,136 65,160 L44,270 C42,276 48,280 54,279 L104,275 L116,210 L118,342 C118,348 124,350 130,350 L190,350 C196,350 202,348 202,342 L204,210 L216,275 L266,279 C272,280 278,276 276,270 L255,160 C242,136 216,112 198,106 Z" 
                fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.8" />
        </g>

        <!-- Vạt chéo giao lĩnh sang trọng: vạt trái đè lên vạt phải tạo cổ chữ Y kinh điển -->
        <path d="M128,105 L182,168 L182,348" stroke="#FEF08A" stroke-width="3.5" fill="none" />
        <path d="M192,105 L144,164" stroke="#FBBF24" stroke-width="3" fill="none" />
        <path d="M130,105 L180,165 L162,205 L124,155 Z" fill="#D1FAE5" opacity="0.25" />

        <!-- Họa tiết vân hạc dệt chìm sang trọng trên tà áo -->
        <g stroke="#A7F3D0" stroke-width="0.8" opacity="0.4" fill="none">
          <path d="M136,250 Q145,242 154,250 Q162,258 170,250" />
          <path d="M142,280 Q152,272 162,280 Q170,288 180,280" />
        </g>

        <!-- Thắt lưng dải lụa Đại Đái màu vàng hổ phách có ngọc bội buông rủ -->
        <rect x="120" y="218" width="80" height="14" rx="3" fill="url(#amber-belt)" stroke="#78350F" stroke-width="1.2" filter="url(#garment-shadow)" />
        
        <!-- Dải tua rua ngọc bội đung đưa nhẹ nhàng tự nhiên -->
        <g className="tassel-sway">
          <!-- Miếng ngọc bội chạm khắc hình rồng mây -->
          <circle cx="160" cy="238" r="8" fill="#10B981" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="160" cy="238" r="3" fill="#D1FAE5" />
          <!-- Dải lụa rủ xuống chân tà áo -->
          <path d="M157,246 L154,325 L166,325 L163,246 Z" fill="#F59E0B" stroke="#B45309" stroke-width="0.8" />
          <!-- Tua rua sợi chỉ vàng mềm mại -->
          <line x1="155" y1="325" x2="153" y2="338" stroke="#D97706" stroke-width="1.2" />
          <line x1="158" y1="325" x2="158" y2="340" stroke="#FEF08A" stroke-width="1.5" />
          <line x1="161" y1="325" x2="161" y2="340" stroke="#FEF08A" stroke-width="1.5" />
          <line x1="164" y1="325" x2="166" y2="338" stroke="#D97706" stroke-width="1.2" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Áo Giao Lĩnh vạt chéo sắc lục bảo dệt chìm hoa văn mây hạc, kết hợp dải thắt lưng Đại Đái thắt ngọc bội buông rủ tôn vinh phong phạm tao nhã thời Lê Sơ.',
  },

  {
    id: 'top_ngu_than_vang',
    name: 'Áo Tấc / Ngũ Thân Hoàng Gia Chính Sắc',
    category: 'top',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Gấm Thượng Uyển Triều Nguyễn Hoàng Kim',
    era: 'Hoàng Triều Nguyễn (TK 19)',
    z_index: 25,
    color: '#EAB308',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="ao-ngu-than-vang">
        <defs>
          <linearGradient id="imperial-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="40%" stop-color="#EAB308" />
            <stop offset="85%" stop-color="#CA8A04" />
            <stop offset="100%" stop-color="#854D0E" />
          </linearGradient>
          <filter id="royal-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Thân áo Tấc ngũ thân tay thụng vàng chính sắc bao trọn cơ thể -->
        <g filter="url(#royal-shadow)">
          <path d="M120,105 C100,112 70,136 55,160 L32,275 C30,282 38,285 44,284 L96,280 L114,212 L116,354 C116,360 124,362 130,362 L190,362 C196,362 204,360 204,354 L206,212 L224,280 L276,284 C282,285 290,282 288,275 L265,160 C250,136 220,112 200,105 Z" 
                fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.8" />
        </g>

        <!-- Cổ đứng (Lập Lĩnh) 4cm truyền thống ôm khít cổ người mẫu -->
        <path d="M144,94 Q160,90 176,94 L177,106 Q160,110 143,106 Z" fill="#CA8A04" stroke="#78350F" stroke-width="1.5" />
        <!-- Khuy vàng cài cổ -->
        <circle cx="160" cy="100" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

        <!-- Vạt Hữu (vạt con bên trong lót vạt lớn) đặc trưng ngũ thân 5 khuy vàng -->
        <path d="M160,106 Q178,118 184,140 Q184,180 184,354" stroke="#854D0E" stroke-width="2" fill="none" />
        <circle cx="172" cy="120" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
        <circle cx="180" cy="142" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
        <circle cx="183" cy="172" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
        <circle cx="184" cy="205" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />

        <!-- Họa tiết mây cuộn và chữ Vạn may mắn thêu chìm màu hoàng kim -->
        <g stroke="#FEF08A" stroke-width="1" opacity="0.6" fill="none">
          <circle cx="150" cy="260" r="16" stroke-dasharray="3,2" />
          <circle cx="150" cy="260" r="8" />
          <circle cx="170" cy="305" r="16" stroke-dasharray="3,2" />
          <circle cx="170" cy="305" r="8" />
        </g>

        <!-- Viền tay áo Tấc lót lụa trắng sang quý (dành riêng cho lễ phục đại triều) -->
        <path d="M34,278 L94,284" stroke="#FFFFFF" stroke-width="3" />
        <path d="M226,284 L286,278" stroke="#FFFFFF" stroke-width="3" />
      </g>
    `),
    metadata_for_ai: 'Áo Tấc / Ngũ Thân màu vàng chính sắc hoàng tộc, cổ đứng lập lĩnh 5 khuy, tay thụng đại lễ biểu trưng cho quyền uy và lễ nghi cung đình Huế.',
  },

  {
    id: 'top_ngu_than_nam_xanh',
    name: 'Áo Ngũ Thân Tay Chẽn Nam Giới Lam Chàm',
    category: 'top',
    gender: 'male',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Gấm Thượng Uyển Dệt Vân Mây & 5 Khuy Đồng Sĩ Phu',
    era: 'Triều Nguyễn - Sĩ Phu & Quý Tộc Nam',
    z_index: 25,
    color: '#1E3A8A',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="ao-ngu-than-nam-xanh">
        <defs>
          <linearGradient id="indigo-silk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563EB" />
            <stop offset="35%" stop-color="#1D4ED8" />
            <stop offset="70%" stop-color="#1E3A8A" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <linearGradient id="bronze-btn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="50%" stop-color="#D97706" />
            <stop offset="100%" stop-color="#78350F" />
          </linearGradient>
          <filter id="ao-nam-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Thân áo Ngũ Thân Tay Chẽn Nam Giới ôm bờ vai ngang rộng chuẩn nam thần (x: 106-214) -->
        <g filter="url(#ao-nam-shadow)">
          <!-- Tay chẽn gọn gàng ôm bắp tay xuống cổ tay -->
          <path d="M110,106 C94,112 82,136 76,168 L66,260 C66,266 74,268 80,267 L96,264 L108,205 L114,352 C114,358 122,360 128,360 L192,360 C198,360 206,358 206,352 L212,205 L224,264 L240,267 C246,268 254,266 254,260 L244,168 C238,136 226,112 210,106 Z" 
                fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.8" />
        </g>

        <!-- Cổ đứng lập lĩnh cao 4.5cm trang trọng cho nam sĩ phu -->
        <path d="M141,92 Q160,88 179,92 L180,106 Q160,110 140,106 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5" />
        <circle cx="160" cy="99" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="1" />

        <!-- Vạt Hữu cài chéo sang nách phải với 5 khuy đồng biểu trưng Ngũ Thường -->
        <path d="M160,106 Q178,118 186,138 Q186,180 186,352" stroke="#0F172A" stroke-width="2" fill="none" />
        <circle cx="174" cy="120" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
        <circle cx="182" cy="142" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
        <circle cx="185" cy="172" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
        <circle cx="186" cy="206" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />

        <!-- Họa tiết vân mây chìm và chữ Thọ dệt ẩn -->
        <g stroke="#93C5FD" stroke-width="0.8" opacity="0.3" fill="none">
          <circle cx="150" cy="250" r="16" stroke-dasharray="3,2" />
          <circle cx="170" cy="295" r="16" stroke-dasharray="3,2" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Áo Ngũ Thân tay chẽn dành riêng cho nam giới thời Nguyễn, sắc xanh lam chàm quyền quý, cổ lập lĩnh đứng 4.5cm, 5 cúc đồng tượng trưng cho Ngũ Thường (Nhân Lễ Nghĩa Trí Tín), phom vai ngang vững chãi.',
  },

  {
    id: 'top_ao_yem_dao',
    name: 'Áo Yếm Lụa Đào Thêu Sen Dân Gian',
    category: 'top',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'folk',
    material: 'Lụa Tơ Tằm Nhuộm Cánh Sen & Dây Buộc Lụa',
    era: 'Văn Hóa Dân Gian Bắc Bộ',
    z_index: 21,
    color: '#FB7185',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="ao-yem-dao">
        <defs>
          <linearGradient id="peach-silk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDA4AF" />
            <stop offset="45%" stop-color="#FB7185" />
            <stop offset="85%" stop-color="#F43F5E" />
            <stop offset="100%" stop-color="#BE123C" />
          </linearGradient>
          <linearGradient id="silk-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
          </linearGradient>
          <filter id="yem-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Dây cổ yếm vòng qua sau gáy ôm khít cổ -->
        <path d="M150,96 Q160,92 170,96 L168,110 Q160,113 152,110 Z" fill="#9F1239" />
        <path d="M152,108 L155,116 M168,108 L165,116" stroke="#BE123C" stroke-width="2" />

        <!-- Thân áo Yếm hình quả trám ôm khít vòng ngực và eo con kiến -->
        <g filter="url(#yem-shadow)">
          <!-- Cổ yếm khoét chữ V mềm mại tôn xương quai xanh ngọc ngà -->
          <path d="M153,114 Q160,120 167,114 L190,146 C194,185 186,220 178,258 L142,258 C134,220 126,185 130,146 Z" 
                fill="url(#peach-silk)" stroke="#9F1239" stroke-width="1.2" />
          <!-- Vệt bóng sáng satin mượt mà -->
          <path d="M154,116 Q160,121 166,116 L182,142 C186,170 178,200 172,230 L158,230 Z" fill="url(#silk-highlight)" />
        </g>

        <!-- Dây lưng buộc eo buông nhẹ hai bên sườn -->
        <path d="M132,248 Q118,255 110,268" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M188,248 Q202,255 210,268" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />

        <!-- Đóa hoa sen bách diệp thêu thủ công trước ngực cực kỳ tinh xảo -->
        <g id="sen-theu-truoc-nguc">
          <!-- Lá sen xanh biếc -->
          <path d="M152,192 Q160,198 168,192 Q160,186 152,192 Z" fill="#059669" stroke="#047857" stroke-width="0.8" />
          <!-- Đóa sen hồng cánh xòe -->
          <path d="M160,165 C154,172 152,184 160,188 C168,184 166,172 160,165 Z" fill="#FFE4E6" stroke="#F43F5E" stroke-width="1" />
          <path d="M155,172 Q150,182 156,186" stroke="#FB7185" stroke-width="1" fill="none" />
          <path d="M165,172 Q170,182 164,186" stroke="#FB7185" stroke-width="1" fill="none" />
          <!-- Nhụy sen vàng rực rỡ đọng giọt sương mai -->
          <circle cx="160" cy="178" r="2.5" fill="#FBBF24" />
          <circle cx="159.5" cy="177" r="0.8" fill="#FFFFFF" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Áo yếm lụa đào nhuộm sắc cánh sen Bắc Bộ xưa, khoét cổ thuyền mềm mại tôn xương quai xanh và bờ vai thon thả, thêu hoa sen bách diệp thanh tao.',
  },

  {
    id: 'top_blazer_indochine',
    name: 'Áo Blazer Cổ Đứng Phong Cách Indochine',
    category: 'top',
    gender: 'male',
    style: 'streetwear',
    subStyle: 'streetwear',
    material: 'Dạ Tuyết Mưa Cao Cấp Phom Cứng Cáp',
    era: 'Tân Thời Đông Dương Thập Niên 30',
    z_index: 27,
    color: '#1E293B',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="blazer-indochine">
        <defs>
          <linearGradient id="blazer-wool" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <filter id="blazer-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Thân áo Blazer cấu trúc vai độn chuẩn mực phong thái tổng tài / quý tộc -->
        <g filter="url(#blazer-shadow)">
          <!-- Cầu vai thẳng tắp sắc nét -->
          <path d="M110,112 L142,104 L178,104 L210,112 L228,185 L238,265 L224,266 L214,195 L204,310 L116,310 L106,195 L96,266 L82,265 L92,185 Z" 
                fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="2" />
        </g>

        <!-- Cổ đứng cách tân (Mandarin Notch Lapel) Đông Dương giao thoa Pháp - Việt -->
        <path d="M142,104 L152,142 L160,155 L168,142 L178,104" stroke="#475569" stroke-width="2" fill="none" />
        <path d="M152,142 L132,168 L148,220 L160,250" stroke="#0F172A" stroke-width="2" fill="none" />
        <path d="M168,142 L188,168 L172,220 L160,250" stroke="#0F172A" stroke-width="2" fill="none" />

        <!-- Khuy sừng hai hàng (Double-Breasted) mạ viền đồng tinh tế -->
        <circle cx="152" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="168" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="152" cy="265" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="168" cy="265" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />

        <!-- Túi ngực có khăn cài lụa đỏ son nổi bật -->
        <line x1="174" y1="172" x2="194" y2="172" stroke="#475569" stroke-width="2.5" />
        <polygon points="180,172 186,160 192,172" fill="#DC2626" />
      </g>
    `),
    metadata_for_ai: 'Áo Blazer dạ tuyết mưa dáng cổ đứng Indochine, vai độn quyền lực phối khuy sừng đôi mạ đồng và khăn cài túi đỏ son quý phái.',
  },

  {
    id: 'top_croptop_denim_yem',
    name: 'Croptop Yếm Bò Denim Rách Y2K',
    category: 'top',
    gender: 'female',
    style: 'streetwear',
    subStyle: 'y2k',
    material: 'Vải Denim Wash Rách Bụi Bặm & Xích Kim Loại',
    era: 'Gen Z Cyber Neo-Streetwear',
    z_index: 22,
    color: '#0284C7',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="croptop-denim-yem">
        <defs>
          <linearGradient id="wash-denim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38BDF8" />
            <stop offset="45%" stop-color="#0284C7" />
            <stop offset="85%" stop-color="#0369A1" />
            <stop offset="100%" stop-color="#075985" />
          </linearGradient>
          <filter id="denim-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Dây xích kim loại bạc vòng qua cổ nâng đỡ phom yếm -->
        <path d="M152,106 Q160,102 168,106" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="2,2" fill="none" />

        <!-- Thân áo croptop yếm denim ôm sát ngực, gấu rách bụi bặm -->
        <g filter="url(#denim-shadow)">
          <path d="M154,116 L186,150 L180,225 L140,225 L134,150 Z" fill="url(#wash-denim)" stroke="#0C4A6E" stroke-width="1.8" />
        </g>

        <!-- Đường chỉ may nổi màu cam đất tương phản đặc trưng đồ jeans -->
        <path d="M156,120 L183,150 L178,220 L142,220 L137,150 Z" stroke="#F59E0B" stroke-width="1.2" fill="none" stroke-dasharray="3,1.5" />

        <!-- Khóa kéo kim loại bạc ở giữa ngực -->
        <line x1="160" y1="124" x2="160" y2="225" stroke="#E2E8F0" stroke-width="2" />
        <circle cx="160" cy="130" r="2.5" fill="#94A3B8" />

        <!-- Vết rách wash bạc màu nổi loạn -->
        <line x1="145" y1="180" x2="155" y2="182" stroke="#BAE6FD" stroke-width="2" />
        <line x1="165" y1="195" x2="175" y2="197" stroke="#BAE6FD" stroke-width="2" />
        <!-- Tua rua gấu áo cắt lai rách -->
        <path d="M140,225 L142,230 L145,225 L148,231 L152,225 L156,230 L160,225 L164,231 L168,225 L172,230 L176,225 L180,225" stroke="#0284C7" stroke-width="1.5" fill="none" />
      </g>
    `),
    metadata_for_ai: 'Áo croptop quây cổ yếm bằng denim wash rách nổi loạn Y2K kết hợp dây xích bạc, mang tinh thần đối thoại văn hóa giữa truyền thống và punk hiện đại.',
  },

  // ===================== BOTTOMS (QUẦN / VÁY / HẠ Y) =====================
  {
    id: 'bottom_quan_lua_trang',
    name: 'Quần Lụa Trắng Ống Rộng Cung Đình',
    category: 'bottom',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Lụa Tơ Hà Đông Dệt Rủ Trắng Ngà',
    era: 'Truyền Thống Cổ Điển',
    z_index: 12,
    color: '#F8FAFC',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="quan-lua-trang">
        <defs>
          <linearGradient id="silk-white" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E2E8F0" />
            <stop offset="30%" stop-color="#FFFFFF" />
            <stop offset="70%" stop-color="#F1F5F9" />
            <stop offset="100%" stop-color="#CBD5E1" />
          </linearGradient>
          <filter id="silk-pants-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Quần lụa ống rộng ôm từ cạp eo (y=256) buông dài phủ gót chân -->
        <g filter="url(#silk-pants-shadow)">
          <!-- Cạp quần ôm khít eo -->
          <path d="M125,256 L195,256 L202,434 C202,438 190,440 178,438 L160,320 L142,438 C130,440 118,438 118,434 Z" 
                fill="url(#silk-white)" stroke="#CBD5E1" stroke-width="1.5" />
        </g>

        <!-- Các nếp gấp óng ánh của lụa tơ tằm buông rủ tha thướt -->
        <path d="M136,258 Q132,340 134,435" stroke="#94A3B8" stroke-width="1.2" fill="none" opacity="0.6" />
        <path d="M184,258 Q188,340 186,435" stroke="#94A3B8" stroke-width="1.2" fill="none" opacity="0.6" />
        <path d="M160,258 L160,320" stroke="#64748B" stroke-width="1.5" opacity="0.5" />
      </g>
    `),
    metadata_for_ai: 'Quần lụa tơ tằm trắng ngà ống rộng tha thướt của triều Nguyễn, tạo độ rủ mềm mại thanh tao và tôn dáng bước đi uyển chuyển.',
  },

  {
    id: 'bottom_jeans_baggy',
    name: 'Quần Jeans Rách Gối Baggy Y2K',
    category: 'bottom',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'streetwear',
    material: 'Vải Denim Cotton Dày Dặn Wash Rách',
    era: 'Xu Hướng Đương Đại',
    z_index: 15,
    color: '#0284C7',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="jeans-baggy">
        <defs>
          <linearGradient id="denim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0369A1" />
            <stop offset="35%" stop-color="#38BDF8" />
            <stop offset="70%" stop-color="#0284C7" />
            <stop offset="100%" stop-color="#075985" />
          </linearGradient>
          <filter id="jeans-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Dáng quần ống thụng Baggy thùng thình Y2K từ cạp eo -->
        <g filter="url(#jeans-shadow)">
          <path d="M124,256 L196,256 L208,435 C208,440 196,442 184,438 L160,325 L136,438 C124,442 112,440 112,435 Z" 
                fill="url(#denim-grad)" stroke="#0C4A6E" stroke-width="1.8" />
        </g>

        <!-- Thắt lưng da đen mặt kim loại bạc -->
        <rect x="124" y="256" width="72" height="9" fill="#18181B" rx="2" />
        <rect x="154" y="255" width="12" height="11" fill="none" stroke="#E2E8F0" stroke-width="2" rx="2" />

        <!-- Túi quần bò và đinh tán đồng -->
        <path d="M128,265 Q138,280 144,285" stroke="#F59E0B" stroke-width="1.2" fill="none" />
        <path d="M192,265 Q182,280 176,285" stroke="#F59E0B" stroke-width="1.2" fill="none" />
        <circle cx="129" cy="266" r="1.5" fill="#D97706" />
        <circle cx="191" cy="266" r="1.5" fill="#D97706" />

        <!-- Vết rách gối mài sờn cá tính -->
        <rect x="126" y="370" width="22" height="12" fill="#E0F2FE" opacity="0.8" rx="2" />
        <line x1="127" y1="374" x2="147" y2="374" stroke="#FFFFFF" stroke-width="1.2" />
        <line x1="127" y1="378" x2="147" y2="378" stroke="#FFFFFF" stroke-width="1.2" />
        <!-- Vết rách gối phải -->
        <line x1="172" y1="382" x2="192" y2="384" stroke="#BAE6FD" stroke-width="2.5" />
      </g>
    `),
    metadata_for_ai: 'Quần jeans ống rộng phong cách baggy thập niên 2000, mài sờn và rách gối cá tính, tạo vẻ ngoài nổi loạn trẻ trung khi phối cùng áo cổ truyền.',
  },

  {
    id: 'bottom_cargo_tactical',
    name: 'Quần Cargo Tactical Túi Hộp Đen',
    category: 'bottom',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'cyber',
    material: 'Vải Kaki Ripstop Chống Nước & Dây Đai Dạ Quang',
    era: 'Cyberpunk Techwear',
    z_index: 14,
    color: '#18181B',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="cargo-tactical">
        <defs>
          <filter id="cargo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Thân quần đen techwear hầm hố -->
        <g filter="url(#cargo-shadow)">
          <path d="M124,256 L196,256 L206,432 C206,436 196,438 184,435 L160,325 L136,435 C124,438 114,436 114,432 Z" 
                fill="#18181B" stroke="#27272A" stroke-width="2" />
        </g>

        <!-- Túi hộp 3D hai bên đùi có nắp dán velcro -->
        <rect x="110" y="315" width="28" height="34" fill="#27272A" stroke="#10B981" stroke-width="1.5" rx="3" filter="url(#cargo-shadow)" />
        <line x1="110" y1="324" x2="138" y2="324" stroke="#10B981" stroke-width="2" />
        <rect x="182" y="315" width="28" height="34" fill="#27272A" stroke="#10B981" stroke-width="1.5" rx="3" filter="url(#cargo-shadow)" />
        <line x1="182" y1="324" x2="210" y2="324" stroke="#10B981" stroke-width="2" />

        <!-- Dây đai dạ quang neon vắt chéo chiến thuật -->
        <path d="M116,345 Q128,370 138,390" stroke="#10B981" stroke-width="2.5" fill="none" />
        <path d="M204,345 Q192,370 182,390" stroke="#10B981" stroke-width="2.5" fill="none" />
      </g>
    `),
    metadata_for_ai: 'Quần túi hộp cargo phong cách tactical techwear màu đen, điểm xuyết dây đai dạ quang neon, biểu trưng cho sự thực dụng và bụi bặm Gen Z.',
  },

  {
    id: 'bottom_vay_dong_xep_ly',
    name: 'Chân Váy Đổng Xếp Ly Dân Gian',
    category: 'bottom',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'folk',
    material: 'Vải Thô Nhuộm Chàm Tự Nhiên',
    era: 'Văn Hóa Bắc Bộ Dân Gian',
    z_index: 13,
    color: '#312E81',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="vay-dong-dan-gian">
        <defs>
          <linearGradient id="indigo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1E1B4B" />
            <stop offset="50%" stop-color="#312E81" />
            <stop offset="100%" stop-color="#1E1B4B" />
          </linearGradient>
          <filter id="skirt-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Chân váy đổng xòe chữ A xếp ly rủ tự nhiên từ eo -->
        <g filter="url(#skirt-shadow)">
          <path d="M125,256 L195,256 L224,408 L96,408 Z" fill="url(#indigo-grad)" stroke="#1E1B4B" stroke-width="2" />
        </g>

        <!-- Dải cạp váy vải lụa xanh biếc -->
        <rect x="124" y="256" width="72" height="11" fill="#4F46E5" rx="2" />

        <!-- Các nếp xếp ly quạt xòe sâu tạo chiều sâu 3D -->
        <line x1="130" y1="267" x2="112" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="145" y1="267" x2="136" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="160" y1="267" x2="160" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="175" y1="267" x2="184" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="190" y1="267" x2="208" y2="408" stroke="#1E1B4B" stroke-width="2" />

        <!-- Đường viền chỉ vàng thêu thổ cẩm chân váy -->
        <line x1="96" y1="403" x2="224" y2="403" stroke="#F59E0B" stroke-width="2.5" />
      </g>
    `),
    metadata_for_ai: 'Váy đổng đen tuyền xếp ly xòe mềm mại của phụ nữ Bắc Bộ xưa, tạo độ rủ duyên dáng và thoải mái khi vận động.',
  },

  // ===================== SHOES (GIÀY / GUỐC) =====================
  {
    id: 'shoes_guoc_moc_do',
    name: 'Guốc Mộc Quai Nhung Chu Sa Huế',
    category: 'shoes',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Gỗ Xoan Sơn Mài & Quai Nhung Đỏ',
    era: 'Kinh Thành Huế Triều Nguyễn',
    z_index: 30,
    color: '#B91C1C',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="guoc-moc-do">
        <defs>
          <filter id="shoe-ground-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.5" />
          </filter>
        </defs>
        <!-- Bóng đổ tiếp xúc sàn runway -->
        <ellipse cx="132" cy="454" rx="16" ry="5" fill="#000000" opacity="0.35" />
        <ellipse cx="188" cy="454" rx="16" ry="5" fill="#000000" opacity="0.35" />

        <!-- Đế guốc gỗ mộc gọt eo cong duyên dáng chân trái -->
        <path d="M118,442 L146,442 L144,452 L116,452 Z" fill="#78350F" stroke="#451A03" stroke-width="1.2" />
        <!-- Quai nhung đỏ chu sa ôm sát mu bàn chân -->
        <path d="M120,442 Q132,430 144,442" stroke="#DC2626" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <circle cx="132" cy="435" r="2.5" fill="#FBBF24" />

        <!-- Guốc phải -->
        <path d="M174,442 L202,442 L200,452 L172,452 Z" fill="#78350F" stroke="#451A03" stroke-width="1.2" />
        <path d="M176,442 Q188,430 200,442" stroke="#DC2626" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <circle cx="188" cy="435" r="2.5" fill="#FBBF24" />
      </g>
    `),
    metadata_for_ai: 'Guốc mộc bằng gỗ xoan truyền thống quai nhung đỏ chu sa triều Nguyễn, tiếng gõ guốc lộc cộc biểu trưng cho nếp sống đài các tao nhã chốn kinh kỳ.',
  },

  {
    id: 'shoes_hai_theu_nam',
    name: 'Hài Thêu Rồng Mây Nam Giới Cung Đình',
    category: 'shoes',
    gender: 'male',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Vải Nhung Tuyết Đen Thêu Kim Tuyến & Đế Gỗ Ép',
    era: 'Hoàng Triều Nguyễn',
    z_index: 30,
    color: '#0F172A',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="hai-theu-nam">
        <!-- Bóng tiếp xúc mặt đất -->
        <ellipse cx="132" cy="454" rx="18" ry="6" fill="#000000" opacity="0.4" />
        <ellipse cx="188" cy="454" rx="18" ry="6" fill="#000000" opacity="0.4" />

        <!-- Hài nam chân trái: Mũi cong nhẹ bề thế, đế đen viền mạ vàng -->
        <path d="M116,436 C116,432 144,432 148,438 L148,452 C132,454 116,453 116,448 Z" fill="#0F172A" stroke="#334155" stroke-width="1.5" />
        <!-- Mũi hài thêu chỉ vàng vân mây -->
        <path d="M140,436 Q148,438 147,446" stroke="#F59E0B" stroke-width="1.8" fill="none" />
        <circle cx="144" cy="442" r="1.5" fill="#FEF08A" />

        <!-- Hài nam chân phải -->
        <path d="M172,438 C176,432 204,432 204,436 L204,448 C204,453 188,454 172,452 Z" fill="#0F172A" stroke="#334155" stroke-width="1.5" />
        <path d="M180,436 Q172,438 173,446" stroke="#F59E0B" stroke-width="1.8" fill="none" />
        <circle cx="176" cy="442" r="1.5" fill="#FEF08A" />
      </g>
    `),
    metadata_for_ai: 'Hài nhung đen đế cong cung đình dành cho nam quý tộc triều Nguyễn, thêu họa tiết rồng mây chỉ kim tuyến hoàng kim.',
  },

  {
    id: 'shoes_sneaker_chunky',
    name: 'Sneaker Chunky Retro Cyber',
    category: 'shoes',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'cyber',
    material: 'Da Tổng Hợp & Đế Đệm Bọt Khí EVA',
    era: 'Xu Hướng Đương Đại',
    z_index: 35,
    color: '#E2E8F0',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="sneaker-chunky">
        <!-- Bóng tiếp xúc mặt đất -->
        <ellipse cx="132" cy="458" rx="20" ry="6" fill="#000000" opacity="0.4" />
        <ellipse cx="188" cy="458" rx="20" ry="6" fill="#000000" opacity="0.4" />

        <!-- Giày trái -->
        <path d="M114,432 L146,432 L152,454 L108,454 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="2" />
        <!-- Đế đệm khí neon cyan -->
        <rect x="106" y="450" width="48" height="8" fill="#06B6D4" rx="3" stroke="#0891B2" stroke-width="1" />
        <path d="M120,436 L136,446" stroke="#F43F5E" stroke-width="2" />

        <!-- Giày phải -->
        <path d="M174,432 L206,432 L212,454 L168,454 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="2" />
        <rect x="166" y="450" width="48" height="8" fill="#06B6D4" rx="3" stroke="#0891B2" stroke-width="1" />
        <path d="M180,436 L196,446" stroke="#F43F5E" stroke-width="2" />
      </g>
    `),
    metadata_for_ai: 'Giày thể thao sneaker chunky đế cao đệm khí phong cách retro-futuristic hiện đại, năng động và tôn dáng khi phối cùng đồ truyền thống.',
  },

  {
    id: 'shoes_sneaker_high_thuyba',
    name: 'High-Top Sneaker Họa Tiết Thủy Ba',
    category: 'shoes',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'y2k',
    material: 'Canvas Dệt Sợi Họa Tiết Sóng Nước & Đế Cao Su',
    era: 'Fusion Heritage Sneaker',
    z_index: 36,
    color: '#1E293B',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="sneaker-high-thuyba">
        <ellipse cx="132" cy="458" rx="20" ry="5" fill="#000000" opacity="0.4" />
        <ellipse cx="188" cy="458" rx="20" ry="5" fill="#000000" opacity="0.4" />

        <!-- Sneaker cổ cao ôm cổ chân thon thả -->
        <path d="M116,420 L144,420 L152,454 L108,454 Z" fill="#0F172A" stroke="#0284C7" stroke-width="2" />
        <!-- Hoa văn sóng nước Thủy Ba cung đình uốn lượn bên hông giày -->
        <path d="M114,438 Q125,432 138,438" stroke="#F59E0B" stroke-width="2.2" fill="none" />
        <path d="M118,443 Q128,438 142,443" stroke="#EF4444" stroke-width="1.8" fill="none" />
        <rect x="108" y="450" width="45" height="8" fill="#F8FAFC" rx="2" />

        <!-- Giày phải -->
        <path d="M176,420 L204,420 L212,454 L168,454 Z" fill="#0F172A" stroke="#0284C7" stroke-width="2" />
        <path d="M182,438 Q195,432 206,438" stroke="#F59E0B" stroke-width="2.2" fill="none" />
        <path d="M178,443 Q192,438 202,443" stroke="#EF4444" stroke-width="1.8" fill="none" />
        <rect x="168" y="450" width="45" height="8" fill="#F8FAFC" rx="2" />
      </g>
    `),
    metadata_for_ai: 'Giày sneaker cổ cao phong cách bóng rổ thời thượng, in chìm hoa văn sóng nước Thủy Ba cung đình triều Nguyễn sắc sảo.',
  },

  {
    id: 'shoes_boot_chelsea',
    name: 'Bốt Da Cổ Thấp Chelsea Boot Đen',
    category: 'shoes',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'cyber',
    material: 'Da Bò Full-Grain & Đế Cao Su Khâu Mạch Goodyear',
    era: 'Modern Editorial',
    z_index: 34,
    color: '#09090B',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="boot-chelsea">
        <ellipse cx="132" cy="458" rx="20" ry="5" fill="#000000" opacity="0.4" />
        <ellipse cx="188" cy="458" rx="20" ry="5" fill="#000000" opacity="0.4" />

        <!-- Bốt da đen bóng loáng chân trái -->
        <path d="M116,422 L144,422 L150,455 L110,455 Z" fill="#09090B" stroke="#3F3F46" stroke-width="1.8" />
        <path d="M125,422 L135,440 L142,422" fill="#27272A" />
        <rect x="110" y="451" width="42" height="7" fill="#18181B" />

        <!-- Bốt phải -->
        <path d="M176,422 L204,422 L210,455 L170,455 Z" fill="#09090B" stroke="#3F3F46" stroke-width="1.8" />
        <path d="M185,422 L195,440 L202,422" fill="#27272A" />
        <rect x="170" y="451" width="42" height="7" fill="#18181B" />
      </g>
    `),
    metadata_for_ai: 'Bốt da Chelsea boot màu đen tuyền sang trọng, cổ thun ôm sát gấu quần tạo tổng thể liền mạch thanh lịch khi phối đồ tân cổ.',
  },

  // ===================== ACCESSORIES (PHỤ KIỆN / NÓN / TRANG SỨC) =====================
  {
    id: 'acc_kieng_bac_sen',
    name: 'Kiềng Bạc Chạm Khắc Sen Cung Đình',
    category: 'accessory',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Bạc Nguyên Chất 999 Đúc Đặc & Ngọc Lục Bảo',
    era: 'Triều Nguyễn Quý Tộc',
    z_index: 28,
    color: '#E2E8F0',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="kieng-bac-sen-couture">
        <defs>
          <style>
            @keyframes pendantSway {
              0%, 100% { transform: rotate(-4deg); }
              50% { transform: rotate(4deg); }
            }
            .pendant-anim { transform-origin: 160px 128px; animation: pendantSway 3s ease-in-out infinite; }
            @keyframes silverSparkle {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 1; filter: drop-shadow(0 0 3px rgba(255,255,255,0.9)); }
            }
            .sparkle { animation: silverSparkle 2.5s ease-in-out infinite; }
          </style>

          <!-- Gradient kim loại Bạc Nguyên Chất 3D phản chiếu ánh sáng tự nhiên -->
          <linearGradient id="silver-tube" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#CBD5E1" />
            <stop offset="30%" stop-color="#FFFFFF" />
            <stop offset="60%" stop-color="#94A3B8" />
            <stop offset="100%" stop-color="#475569" />
          </linearGradient>

          <!-- Gradient ngọc bích lục bảo chính giữa đóa sen -->
          <radialGradient id="emerald-gem" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#A7F3D0" />
            <stop offset="40%" stop-color="#10B981" />
            <stop offset="85%" stop-color="#047857" />
            <stop offset="100%" stop-color="#064E3B" />
          </radialGradient>

          <!-- Bóng đổ tiếp xúc chân thực lên da cổ và nền áo phía dưới -->
          <filter id="kieng-contact-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" flood-opacity="0.45" />
          </filter>
        </defs>

        <!-- 1. VÒNG KIỀNG BẠC ÔM KHÍT VÒNG CỔ & XƯƠNG QUAI XANH (CHÂN THỰC 100%) -->
        <!-- Bắt đầu từ chân cổ x=142 qua hõm cổ y=126 sang x=178 theo đúng giải phẫu -->
        <g filter="url(#kieng-contact-shadow)">
          <!-- Vệt bóng tiếp xúc trên da/vải dưới vòng kiềng -->
          <path d="M141,108 C141,124 150,132 160,132 C170,132 179,124 179,108" 
                stroke="#1E293B" stroke-width="6" fill="none" opacity="0.3" stroke-linecap="round" />

          <!-- Vòng kiềng bạc đúc tròn nguyên khối -->
          <path d="M141,106 C141,122 150,130 160,130 C170,130 179,122 179,106" 
                stroke="url(#silver-tube)" stroke-width="4.8" fill="none" stroke-linecap="round" />

          <!-- Đường phản quang trắng sáng bóng loáng trên sống kiềng bạc -->
          <path d="M142,106 C142,121 150,128.5 160,128.5 C170,128.5 178,121 178,106" 
                stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.85" stroke-linecap="round" />
        </g>

        <!-- 2. MẶT KIỀNG HOA SEN BẠC 3 TẦNG & NGỌC BÍCH LỤC BẢO (CÓ ANIMATION ĐUNG ĐƯA) -->
        <g id="mat-kieng-sen" className="pendant-anim" filter="url(#kieng-contact-shadow)">
          <!-- Chốt cài kiềng bạc nối với mặt sen -->
          <rect x="157.5" y="127" width="5" height="5" rx="1" fill="url(#silver-tube)" stroke="#475569" stroke-width="0.8" />

          <!-- Tầng cánh sen bạc ngoài cùng -->
          <circle cx="160" cy="138" r="9" fill="url(#silver-tube)" stroke="#475569" stroke-width="1" />
          <!-- Từng cánh sen bạc nở rộ chạm khắc viền nổi -->
          <path d="M160,129 C155,134 155,142 160,147 C165,142 165,134 160,129 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="0.8" />
          <path d="M151,138 C156,133 164,133 169,138 C164,143 156,143 151,138 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="0.8" />

          <!-- Viên ngọc lục bảo chính giữa đóa sen tỏa sáng -->
          <circle cx="160" cy="138" r="4.5" fill="url(#emerald-gem)" stroke="#FEF08A" stroke-width="1" className="sparkle" />
          <!-- Đốm sáng catchlight lấp lánh như viên đá quý thật -->
          <circle cx="158.5" cy="136.5" r="1.2" fill="#FFFFFF" />

          <!-- Giọt ngọc bạc rủ nhẹ phía dưới đóa sen (Dangling Teardrop) -->
          <path d="M160,147 L158,153 C158,156 162,156 162,153 Z" fill="url(#silver-tube)" stroke="#64748B" stroke-width="0.6" />
          <circle cx="160" cy="155.5" r="1.5" fill="#A7F3D0" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Kiềng bạc nguyên chất đúc tròn ôm sát hõm cổ và xương quai xanh, chạm khắc đóa sen bạc 3 tầng khảm ngọc lục bảo và giọt ngọc đung đưa tự nhiên chuẩn phục sức hoàng gia Huế.',
  },

  {
    id: 'acc_kinh_ram_matrix',
    name: 'Kính Râm Matrix Y2K Gọng Bạc',
    category: 'accessory',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'y2k',
    material: 'Titanium Bạc & Tròng Phản Quang Chống UV',
    era: 'Cyberpunk Y2K',
    z_index: 50,
    color: '#000000',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="kinh-matrix-accurate">
        <defs>
          <linearGradient id="lens-glare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#09090B" />
            <stop offset="50%" stop-color="#18181B" />
            <stop offset="100%" stop-color="#09090B" />
          </linearGradient>
          <linearGradient id="silver-frame" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94A3B8" />
            <stop offset="50%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#64748B" />
          </linearGradient>
          <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-opacity="0.4" />
          </filter>
        </defs>

        <!-- Kính đeo chuẩn sống mũi (y=57-61) che trọn đôi mắt siêu mẫu -->
        <!-- Gọng kính titanium ôm sát vành tai hai bên -->
        <line x1="138" y1="58" x2="144" y2="58" stroke="url(#silver-frame)" stroke-width="1.8" />
        <line x1="176" y1="58" x2="182" y2="58" stroke="url(#silver-frame)" stroke-width="1.8" />

        <g filter="url(#glass-shadow)">
          <!-- Mắt kính trái oval hẹp chuẩn Y2K -->
          <ellipse cx="151.5" cy="58.5" rx="9" ry="5.5" fill="url(#lens-glare)" stroke="url(#silver-frame)" stroke-width="1.5" />
          <!-- Vệt phản quang ánh tím neon trên tròng kính -->
          <line x1="145" y1="56" x2="157" y2="60" stroke="#C084FC" stroke-width="1.2" stroke-linecap="round" opacity="0.8" />

          <!-- Cầu kính vắt ngang sống mũi -->
          <path d="M157.5,58 Q160,56.5 162.5,58" stroke="url(#silver-frame)" stroke-width="2" fill="none" />

          <!-- Mắt kính phải oval hẹp chuẩn Y2K -->
          <ellipse cx="168.5" cy="58.5" rx="9" ry="5.5" fill="url(#lens-glare)" stroke="url(#silver-frame)" stroke-width="1.5" />
          <line x1="162" y1="56" x2="174" y2="60" stroke="#C084FC" stroke-width="1.2" stroke-linecap="round" opacity="0.8" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Kính mát râm dáng oval hẹp retro Y2K viền kim loại bạc, ngự ngay sống mũi che phủ đôi mắt tạo thần thái lạnh lùng cuốn hút.',
  },

  {
    id: 'acc_khan_dong_den',
    name: 'Khăn Đóng Lụa Đen 7 Vòng',
    category: 'accessory',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Lụa Tơ Đen Bắc Bộ Quấn 7 Vòng',
    era: 'Cận Đại Trịnh Trọng',
    z_index: 45,
    color: '#27272A',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="khan-dong-den-couture">
        <defs>
          <filter id="hat-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-opacity="0.5" />
          </filter>
        </defs>

        <!-- Khăn đóng vấn 7 vòng ôm trọn vòm đầu người mẫu từ y=34 đến y=52 -->
        <g filter="url(#hat-shadow)">
          <ellipse cx="160" cy="40" rx="26" ry="14" fill="#09090B" stroke="#27272A" stroke-width="1.5" />
          <!-- 7 nếp vải quấn chéo chữ Nhất trước trán -->
          <path d="M136,46 Q160,56 184,46 Q160,34 136,46 Z" fill="#18181B" />
          <path d="M138,44 Q160,53 182,44" stroke="#27272A" stroke-width="1.5" fill="none" />
          <path d="M140,42 Q160,50 180,42" stroke="#3F3F46" stroke-width="1.2" fill="none" />
          <path d="M142,40 Q160,47 178,40" stroke="#52525B" stroke-width="1.2" fill="none" />
          <path d="M144,38 Q160,44 176,38" stroke="#71717A" stroke-width="1" fill="none" />
        </g>
        <!-- Hạt ngọc trai hoặc viên ngọc bích đính chính tâm khăn đóng -->
        <circle cx="160" cy="48" r="2.8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.8" />
      </g>
    `),
    metadata_for_ai: 'Khăn đóng (khăn xếp) lụa đen vấn 7 vòng đều đặn, ôm trọn vầng trán chuẩn nghi thức lễ bái và giao tế tao nhã của sĩ phu thời cận đại.',
  },

  {
    id: 'acc_non_la_hue',
    name: 'Nón Lá Xứ Huế Vẽ Tranh Thủy Mặc',
    category: 'accessory',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'folk',
    material: 'Lá Nón Tây Hồ & Tre Rừng Vót Mỏng',
    era: 'Văn Hóa Cố Đô Xứ Huế',
    z_index: 47,
    color: '#FEF9C3',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="non-la-hue-couture">
        <defs>
          <style>
            @keyframes ribbonBreeze {
              0%, 100% { transform: rotate(-2deg); }
              50% { transform: rotate(2deg); }
            }
            .ribbon-sway { transform-origin: 160px 65px; animation: ribbonBreeze 3.5s ease-in-out infinite; }
          </style>
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF9C3" />
            <stop offset="60%" stop-color="#FEF08A" />
            <stop offset="100%" stop-color="#FDE047" />
          </linearGradient>
          <filter id="non-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Thân nón lá chóp nhọn nghiêng duyên dáng trên vành đầu -->
        <g filter="url(#non-shadow)">
          <polygon points="160,14 85,62 235,62" fill="url(#leaf-grad)" stroke="#CA8A04" stroke-width="1.5" />
          <ellipse cx="160" cy="62" rx="75" ry="16" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.8" />
          <!-- 16 vành nan tre Tây Hồ vót nhuyễn uốn tròn -->
          <ellipse cx="160" cy="56" rx="60" ry="12" fill="none" stroke="#EAB308" stroke-width="0.8" opacity="0.7" />
          <ellipse cx="160" cy="50" rx="46" ry="9" fill="none" stroke="#EAB308" stroke-width="0.8" opacity="0.7" />
          <ellipse cx="160" cy="44" rx="34" ry="7" fill="none" stroke="#EAB308" stroke-width="0.8" opacity="0.7" />
          <ellipse cx="160" cy="36" rx="22" ry="5" fill="none" stroke="#EAB308" stroke-width="0.8" opacity="0.7" />
          <ellipse cx="160" cy="26" rx="12" ry="3" fill="none" stroke="#EAB308" stroke-width="0.8" opacity="0.7" />

          <!-- Bức tranh hoa sen thủy mặc ẩn hiện bên trong lá nón -->
          <path d="M150,48 Q160,38 170,48" stroke="#F43F5E" stroke-width="2" fill="none" opacity="0.75" />
          <circle cx="160" cy="44" r="2" fill="#F43F5E" opacity="0.75" />
        </g>

        <!-- Quai nón lụa tím xứ Huế thủy chung buông dài tha thướt (có animation đung đưa trong gió) -->
        <g className="ribbon-sway">
          <path d="M110,65 Q120,120 130,165 Q135,185 132,205" stroke="#7E22CE" stroke-width="3" fill="none" stroke-linecap="round" />
          <path d="M210,65 Q200,120 190,165 Q185,185 188,205" stroke="#7E22CE" stroke-width="3" fill="none" stroke-linecap="round" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Nón lá bài thơ xứ Huế 16 vành nan tre thanh mảnh, vẽ họa tiết hoa sen thủy mặc mờ ảo, dải quai nón lụa tím thủy chung đặc trưng đất kinh kỳ.',
  },

  {
    id: 'acc_non_quai_thao',
    name: 'Nón Quai Thao Kinh Bắc Tơ Vàng',
    category: 'accessory',
    gender: 'female',
    style: 'viet_phuc',
    subStyle: 'folk',
    material: 'Nan Tre Vót Nhuyễn & Tơ Hồng Đào',
    era: 'Liền Chị Quan Họ Bắc Ninh',
    z_index: 48,
    color: '#FEF08A',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="non-quai-thao-couture">
        <defs>
          <style>
            @keyframes tasselBreeze {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            .quai-thao-sway { transform-origin: 160px 50px; animation: tasselBreeze 4s ease-in-out infinite; }
          </style>
          <filter id="thao-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Vành nón rộng tròn như mặt trăng ngày rằm -->
        <g filter="url(#thao-shadow)">
          <ellipse cx="160" cy="40" rx="80" ry="22" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.5" />
          <ellipse cx="160" cy="40" rx="58" ry="15" fill="#FDE047" stroke="#EAB308" stroke-width="1.5" />
          <!-- Đỉnh chóp nón chạm đồng hình cánh sen -->
          <circle cx="160" cy="40" r="7" fill="#B45309" stroke="#FEF08A" stroke-width="1.2" />
        </g>

        <!-- Quai thao bằng lụa tơ hồng son buông dài kèm hai quả bông mềm mại -->
        <g className="quai-thao-sway">
          <path d="M102,46 Q88,125 96,215" stroke="#991B1B" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <path d="M218,46 Q232,125 224,215" stroke="#991B1B" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <!-- Hai quả bông tơ đào tua rua mềm mại -->
          <circle cx="96" cy="216" r="5" fill="#F43F5E" stroke="#BE123C" stroke-width="1" />
          <circle cx="224" cy="216" r="5" fill="#F43F5E" stroke="#BE123C" stroke-width="1" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Nón quai thao đan tre viền tơ vàng và dải quai thao lụa son đỏ, trang sức đầu đặc trưng của liền chị quan họ vùng Kinh Bắc.',
  },

  {
    id: 'acc_quat_tram_huong',
    name: 'Quạt Trầm Hương Khảm Xà Cừ Cung Đình',
    category: 'accessory',
    gender: 'unisex',
    style: 'viet_phuc',
    subStyle: 'royal',
    material: 'Gỗ Trầm Hương Khảm Trai & Lụa Sa',
    era: 'Vương Giả Triều Đình',
    z_index: 32,
    color: '#B45309',
    mix_blend_mode: 'normal',
    image_url: createLayerSvg(`
      <g id="quat-tram-huong-couture">
        <defs>
          <style>
            @keyframes fanSway {
              0%, 100% { transform: rotate(-2deg); }
              50% { transform: rotate(2deg); }
            }
            .fan-anim { transform-origin: 78px 260px; animation: fanSway 3s ease-in-out infinite; }
          </style>
          <filter id="fan-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Quạt cầm trên tay trái (x=78, y=258) người mẫu xòe mở hình cánh cung -->
        <g className="fan-anim" filter="url(#fan-shadow)">
          <!-- Cánh quạt nan gỗ trầm hương xòe rộng -->
          <path d="M78,258 L46,215 A52,52 0 0,1 98,192 Z" fill="#78350F" stroke="#FEF08A" stroke-width="1.5" />
          <!-- Nan quạt nan nan xương cá dát vàng -->
          <line x1="78" y1="258" x2="56" y2="204" stroke="#FDE047" stroke-width="1.2" />
          <line x1="78" y1="258" x2="68" y2="198" stroke="#FDE047" stroke-width="1.2" />
          <line x1="78" y1="258" x2="84" y2="194" stroke="#FDE047" stroke-width="1.2" />

          <!-- Khảm xà cừ hoa văn hoa cúc mùa thu óng ánh ngũ sắc -->
          <circle cx="72" cy="216" r="4" fill="#E0F2FE" opacity="0.85" />
          <circle cx="72" cy="216" r="1.5" fill="#F43F5E" />

          <!-- Dải tua rua đỏ chu sa kèm hạt ngọc rủ xuống từ chuôi quạt -->
          <path d="M78,258 Q72,282 74,305" stroke="#DC2626" stroke-width="2.2" fill="none" />
          <circle cx="74" cy="305" r="3.5" fill="#F59E0B" stroke="#B45309" stroke-width="0.8" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Quạt xếp gỗ trầm hương khảm xà cừ kèm dải tua rua đỏ quý phái, phụ kiện tao nhã cầm tay của tầng lớp quý tộc triều Nguyễn khi xuất ngoại.',
  },

  {
    id: 'acc_tui_tote_gam',
    name: 'Túi Đeo Chéo Gấm Đông Sơn Streetwear',
    category: 'accessory',
    gender: 'unisex',
    style: 'streetwear',
    subStyle: 'cyber',
    material: 'Vải Canvas & Gấm Dệt Họa Tiết Chim Lạc',
    era: 'Urban Tactical 2026',
    z_index: 29,
    color: '#0D9488',
    mix_blend_mode: 'multiply',
    image_url: createLayerSvg(`
      <g id="tui-deo-cheo-couture">
        <defs>
          <filter id="bag-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Dây đeo chéo vải dù vắt từ vai phải (x=188, y=118) qua ngực sang hông trái -->
        <path d="M188,118 L98,242" stroke="#14B8A6" stroke-width="4.5" stroke-linecap="round" />
        <path d="M188,118 L98,242" stroke="#2DD4BF" stroke-width="1" stroke-dasharray="3,2" fill="none" />

        <!-- Thân túi hộp vải gấm nằm gọn bên hông người mẫu -->
        <g filter="url(#bag-shadow)">
          <rect x="86" y="235" width="38" height="46" fill="#134E4A" stroke="#2DD4BF" stroke-width="1.8" rx="5" />
          <!-- Họa tiết Chim Lạc Trống Đồng dát vàng trên nắp túi -->
          <circle cx="105" cy="256" r="10" fill="#115E59" stroke="#FEF08A" stroke-width="1.2" />
          <path d="M100,256 Q105,250 110,256" stroke="#FEF08A" stroke-width="1.2" fill="none" />
          <!-- Khóa bấm kim loại tactical -->
          <rect x="101" y="270" width="8" height="6" fill="#CCFBF1" rx="1.5" />
        </g>
      </g>
    `),
    metadata_for_ai: 'Túi đeo chéo chất liệu canvas phối gấm dệt họa tiết chim Lạc Trống Đồng, mang phong cách Techwear năng động tiện lợi khi dạo phố.',
  },
];

export const PRESETS = [
  {
    id: 'preset_imperial_y2k',
    name: 'Cung Đình Y2K',
    subtitle: 'Áo Nhật Bình x Baggy Jeans x Sneaker x Kính Matrix x Kiềng Bạc',
    gender: 'female',
    itemIds: ['top_nhat_binh_xanh', 'bottom_jeans_baggy', 'shoes_sneaker_chunky', 'acc_kinh_ram_matrix', 'acc_kieng_bac_sen'],
  },
  {
    id: 'preset_nam_than_ngu_than',
    name: 'Nam Thần Ngũ Thân',
    subtitle: 'Áo Ngũ Thân Lam Chàm x Quần Lụa Trắng x Hài Thêu x Khăn Đóng x Quạt Trầm',
    gender: 'male',
    itemIds: ['top_ngu_than_nam_xanh', 'bottom_quan_lua_trang', 'shoes_hai_theu_nam', 'acc_khan_dong_den', 'acc_quat_tram_huong'],
  },
  {
    id: 'preset_indochine_gentleman',
    name: 'Quý Ông Đông Dương',
    subtitle: 'Blazer Cổ Đứng x Quần Jeans Baggy x Bốt Chelsea x Kính Matrix',
    gender: 'male',
    itemIds: ['top_blazer_indochine', 'bottom_jeans_baggy', 'shoes_boot_chelsea', 'acc_kinh_ram_matrix'],
  },
  {
    id: 'preset_kinh_bac_cyber',
    name: 'Liền Chị Techwear',
    subtitle: 'Áo Yếm Đào x Quần Cargo x Nón Quai Thao x Bốt Chelsea x Kiềng Bạc',
    gender: 'female',
    itemIds: ['top_ao_yem_dao', 'bottom_cargo_tactical', 'acc_non_quai_thao', 'acc_kieng_bac_sen', 'shoes_boot_chelsea'],
  },
  {
    id: 'preset_le_so_editorial',
    name: 'Giao Lĩnh Sĩ Phu',
    subtitle: 'Áo Giao Lĩnh x Quần Lụa Trắng x Sneaker Thủy Ba x Khăn Đóng x Quạt Trầm',
    gender: 'unisex',
    itemIds: ['top_giao_linh_luc', 'bottom_quan_lua_trang', 'shoes_sneaker_high_thuyba', 'acc_khan_dong_den', 'acc_quat_tram_huong'],
  },
  {
    id: 'preset_hoang_gia_thuan',
    name: 'Ngũ Thân Hoàng Tộc',
    subtitle: 'Áo Ngũ Thân Vàng x Quần Lụa Trắng x Guốc Mộc x Khăn Đóng x Kiềng Bạc',
    gender: 'unisex',
    itemIds: ['top_ngu_than_vang', 'bottom_quan_lua_trang', 'shoes_guoc_moc_do', 'acc_khan_dong_den', 'acc_kieng_bac_sen'],
  },
];

