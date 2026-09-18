/**
 * clothingPoseRenderer.js
 * Hệ thống sinh hình ảnh trang phục thích ứng động theo từng tư thế (Dynamic Pose-Adaptive Clothing Engine)
 * 
 * Đảm bảo 100% trang phục pose theo đúng cử động cơ thể của người mẫu:
 * - Catwalk (Runway): Tay buông xuôi chuẩn Haute Couture
 * - Chống Hông (Hip): Ống tay phải uốn cong theo khuỷu tay đặt lên eo/hông, cạp quần/chân váy nghiêng theo eo S-curve
 * - Cung Đình (Royal): Cả hai tay chắp trang nghiêm trước bụng, hai ống tay thụng xếp nếp đoan trang hội tụ giữa bụng
 * - Nàng Thơ / Lãng Tử (Grace): Tay áo nâng thanh thoát trước ngực e ấp hoặc khoanh tay đĩnh đạc
 */

const createLayerSvg = (svgContent) => {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 540" width="100%" height="100%">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
};

/**
 * Sinh hình ảnh SVG cho Áo Nhật Bình theo tư thế
 */
function getAoNhatBinhSvg(pose) {
  if (pose === 'hip') {
    // Ống tay phải uốn theo khuỷu tay chống hông (elbow: 256, 180; wrist: 194, 238)
    return createLayerSvg(`
      <g id="ao-nhat-binh-xanh-hip">
        <defs>
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

        <!-- Lớp lót trắng ngọc -->
        <path d="M142,98 L178,98 L174,130 L146,130 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />

        <!-- Thân áo & Ống tay uốn cong chống hông -->
        <g filter="url(#cloth-depth)">
          <!-- Tay trái buông rủ & Thân áo ôm đường cong S-curve -->
          <path d="M120,108 C100,114 74,138 60,165 L36,275 C34,282 42,286 48,285 L98,282 L116,215 L118,348 C118,354 125,356 130,356 L194,356 C199,356 206,354 206,348 L206,252 L200,108 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          
          <!-- Tay phải uốn cong chống hông: vai -> khuỷu tay 258 -> cổ tay 194 ở eo -->
          <path d="M200,108 C222,112 248,136 260,180 C262,192 254,204 206,252 L192,238 C236,188 238,180 206,140 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          <!-- Tà vải thụng rủ dưới khuỷu tay -->
          <path d="M260,180 C264,205 240,230 206,252 C228,235 248,210 248,190 Z" fill="#0369A1" opacity="0.8" />

          <!-- Vệt bóng sáng satin -->
          <path d="M120,108 L142,108 L138,220 L118,215 Z" fill="url(#silk-sheen)" />
          <path d="M200,108 L178,108 L182,220 L202,215 Z" fill="url(#silk-sheen)" />
        </g>

        <!-- Nếp nhăn eo chống hông -->
        <path d="M136,215 C132,260 130,305 128,355" stroke="#082F49" stroke-width="1.8" fill="none" opacity="0.6" />
        <path d="M184,215 C188,260 192,305 194,355" stroke="#082F49" stroke-width="1.8" fill="none" opacity="0.6" />

        <!-- Nẹp cổ Ngũ Hành -->
        <g id="nep-co-ngu-hanh" filter="url(#cloth-depth)">
          <path d="M140,100 L180,100 L180,240 L140,240 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5" />
          <line x1="144" y1="104" x2="144" y2="238" stroke="#10B981" stroke-width="2.5" />
          <line x1="150" y1="104" x2="150" y2="238" stroke="#EF4444" stroke-width="2.5" />
          <line x1="156" y1="104" x2="156" y2="238" stroke="#F59E0B" stroke-width="2.5" />
          <line x1="164" y1="104" x2="164" y2="238" stroke="#F8FAFC" stroke-width="2.5" />
          <line x1="170" y1="104" x2="170" y2="238" stroke="#0284C7" stroke-width="2.5" />
          <line x1="176" y1="104" x2="176" y2="238" stroke="#CA8A04" stroke-width="1" />
        </g>

        <!-- Cúc ngọc bích -->
        <g id="cuc-ngoc-bich">
          <circle cx="160" cy="120" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="160" cy="156" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
          <circle cx="160" cy="192" r="4" fill="#059669" stroke="#FEF08A" stroke-width="1.5" />
        </g>

        <!-- Dải hoa văn Ngũ Hành bo gấu tay: Tay trái rủ, tay phải ôm sát cổ tay ở hông -->
        <g id="gau-tay-ngu-hanh">
          <path d="M38,272 L96,280" stroke="#10B981" stroke-width="3" />
          <path d="M37,276 L95,284" stroke="#EF4444" stroke-width="3.5" />
          <path d="M36,280 L94,288" stroke="#FEF08A" stroke-width="3" />

          <!-- Gấu tay phải tại cổ tay chống hông -->
          <path d="M192,238 L206,252" stroke="#FEF08A" stroke-width="3.5" />
          <path d="M194,235 L208,249" stroke="#EF4444" stroke-width="3" />
          <path d="M196,232 L210,246" stroke="#10B981" stroke-width="3" />
        </g>

        <!-- Loan phượng dát vàng trước bụng -->
        <g>
          <circle cx="160" cy="300" r="22" fill="none" stroke="url(#gold-thread)" stroke-width="2" stroke-dasharray="4,2" />
          <circle cx="160" cy="300" r="10" fill="#B45309" stroke="#FEF08A" stroke-width="1" />
          <path d="M146,296 Q160,282 174,296 Q160,320 146,296 Z" fill="#FDE047" opacity="0.9" />
          <path d="M136,346 Q146,338 160,344 Q174,338 184,346" stroke="url(#gold-thread)" stroke-width="2" fill="none" />
        </g>
      </g>
    `);
  }

  if (pose === 'royal') {
    // Hai tay chắp trước bụng: Cả 2 ống tay thụng xếp về trung tâm (148 và 172 tại y=226)
    return createLayerSvg(`
      <g id="ao-nhat-binh-xanh-royal">
        <defs>
          <linearGradient id="silk-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284C7" />
            <stop offset="35%" stop-color="#0369A1" />
            <stop offset="70%" stop-color="#075985" />
            <stop offset="100%" stop-color="#082f49" />
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

        <!-- Thân áo & Hai ống tay thụng hội tụ trang nghiêm trước bụng -->
        <g filter="url(#cloth-depth)">
          <path d="M120,108 L116,354 C116,360 124,362 130,362 L190,362 C196,362 204,360 204,354 L200,108 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />

          <!-- Cánh tay trái gập vào bụng: vai 120 -> khuỷu tay 98 -> chắp tay 152 -->
          <path d="M120,108 C100,116 88,148 94,188 L148,230 L156,218 L114,168 L126,112 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          <!-- Tà vải thụng trái buông rủ -->
          <path d="M94,188 C94,235 120,285 146,260 L148,230 Z" fill="#0369A1" opacity="0.9" />

          <!-- Cánh tay phải gập vào bụng: vai 200 -> khuỷu tay 222 -> chắp tay 168 -->
          <path d="M200,108 C220,116 232,148 226,188 L172,230 L164,218 L206,168 L194,112 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          <!-- Tà vải thụng phải buông rủ -->
          <path d="M226,188 C226,235 200,285 174,260 L172,230 Z" fill="#0369A1" opacity="0.9" />
        </g>

        <!-- Nẹp cổ Ngũ Hành -->
        <g id="nep-co-ngu-hanh" filter="url(#cloth-depth)">
          <path d="M140,100 L180,100 L180,218 L140,218 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5" />
          <line x1="144" y1="104" x2="144" y2="216" stroke="#10B981" stroke-width="2.5" />
          <line x1="150" y1="104" x2="150" y2="216" stroke="#EF4444" stroke-width="2.5" />
          <line x1="156" y1="104" x2="156" y2="216" stroke="#F59E0B" stroke-width="2.5" />
          <line x1="164" y1="104" x2="164" y2="216" stroke="#F8FAFC" stroke-width="2.5" />
          <line x1="170" y1="104" x2="170" y2="216" stroke="#0284C7" stroke-width="2.5" />
        </g>

        <!-- Gấu tay ngũ hành hai bên giao thoa đoan trang tại bụng -->
        <path d="M146,220 L146,238" stroke="#FEF08A" stroke-width="3" />
        <path d="M150,220 L150,238" stroke="#EF4444" stroke-width="3" />
        <path d="M174,220 L174,238" stroke="#FEF08A" stroke-width="3" />
        <path d="M170,220 L170,238" stroke="#10B981" stroke-width="3" />

        <!-- Loan phượng dát vàng phần dưới tà áo -->
        <g>
          <circle cx="160" cy="305" r="20" fill="none" stroke="url(#gold-thread)" stroke-width="2" stroke-dasharray="4,2" />
          <circle cx="160" cy="305" r="9" fill="#B45309" stroke="#FEF08A" stroke-width="1" />
          <path d="M146,300 Q160,288 174,300 Q160,324 146,300 Z" fill="#FDE047" opacity="0.9" />
          <path d="M136,346 Q146,338 160,344 Q174,338 184,346" stroke="url(#gold-thread)" stroke-width="2" fill="none" />
        </g>
      </g>
    `);
  }

  if (pose === 'grace') {
    // Nàng thơ e ấp: Tay trái buông, tay phải nâng nhẹ lên trước xương quai xanh (wrist: 192, 140)
    return createLayerSvg(`
      <g id="ao-nhat-binh-xanh-grace">
        <defs>
          <linearGradient id="silk-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284C7" />
            <stop offset="35%" stop-color="#0369A1" />
            <stop offset="70%" stop-color="#075985" />
            <stop offset="100%" stop-color="#082f49" />
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

        <g filter="url(#cloth-depth)">
          <!-- Thân áo & Tay trái buông thõng -->
          <path d="M120,108 C100,114 74,138 60,165 L36,275 C34,282 42,286 48,285 L98,282 L116,215 L118,348 C118,354 125,356 130,356 L190,356 C195,356 202,354 202,348 L204,215 L200,108 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />

          <!-- Tay phải nâng lên xương quai xanh e ấp -->
          <path d="M200,108 C224,115 246,145 240,182 L196,152 L190,138 C216,132 216,120 200,108 Z" 
                fill="url(#silk-blue)" stroke="#0C4A6E" stroke-width="1.5" />
          <!-- Tà tay thụng rủ mềm xuống từ cổ tay nâng -->
          <path d="M240,182 C242,210 220,245 196,215 L196,152 Z" fill="#0369A1" opacity="0.85" />
        </g>

        <!-- Nẹp cổ Ngũ Hành -->
        <g id="nep-co-ngu-hanh" filter="url(#cloth-depth)">
          <path d="M140,100 L180,100 L180,240 L140,240 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5" />
          <line x1="144" y1="104" x2="144" y2="238" stroke="#10B981" stroke-width="2.5" />
          <line x1="150" y1="104" x2="150" y2="238" stroke="#EF4444" stroke-width="2.5" />
          <line x1="156" y1="104" x2="156" y2="238" stroke="#F59E0B" stroke-width="2.5" />
          <line x1="164" y1="104" x2="164" y2="238" stroke="#F8FAFC" stroke-width="2.5" />
          <line x1="170" y1="104" x2="170" y2="238" stroke="#0284C7" stroke-width="2.5" />
        </g>

        <!-- Gấu tay áo trái và gấu tay phải nâng -->
        <path d="M38,272 L96,280" stroke="#10B981" stroke-width="3" />
        <path d="M37,276 L95,284" stroke="#EF4444" stroke-width="3.5" />
        <!-- Gấu tay phải nâng trước ngực -->
        <path d="M190,138 L196,152" stroke="#FEF08A" stroke-width="3.5" />
        <path d="M188,136 L194,150" stroke="#EF4444" stroke-width="3" />

        <!-- Loan phượng dát vàng trước bụng -->
        <g>
          <circle cx="160" cy="300" r="22" fill="none" stroke="url(#gold-thread)" stroke-width="2" stroke-dasharray="4,2" />
          <circle cx="160" cy="300" r="10" fill="#B45309" stroke="#FEF08A" stroke-width="1" />
          <path d="M146,296 Q160,282 174,296 Q160,320 146,296 Z" fill="#FDE047" opacity="0.9" />
        </g>
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Áo Giao Lĩnh Lục Ngọc theo tư thế
 */
function getAoGiaoLinhSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="ao-giao-linh-luc-hip">
        <defs>
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

        <g filter="url(#garment-shadow)">
          <!-- Thân áo & Tay trái buông rủ -->
          <path d="M122,106 C104,112 78,136 65,160 L44,270 C42,276 48,280 54,279 L104,275 L116,210 L118,342 C118,348 124,350 130,350 L194,350 C199,350 206,348 206,342 L206,252 L198,106 Z" 
                fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.8" />
          <!-- Tay phải uốn cong chống hông -->
          <path d="M198,106 C220,112 246,136 258,180 C260,192 252,204 206,252 L192,238 C236,188 238,180 206,140 Z" 
                fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.8" />
        </g>

        <!-- Vạt chéo giao lĩnh chữ Y -->
        <path d="M128,105 L182,168 L182,348" stroke="#FEF08A" stroke-width="3.5" fill="none" />
        <path d="M192,105 L144,164" stroke="#FBBF24" stroke-width="3" fill="none" />

        <!-- Thắt lưng Đại Đái nghiêng theo đường lượn hông -->
        <polygon points="120,216 200,214 202,228 120,230" fill="url(#amber-belt)" stroke="#78350F" stroke-width="1.2" />
        <circle cx="160" cy="232" r="8" fill="#10B981" stroke="#FEF08A" stroke-width="1.5" />
        <path d="M157,240 L154,320 L166,320 L163,240 Z" fill="#F59E0B" stroke="#B45309" stroke-width="0.8" />
      </g>
    `);
  }

  if (pose === 'royal') {
    return createLayerSvg(`
      <g id="ao-giao-linh-luc-royal">
        <defs>
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
        </defs>

        <path d="M122,106 L118,348 C118,354 124,356 130,356 L190,356 C196,356 202,354 202,348 L198,106 Z" 
              fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.8" />
        <!-- Hai tay gập vào bụng -->
        <path d="M122,106 C102,114 90,148 94,188 L148,230 L156,218 L114,168 L126,112 Z" 
              fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.5" />
        <path d="M198,106 C218,114 230,148 226,188 L172,230 L164,218 L206,168 L194,112 Z" 
              fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.5" />

        <!-- Vạt chéo giao lĩnh -->
        <path d="M128,105 L182,168 L182,220" stroke="#FEF08A" stroke-width="3.5" fill="none" />
        <path d="M192,105 L144,164" stroke="#FBBF24" stroke-width="3" fill="none" />
        <!-- Đai ngọc -->
        <rect x="120" y="218" width="80" height="14" rx="3" fill="url(#amber-belt)" stroke="#78350F" stroke-width="1.2" />
        <circle cx="160" cy="238" r="8" fill="#10B981" stroke="#FEF08A" stroke-width="1.5" />
      </g>
    `);
  }

  if (pose === 'grace') {
    return createLayerSvg(`
      <g id="ao-giao-linh-luc-grace">
        <defs>
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
        </defs>

        <path d="M122,106 C104,112 78,136 65,160 L44,270 C42,276 48,280 54,279 L104,275 L116,210 L118,348 L190,348 L198,106 Z" 
              fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.8" />
        <!-- Tay phải nâng nhẹ trước ngực -->
        <path d="M198,106 C220,114 242,142 238,180 L196,150 L190,138 C214,130 214,118 198,106 Z" 
              fill="url(#grad-giao-linh)" stroke="#064E3B" stroke-width="1.5" />

        <path d="M128,105 L182,168 L182,348" stroke="#FEF08A" stroke-width="3.5" fill="none" />
        <path d="M192,105 L144,164" stroke="#FBBF24" stroke-width="3" fill="none" />
        <rect x="120" y="218" width="80" height="14" rx="3" fill="url(#amber-belt)" stroke="#78350F" stroke-width="1.2" />
        <circle cx="160" cy="238" r="8" fill="#10B981" stroke="#FEF08A" stroke-width="1.5" />
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Áo Tấc / Ngũ Thân Vàng theo tư thế
 */
function getAoNguThanVangSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="ao-ngu-than-vang-hip">
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

        <g filter="url(#royal-shadow)">
          <path d="M120,105 C100,112 70,136 55,160 L32,275 C30,282 38,285 44,284 L96,280 L114,212 L116,354 C116,360 124,362 130,362 L194,362 C199,362 206,360 206,354 L206,252 L200,105 Z" 
                fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.8" />
          <path d="M200,105 C222,112 248,136 262,180 C264,192 254,204 206,252 L192,238 C236,188 238,180 206,140 Z" 
                fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.8" />
        </g>

        <path d="M144,94 Q160,90 176,94 L177,106 Q160,110 143,106 Z" fill="#CA8A04" stroke="#78350F" stroke-width="1.5" />
        <circle cx="160" cy="100" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

        <path d="M160,106 Q178,118 184,140 Q184,180 184,354" stroke="#854D0E" stroke-width="2" fill="none" />
        <circle cx="172" cy="120" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
        <circle cx="180" cy="142" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />
        <circle cx="183" cy="172" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1" />

        <path d="M34,278 L94,284" stroke="#FFFFFF" stroke-width="3" />
        <path d="M192,238 L206,252" stroke="#FFFFFF" stroke-width="3.5" />
      </g>
    `);
  }

  if (pose === 'royal') {
    return createLayerSvg(`
      <g id="ao-ngu-than-vang-royal">
        <defs>
          <linearGradient id="imperial-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="40%" stop-color="#EAB308" />
            <stop offset="85%" stop-color="#CA8A04" />
            <stop offset="100%" stop-color="#854D0E" />
          </linearGradient>
        </defs>

        <path d="M120,105 L116,356 C116,362 124,364 130,364 L190,364 C196,364 204,362 204,356 L200,105 Z" 
              fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.8" />

        <path d="M120,105 C100,114 88,148 94,188 L148,230 L156,218 L114,168 L126,112 Z" 
              fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.5" />
        <path d="M200,105 C220,114 232,148 226,188 L172,230 L164,218 L206,168 L194,112 Z" 
              fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.5" />

        <path d="M144,94 Q160,90 176,94 L177,106 Q160,110 143,106 Z" fill="#CA8A04" stroke="#78350F" stroke-width="1.5" />
        <circle cx="160" cy="100" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

        <path d="M146,220 L146,234" stroke="#FFFFFF" stroke-width="3" />
        <path d="M174,220 L174,234" stroke="#FFFFFF" stroke-width="3" />
      </g>
    `);
  }

  if (pose === 'grace') {
    return createLayerSvg(`
      <g id="ao-ngu-than-vang-grace">
        <defs>
          <linearGradient id="imperial-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="40%" stop-color="#EAB308" />
            <stop offset="85%" stop-color="#CA8A04" />
            <stop offset="100%" stop-color="#854D0E" />
          </linearGradient>
        </defs>

        <path d="M120,105 C100,112 70,136 55,160 L32,275 C30,282 38,285 44,284 L96,280 L114,212 L116,354 L190,354 L194,212 L200,105 Z" 
              fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.8" />
        <path d="M200,105 C224,115 246,145 240,182 L196,152 L190,138 C216,132 216,120 200,105 Z" 
              fill="url(#imperial-gold)" stroke="#78350F" stroke-width="1.5" />

        <path d="M144,94 Q160,90 176,94 L177,106 Q160,110 143,106 Z" fill="#CA8A04" stroke="#78350F" stroke-width="1.5" />
        <circle cx="160" cy="100" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="1.2" />

        <path d="M34,278 L94,284" stroke="#FFFFFF" stroke-width="3" />
        <path d="M190,138 L196,152" stroke="#FFFFFF" stroke-width="3.5" />
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Áo Yếm Đào theo tư thế
 */
function getAoYemDaoSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="ao-yem-dao-hip">
        <defs>
          <linearGradient id="peach-silk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDA4AF" />
            <stop offset="45%" stop-color="#FB7185" />
            <stop offset="85%" stop-color="#F43F5E" />
            <stop offset="100%" stop-color="#BE123C" />
          </linearGradient>
          <filter id="yem-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-opacity="0.3" />
          </filter>
        </defs>

        <path d="M150,96 Q160,92 170,96 L168,110 Q160,113 152,110 Z" fill="#9F1239" />
        <path d="M152,108 L155,116 M168,108 L165,116" stroke="#BE123C" stroke-width="2" />

        <g filter="url(#yem-shadow)">
          <!-- Thân yếm lượn cong theo eo S-curve sang phải -->
          <path d="M153,114 Q160,120 167,114 L192,148 C196,186 188,222 182,258 L144,258 C136,220 128,185 131,146 Z" 
                fill="url(#peach-silk)" stroke="#9F1239" stroke-width="1.2" />
        </g>

        <!-- Dây buộc eo bay lệch hông cá tính -->
        <path d="M132,248 Q116,252 106,264" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M188,248 Q204,256 216,274" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />

        <!-- Đóa sen thêu -->
        <g id="sen-theu">
          <path d="M154,192 Q162,198 170,192 Q162,186 154,192 Z" fill="#059669" stroke="#047857" stroke-width="0.8" />
          <path d="M162,165 C156,172 154,184 162,188 C170,184 168,172 162,165 Z" fill="#FFE4E6" stroke="#F43F5E" stroke-width="1" />
          <circle cx="162" cy="178" r="2.5" fill="#FBBF24" />
        </g>
      </g>
    `);
  }

  if (pose === 'grace') {
    return createLayerSvg(`
      <g id="ao-yem-dao-grace">
        <defs>
          <linearGradient id="peach-silk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDA4AF" />
            <stop offset="45%" stop-color="#FB7185" />
            <stop offset="85%" stop-color="#F43F5E" />
            <stop offset="100%" stop-color="#BE123C" />
          </linearGradient>
        </defs>

        <path d="M150,96 Q160,92 170,96 L168,110 Q160,113 152,110 Z" fill="#9F1239" />
        <path d="M153,114 Q160,120 167,114 L188,146 C192,185 184,220 178,258 L142,258 C134,220 126,185 130,146 Z" 
              fill="url(#peach-silk)" stroke="#9F1239" stroke-width="1.2" />

        <!-- Dây lụa rủ mềm mại -->
        <path d="M132,248 Q118,258 112,272" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M188,248 Q200,258 206,272" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round" />

        <circle cx="160" cy="178" r="2.5" fill="#FBBF24" />
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Áo Blazer Indochine theo tư thế
 */
function getBlazerIndochineSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="blazer-indochine-hip">
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

        <g filter="url(#blazer-shadow)">
          <!-- Thân áo & Tay trái buông thẳng -->
          <path d="M110,112 L142,104 L178,104 L210,112 L214,195 L204,310 L116,310 L106,195 L96,266 L82,265 L92,185 Z" 
                fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="2" />
          <!-- Tay phải uốn cong gập chống hông đút túi -->
          <path d="M210,112 C230,118 248,146 248,188 L208,252 L196,242 L232,188 L204,142 Z" 
                fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="2" />
        </g>

        <!-- Cổ đứng & Nẹp khuy -->
        <path d="M142,104 L152,142 L160,155 L168,142 L178,104" stroke="#475569" stroke-width="2" fill="none" />
        <circle cx="152" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="168" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="152" cy="265" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="168" cy="265" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
      </g>
    `);
  }

  if (pose === 'royal') {
    return createLayerSvg(`
      <g id="blazer-indochine-royal">
        <defs>
          <linearGradient id="blazer-wool" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>

        <path d="M110,112 L142,104 L178,104 L210,112 L204,310 L116,310 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="2" />
        <!-- Hai tay khép lại trước bụng -->
        <path d="M110,112 L96,185 L146,230 L156,218 L110,178 L118,138 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="1.8" />
        <path d="M210,112 L224,185 L174,230 L164,218 L210,178 L202,138 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="1.8" />
        <circle cx="152" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
        <circle cx="168" cy="225" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
      </g>
    `);
  }

  if (pose === 'grace') {
    return createLayerSvg(`
      <g id="blazer-indochine-grace">
        <defs>
          <linearGradient id="blazer-wool" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>

        <path d="M110,112 L142,104 L178,104 L210,112 L204,310 L116,310 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="2" />
        <!-- Hai tay khoanh ngang ngực lãng tử -->
        <path d="M110,112 L94,170 L140,195 L200,195 L190,180 L140,180 L112,140 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="1.8" />
        <path d="M210,112 L226,170 L180,202 L120,202 L130,188 L180,188 L208,140 Z" fill="url(#blazer-wool)" stroke="#0F172A" stroke-width="1.8" />
        <circle cx="160" cy="245" r="4.5" fill="#475569" stroke="#E2E8F0" stroke-width="1.2" />
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Croptop Denim Yếm theo tư thế
 */
function getCroptopDenimSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="croptop-denim-yem-hip">
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

        <path d="M152,106 Q160,102 168,106" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="2,2" fill="none" />

        <g filter="url(#denim-shadow)">
          <path d="M154,116 L188,152 L182,226 L140,223 L134,148 Z" fill="url(#wash-denim)" stroke="#0C4A6E" stroke-width="1.8" />
        </g>
        <line x1="160" y1="124" x2="161" y2="224" stroke="#E2E8F0" stroke-width="2" />
        <circle cx="160" cy="130" r="2.5" fill="#94A3B8" />
        <!-- Tua rua -->
        <path d="M140,223 L142,228 L145,223 L148,229 L152,224 L156,229 L160,224 L164,230 L168,224 L172,229 L176,225 L182,226" stroke="#0284C7" stroke-width="1.5" fill="none" />
      </g>
    `);
  }
  return null;
}

