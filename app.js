/* ==========================================================================
   CCC 노대영 · 신영화 선교사 사역 웹사이트 - App JavaScript (Cloud Sync & Admin Dashboard)
   ========================================================================== */

// --- Global Fallback Helper for Missionary Login ---
// Defined at top level so inline onclick="openAdminAuthModal(event)" works immediately
window.openAdminAuthModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopPropagation) e.stopPropagation();

  // Close mobile nav drawer if open
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.remove('active');

  let isAdmin = false;
  try {
    isAdmin = sessionStorage.getItem('ccc_noh_is_admin') === 'true';
  } catch (err) {
    console.warn('sessionStorage check failed:', err);
  }

  const modalAdminAuth = document.getElementById('modal-admin-auth');
  const modalAdminDashboard = document.getElementById('modal-admin-dashboard');

  if (isAdmin) {
    if (typeof fetchCloudData === 'function') fetchCloudData();
    if (typeof renderAdminDashboard === 'function') renderAdminDashboard();
    if (modalAdminDashboard) {
      modalAdminDashboard.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (modalAdminAuth) {
      modalAdminAuth.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const pinInput = document.getElementById('admin-pin-input');
        if (pinInput) pinInput.focus();
      }, 100);
    }
  }
};

// Listen for direct URL hash link like https://danny-noh-3nwk.vercel.app/#admin-login
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin-login' || window.location.hash === '#modal-admin-auth') {
    window.openAdminAuthModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Image Helper & Fallback Handler ---
  window.getImageSrc = function(path) {
    if (!path) return '';
    if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) return path;
    if (window.IMAGE_DATA && window.IMAGE_DATA[path]) {
      return window.IMAGE_DATA[path];
    }
    return path;
  };

  document.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
      var src = e.target.getAttribute('src');
      if (src && window.IMAGE_DATA && window.IMAGE_DATA[src] && e.target.src !== window.IMAGE_DATA[src]) {
        e.target.src = window.IMAGE_DATA[src];
      }
    }
  }, true);


  const CLOUD_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fe59c-a71a-7d39-9fbf-49c0c54ced9c';

  // Default initial prayer letters
  const defaultLetters = [
    {
      id: 'letter-august-2026',
      title: '[2026.08] 2026년 8월 필리핀 바기오 선교 기도편지 소식',
      date: '2026.08.05',
      category: '최신소식',
      cover: 'images/august_family_2026.jpg',
      link: 'https://gloryhaim0825.github.io/prayer-letter-2026-8/',
      blogLink: 'https://m.blog.naver.com/jamsh15/224232410401',
      summary: '"바기오 이 산지를 내게 주소서!" 8월 필리핀 바기오 현지 개척 사역 및 대학생 순모임 개척, 4영리 캠퍼스 전도 소식과 기도의 동역 요청입니다.',
      content: `샬롬! 2026년 8월 필리핀 바기오 선교 현장에서 최신 기도편지 소식을 전해드립니다.\n\n산꼭대기 교육의 도시 바기오의 수많은 대학생들에게 4영리로 복음을 전하고, 순모임으로 양육하여 아시아와 열방을 섬길 주님의 제자로 일깨우고 있습니다.\n\n"WIN BAGUIO TODAY, WIN THE WORLD TOMORROW!"\n\n8월의 긴급 기도제목과 상세 사역 이야기는 2026년 8월 기도편지 웹사이트(https://gloryhaim0825.github.io/prayer-letter-2026-8/)에서 확인해 주세요!`,
      requests: [
        '8월 바기오 대학생 개척 사역 가운데 성령의 강력한 4영리 역사와 회심이 일어나도록',
        '순모임에 연결된 현지 청년들이 영적 제자로 굳건히 자라나도록',
        '노대영 · 신영화 선교사 가정의 영육 간 강건함과 사역에 필요한 모든 재정·기도 구좌가 채워지도록'
      ],
      prayCount: 142
    },
    {
      id: 'letter-march-2026',
      title: '[2026.03] 2026년 3월 CCC 선교 기도편지 소식',
      date: '2026.03.15',
      category: '현지사역',
      cover: 'images/evangelism1.jpg',
      link: 'https://m.blog.naver.com/jamsh15/224232410401',
      summary: '2026년 3월 노대영·신영화 선교사의 사역 이야기와 바기오 사역 비전, 기도제목이 담긴 네이버 블로그 기도편지 소식입니다.',
      content: `샬롬! 2026년 3월 선교 기도편지 소식을 전해드립니다.\n\n동아시아 선교를 거쳐 필리핀 바기오 캠퍼스 복음화를 위해 달려가는 노대영·신영화 선교사의 3월 기도편지 상세 내용은 아래 네이버 블로그 링크에서 직접 보실 수 있습니다.\n\n"WIN BAGUIO TODAY, WIN THE WORLD TOMORROW"`,
      requests: [
        '필리핀 바기오 캠퍼스 복음화와 대학생 순모임 개척을 위하여',
        '노대영 · 신영화 선교사 가정의 영육 간 강건함과 성령 충만을 위하여',
        '바기오 현지 적응과 필요한 선교 기도·재정 동역의 구좌들이 채워지도록'
      ],
      prayCount: 89
    },
    {
      id: 'letter-1',
      title: '[2026.06] 필리핀 바기오 선교사 파송 및 사역 첫 걸음',
      date: '2026.06.25',
      category: '파송',
      cover: 'images/dispatch_ceremony.jpg',
      summary: '수많은 동역자분들의 기도의 배웅 속에서 필리핀 바기오 캠퍼스 선교사로 정식 파송받았습니다. 오늘의 바기오 복음화를 향해 달려갑니다.',
      content: `샬롬! 사랑하는 기도의 동역자 여러분께 주님의 평안을 전합니다.\n\n2026년 6월, 하나님의 크신 은혜와 동역자 여러분의 사랑과 기도 속에 필리핀 바기오 캠퍼스 선교사로 파송을 받았습니다.\n\n"WIN BAGUIO TODAY, WIN THE WORLD TOMORROW"\n\n바기오는 수많은 대학들이 모여있는 필리핀의 대표적인 교육 도시입니다. 이곳에서 만날 청년 학생들에게 4영리로 복음을 전하고, 순모임으로 양육하여 아시아와 열방을 품는 영적 리더로 세우는 거룩한 꿈을 꿉니다.\n\n동아시아 선교 7년의 경험과 IGSL 변혁적 리더십 훈련의 배움을 바탕으로 겸손히 현지 캠퍼스를 섬기겠습니다. 늘 기도로 함께 동역해 주시기를 부탁드립니다.`,
      requests: [
        '노대영 · 신영화 선교사가 성령으로 충만하며 바기오 현지 적응에 어려움이 없도록',
        '바기오 대학생들과의 만남의 문이 열리고 영적 제자가 순모임으로 세워지도록',
        '선교사 가정이 항상 예배와 감사로 충만하며 육적·영적 건강을 지켜주소서',
        '필요한 사역 리소스와 기도·재정 동역의 구좌들이 풍성히 채워지도록'
      ],
      prayCount: 64
    },
    {
      id: 'letter-2',
      title: '[2026.04] IGSL 변혁적 리더십(MATL) 과정을 마치며',
      date: '2026.04.18',
      category: '현지사역',
      cover: 'images/igsl_graduation.jpg',
      summary: 'IGSL에서 아시아 20여 개국 현지 리더들과 함께 훈련받으며 변혁적 리더십 석사 과정을 은혜 가운데 수료했습니다.',
      content: `사랑하고 존경하는 동역자 여러분,\n\n하나님의 은혜로 IGSL(International Graduate School of Leadership) 변혁적 리더십 석사(MATL) 과정을 잘 마치고 졸업하게 되었습니다.\n\n아시아 각국에서 온 목회자 및 사역자들과 함께 배우며, 어떻게 현지 청년들을 변혁적 리더로 기를 것인가 깊이 고민하고 준비하는 귀한 시간이었습니다.\n\n이제 이 훈련의 결실을 필리핀 바기오 캠퍼스 사역 현장에서 맺고자 합니다. 하나님께서 행하실 새 일을 기대합니다.`,
      requests: [
        'IGSL에서 배운 리더십과 사역 비전이 바기오 현장에 아름답게 적용되도록',
        '함께 훈련받은 각국 아시아 사역자들의 사역지에 거룩한 부흥이 임하도록',
        '바기오 사역을 위한 팀 사역자와 동역자들과의 아름다운 연합을 위하여'
      ],
      prayCount: 42
    }
  ];

  const defaultGuestbook = [
    { id: 'guest-1', name: '김순장', affiliation: '경희CCC 동문', msg: '노대영 선교사님! 바기오 사역과 제자화 사역을 위해 매일 기도합니다. 가정을 위해 기도제목 나눕니다: 저희 가정의 대학 입시와 건강을 위해 함께 기도해 주세요.', time: '방금 전' },
    { id: 'guest-2', name: '박은혜 집사', affiliation: '기도 동역자', msg: '선교사님 가정을 위해 늘 중보기도합니다. 저희 교구 식구들의 영적 성장과 건강을 위해 기도의 끈으로 함께해 주세요 🙏', time: '1시간 전' },
    { id: 'guest-3', name: '최요한 간사', affiliation: 'CCC 사역팀', msg: '동아시아 사역에 이어 바기오에서도 놀라운 부흥이 일어날 줄 믿습니다. 저희 지부 캠퍼스 전도 대원들을 위해서도 중보기도 부탁드립니다!', time: '3시간 전' }
  ];

  const defaultCommitments = [
    { id: 'commit-1', name: '홍길동 성도', contact: '010-1234-5678', msg: '바기오 사역과 선교사 가정을 위해 매일 기도로 동역하겠습니다!', time: '2026.08.08' }
  ];

  // --- Safe Storage Helper (prevents iOS/Safari Private Browsing DOMException) ---
  function getSafeItem(type, key) {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      return storage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function setSafeItem(type, key, val) {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      storage.setItem(key, val);
    } catch (e) {}
  }

  function removeSafeItem(type, key) {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      storage.removeItem(key);
    } catch (e) {}
  }

  // --- State Initialization ---
  setSafeItem('local', 'ccc_noh_letters', JSON.stringify(defaultLetters));
  let letters = defaultLetters;

  let guestbook = defaultGuestbook;
  try {
    const rawG = getSafeItem('local', 'ccc_noh_guestbook');
    if (rawG) guestbook = JSON.parse(rawG);
  } catch (e) {}

  let commitments = defaultCommitments;
  try {
    const rawC = getSafeItem('local', 'ccc_noh_commitments');
    if (rawC) commitments = JSON.parse(rawC);
  } catch (e) {}

  let isAdmin = getSafeItem('session', 'ccc_noh_is_admin') === 'true';

  // --- DOM Elements ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  const galleryGrid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const prayerGrid = document.getElementById('prayer-grid');
  const btnWriteLetterHeader = document.getElementById('btn-write-letter-header');

  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookList = document.getElementById('guestbook-list');
  const prayerCommitmentForm = document.getElementById('prayer-commitment-form');

  const accountNumText = document.getElementById('account-num-text');
  const btnCopyAccount = document.getElementById('btn-copy-account');

  const btnAdminTrigger = document.getElementById('btn-admin-trigger');
  const btnAdminDash = document.getElementById('btn-admin-dash');

  // Modals
  const modalAdminAuth = document.getElementById('modal-admin-auth');
  const adminPinForm = document.getElementById('admin-pin-form');
  const adminPinInput = document.getElementById('admin-pin-input');

  const modalAdminDashboard = document.getElementById('modal-admin-dashboard');
  const btnRefreshDashboard = document.getElementById('btn-refresh-dashboard');
  const tabBtnGuestbook = document.getElementById('tab-btn-guestbook');
  const tabBtnCommitments = document.getElementById('tab-btn-commitments');
  const tabContentGuestbook = document.getElementById('tab-content-guestbook');
  const tabContentCommitments = document.getElementById('tab-content-commitments');
  const dashGuestbookList = document.getElementById('dash-guestbook-list');
  const dashCommitmentsList = document.getElementById('dash-commitments-list');
  const dashGuestCount = document.getElementById('dash-guest-count');
  const dashCommitCount = document.getElementById('dash-commit-count');
  const btnCopyAllGuestbook = document.getElementById('btn-copy-all-guestbook');
  const btnCopyAllCommitments = document.getElementById('btn-copy-all-commitments');

  const modalWriteLetter = document.getElementById('modal-write-letter');
  const writeModalTitle = document.getElementById('write-modal-title');
  const prayerLetterForm = document.getElementById('prayer-letter-form');
  const editLetterId = document.getElementById('edit-letter-id');
  const letterTitleInput = document.getElementById('letter-title-input');
  const letterCategorySelect = document.getElementById('letter-category-select');
  const letterCoverSelect = document.getElementById('letter-cover-select');
  const letterContentInput = document.getElementById('letter-content-input');
  const letterRequestsInput = document.getElementById('letter-requests-input');

  const modalReadLetter = document.getElementById('modal-read-letter');
  const readLetterCategory = document.getElementById('read-letter-category');
  const readLetterTitle = document.getElementById('read-letter-title');
  const readLetterDate = document.getElementById('read-letter-date');
  const readLetterCoverWrap = document.getElementById('read-letter-cover-wrap');
  const readLetterCover = document.getElementById('read-letter-cover');
  const readLetterBody = document.getElementById('read-letter-body');
  const readLetterRequests = document.getElementById('read-letter-requests');
  const btnDetailPray = document.getElementById('btn-detail-pray');
  const detailPrayCountVal = document.getElementById('detail-pray-count-val');
  const btnShareDetail = document.getElementById('btn-share-detail');
  const btnQrDetail = document.getElementById('btn-qr-detail');

  const modalQr = document.getElementById('modal-qr');
  const qrcodeContainer = document.getElementById('qrcode-container');
  const qrTargetTitle = document.getElementById('qr-target-title');

  const modalLightbox = document.getElementById('modal-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  const toastContainer = document.getElementById('toast-container');

  let currentActiveLetter = null;

  // --- Initial Setup ---
  updateAdminUI();
  renderGallery('all');
  renderPrayerLetters();
  renderGuestbook();
  fetchCloudData();

  // --- Cloud Persistence Sync ---
  async function fetchCloudData() {
    try {
      const res = await fetch(CLOUD_DB_URL);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.guestbook) && data.guestbook.length > 0) {
          guestbook = data.guestbook;
          setSafeItem('local', 'ccc_noh_guestbook', JSON.stringify(guestbook));
        }
        if (data && Array.isArray(data.commitments) && data.commitments.length > 0) {
          commitments = data.commitments;
          setSafeItem('local', 'ccc_noh_commitments', JSON.stringify(commitments));
        }
        renderGuestbook();
        renderAdminDashboard();
      }
    } catch (err) {
      console.warn('Cloud DB fetch fallback to LocalStorage:', err);
    }
  }

  async function syncCloudData() {
    try {
      await fetch(CLOUD_DB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ guestbook, commitments })
      });
    } catch (err) {
      console.warn('Cloud DB sync error:', err);
    }
    setSafeItem('local', 'ccc_noh_guestbook', JSON.stringify(guestbook));
    setSafeItem('local', 'ccc_noh_commitments', JSON.stringify(commitments));
  }

  // Navigation scroll & Mobile menu
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks) navLinks.classList.toggle('active');
    });
  }

  // --- Admin UI Toggle & Event Listeners ---
  function updateAdminUI() {
    const statusTexts = document.querySelectorAll('.admin-status-text');
    const adminTriggers = document.querySelectorAll('.btn-admin-trigger-el');
    const adminDashes = document.querySelectorAll('.btn-admin-dash-el');

    if (isAdmin) {
      statusTexts.forEach(el => el.textContent = '선교사 관리자 (로그아웃)');
      adminTriggers.forEach(el => el.classList.add('logged-in'));
      adminDashes.forEach(el => el.style.display = 'inline-flex');
      if (btnWriteLetterHeader) btnWriteLetterHeader.style.display = 'inline-flex';
    } else {
      statusTexts.forEach(el => el.textContent = '선교사 로그인');
      adminTriggers.forEach(el => el.classList.remove('logged-in'));
      adminDashes.forEach(el => el.style.display = 'none');
      if (btnWriteLetterHeader) btnWriteLetterHeader.style.display = 'none';
    }
  }

  document.querySelectorAll('.btn-admin-trigger-el').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks) navLinks.classList.remove('active');

      if (isAdmin) {
        if (confirm('선교사 관리자 계정에서 로그아웃 하시겠습니까?')) {
          isAdmin = false;
          removeSafeItem('session', 'ccc_noh_is_admin');
          updateAdminUI();
          renderPrayerLetters();
          showToast('로그아웃 되었습니다.');
        }
      } else {
        window.openAdminAuthModal(e);
      }
    });
  });

  document.querySelectorAll('.btn-admin-dash-el').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks) navLinks.classList.remove('active');
      fetchCloudData();
      renderAdminDashboard();
      openModal(modalAdminDashboard);
    });
  });

  // Admin PIN Submit
  if (adminPinForm) {
    adminPinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = adminPinInput ? adminPinInput.value.trim() : '';
      if (pin === '4708') {
        isAdmin = true;
        setSafeItem('session', 'ccc_noh_is_admin', 'true');
        updateAdminUI();
        closeModal(modalAdminAuth);
        if (adminPinInput) adminPinInput.value = '';
        renderPrayerLetters();
        fetchCloudData();
        renderAdminDashboard();
        showToast('선교사 관리자 로그인 완료! 기도제목 및 약정 관리함이 활성화되었습니다.');
      } else {
        alert('선교사 비밀번호(PIN)가 올바르지 않습니다. (기본 PIN: 4708)');
      }
    });
  }

  // --- Admin Dashboard Tabs & Rendering ---
  if (tabBtnGuestbook && tabBtnCommitments) {
    tabBtnGuestbook.addEventListener('click', () => {
      tabBtnGuestbook.classList.add('active');
      tabBtnGuestbook.style.borderBottom = '3px solid var(--primary-500)';
      tabBtnGuestbook.style.color = 'var(--primary-600)';
      tabBtnCommitments.classList.remove('active');
      tabBtnCommitments.style.borderBottom = 'none';
      tabBtnCommitments.style.color = 'var(--slate-500)';
      if (tabContentGuestbook) tabContentGuestbook.style.display = 'block';
      if (tabContentCommitments) tabContentCommitments.style.display = 'none';
    });

    tabBtnCommitments.addEventListener('click', () => {
      tabBtnCommitments.classList.add('active');
      tabBtnCommitments.style.borderBottom = '3px solid var(--primary-500)';
      tabBtnCommitments.style.color = 'var(--primary-600)';
      tabBtnGuestbook.classList.remove('active');
      tabBtnGuestbook.style.borderBottom = 'none';
      tabBtnGuestbook.style.color = 'var(--slate-500)';
      if (tabContentCommitments) tabContentCommitments.style.display = 'block';
      if (tabContentGuestbook) tabContentGuestbook.style.display = 'none';
    });
  }

  function renderAdminDashboard() {
    if (dashGuestCount) dashGuestCount.textContent = guestbook.length;
    if (dashCommitCount) dashCommitCount.textContent = commitments.length;

    // 1. Render Guestbook items for admin
    if (dashGuestbookList) {
      dashGuestbookList.innerHTML = '';
      if (guestbook.length === 0) {
        dashGuestbookList.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--slate-400);">제출된 중보기도제목이 없습니다.</div>';
      } else {
        guestbook.forEach((item, idx) => {
          const card = document.createElement('div');
          card.style.background = 'var(--slate-50)';
          card.style.border = '1px solid var(--slate-200)';
          card.style.borderRadius = 'var(--radius-md)';
          card.style.padding = '0.85rem 1rem';
          card.style.display = 'flex';
          card.style.justifyContent = 'space-between';
          card.style.alignItems = 'flex-start';
          card.style.gap = '0.75rem';

          card.innerHTML = `
            <div>
              <div style="font-weight: 700; color: var(--navy-900); font-size: 0.95rem;">
                ${item.name} <span style="font-size: 0.8rem; font-weight: 500; color: var(--slate-500);">${item.affiliation ? '(' + item.affiliation + ')' : ''}</span>
                <span style="font-size: 0.75rem; color: var(--primary-600); margin-left: 0.5rem;">${item.time || ''}</span>
              </div>
              <div style="font-size: 0.9rem; color: var(--slate-700); margin-top: 0.35rem; line-height: 1.5;">${item.msg}</div>
            </div>
            <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
              <button class="btn-copy-item" style="background: #fff; border: 1px solid var(--slate-300); padding: 0.3rem 0.55rem; border-radius: var(--radius-sm); font-size: 0.75rem; cursor: pointer;">
                <i class="fa-solid fa-copy"></i> 복사
              </button>
              <button class="btn-del-item" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #dc2626; padding: 0.3rem 0.55rem; border-radius: var(--radius-sm); font-size: 0.75rem; cursor: pointer;">
                <i class="fa-solid fa-trash"></i> 삭제
              </button>
            </div>
          `;

          card.querySelector('.btn-copy-item').addEventListener('click', () => {
            const textToCopy = `[중보기도제목] ${item.name} (${item.affiliation || '동역자'}): ${item.msg}`;
            copyTextToClipboard(textToCopy, '기도제목이 복사되었습니다.');
          });

          card.querySelector('.btn-del-item').addEventListener('click', () => {
            if (confirm(`'${item.name}' 님의 기도제목을 삭제하시겠습니까?`)) {
              guestbook.splice(idx, 1);
              syncCloudData();
              renderGuestbook();
              renderAdminDashboard();
              showToast('삭제되었습니다.');
            }
          });

          dashGuestbookList.appendChild(card);
        });
      }
    }

    // 2. Render Commitments items for admin
    if (dashCommitmentsList) {
      dashCommitmentsList.innerHTML = '';
      if (commitments.length === 0) {
        dashCommitmentsList.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--slate-400);">제출된 기도 후원자 약정이 없습니다.</div>';
      } else {
        commitments.forEach((item, idx) => {
          const card = document.createElement('div');
          card.style.background = 'var(--primary-50)';
          card.style.border = '1px solid var(--primary-100)';
          card.style.borderRadius = 'var(--radius-md)';
          card.style.padding = '0.85rem 1rem';
          card.style.display = 'flex';
          card.style.justifyContent = 'space-between';
          card.style.alignItems = 'flex-start';
          card.style.gap = '0.75rem';

          card.innerHTML = `
            <div>
              <div style="font-weight: 800; color: var(--navy-900); font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <i class="fa-solid fa-heart text-primary"></i> ${item.name}
                <span style="font-size: 0.8rem; background: #fff; padding: 0.15rem 0.5rem; border-radius: 9999px; border: 1px solid var(--primary-200); color: var(--primary-700); font-weight: 700;">📞 ${item.contact}</span>
                <span style="font-size: 0.75rem; color: var(--slate-500);">${item.time || ''}</span>
              </div>
              <div style="font-size: 0.9rem; color: var(--slate-700); margin-top: 0.4rem; line-height: 1.5;">${item.msg}</div>
            </div>
            <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
              <button class="btn-copy-contact" style="background: #fff; border: 1px solid var(--primary-300); color: var(--primary-700); padding: 0.3rem 0.55rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                <i class="fa-solid fa-phone"></i> 연락처 복사
              </button>
              <button class="btn-del-commit" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #dc2626; padding: 0.3rem 0.55rem; border-radius: var(--radius-sm); font-size: 0.75rem; cursor: pointer;">
                <i class="fa-solid fa-trash"></i> 삭제
              </button>
            </div>
          `;

          card.querySelector('.btn-copy-contact').addEventListener('click', () => {
            copyTextToClipboard(item.contact, `'${item.name}' 님의 연락처가 복사되었습니다.`);
          });

          card.querySelector('.btn-del-commit').addEventListener('click', () => {
            if (confirm(`'${item.name}' 님의 기도 약정 정보를 삭제하시겠습니까?`)) {
              commitments.splice(idx, 1);
              syncCloudData();
              renderAdminDashboard();
              showToast('삭제되었습니다.');
            }
          });

          dashCommitmentsList.appendChild(card);
        });
      }
    }
  }

  if (btnCopyAllGuestbook) {
    btnCopyAllGuestbook.addEventListener('click', () => {
      if (guestbook.length === 0) {
        showToast('복사할 기도제목이 없습니다.');
        return;
      }
      const text = guestbook.map((item, idx) => `${idx + 1}. [${item.name} ${item.affiliation ? '(' + item.affiliation + ')' : ''}] ${item.msg}`).join('\n\n');
      copyTextToClipboard(text, '전체 동역자 중보기도제목이 복사되었습니다!');
    });
  }

  if (btnCopyAllCommitments) {
    btnCopyAllCommitments.addEventListener('click', () => {
      if (commitments.length === 0) {
        showToast('복사할 약정자 목록이 없습니다.');
        return;
      }
      const text = commitments.map((item, idx) => `${idx + 1}. ${item.name} | 연락처: ${item.contact} | 메시지: ${item.msg} (${item.time || ''})`).join('\n\n');
      copyTextToClipboard(text, '전체 기도 약정자 목록이 복사되었습니다!');
    });
  }

  if (btnRefreshDashboard) {
    btnRefreshDashboard.addEventListener('click', () => {
      fetchCloudData();
      showToast('최신 제출 목록을 불러왔습니다.');
    });
  }

  // --- Gallery Data & Rendering ---
  const galleryItems = [
    { title: '2026년 8월 동아시아 비전트립 선교사 가정 사진', cat: 'family', img: 'images/august_family_2026.jpg', tag: '★ 2026.08 최신가족' },
    { title: 'CCC 선교사 파송 예배', cat: 'dispatch', img: 'images/dispatch_ceremony.jpg', tag: '파송식' },
    { title: '필리핀 바기오 시내 전경', cat: 'evangelism', img: 'images/baguio_landscape.jpg', tag: '바기오' },
    { title: '노대영 · 신영화 선교사 부부', cat: 'family', img: 'images/couple_photo.jpg', tag: '부부사진' },
    { title: '선교사 부부 프로필', cat: 'family', img: 'images/couple_profile.jpg', tag: '부부프로필' },
    { title: '선교사 가정의 행복한 순간', cat: 'family', img: 'images/missionary_family.jpg', tag: '가족소식' },
    { title: '선교사 가정 모습', cat: 'family', img: 'images/family.jpg', tag: '가족' },
    { title: '캠퍼스 그룹 전도 모임', cat: 'evangelism', img: 'images/group_evangelism.jpg', tag: '캠퍼스전도' },
    { title: '아이스크림 4영리 전도', cat: 'evangelism', img: 'images/icecream_evangelism.jpg', tag: '전도사역' },
    { title: '바기오 대학생 4영리 개인전도 (1)', cat: 'evangelism', img: 'images/evangelism1.jpg', tag: '개인전도' },
    { title: '캠퍼스 청년 복음 나눔 현장 (2)', cat: 'evangelism', img: 'images/evangelism2.jpg', tag: '복음나눔' },
    { title: '바기오 캠퍼스 전도대원 (3)', cat: 'evangelism', img: 'images/evangelism3.jpg', tag: '전도대원' },
    { title: '4영리 소그룹 전도 현장', cat: 'evangelism', img: 'images/four_laws_evangelism.jpg', tag: '4영리' },
    { title: 'IGSL 졸업식 기념', cat: 'dispatch', img: 'images/igsl_graduation.jpg', tag: '리더십수료' },
    { title: '선교사 파송 축복 기도회', cat: 'dispatch', img: 'images/sending_missionary.jpg', tag: '파송기도' },
    { title: '대학생 순모임 제자화 훈련', cat: 'training', img: 'images/soon_discipleship.jpg', tag: '순모임' },
    { title: '세계 기도일 대학생 모임', cat: 'training', img: 'images/world_prayer_day.jpg', tag: '기도모임' },
    { title: '리더십 훈련 수련회', cat: 'training', img: 'images/leadership_training.jpg', tag: '리더십' },
    { title: '코칭 훈련 세미나', cat: 'training', img: 'images/coaching_training.jpg', tag: '코칭' },
    { title: '전도 · 육성 · 파송 제자화', cat: 'training', img: 'images/win_build_send.jpg', tag: '수련회' }
  ];

  function renderGallery(filter) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    const filtered = filter === 'all' ? galleryItems : galleryItems.filter(item => item.cat === filter);

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      el.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.tag}</span>
          <div class="gallery-title">${item.title}</div>
          <div style="font-size: 0.775rem; color: var(--gold-400); margin-top: 0.35rem; font-weight: 700; display: flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-magnifying-glass-plus"></i> 클릭하여 원본 크게보기
          </div>
        </div>
      `;
      el.addEventListener('click', () => {
        if (lightboxImg) lightboxImg.src = item.img;
        if (lightboxCaption) lightboxCaption.textContent = item.title;
        openModal(modalLightbox);
      });
      galleryGrid.appendChild(el);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  // --- Prayer Letters Functionality ---
  function renderPrayerLetters() {
    if (!prayerGrid) return;
    prayerGrid.innerHTML = '';

    if (letters.length === 0) {
      prayerGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: var(--radius-lg); border: 1px dashed var(--slate-300);">
          <i class="fa-solid fa-envelope-open" style="font-size: 2.5rem; color: var(--slate-400); margin-bottom: 1rem;"></i>
          <p style="color: var(--slate-600); font-weight: 600;">등록된 기도편지가 없습니다.</p>
        </div>
      `;
      return;
    }

    letters.forEach(letter => {
      const card = document.createElement('div');
      card.className = 'prayer-card';

      const adminControls = isAdmin ? `
        <div style="position: absolute; top: 1rem; right: 1rem; z-index: 5; display: flex; gap: 0.4rem;">
          <button class="btn-edit-letter" data-id="${letter.id}" style="background: rgba(255,255,255,0.9); padding: 0.35rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; color: var(--navy-900);">
            <i class="fa-solid fa-pen"></i> 수정
          </button>
          <button class="btn-delete-letter" data-id="${letter.id}" style="background: rgba(239,68,68,0.9); padding: 0.35rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; color: #fff;">
            <i class="fa-solid fa-trash"></i> 삭제
          </button>
        </div>
      ` : '';

      card.innerHTML = `
        <div class="prayer-img-wrap" style="position: relative;">
          ${adminControls}
          <img src="${window.getImageSrc(letter.cover || 'images/dispatch_ceremony.jpg')}" alt="${letter.title}">
          <span class="prayer-badge">${letter.category}</span>
        </div>
        <div class="prayer-card-body">
          <div class="prayer-date"><i class="fa-regular fa-calendar"></i> ${letter.date}</div>
          <h3 class="prayer-card-title">${letter.title}</h3>
          <p class="prayer-summary">${letter.summary}</p>
          <div class="prayer-card-footer">
            <button class="btn-read-more" data-id="${letter.id}">
              <span>기도편지 읽기</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            ${letter.link ? `
              <a href="${letter.link}" target="_blank" rel="noopener noreferrer" style="font-size: 0.825rem; font-weight: 700; color: #0284C7; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 웹사이트 열기
              </a>
            ` : ''}
            <button class="btn-pray-count" data-id="${letter.id}">
              <i class="fa-solid fa-heart"></i>
              <span>${letter.prayCount || 0}</span>
            </button>
          </div>
        </div>
      `;

      // Event Listeners for Card
      const btnRead = card.querySelector('.btn-read-more');
      if (btnRead) btnRead.addEventListener('click', () => openLetterDetail(letter.id));

      const btnPray = card.querySelector('.btn-pray-count');
      if (btnPray) {
        btnPray.addEventListener('click', (e) => {
          e.stopPropagation();
          letter.prayCount = (letter.prayCount || 0) + 1;
          saveLetters();
          renderPrayerLetters();
          showToast('아멘! 기도로 함께해 주셔서 감사합니다.');
        });
      }

      if (isAdmin) {
        const btnEdit = card.querySelector('.btn-edit-letter');
        if (btnEdit) {
          btnEdit.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditLetterModal(letter.id);
          });
        }

        const btnDel = card.querySelector('.btn-delete-letter');
        if (btnDel) {
          btnDel.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`'${letter.title}' 기도편지를 삭제하시겠습니까?`)) {
              letters = letters.filter(l => l.id !== letter.id);
              saveLetters();
              renderPrayerLetters();
              showToast('기도편지가 삭제되었습니다.');
            }
          });
        }
      }

      prayerGrid.appendChild(card);
    });
  }

  // Featured August letter button listener
  const btnReadAugustFeatured = document.getElementById('btn-read-august-featured');
  if (btnReadAugustFeatured) {
    btnReadAugustFeatured.addEventListener('click', () => {
      openLetterDetail('letter-august-2026');
    });
  }

  function saveLetters() {
    setSafeItem('local', 'ccc_noh_letters', JSON.stringify(letters));
  }

  // Header Write Button
  if (btnWriteLetterHeader) {
    btnWriteLetterHeader.addEventListener('click', () => {
      if (!isAdmin) {
        window.openAdminAuthModal();
        return;
      }
      openCreateLetterModal();
    });
  }

  function openCreateLetterModal() {
    if (editLetterId) editLetterId.value = '';
    if (writeModalTitle) writeModalTitle.innerHTML = '<i class="fa-solid fa-pen-nib text-primary"></i> 새 기도편지 올리기';
    if (prayerLetterForm) prayerLetterForm.reset();
    openModal(modalWriteLetter);
  }

  function openEditLetterModal(id) {
    const letter = letters.find(l => l.id === id);
    if (!letter) return;

    if (editLetterId) editLetterId.value = letter.id;
    if (writeModalTitle) writeModalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> 기도편지 수정하기';
    
    if (letterTitleInput) letterTitleInput.value = letter.title;
    if (letterCategorySelect) letterCategorySelect.value = letter.category;
    if (letterCoverSelect) letterCoverSelect.value = letter.cover || 'images/dispatch_ceremony.jpg';
    if (letterContentInput) letterContentInput.value = letter.content;
    if (letterRequestsInput) letterRequestsInput.value = Array.isArray(letter.requests) ? letter.requests.join('\n') : letter.requests;

    openModal(modalWriteLetter);
  }

  if (prayerLetterForm) {
    prayerLetterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = editLetterId ? editLetterId.value : '';
      const title = letterTitleInput ? letterTitleInput.value.trim() : '';
      const category = letterCategorySelect ? letterCategorySelect.value : '파송';
      const cover = letterCoverSelect ? letterCoverSelect.value : 'images/dispatch_ceremony.jpg';
      const content = letterContentInput ? letterContentInput.value.trim() : '';
      const requestsRaw = letterRequestsInput ? letterRequestsInput.value.trim() : '';
      const requests = requestsRaw.split('\n').map(r => r.trim()).filter(r => r.length > 0);

      const today = new Date();
      const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
      const summaryStr = content.length > 110 ? content.substring(0, 110) + '...' : content;

      if (id) {
        // Edit existing
        const index = letters.findIndex(l => l.id === id);
        if (index !== -1) {
          letters[index].title = title;
          letters[index].category = category;
          letters[index].cover = cover;
          letters[index].content = content;
          letters[index].summary = summaryStr;
          letters[index].requests = requests;
        }
        showToast('기도편지가 성공적으로 수정되었습니다.');
      } else {
        // Create new
        const newLetter = {
          id: 'letter-' + Date.now(),
          title,
          date: dateStr,
          category,
          cover,
          summary: summaryStr,
          content,
          requests,
          prayCount: 1
        };
        letters.unshift(newLetter);
        showToast('새 기도편지가 성공적으로 등록되었습니다!');
      }

      saveLetters();
      renderPrayerLetters();
      closeModal(modalWriteLetter);
    });
  }

  // Read Detail Modal
  function openLetterDetail(id) {
    const letter = letters.find(l => l.id === id);
    if (!letter) return;
    currentActiveLetter = letter;

    if (readLetterCategory) readLetterCategory.textContent = letter.category;
    if (readLetterTitle) readLetterTitle.textContent = letter.title;
    if (readLetterDate) readLetterDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${letter.date}`;

    if (letter.cover) {
      if (readLetterCover) readLetterCover.src = window.getImageSrc(letter.cover);
      if (readLetterCoverWrap) readLetterCoverWrap.style.display = 'block';
    } else {
      if (readLetterCoverWrap) readLetterCoverWrap.style.display = 'none';
    }

    if (readLetterBody) readLetterBody.textContent = letter.content;

    // Blog external link button
    const existingBlogBtn = document.getElementById('btn-blog-link');
    if (existingBlogBtn) existingBlogBtn.remove();

    if (letter.link) {
      const blogBtnWrap = document.createElement('div');
      blogBtnWrap.id = 'btn-blog-link';
      blogBtnWrap.style.marginTop = '1.25rem';
      blogBtnWrap.style.marginBottom = '1rem';
      blogBtnWrap.style.display = 'flex';
      blogBtnWrap.style.gap = '0.75rem';
      blogBtnWrap.style.flexWrap = 'wrap';

      let btnHTML = `
        <a href="${letter.link}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-full); background: linear-gradient(135deg, #0284C7, #0369A1); color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          <i class="fa-solid fa-paper-plane"></i>
          <span>2026년 8월 기도편지 전용 웹사이트 바로가기 ↗</span>
        </a>
      `;

      if (letter.blogLink) {
        btnHTML += `
          <a href="${letter.blogLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-full); background: #03CF5D; color: #fff; font-weight: 700;">
            <i class="fa-solid fa-square-arrow-up-right"></i>
            <span>네이버 블로그 보기</span>
          </a>
        `;
      }

      blogBtnWrap.innerHTML = btnHTML;
      if (readLetterBody) readLetterBody.appendChild(blogBtnWrap);
    }

    // Requests
    if (readLetterRequests) {
      readLetterRequests.innerHTML = '';
      if (Array.isArray(letter.requests) && letter.requests.length > 0) {
        letter.requests.forEach((req, idx) => {
          const li = document.createElement('li');
          li.style.marginBottom = '0.6rem';
          li.style.display = 'flex';
          li.style.alignItems = 'flex-start';
          li.style.gap = '0.5rem';
          li.style.fontSize = '0.95rem';
          li.style.color = 'var(--slate-700)';
          li.innerHTML = `<strong style="color: var(--primary-600);">${idx + 1}.</strong> <span>${req}</span>`;
          readLetterRequests.appendChild(li);
        });
      }
    }

    if (detailPrayCountVal) detailPrayCountVal.textContent = letter.prayCount || 0;
    openModal(modalReadLetter);
  }

  if (btnDetailPray) {
    btnDetailPray.addEventListener('click', () => {
      if (!currentActiveLetter) return;
      currentActiveLetter.prayCount = (currentActiveLetter.prayCount || 0) + 1;
      if (detailPrayCountVal) detailPrayCountVal.textContent = currentActiveLetter.prayCount;
      saveLetters();
      renderPrayerLetters();
      showToast('아멘! 기도로 동역해 주셔서 감사합니다.');
    });
  }

  if (btnShareDetail) {
    btnShareDetail.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('기도편지 링크가 클립보드에 복사되었습니다.');
      } else {
        showToast('주소창의 링크를 복사하여 공유하실 수 있습니다.');
      }
    });
  }

  if (btnQrDetail) {
    btnQrDetail.addEventListener('click', () => {
      if (!currentActiveLetter) return;
      if (qrTargetTitle) qrTargetTitle.textContent = currentActiveLetter.title;
      if (qrcodeContainer) qrcodeContainer.innerHTML = '';
      if (window.QRCode && qrcodeContainer) {
        new QRCode(qrcodeContainer, {
          text: window.location.href,
          width: 180,
          height: 180
        });
      }
      openModal(modalQr);
    });
  }

  // --- Guestbook Functionality ---
  function renderGuestbook() {
    if (!guestbookList) return;
    guestbookList.innerHTML = '';

    guestbook.forEach(item => {
      const el = document.createElement('div');
      el.className = 'guestbook-item';
      el.innerHTML = `
        <div class="guestbook-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="guestbook-content">
          <div class="guestbook-header">
            <div>
              <span class="guestbook-author">${item.name}</span>
              ${item.affiliation ? `<span class="guestbook-church">${item.affiliation}</span>` : ''}
            </div>
            <span class="guestbook-time">${item.time || ''}</span>
          </div>
          <p class="guestbook-msg">${item.msg}</p>
        </div>
      `;
      guestbookList.appendChild(el);
    });
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('guest-name-input');
      const affiliationInput = document.getElementById('guest-affiliation');
      const msgInput = document.getElementById('guest-msg-input');

      const name = nameInput ? nameInput.value.trim() : '';
      const affiliation = affiliationInput ? affiliationInput.value.trim() : '';
      const msg = msgInput ? msgInput.value.trim() : '';

      if (!name || !msg) {
        alert('성함과 함께 나눌 기도제목을 입력해 주세요.');
        return;
      }

      const today = new Date();
      const timeStr = `${today.getMonth() + 1}/${today.getDate()} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

      const newItem = {
        id: 'guest-' + Date.now(),
        name,
        affiliation,
        msg,
        time: timeStr
      };

      guestbook.unshift(newItem);
      syncCloudData();
      renderGuestbook();
      renderAdminDashboard();

      guestbookForm.reset();
      showToast('동역자님의 중보기도제목이 실시간 공유되었습니다. 함께 기도하겠습니다!');
    });
  }

  // --- Prayer Commitment Form Handler ---
  if (prayerCommitmentForm) {
    prayerCommitmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('commit-name');
      const contactInput = document.getElementById('commit-contact');
      const msgInput = document.getElementById('commit-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const contact = contactInput ? contactInput.value.trim() : '';
      const msg = msgInput ? msgInput.value.trim() : '';

      if (!name || !contact || !msg) {
        alert('성함, 연락처, 약정 메시지를 모두 입력해 주세요.');
        return;
      }

      const today = new Date();
      const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

      const newCommitment = {
        id: 'commit-' + Date.now(),
        name,
        contact,
        msg,
        time: dateStr
      };

      commitments.unshift(newCommitment);
      syncCloudData();
      renderAdminDashboard();

      prayerCommitmentForm.reset();
      showToast('기도 후원자로 약정해 주셔서 진심으로 감사드립니다! 선교사님이 확인 후 안내해 드리겠습니다.');
    });
  }

  // --- Universal Cross-Device Copy Function ---
  function copyTextToClipboard(text, successToastMsg) {
    let copiedSuccess = false;

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '1px';
      textarea.style.height = '1px';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0.001';
      textarea.style.pointerEvents = 'none';
      textarea.style.fontSize = '16px';

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      if (navigator.userAgent.match(/ipad|iphone|ipod/i)) {
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textarea.setSelectionRange(0, 999999);
      }

      copiedSuccess = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (fallbackErr) {
      console.warn('execCommand copy failed:', fallbackErr);
      copiedSuccess = false;
    }

    if (!copiedSuccess && navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => {
        showToast(successToastMsg || '복사되었습니다!');
        return true;
      }).catch(err => {
        console.error('navigator.clipboard failed:', err);
        prompt('복사해 주세요:', text);
        return false;
      });
    }

    if (copiedSuccess) {
      showToast(successToastMsg || '복사되었습니다!');
      return Promise.resolve(true);
    } else {
      prompt('아래 텍스트를 길게 눌러 복사해 주세요:', text);
      return Promise.resolve(false);
    }
  }

  function triggerButtonCopiedState(btn, originalHTML) {
    if (!btn) return;
    btn.classList.add('copied');
    btn.innerHTML = `<i class="fa-solid fa-check"></i> 복사 완료!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 2500);
  }

  const ACCOUNT_NUM_ONLY = '26712011018995';
  const ACCOUNT_FULL_INFO = '우리은행 26712011018995 (예금주: 노대영CCC)';

  const accountBoxCard = document.getElementById('account-box-card');
  const btnCopyFullAccount = document.getElementById('btn-copy-full-account');
  const btnFooterCopy = document.getElementById('btn-footer-copy');
  const footerAccountNumText = document.getElementById('footer-account-num-text');

  if (btnCopyAccount) {
    const originalHTML = btnCopyAccount.innerHTML;
    btnCopyAccount.addEventListener('click', (e) => {
      e.stopPropagation();
      copyTextToClipboard(ACCOUNT_NUM_ONLY, '우리은행 계좌번호가 복사되었습니다! (26712011018995)').then(success => {
        if (success) triggerButtonCopiedState(btnCopyAccount, originalHTML);
      });
    });
  }

  if (btnCopyFullAccount) {
    const originalHTML = btnCopyFullAccount.innerHTML;
    btnCopyFullAccount.addEventListener('click', (e) => {
      e.stopPropagation();
      copyTextToClipboard(ACCOUNT_FULL_INFO, '우리은행 계좌 전체 정보가 복사되었습니다!').then(success => {
        if (success) triggerButtonCopiedState(btnCopyFullAccount, originalHTML);
      });
    });
  }

  if (accountNumText) {
    accountNumText.addEventListener('click', (e) => {
      e.stopPropagation();
      const originalHTML = btnCopyAccount ? btnCopyAccount.innerHTML : '';
      copyTextToClipboard(ACCOUNT_NUM_ONLY, '우리은행 계좌번호가 복사되었습니다! (26712011018995)').then(success => {
        if (success && btnCopyAccount) triggerButtonCopiedState(btnCopyAccount, originalHTML);
      });
    });
  }

  if (accountBoxCard) {
    accountBoxCard.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const originalHTML = btnCopyAccount ? btnCopyAccount.innerHTML : '';
      copyTextToClipboard(ACCOUNT_NUM_ONLY, '우리은행 계좌번호가 복사되었습니다! (26712011018995)').then(success => {
        if (success && btnCopyAccount) triggerButtonCopiedState(btnCopyAccount, originalHTML);
      });
    });
  }

  if (btnFooterCopy) {
    const originalHTML = btnFooterCopy.innerHTML;
    btnFooterCopy.addEventListener('click', () => {
      copyTextToClipboard(ACCOUNT_NUM_ONLY, '우리은행 계좌번호가 복사되었습니다! (26712011018995)').then(success => {
        if (success) triggerButtonCopiedState(btnFooterCopy, originalHTML);
      });
    });
  }

  if (footerAccountNumText) {
    footerAccountNumText.addEventListener('click', () => {
      const originalHTML = btnFooterCopy ? btnFooterCopy.innerHTML : '';
      copyTextToClipboard(ACCOUNT_NUM_ONLY, '우리은행 계좌번호가 복사되었습니다! (26712011018995)').then(success => {
        if (success && btnFooterCopy) triggerButtonCopiedState(btnFooterCopy, originalHTML);
      });
    });
  }

  // --- Modal Helpers ---
  function openModal(modal) {
    if (!modal) return;
    if (navLinks) navLinks.classList.remove('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    const remainingModal = document.querySelector('.modal-backdrop.active');
    if (!remainingModal) {
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.modal-close-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const backdrop = e.target.closest('.modal-backdrop');
      if (backdrop) closeModal(backdrop);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  // --- Toast Notification ---
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--emerald-500);"></i> <span>${msg}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

});
