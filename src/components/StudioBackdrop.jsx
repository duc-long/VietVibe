import React from 'react';

/**
 * StudioBackdrop.jsx
 * Hệ thống bối cảnh Runway trực quan, chân thực và sống động chuẩn văn hóa Việt Nam
 */
export default function StudioBackdrop({ backdropType = 'minimal' }) {
  if (backdropType === 'imperial') {
    // ==========================================
    // BỐI CẢNH 1: HOÀNG THÀNH HUẾ (CỐ ĐÔ CUNG ĐÌNH)
    // ==========================================
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Nền hoàng cung sẫm màu với ánh sáng ấm */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808] via-[#1A0A0E] to-[#0A0507]" />

        <svg className="w-full h-full object-cover" viewBox="0 0 400 650" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="imperial-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#450A0A" />
              <stop offset="35%" stopColor="#7F1D1D" />
              <stop offset="70%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
            <linearGradient id="gold-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#DC2626" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#450A0A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="incense-smoke" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Vòm trời xa & Lầu Ngũ Phụng - Ngọ Môn mờ ảo phía xa */}
          <g opacity="0.35">
            {/* Vầng mây hoàng triều */}
            <path d="M50,120 Q120,80 200,110 Q280,75 350,115" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M80,140 Q150,105 220,135 Q300,100 370,140" stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.3" />
            {/* Mái ngói lầu Ngũ Phụng cong vút */}
            <path d="M120,180 Q200,140 280,180 L290,195 L110,195 Z" fill="#78350F" />
            <path d="M100,195 Q200,155 300,195 L315,215 L85,215 Z" fill="#92400E" />
            <rect x="135" y="215" width="130" height="40" fill="#451A03" opacity="0.6" />
            {/* Cột Cờ Kỳ Đài xa xăm */}
            <line x1="200" y1="100" x2="200" y2="150" stroke="#FEF08A" strokeWidth="1.5" />
            <polygon points="200,102 225,110 200,118" fill="#DC2626" />
          </g>

          {/* Cặp Cột Gỗ Sơn Son Thếp Vàng 2 bên lầu son */}
          <rect x="12" y="0" width="32" height="650" fill="url(#imperial-pillar)" stroke="#7F1D1D" strokeWidth="1" />
          <rect x="356" y="0" width="32" height="650" fill="url(#imperial-pillar)" stroke="#7F1D1D" strokeWidth="1" />
          
          {/* Chạm trổ rồng mây thếp vàng trên cột */}
          <g stroke="url(#gold-leaf)" strokeWidth="1.5" fill="none" opacity="0.75">
            <path d="M18,180 Q28,200 18,220 Q28,240 18,260" />
            <path d="M362,180 Q372,200 362,220 Q372,240 362,260" />
            <path d="M18,340 Q28,360 18,380 Q28,400 18,420" />
            <path d="M362,340 Q372,360 362,380 Q372,400 362,420" />
          </g>

          {/* Vòm cửa cung đình chạm rui mè chạm trổ */}
          <path d="M0,0 L400,0 L400,80 Q200,140 0,80 Z" fill="#1C0A0A" stroke="#78350F" strokeWidth="2" />
          <path d="M30,70 Q200,125 370,70" stroke="url(#gold-leaf)" strokeWidth="3" fill="none" />

          {/* Lồng đèn Cung Đình bát giác treo hai bên */}
          <g transform="translate(60, 90)">
            <line x1="0" y1="-20" x2="0" y2="15" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="0" cy="35" r="35" fill="url(#lantern-glow)" />
            <polygon points="-16,20 16,20 22,45 0,55 -22,45" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5" />
            <line x1="0" y1="55" x2="0" y2="85" stroke="#DC2626" strokeWidth="2" />
            <circle cx="0" cy="85" r="3" fill="#F59E0B" />
          </g>

          <g transform="translate(340, 90)">
            <line x1="0" y1="-20" x2="0" y2="15" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="0" cy="35" r="35" fill="url(#lantern-glow)" />
            <polygon points="-16,20 16,20 22,45 0,55 -22,45" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5" />
            <line x1="0" y1="55" x2="0" y2="85" stroke="#DC2626" strokeWidth="2" />
            <circle cx="0" cy="85" r="3" fill="#F59E0B" />
          </g>

          {/* Làn khói trầm hương uốn lượn huyền ảo phía dưới chân */}
          <ellipse cx="200" cy="580" rx="140" ry="25" fill="url(#incense-smoke)" />
          <path d="M120,620 Q140,560 170,540 Q200,520 190,470" stroke="#CBD5E1" strokeWidth="2" fill="none" opacity="0.25" strokeDasharray="8,4" />
          <path d="M280,620 Q260,560 230,540 Q200,520 210,470" stroke="#CBD5E1" strokeWidth="2" fill="none" opacity="0.25" strokeDasharray="8,4" />
        </svg>

        {/* Lớp hạt bụi vàng ánh kim lơ lửng */}
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>
    );
  }

  if (backdropType === 'lantern') {
    // ==========================================
    // BỐI CẢNH 2: PHỐ CỔ HỘI AN (ĐÊM RẰM ĐÈN LỒNG)
    // ==========================================
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Nền đêm phố cổ Hội An ấm áp huyền ảo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#2D1B08]" />

        <svg className="w-full h-full object-cover" viewBox="0 0 400 650" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="red-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#DC2626" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#D97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cyan-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#0284C7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Vầng Trăng Tròn Rằm Tháng Giêng */}
          <circle cx="290" cy="95" r="45" fill="url(#moon-glow)" />
          <circle cx="290" cy="95" r="22" fill="#FEF9C3" />

          {/* Mái ngói âm dương rêu phong phố cổ phía sau */}
          <path d="M0,130 L160,85 L220,105 L400,55 L400,220 L0,220 Z" fill="#1C1917" opacity="0.85" />
          <path d="M0,130 L160,85 L220,105 L400,55" stroke="#78350F" strokeWidth="4" fill="none" />

          {/* Mảng Tường Vàng Rêu Phong Đặc Trưng Hội An */}
          <rect x="0" y="210" width="400" height="440" fill="#CA8A04" opacity="0.3" />
          <path d="M0,230 Q70,220 140,240 T280,230 T400,245 L400,650 L0,650 Z" fill="#854D0E" opacity="0.25" />
          {/* Mảng rêu xanh loang lổ trên tường */}
          <path d="M0,450 Q50,420 80,480 Q120,440 160,520 L0,650 Z" fill="#14532D" opacity="0.35" />

          {/* Dây thừng giăng đèn lồng vắt ngang phố cổ */}
          <path d="M-10,95 Q100,165 200,145 Q300,125 410,105" stroke="#78350F" strokeWidth="2" fill="none" />
          <path d="M-10,135 Q110,205 210,190 Q310,175 410,140" stroke="#78350F" strokeWidth="1.8" fill="none" />

          {/* Chùm Đèn Lồng Hội An Đa Sắc Rực Rỡ */}
          {/* Đèn lồng đỏ quả trám bên trái */}
          <g transform="translate(65, 150)">
            <circle cx="0" cy="18" r="32" fill="url(#red-glow)" />
            <path d="M0,0 Q16,16 0,36 Q-16,16 0,0 Z" fill="#EF4444" stroke="#FEF08A" strokeWidth="1.2" />
            <line x1="0" y1="36" x2="0" y2="52" stroke="#DC2626" strokeWidth="2" />
          </g>

          {/* Đèn lồng vàng quả cầu ở giữa */}
          <g transform="translate(150, 168)">
            <circle cx="0" cy="18" r="30" fill="url(#gold-glow)" />
            <ellipse cx="0" cy="18" rx="14" ry="17" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1.2" />
            <line x1="0" y1="35" x2="0" y2="50" stroke="#D97706" strokeWidth="2" />
          </g>

          {/* Đèn lồng xanh ngọc thanh tao */}
          <g transform="translate(240, 155)">
            <circle cx="0" cy="18" r="30" fill="url(#cyan-glow)" />
            <path d="M0,0 Q14,16 0,34 Q-14,16 0,0 Z" fill="#0EA5E9" stroke="#E0F2FE" strokeWidth="1.2" />
            <line x1="0" y1="34" x2="0" y2="48" stroke="#0284C7" strokeWidth="2" />
          </g>

          {/* Đèn lồng hồng đào bên phải */}
          <g transform="translate(330, 125)">
            <circle cx="0" cy="16" r="28" fill="url(#red-glow)" />
            <ellipse cx="0" cy="16" rx="13" ry="16" fill="#F43F5E" stroke="#FFE4E6" strokeWidth="1.2" />
            <line x1="0" y1="32" x2="0" y2="46" stroke="#BE123C" strokeWidth="2" />
          </g>

          {/* Giàn Hoa Giấy (Bougainvillea) Rực Rỡ Buông Tự Nhiên Góc Trên */}
          <g>
            <path d="M0,0 Q60,30 90,85 Q110,120 130,160" stroke="#3F2615" strokeWidth="4" fill="none" />
            <path d="M40,20 Q80,60 115,80" stroke="#3F2615" strokeWidth="2.5" fill="none" />
            {/* Từng chùm hoa giấy hồng tím rực rỡ */}
            <circle cx="35" cy="25" r="8" fill="#F43F5E" />
            <circle cx="55" cy="40" r="9" fill="#EC4899" />
            <circle cx="75" cy="55" r="10" fill="#F43F5E" />
            <circle cx="95" cy="85" r="11" fill="#EC4899" />
            <circle cx="115" cy="115" r="9" fill="#F43F5E" />
            <circle cx="128" cy="145" r="8" fill="#FB7185" />
            <circle cx="68" cy="70" r="7" fill="#FDA4AF" />
            {/* Vài cánh hoa giấy rơi nhẹ */}
            <circle cx="85" cy="230" r="3" fill="#F43F5E" opacity="0.7" />
            <circle cx="120" cy="280" r="3" fill="#EC4899" opacity="0.6" />
            <circle cx="105" cy="360" r="2.5" fill="#FB7185" opacity="0.5" />
          </g>
        </svg>

        {/* Ánh sáng ấm từ phố cổ hắt lên sàn */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-amber-500/15 via-amber-500/5 to-transparent pointer-events-none" />
      </div>
    );
  }

  if (backdropType === 'cyber') {
    // ==========================================
    // BỐI CẢNH 3: SÀI GÒN CYBERPUNK 2077 (NEON)
    // ==========================================
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Nền trời đêm mưa neon tương lai */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#090D1A] to-[#0D1527]" />

        <svg className="w-full h-full object-cover" viewBox="0 0 400 650" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="neon-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
            <linearGradient id="neon-pink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <linearGradient id="tower-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B0F19" />
            </linearGradient>
          </defs>

          {/* Đường chân trời Sài Gòn 2077 mờ ảo trong mưa */}
          {/* Tháp Landmark 81 tương lai */}
          <polygon points="90,120 100,60 104,60 114,120 120,380 84,380" fill="url(#tower-grad)" stroke="#38BDF8" strokeWidth="0.8" opacity="0.75" />
          <line x1="102" y1="40" x2="102" y2="60" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="102" cy="38" r="3" fill="#F43F5E" />

          {/* Tòa Tháp Búp Sen Bitexco biểu tượng */}
          <path d="M280,380 L290,140 Q310,130 330,140 L340,380 Z" fill="url(#tower-grad)" stroke="#22D3EE" strokeWidth="0.8" opacity="0.8" />
          <ellipse cx="325" cy="190" rx="18" ry="5" fill="#0EA5E9" opacity="0.9" /> {/* Sân đỗ trực thăng */}

          {/* Các tòa cao ốc Cyberpunk xung quanh */}
          <rect x="10" y="240" width="60" height="240" fill="#0B1120" stroke="#1E293B" />
          <rect x="140" y="200" width="70" height="280" fill="#0B1120" stroke="#1E293B" />
          <rect x="220" y="220" width="55" height="260" fill="#0B1120" stroke="#1E293B" />
          <rect x="350" y="210" width="50" height="270" fill="#0B1120" stroke="#1E293B" />

          {/* Ánh đèn cửa sổ ma trận phát sáng */}
          <g fill="#22D3EE" opacity="0.4">
            <rect x="25" y="260" width="4" height="6" />
            <rect x="35" y="260" width="4" height="6" />
            <rect x="45" y="280" width="4" height="6" />
            <rect x="155" y="230" width="4" height="8" fill="#F43F5E" />
            <rect x="165" y="230" width="4" height="8" fill="#F43F5E" />
            <rect x="180" y="270" width="5" height="7" />
            <rect x="235" y="250" width="4" height="6" fill="#FBBF24" />
          </g>

          {/* Biển Hiệu Neon Phát Sáng Tiếng Việt "SÀI GÒN 2077" */}
          <g transform="translate(45, 140)">
            <rect x="-8" y="-14" width="85" height="26" fill="#050510" stroke="#F43F5E" strokeWidth="1.8" rx="4" />
            <text x="34" y="4" fill="#F43F5E" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">
              SÀI GÒN 2077
            </text>
          </g>

          {/* Biển Neon Dọc "PHỞ ĐÊM" */}
          <g transform="translate(365, 120)">
            <rect x="-10" y="-5" width="22" height="75" fill="#050510" stroke="#22D3EE" strokeWidth="1.5" rx="3" />
            <text x="1" y="16" fill="#22D3EE" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">P</text>
            <text x="1" y="32" fill="#22D3EE" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">H</text>
            <text x="1" y="48" fill="#22D3EE" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Ở</text>
            <text x="1" y="64" fill="#F43F5E" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">★</text>
          </g>

          {/* Biển Neon "CÀ PHÊ" */}
          <g transform="translate(180, 150)">
            <rect x="-6" y="-12" width="60" height="22" fill="#050510" stroke="#FBBF24" strokeWidth="1.5" rx="3" />
            <text x="24" y="3" fill="#FBBF24" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
              CÀ PHÊ
            </text>
          </g>

          {/* Cáp viễn thông và vệt ánh sáng tốc độ cao */}
          <path d="M0,170 Q200,230 400,180" stroke="#22D3EE" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M0,195 Q200,250 400,200" stroke="#F43F5E" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Mưa neon lất phất */}
          <line x1="60" y1="210" x2="50" y2="245" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
          <line x1="140" y1="180" x2="130" y2="215" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
          <line x1="260" y1="220" x2="250" y2="255" stroke="#F43F5E" strokeWidth="1" opacity="0.4" />
          <line x1="330" y1="190" x2="320" y2="225" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Lưới sàn diễn phản quang Cyberpunk */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] [background-size:24px_24px] [transform:perspective(500px)_rotateX(60deg)] pointer-events-none" />
      </div>
    );
  }

  // ==========================================
  // BỐI CẢNH 4: INDOCHINE ZEN STUDIO (TỐI GIẢN NGHỆ THUẬT)
  // ==========================================
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Nền Studio cao cấp ánh sáng tự nhiên */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D16]" />

      <svg className="w-full h-full object-cover" viewBox="0 0 400 650" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="indochine-wood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="60%" stopColor="#271003" />
            <stop offset="100%" stopColor="#180A02" />
          </linearGradient>
          <linearGradient id="sun-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Cửa Vòm Mái Vòm Indochine Kiểu Pháp - Việt Thanh Lịch */}
        <path d="M50,650 L50,220 A150,150 0 0,1 350,220 L350,650" fill="#0A0E17" stroke="#334155" strokeWidth="2.5" />
        <path d="M65,650 L65,225 A135,135 0 0,1 335,225 L335,650" fill="none" stroke="#64748B" strokeWidth="1.2" strokeDasharray="6,4" />

        {/* Khung Gỗ Mành Trúc Chiết Quang Ánh Sáng Tự Nhiên */}
        <rect x="0" y="0" width="400" height="25" fill="url(#indochine-wood)" />
        <g stroke="#334155" strokeWidth="1" opacity="0.4">
          <line x1="80" y1="25" x2="80" y2="180" />
          <line x1="140" y1="25" x2="140" y2="140" />
          <line x1="200" y1="25" x2="200" y2="120" />
          <line x1="260" y1="25" x2="260" y2="140" />
          <line x1="320" y1="25" x2="320" y2="180" />
        </g>

        {/* Vệt Nắng Xiên Nghệ Thuật (Gobo Window Shadow) */}
        <polygon points="30,0 120,0 290,650 140,650" fill="url(#sun-beam)" />
        <polygon points="140,0 210,0 380,650 280,650" fill="url(#sun-beam)" />

        {/* Bình Gốm Men Lam Cắm Sen Bách Diệp Tinh Khôi Đặt Góc */}
        <g transform="translate(45, 460)">
          {/* Bình gốm men lam */}
          <path d="M12,90 L38,90 L44,140 L6,140 Z" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.8" />
          <ellipse cx="25" cy="90" rx="13" ry="4" fill="#E2E8F0" />
          {/* Hoa văn men lam Chu Đậu */}
          <path d="M16,110 Q25,100 34,110 Q25,120 16,110 Z" fill="#0369A1" />
          {/* Cành sen vươn cao */}
          <path d="M25,90 Q35,40 45,10" stroke="#059669" strokeWidth="2.5" fill="none" />
          <path d="M25,90 Q15,50 5,20" stroke="#059669" strokeWidth="2" fill="none" />
          {/* Đóa sen hồng bách diệp hé nở */}
          <ellipse cx="46" cy="8" rx="10" ry="14" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1.2" />
          <path d="M46,-4 Q40,8 46,18 Q52,8 46,-4 Z" fill="#FFE4E6" />
          {/* Gương sen xanh */}
          <circle cx="5" cy="18" r="7" fill="#10B981" stroke="#047857" strokeWidth="1" />
        </g>

        {/* Nền gạch bông Indochine cổ điển mờ ảo dưới chân */}
        <g opacity="0.15" stroke="#CBD5E1" strokeWidth="1">
          <line x1="0" y1="580" x2="400" y2="580" />
          <line x1="0" y1="615" x2="400" y2="615" />
          <line x1="50" y1="580" x2="30" y2="650" />
          <line x1="120" y1="580" x2="100" y2="650" />
          <line x1="200" y1="580" x2="190" y2="650" />
          <line x1="280" y1="580" x2="280" y2="650" />
          <line x1="350" y1="580" x2="360" y2="650" />
        </g>
      </svg>

      {/* Ánh sáng Spotlight chiếu thẳng từ trên đỉnh xuống sàn */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-white/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