/**
 * Sinh hình ảnh SVG cho Chân Váy Đổng theo tư thế
 */
function getVayDongSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="vay-dong-dan-gian-hip">
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

        <!-- Chân váy đổng xòe lệch theo đường hông S-curve -->
        <g filter="url(#skirt-shadow)">
          <path d="M126,258 L196,254 L232,408 L98,408 Z" fill="url(#indigo-grad)" stroke="#1E1B4B" stroke-width="2" />
        </g>
        <polygon points="126,258 196,254 197,264 125,268" fill="#4F46E5" />
        <!-- Các nếp xếp ly xòe sang phải -->
        <line x1="130" y1="268" x2="114" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="145" y1="266" x2="138" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="160" y1="264" x2="164" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="175" y1="262" x2="190" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="190" y1="260" x2="216" y2="408" stroke="#1E1B4B" stroke-width="2" />
        <line x1="98" y1="403" x2="232" y2="403" stroke="#F59E0B" stroke-width="2.5" />
      </g>
    `);
  }
  return null;
}

/**
 * Sinh hình ảnh SVG cho Quần Cargo Tactical theo tư thế
 */
function getCargoTacticalSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="cargo-tactical-hip">
        <defs>
          <filter id="cargo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#cargo-shadow)">
          <path d="M126,258 L196,254 L212,432 C212,436 200,438 188,435 L162,325 L138,435 C126,438 116,436 116,432 Z" 
                fill="#18181B" stroke="#27272A" stroke-width="2" />
        </g>
        <rect x="112" y="315" width="28" height="34" fill="#27272A" stroke="#10B981" stroke-width="1.5" rx="3" filter="url(#cargo-shadow)" />
        <line x1="112" y1="324" x2="140" y2="324" stroke="#10B981" stroke-width="2" />
        <rect x="186" y="315" width="28" height="34" fill="#27272A" stroke="#10B981" stroke-width="1.5" rx="3" filter="url(#cargo-shadow)" />
        <line x1="186" y1="324" x2="214" y2="324" stroke="#10B981" stroke-width="2" />
        <path d="M118,345 Q130,370 140,390" stroke="#10B981" stroke-width="2.5" fill="none" />
        <path d="M208,345 Q196,370 186,390" stroke="#10B981" stroke-width="2.5" fill="none" />
      </g>
    `);
  }
  return null;
}

