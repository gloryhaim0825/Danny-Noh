/* ==========================================================================
   CCC 노대영 · 신영화 선교사 사역 웹사이트 - App JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Default initial prayer letters
  const defaultLetters = [
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

  // Default guestbook / prayer thread messages
  const defaultGuestbook = [
    { name: '김순장', affiliation: '경희CCC 동문', msg: '노대영 선교사님! 바기오 사역과 제자화 사역을 위해 매일 기도합니다. 가정을 위해 기도제목 나눕니다: 저희 가정의 대학 입시와 건강을 위해 함께 기도해 주세요.', time: '방금 전' },
    { name: '박은혜 집사', affiliation: '기도 동역자', msg: '선교사님 가정을 위해 늘 중보기도합니다. 저희 교구 식구들의 영적 성장과 건강을 위해 기도의 끈으로 함께해 주세요 🙏', time: '1시간 전' },
    { name: '최요한 간사', affiliation: 'CCC 사역팀', msg: '동아시아 사역에 이어 바기오에서도 놀라운 부흥이 일어날 줄 믿습니다. 저희 지부 캠퍼스 전도 대원들을 위해서도 중보기도 부탁드립니다!', time: '3시간 전' }
  ];

  // --- LocalStorage State ---
  localStorage.setItem('ccc_noh_letters', JSON.stringify(defaultLetters));
  let letters = defaultLetters;

  let guestbook = JSON.parse(localStorage.getItem('ccc_noh_guestbook')) || defaultGuestbook;
  let isAdmin = sessionStorage.getItem('ccc_noh_is_admin') === 'true';

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

  const accountNumText = document.getElementById('account-num-text');
  const btnCopyAccount = document.getElementById('btn-copy-account');

  const btnAdminTrigger = document.getElementById('btn-admin-trigger');
  const adminStatusText = document.getElementById('admin-status-text');

  // Modals
  const modalAdminAuth = document.getElementById('modal-admin-auth');
  const adminPinForm = document.getElementById('admin-pin-form');
  const adminPinInput = document.getElementById('admin-pin-input');

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

  // Navigation scroll & Mobile menu
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- LocalStorage State for User/Partner Session ---
  let loggedPartner = JSON.parse(sessionStorage.getItem('ccc_noh_logged_partner') || 'null');

  // --- Admin UI & Partner Login Toggle ---
  function updateAdminUI() {
    if (isAdmin) {
      if (adminStatusText) adminStatusText.textContent = '선교사 관리자 (로그아웃)';
      if (btnAdminTrigger) btnAdminTrigger.classList.add('logged-in');
      if (btnWriteLetterHeader) btnWriteLetterHeader.style.display = 'inline-flex';
    } else if (loggedPartner) {
      if (adminStatusText) adminStatusText.textContent = `${loggedPartner.name} 동역자님 (로그아웃)`;
      if (btnAdminTrigger) btnAdminTrigger.classList.add('logged-in');
      if (btnWriteLetterHeader) btnWriteLetterHeader.style.display = 'none';
      
      // Auto fill guest name if logged in
      const guestNameInput = document.getElementById('guest-name-input');
      if (guestNameInput) guestNameInput.value = loggedPartner.name;
    } else {
      if (adminStatusText) adminStatusText.textContent = '동역자 로그인';
      if (btnAdminTrigger) btnAdminTrigger.classList.remove('logged-in');
      if (btnWriteLetterHeader) btnWriteLetterHeader.style.display = 'none';
    }
  }

  if (btnAdminTrigger) {
    btnAdminTrigger.addEventListener('click', () => {
      if (isAdmin || loggedPartner) {
        const userType = isAdmin ? '선교사 관리자' : `${loggedPartner.name} 동역자님`;
        if (confirm(`${userType} 계정에서 로그아웃 하시겠습니까?`)) {
          isAdmin = false;
          loggedPartner = null;
          sessionStorage.removeItem('ccc_noh_is_admin');
          sessionStorage.removeItem('ccc_noh_logged_partner');
          updateAdminUI();
          renderPrayerLetters();
          showToast('로그아웃 되었습니다.');
        }
      } else {
        openModal(modalAdminAuth);
      }
    });
  }

  // Modal Tab Switching
  const tabLoginPartner = document.getElementById('tab-login-partner');
  const tabLoginMissionary = document.getElementById('tab-login-missionary');
  const partnerLoginForm = document.getElementById('partner-login-form');

  if (tabLoginPartner && tabLoginMissionary) {
    tabLoginPartner.addEventListener('click', () => {
      tabLoginPartner.style.background = '#fff';
      tabLoginPartner.style.color = 'var(--navy-900)';
      tabLoginPartner.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';

      tabLoginMissionary.style.background = 'transparent';
      tabLoginMissionary.style.color = 'var(--slate-600)';
      tabLoginMissionary.style.boxShadow = 'none';

      partnerLoginForm.style.display = 'block';
      if (adminPinForm) adminPinForm.style.display = 'none';
    });

    tabLoginMissionary.addEventListener('click', () => {
      tabLoginMissionary.style.background = '#fff';
      tabLoginMissionary.style.color = 'var(--navy-900)';
      tabLoginMissionary.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';

      tabLoginPartner.style.background = 'transparent';
      tabLoginPartner.style.color = 'var(--slate-600)';
      tabLoginPartner.style.boxShadow = 'none';

      if (adminPinForm) adminPinForm.style.display = 'block';
      partnerLoginForm.style.display = 'none';
    });
  }

  // Partner Login Submit
  if (partnerLoginForm) {
    partnerLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('partner-name-input').value.trim();
      const pw = document.getElementById('partner-pw-input').value.trim();

      if (!name || !pw) return;

      loggedPartner = { name, loggedAt: new Date().toLocaleTimeString() };
      sessionStorage.setItem('ccc_noh_logged_partner', JSON.stringify(loggedPartner));
      
      updateAdminUI();
      closeModal(modalAdminAuth);
      partnerLoginForm.reset();
      showToast(`샬롬! ${name} 동역자님 환영합니다. 로그인되었습니다.`);
    });
  }

  // Admin PIN Submit
  if (adminPinForm) {
    adminPinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = adminPinInput.value.trim();
      if (pin === '4708') {
        isAdmin = true;
        sessionStorage.setItem('ccc_noh_is_admin', 'true');
        updateAdminUI();
        closeModal(modalAdminAuth);
        adminPinInput.value = '';
        renderPrayerLetters();
        showToast('선교사 관리자 로그인 완료! 기도편지 작성/수정/삭제 권한이 활성화되었습니다.');
      } else {
        alert('선교사 비밀번호(PIN)가 올바르지 않습니다. (기본 PIN: 4708)');
      }
    });
  }

  // --- Gallery Data & Rendering ---
  const galleryItems = [
    { title: 'CCC 선교사 파송 예배', cat: 'dispatch', img: 'images/dispatch_ceremony.jpg', tag: '파송식' },
    { title: '필리핀 바기오 시내 전경', cat: 'evangelism', img: 'images/baguio_landscape.jpg', tag: '바기오' },
    { title: '노대영 · 신영화 선교사 부부', cat: 'family', img: 'images/couple_photo.jpg', tag: '부부사진' },
    { title: '캠퍼스 그룹 전도 모임', cat: 'evangelism', img: 'images/group_evangelism.jpg', tag: '캠퍼스전도' },
    { title: '아이스크림 4영리 전도', cat: 'evangelism', img: 'images/icecream_evangelism.jpg', tag: '전도사역' },
    { title: 'IGSL 졸업식 기념', cat: 'dispatch', img: 'images/igsl_graduation.jpg', tag: '리더십수료' },
    { title: '선교사 가정 모습', cat: 'family', img: 'images/family.jpg', tag: '가족' },
    { title: '세계 기도일 대학생 모임', cat: 'training', img: 'images/world_prayer_day.jpg', tag: '기도모임' },
    { title: '리더십 훈련 수련회', cat: 'training', img: 'images/leadership_training.jpg', tag: '리더십' },
    { title: '코칭 훈련 세미나', cat: 'training', img: 'images/coaching_training.jpg', tag: '코칭' }
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
        </div>
      `;
      el.addEventListener('click', () => {
        lightboxImg.src = item.img;
        lightboxCaption.textContent = item.title;
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
    // Keep hardcoded HTML if already present and no letters state mutation
    if (prayerGrid.children.length > 0 && letters.length === defaultLetters.length) return;
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
          <img src="${letter.cover || 'images/dispatch_ceremony.jpg'}" alt="${letter.title}">
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
              <a href="${letter.link}" target="_blank" rel="noopener noreferrer" style="font-size: 0.825rem; font-weight: 700; color: #03CF5D; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 블로그 열기
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
      btnRead.addEventListener('click', () => openLetterDetail(letter.id));

      const btnPray = card.querySelector('.btn-pray-count');
      btnPray.addEventListener('click', (e) => {
        e.stopPropagation();
        letter.prayCount = (letter.prayCount || 0) + 1;
        saveLetters();
        renderPrayerLetters();
        showToast('아멘! 기도로 함께해 주셔서 감사합니다.');
      });

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

  function saveLetters() {
    localStorage.setItem('ccc_noh_letters', JSON.stringify(letters));
  }

  // Header Write Button
  if (btnWriteLetterHeader) {
    btnWriteLetterHeader.addEventListener('click', () => {
      if (!isAdmin) {
        openModal(modalAdminAuth);
        return;
      }
      openCreateLetterModal();
    });
  }

  function openCreateLetterModal() {
    editLetterId.value = '';
    writeModalTitle.innerHTML = '<i class="fa-solid fa-pen-nib text-primary"></i> 새 기도편지 올리기';
    prayerLetterForm.reset();
    openModal(modalWriteLetter);
  }

  function openEditLetterModal(id) {
    const letter = letters.find(l => l.id === id);
    if (!letter) return;

    editLetterId.value = letter.id;
    writeModalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> 기도편지 수정하기';
    
    letterTitleInput.value = letter.title;
    letterCategorySelect.value = letter.category;
    letterCoverSelect.value = letter.cover || 'images/dispatch_ceremony.jpg';
    letterContentInput.value = letter.content;
    letterRequestsInput.value = Array.isArray(letter.requests) ? letter.requests.join('\n') : letter.requests;

    openModal(modalWriteLetter);
  }

  if (prayerLetterForm) {
    prayerLetterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = editLetterId.value;
      const title = letterTitleInput.value.trim();
      const category = letterCategorySelect.value;
      const cover = letterCoverSelect.value;
      const content = letterContentInput.value.trim();
      const requestsRaw = letterRequestsInput.value.trim();
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

    readLetterCategory.textContent = letter.category;
    readLetterTitle.textContent = letter.title;
    readLetterDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${letter.date}`;

    if (letter.cover) {
      readLetterCover.src = letter.cover;
      readLetterCoverWrap.style.display = 'block';
    } else {
      readLetterCoverWrap.style.display = 'none';
    }

    readLetterBody.textContent = letter.content;

    // Blog external link button
    const existingBlogBtn = document.getElementById('btn-blog-link');
    if (existingBlogBtn) existingBlogBtn.remove();

    if (letter.link) {
      const blogBtnWrap = document.createElement('div');
      blogBtnWrap.id = 'btn-blog-link';
      blogBtnWrap.style.marginTop = '1.25rem';
      blogBtnWrap.style.marginBottom = '1rem';
      blogBtnWrap.innerHTML = `
        <a href="${letter.link}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-full); background: #03CF5D; color: #fff; font-weight: 700;">
          <i class="fa-solid fa-square-arrow-up-right"></i>
          <span>네이버 블로그에서 2026년 3월 기도편지 전체 읽기</span>
        </a>
      `;
      readLetterBody.appendChild(blogBtnWrap);
    }

    // Requests
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

    detailPrayCountVal.textContent = letter.prayCount || 0;
    openModal(modalReadLetter);
  }

  if (btnDetailPray) {
    btnDetailPray.addEventListener('click', () => {
      if (!currentActiveLetter) return;
      currentActiveLetter.prayCount = (currentActiveLetter.prayCount || 0) + 1;
      detailPrayCountVal.textContent = currentActiveLetter.prayCount;
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
      qrTargetTitle.textContent = currentActiveLetter.title;
      qrcodeContainer.innerHTML = '';
      if (window.QRCode) {
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
            <span class="guestbook-time">${item.time}</span>
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
      const name = document.getElementById('guest-name').value.trim();
      const affiliation = document.getElementById('guest-affiliation').value.trim();
      const msg = document.getElementById('guest-msg-input').value.trim();

      if (!name || !msg) return;

      const newItem = {
        name,
        affiliation,
        msg,
        time: '방금 전'
      };

      guestbook.unshift(newItem);
      localStorage.setItem('ccc_noh_guestbook', JSON.stringify(guestbook));
      renderGuestbook();

      guestbookForm.reset();
      showToast('동역자님의 중보기도제목이 등록되었습니다. 함께 기도로 굳게 연합하겠습니다!');
    });
  }

  // --- Copy Account Number ---
  if (btnCopyAccount && accountNumText) {
    btnCopyAccount.addEventListener('click', () => {
      const num = accountNumText.textContent.replace(/-/g, '').trim();
      navigator.clipboard.writeText(num).then(() => {
        showToast('우리은행 계좌번호가 복사되었습니다! (26712011018995)');
      });
    });
  }

  // --- Modal Helpers ---
  function openModal(modal) {
    if (modal) modal.classList.add('active');
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
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