/**
 * Sinh hình ảnh SVG cho Áo Ngũ Thân Nam Tay Chẽn theo tư thế
 */
function getAoNamNguThanSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="ao-ngu-than-nam-hip">
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
        </defs>

        <!-- Thân áo & Tay trái buông gọn -->
        <path d="M110,106 C94,112 82,136 76,168 L66,260 C66,266 74,268 80,267 L96,264 L108,205 L114,352 C114,358 122,360 128,360 L194,360 C199,360 206,358 206,352 L206,252 L210,106 Z" 
              fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.8" />
        <!-- Tay phải chẽn gọn gàng gập chống hông đút túi -->
        <path d="M210,106 C232,112 254,142 254,186 L208,248 L196,238 L238,184 L204,136 Z" 
              fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.8" />

        <!-- Cổ đứng 4.5cm -->
        <path d="M141,92 Q160,88 179,92 L180,106 Q160,110 140,106 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5" />
        <circle cx="160" cy="99" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="1" />

        <!-- 5 khuy đồng -->
        <circle cx="174" cy="120" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
        <circle cx="182" cy="142" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
        <circle cx="185" cy="172" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="0.8" />
      </g>
    `);
  }

  if (pose === 'royal') {
    return createLayerSvg(`
      <g id="ao-ngu-than-nam-royal">
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
        </defs>

        <path d="M110,106 L114,354 C114,360 122,362 128,362 L192,362 C198,362 206,360 206,354 L210,106 Z" 
              fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.8" />
        <!-- Hai tay chẽn chắp trang nghiêm -->
        <path d="M110,106 L96,185 L146,230 L156,218 L110,178 L118,138 Z" fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.6" />
        <path d="M210,106 L224,185 L174,230 L164,218 L210,178 L202,138 Z" fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.6" />

        <!-- Cổ đứng & khuy -->
        <path d="M141,92 Q160,88 179,92 L180,106 Q160,110 140,106 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5" />
        <circle cx="160" cy="99" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="1" />
      </g>
    `);
  }

  if (pose === 'grace') {
    // Nam khoanh tay trước ngực lãng tử
    return createLayerSvg(`
      <g id="ao-ngu-than-nam-grace">
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
        </defs>

        <path d="M110,106 L114,354 C114,360 122,362 128,362 L192,362 C198,362 206,360 206,354 L210,106 Z" 
              fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.8" />
        <!-- Hai tay khoanh ngang ngực -->
        <path d="M110,106 L94,170 L140,195 L200,195 L190,180 L140,180 L112,140 Z" fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.6" />
        <path d="M210,106 L226,170 L180,202 L120,202 L130,188 L180,188 L208,140 Z" fill="url(#indigo-silk)" stroke="#0F172A" stroke-width="1.6" />

        <!-- Cổ đứng & khuy -->
        <path d="M141,92 Q160,88 179,92 L180,106 Q160,110 140,106 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5" />
        <circle cx="160" cy="99" r="3.2" fill="url(#bronze-btn)" stroke="#FEF08A" stroke-width="1" />
      </g>
    `);
  }

  return null;
}

/**
 * Sinh hình ảnh SVG cho Quần Lụa Trắng theo tư thế
 */
function getQuanLuaTrangSvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="quan-lua-trang-hip">
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

        <!-- Quần lụa ống rộng nghiêng theo hông S-curve và chân phải lệch ngoài -->
        <g filter="url(#silk-pants-shadow)">
          <path d="M126,258 L196,254 L208,434 C208,438 194,440 182,438 L162,320 L144,438 C132,440 120,438 120,434 Z" 
                fill="url(#silk-white)" stroke="#CBD5E1" stroke-width="1.5" />
        </g>
        <path d="M136,258 Q134,340 138,435" stroke="#94A3B8" stroke-width="1.2" fill="none" opacity="0.6" />
        <path d="M188,256 Q194,340 192,435" stroke="#94A3B8" stroke-width="1.2" fill="none" opacity="0.6" />
      </g>
    `);
  }
  return null;
}

/**
 * Sinh hình ảnh SVG cho Quần Jeans Baggy theo tư thế
 */
function getJeansBaggySvg(pose) {
  if (pose === 'hip') {
    return createLayerSvg(`
      <g id="jeans-baggy-hip">
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

        <!-- Dáng baggy lệch theo chân phải bước rộng -->
        <g filter="url(#jeans-shadow)">
          <path d="M126,258 L196,254 L212,435 C212,440 198,442 186,438 L162,325 L138,438 C126,442 114,440 114,435 Z" 
                fill="url(#denim-grad)" stroke="#0C4A6E" stroke-width="1.8" />
        </g>
        <polygon points="125,258 195,254 196,263 125,267" fill="#18181B" />
        <rect x="156" y="254" width="12" height="11" fill="none" stroke="#E2E8F0" stroke-width="2" rx="2" />
        <line x1="174" y1="382" x2="194" y2="384" stroke="#BAE6FD" stroke-width="2.5" />
      </g>
    `);
  }
  return null;
}

/**
 * Trả về ảnh SVG phù hợp nhất cho món đồ dựa trên Model Pose
 */
export function getGarmentImageUrl(item, modelPose) {
  if (!item) return '';

  if (modelPose === 'runway') {
    return item.image_url;
  }

  // Tops
  if (item.id === 'top_nhat_binh_xanh') {
    const customSvg = getAoNhatBinhSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_giao_linh_luc') {
    const customSvg = getAoGiaoLinhSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_ngu_than_vang') {
    const customSvg = getAoNguThanVangSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_ngu_than_nam_xanh') {
    const customSvg = getAoNamNguThanSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_ao_yem_dao') {
    const customSvg = getAoYemDaoSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_blazer_indochine') {
    const customSvg = getBlazerIndochineSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'top_croptop_denim_yem') {
    const customSvg = getCroptopDenimSvg(modelPose);
    if (customSvg) return customSvg;
  }

  // Bottoms
  if (item.id === 'bottom_quan_lua_trang') {
    const customSvg = getQuanLuaTrangSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'bottom_jeans_baggy') {
    const customSvg = getJeansBaggySvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'bottom_vay_dong_xep_ly') {
    const customSvg = getVayDongSvg(modelPose);
    if (customSvg) return customSvg;
  } else if (item.id === 'bottom_cargo_tactical') {
    const customSvg = getCargoTacticalSvg(modelPose);
    if (customSvg) return customSvg;
  }

  // Default fallback to standard layer image
  return item.image_url;
}

/**
 * Tính toán Micro-Transform và vị trí phụ kiện theo từng tư thế & giới tính người mẫu
 */
export function getGarmentFittingTransform(item, modelPose, modelType, fitSize) {
  let sizeFactor = 1.0;
  if (fitSize === 'S') sizeFactor = 0.96;
  if (fitSize === 'L') sizeFactor = 1.04;

  const isMale = modelType === 'male';

  // Tư thế 1: Catwalk Runway (Chuẩn phom suông)
  if (modelPose === 'runway') {
    if (isMale && item.id === 'acc_kieng_bac_sen') {
      return {
        transform: `translate(0px, 4px) scale(${1.05 * sizeFactor}, ${1.05 * sizeFactor})`,
        transformOrigin: '160px 115px',
      };
    }
    return {
      transform: `translate(0px, 0px) rotate(0deg) scale(${sizeFactor}, ${sizeFactor})`,
      transformOrigin: '160px 270px',
    };
  }

  // Tư thế 2: Chống Hông (Hip)
  if (modelPose === 'hip') {
    if (item.category === 'accessory') {
      if (item.id === 'acc_quat_tram_huong') {
        // Quạt trầm hương chuyển sang tay phải đặt ngay eo/hông
        return {
          transform: `translate(116px, -20px) rotate(42deg) scale(${0.92 * sizeFactor})`,
          transformOrigin: '78px 258px',
        };
      }
      if (item.id === 'acc_tui_tote_gam') {
        // Túi đeo chéo nghiêng theo hông S-curve
        return {
          transform: `translate(8px, -4px) rotate(3deg) scale(${sizeFactor})`,
          transformOrigin: '160px 240px',
        };
      }
      if (['acc_khan_dong_den', 'acc_non_la_hue', 'acc_non_quai_thao', 'acc_kinh_ram_matrix'].includes(item.id)) {
        return {
          transform: `translate(0px, 0px) rotate(2.5deg) scale(${sizeFactor}, ${sizeFactor})`,
          transformOrigin: '160px 65px',
        };
      }
      if (item.id === 'acc_kieng_bac_sen') {
        return {
          transform: `translate(0px, ${isMale ? 4 : 0}px) rotate(1.8deg) scale(${ (isMale ? 1.05 : 1) * sizeFactor})`,
          transformOrigin: '160px 115px',
        };
      }
    }
    if (item.category === 'shoes') {
      return {
        transform: `translate(2px, 0px) rotate(1deg) scale(${sizeFactor})`,
        transformOrigin: '160px 480px',
      };
    }
  }

  // Tư thế 3: Cung Đình (Royal)
  if (modelPose === 'royal') {
    if (item.category === 'accessory') {
      if (item.id === 'acc_quat_tram_huong') {
        // Quạt đặt nằm ngang trịnh trọng chính giữa 2 tay chắp bụng
        return {
          transform: `translate(78px, -40px) rotate(18deg) scale(${0.9 * sizeFactor})`,
          transformOrigin: '78px 258px',
        };
      }
      if (item.id === 'acc_tui_tote_gam') {
        return {
          transform: `translate(-4px, 4px) rotate(-1.5deg) scale(${sizeFactor})`,
          transformOrigin: '160px 240px',
        };
      }
      if (item.id === 'acc_kieng_bac_sen') {
        return {
          transform: `translate(0px, ${isMale ? 4 : 0}px) scale(${(isMale ? 1.05 : 1) * sizeFactor})`,
          transformOrigin: '160px 115px',
        };
      }
    }
  }

  // Tư thế 4: Nàng Thơ / Lãng Tử (Grace)
  if (modelPose === 'grace') {
    if (item.category === 'accessory') {
      if (item.id === 'acc_quat_tram_huong') {
        // Quạt nâng lên trước ngực / cằm e ấp che hoa
        return {
          transform: `translate(110px, -118px) rotate(-32deg) scale(${0.9 * sizeFactor})`,
          transformOrigin: '78px 258px',
        };
      }
      if (item.id === 'acc_tui_tote_gam') {
        return {
          transform: `translate(4px, 2px) rotate(2deg) scale(${sizeFactor})`,
          transformOrigin: '160px 240px',
        };
      }
      if (['acc_khan_dong_den', 'acc_non_la_hue', 'acc_non_quai_thao', 'acc_kinh_ram_matrix'].includes(item.id)) {
        return {
          transform: `translate(0px, 0px) rotate(-2.5deg) scale(${sizeFactor}, ${sizeFactor})`,
          transformOrigin: '160px 65px',
        };
      }
      if (item.id === 'acc_kieng_bac_sen') {
        return {
          transform: `translate(0px, ${isMale ? 4 : 0}px) rotate(-1.5deg) scale(${(isMale ? 1.05 : 1) * sizeFactor})`,
          transformOrigin: '160px 115px',
        };
      }
    }
    if (item.category === 'shoes') {
      return {
        transform: `translate(-1px, 0px) rotate(-0.5deg) scale(${sizeFactor})`,
        transformOrigin: '160px 480px',
      };
    }
  }

  return {
    transform: `translate(0px, 0px) rotate(0deg) scale(${sizeFactor}, ${sizeFactor})`,
    transformOrigin: '160px 270px',
  };
}

/**
 * Xác định CSS mix-blend-mode cho từng layer trang phục / phụ kiện
 * Giúp họa tiết vải in, nếp gấm và kính râm hòa quyện tự nhiên vào khối cơ thể và ánh sáng của mannequin
 */
export function getItemMixBlendMode(item, customOverride) {
  if (!item) return 'normal';
  
  // 1. Kiểm tra nếu có override cụ thể của người dùng
  if (customOverride && customOverride[item.id]) {
    return customOverride[item.id];
  }

  // 2. Kiểm tra metadata trực tiếp từ item
  if (item.mix_blend_mode) return item.mix_blend_mode;
  if (item.blend_mode) return item.blend_mode;

  // 3. Fallback thông minh dựa trên chất liệu, màu sắc và danh mục
  switch (item.category) {
    case 'top':
      if (item.color === '#F8FAFC' || item.color === '#FFFFFF' || (item.material && item.material.toLowerCase().includes('trắng'))) {
        return 'normal';
      }
      return 'multiply';

    case 'bottom':
      if (item.color === '#F8FAFC' || item.color === '#FFFFFF' || item.id === 'bottom_quan_lua_trang') {
        return 'normal';
      }
      return 'multiply';

    case 'accessory':
      if (item.id === 'acc_kinh_ram_matrix') {
        return 'multiply';
      }
      if (item.id === 'acc_khan_dong_den' || item.id === 'acc_non_la_hue' || item.id === 'acc_non_quai_thao' || item.id === 'acc_tui_tote_gam') {
        return 'multiply';
      }
      return 'normal';

    case 'shoes':
      return 'normal';

    default:
      return 'normal';
  }
}

