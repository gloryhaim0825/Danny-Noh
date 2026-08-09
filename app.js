/* ==========================================================================
   CCC 노대영 · 신영화 선교사 웹사이트 - JavaScript Engine & Mobile Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Google Forms Target URL State & Updater ---
  const DEFAULT_GFORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc_sample_missionary_prayer_form/viewform';
  let googleFormUrl = localStorage.getItem('ccc_google_form_url') || DEFAULT_GFORM_URL;

  function updateGFormLinks() {
    const iframe = document.getElementById('gform-iframe');
    const externalLink = document.getElementById('link-gform-external');
    const externalTarget = document.getElementById('btn-gform-external-target');

    if (iframe) iframe.src = googleFormUrl;
    if (externalLink) externalLink.href = googleFormUrl;
    if (externalTarget) externalTarget.href = googleFormUrl;
  }

  updateGFormLinks();

  // --- 2. Mobile Navigation Drawer Controller ---
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // --- 3. Dynamic Photo Gallery Engine & Lightbox Modal ---
  const galleryData = [
    {
      id: 'gal-1',
      title: '필리핀 바기오 산지 전경 & 캠퍼스',
      category: 'dispatch',
      categoryLabel: '파송 & 졸업',
      image: 'images/baguio_landscape.jpg',
      description: '교육의 도시 바기오(Baguio) 수많은 대학 청년 영혼들이 아시아와 열방을 향해 세워질 사역 현장입니다.'
    },
    {
      id: 'gal-2',
      title: '노대영 · 신영화 선교사 부부 프로필',
      category: 'family',
      categoryLabel: '가족 & 부부',
      image: 'images/couple_profile.jpg',
      description: '주님의 지상명령을 따라 필리핀 바기오 선교사로 달려가는 노대영 · 신영화 선교사 부부입니다.'
    },
    {
      id: 'gal-3',
      title: '필리핀 청년 대상 4영리 전도 현장',
      category: 'evangelism',
      categoryLabel: '전도 & 사역',
      image: 'images/four_laws_evangelism.jpg',
      description: '하나님의 사랑과 그리스도의 구원 계획을 전하며 복음으로 잃어버린 청년들을 일깨웁니다.'
    },
    {
      id: 'gal-4',
      title: '바기오 대학생 순모임 소그룹 제자화',
      category: 'training',
      categoryLabel: '리더십 & 훈련',
      image: 'images/soon_discipleship.jpg',
      description: '순장과 순원이 말씀을 나누며 승법번식의 영적 리더로 커가는 제자 육성의 장입니다.'
    },
    {
      id: 'gal-5',
      title: '전도 · 육성 · 파송 수련회 예배',
      category: 'evangelism',
      categoryLabel: '전도 & 사역',
      image: 'images/win_build_send.jpg',
      description: '예수의 꿈을 꾸며 열방으로 나아갈 것을 다짐하는 한국 및 필리핀 청년들의 뜨거운 찬양과 기도.'
    },
    {
      id: 'gal-6',
      title: '보내는 선교사와 함께하는 사역 동역',
      category: 'dispatch',
      categoryLabel: '파송 & 졸업',
      image: 'images/sending_missionary.jpg',
      description: '보내는 사람도, 가는 사람도 똑같이 함께 동역하며 주님의 은혜를 확장합니다.'
    },
    {
      id: 'gal-7',
      title: '동역자 중보기도의 끈 연합 모임',
      category: 'evangelism',
      categoryLabel: '전도 & 사역',
      image: 'images/intercessory_prayer.jpg',
      description: '사역 현장과 삶의 기도제목을 연합하여 함께 기도하는 기도의 파수꾼들.'
    },
    {
      id: 'gal-8',
      title: 'CCC 필리핀 바기오 선교사 파송식',
      category: 'dispatch',
      categoryLabel: '파송 & 졸업',
      image: 'images/dispatch_ceremony.jpg',
      description: '2026년 6월, 동역자들의 축복 속에서 바기오 파송 선교사로 첫 발을 내딛는 은혜의 순간.'
    },
    {
      id: 'gal-9',
      title: 'IGSL 변혁적 리더십(MATL) 학위 수료식',
      category: 'dispatch',
      categoryLabel: '파송 & 졸업',
      image: 'images/igsl_graduation.jpg',
      description: '아시아 20여 개국 현지 목회자 및 리더들과 함께 학위를 수료하며 선교 비전을 공고히 한 순간.'
    }
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const modalLightbox = document.getElementById('modal-gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxDesc = document.getElementById('lightbox-desc');

  function renderGallery(filter = 'all') {
    if (!galleryGrid) return;
    const itemsToRender = filter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === filter);

    galleryGrid.innerHTML = itemsToRender.map(item => `
      <div class="gallery-item" data-id="${item.id}">
        <div class="gallery-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="gallery-caption">
          <div class="gallery-item-tag">${item.categoryLabel}</div>
          <div class="gallery-item-title">${item.title}</div>
        </div>
      </div>
    `).join('');

    // Attach click triggers to open lightbox
    document.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const data = galleryData.find(g => g.id === id);
        if (data && modalLightbox) {
          lightboxImg.src = data.image;
          lightboxTitle.textContent = data.title;
          lightboxCategory.textContent = data.categoryLabel;
          lightboxDesc.textContent = data.description;
          modalLightbox.classList.add('active');
        }
      });
    });
  }

  renderGallery('all');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filterValue = e.currentTarget.getAttribute('data-filter');
      renderGallery(filterValue);
    });
  });

  // --- 4. Initial Prayer Letters & Guestbook State ---
  const defaultLetters = [
    {
      id: 'letter-2026-08',
      title: '[2026.08] 2026년 8월 CCC 필리핀 바기오 사역 & 선교 기도편지',
      date: '2026-08-05',
      displayDate: '2026.08.05',
      category: '최신기도',
      summary: '새 학기를 맞이한 필리핀 바기오 캠퍼스 개척 소식과 4영리 전도, 순모임 부흥, 그리고 아시아와 열방을 향해 헌신하는 청년 제자 육성을 위한 2026년 8월 노대영·신영화 선교사의 기도편지 소식입니다.',
      image: 'images/baguio_landscape.jpg',
      blogUrl: 'https://m.blog.naver.com/jamsh15/224232410401',
      content: `샬롬! 사랑하고 존경하는 기도의 동역자 여러분께 주님의 평안을 전합니다.

8월을 맞이하여 필리핀 바기오(Baguio) 현지 주요 대학들(SLU, UC, UB 등)이 개강을 하면서 수많은 청년들이 캠퍼스로 돌아오고 있습니다.

산꼭대기 교육의 도시 바기오에서 젊은이들을 예수 그리스도의 제자로 일깨우고 4영리로 복음을 전하는 귀한 사역이 성령의 강한 역사 속에서 펼쳐지고 있습니다.

[8월 사역 소식 및 은혜의 감사]
1. 새 학기 바기오 주요 캠퍼스 사역팀 연합 및 전도 사역 개척
2. 현지 청년 리더들과의 1:1 순모임 및 소그룹 제자화 훈련 진행
3. 노대영·신영화 선교사 가정이 바기오 현지 삶과 사역 환경에 영육 간 굳건히 뿌리내림에 감사

보내주신 사랑과 기도로 든든히 서 있는 저희 가정을 위해 8월 한 달 동안도 기도의 파수꾼으로 동역해 주시기를 간절히 부탁드립니다.`,
      requests: [
        'WIN BAGUIO TODAY, WIN THE WORLD TOMORROW! 바기오 청년들이 복음으로 변화되어 아시아와 세계를 품는 리더로 서도록',
        '새 학기 4영리 전도와 순모임을 통해 일어날 영적 부흥과 제자 육성을 위하여',
        '노대영·신영화 선교사와 자녀 가원의 영육간 강건함과 기도의 든든한 동역 파트너십을 채워주소서'
      ],
      prayCount: 84
    },
    {
      id: 'letter-2026-06',
      title: '[2026.06] 필리핀 바기오 선교사 파송 및 사역 첫 걸음',
      date: '2026-06-25',
      displayDate: '2026.06.25',
      category: '파송소식',
      summary: '수많은 동역자분들의 기도의 배웅 속에서 필리핀 바기오 캠퍼스 선교사로 정식 파송받았습니다. WIN BAGUIO TODAY, WIN THE WORLD TOMORROW!',
      image: 'images/dispatch_ceremony.jpg',
      blogUrl: 'https://m.blog.naver.com/jamsh15/224232410401',
      content: `주님의 지상명령에 순종하여 아시아 선교의 허브, 필리핀 바기오 선교사로 파송되었습니다.
보내주신 사랑과 기도를 마음에 깊이 새기며 잃어버린 청년 영혼들을 찾아 달려가겠습니다.`,
      requests: [
        '파송 선교사로서 겸손함과 뜨거운 소명 의식을 잃지 않도록',
        '바기오 캠퍼스 사역의 모든 문이 활짝 열리도록'
      ],
      prayCount: 62
    },
    {
      id: 'letter-2026-04',
      title: '[2026.04] IGSL 변혁적 리더십(MATL) 과정을 마치며',
      date: '2026-04-18',
      displayDate: '2026.04.18',
      category: '현지사역',
      summary: 'IGSL에서 아시아 20여 개국 현지 리더들과 함께 훈련받으며 변혁적 리더십 석사 과정을 은혜 가운데 수료했습니다.',
      image: 'images/igsl_graduation.jpg',
      blogUrl: 'https://m.blog.naver.com/jamsh15/224232410401',
      content: `아시아 20여 개국에서 모인 목회자들과 선교사들이 함께 말씀으로 변화되는 수료의 시간이었습니다.
이들이 본국으로 돌아가 복음의 깃발을 높이 들 줄 믿습니다.`,
      requests: [
        'IGSL 졸업생 리더들이 각국 선교지에서 굳건히 서도록',
        '다음 사역지 바기오 선교 준비가 은혜롭게 이루어지도록'
      ],
      prayCount: 51
    }
  ];

  const defaultGuestbook = [
    { name: '이순신 순장', affiliation: '경희CCC 동문', text: '노대영 선교사님, 8월 바기오 개척 사역 축복합니다! 기도로 늘 함께할게요.', time: '10분 전' },
    { name: '박은혜 권사', affiliation: '수원성교회', text: '선교사님 가정과 자녀 가원이에 하나님 평강과 건강이 넘치길 기도합니다 🙏', time: '1시간 전' },
    { name: '김지훈 간사', affiliation: 'CCC 사역팀', text: 'WIN BAGUIO TODAY! 승리하세요 선교사님!', time: '3시간 전' }
  ];

  let letters = JSON.parse(localStorage.getItem('ccc_noh_letters')) || defaultLetters;
  let guestbook = JSON.parse(localStorage.getItem('ccc_noh_guestbook')) || defaultGuestbook;

  function saveLetters() {
    localStorage.setItem('ccc_noh_letters', JSON.stringify(letters));
  }
  function saveGuestbook() {
    localStorage.setItem('ccc_noh_guestbook', JSON.stringify(guestbook));
  }

  // --- 5. Modal Helpers & Triggers ---
  const modalRead = document.getElementById('modal-read-letter');
  const modalWrite = document.getElementById('modal-write-letter');
  const modalGForm = document.getElementById('modal-google-form');
  const modalSettingGForm = document.getElementById('modal-setting-gform');

  function openReadModal(id) {
    const letter = letters.find(l => l.id === id) || defaultLetters[0];
    if (!letter || !modalRead) return;

    document.getElementById('read-letter-title').textContent = letter.title;
    document.getElementById('read-letter-category').textContent = letter.category || '기도편지';
    document.getElementById('read-letter-date').innerHTML = `<i class="fa-regular fa-calendar"></i> ${letter.displayDate}`;
    document.getElementById('read-letter-cover').src = letter.image;
    document.getElementById('read-letter-body').textContent = letter.content;
    document.getElementById('detail-pray-count-val').textContent = letter.prayCount;

    const extBlogBtn = document.getElementById('btn-external-blog');
    if (extBlogBtn) {
      extBlogBtn.href = letter.blogUrl || 'https://m.blog.naver.com/jamsh15/224232410401';
    }

    const reqsList = document.getElementById('read-letter-requests');
    if (reqsList) {
      reqsList.innerHTML = (letter.requests || []).map((r) => `
        <li style="margin-bottom: 0.6rem; font-size: 0.925rem; color: var(--slate-800); display: flex; align-items: flex-start; gap: 0.5rem;">
          <i class="fa-solid fa-check text-primary" style="margin-top: 4px;"></i>
          <span>${r}</span>
        </li>
      `).join('');
    }

    modalRead.classList.add('active');
  }

  function openGoogleFormsModal() {
    updateGFormLinks();
    if (modalGForm) modalGForm.classList.add('active');
  }

  // Attach Google Form Triggers
  const btnHeroGForm = document.getElementById('btn-hero-gform');
  if (btnHeroGForm) btnHeroGForm.addEventListener('click', openGoogleFormsModal);

  const btnOpenGFormModal = document.getElementById('btn-open-gform-modal');
  if (btnOpenGFormModal) btnOpenGFormModal.addEventListener('click', openGoogleFormsModal);

  const btnOpenGFormSupport = document.getElementById('btn-open-gform-support');
  if (btnOpenGFormSupport) btnOpenGFormSupport.addEventListener('click', openGoogleFormsModal);

  const btnFabGform = document.getElementById('btn-fab-gform');
  if (btnFabGform) btnFabGform.addEventListener('click', openGoogleFormsModal);

  // Settings Modal Triggers
  const btnGFormSettings = document.getElementById('btn-gform-settings');
  const btnGFormSettingsDrawer = document.getElementById('btn-gform-settings-drawer');

  function openSettingsModal() {
    const input = document.getElementById('gform-url-input');
    if (input) input.value = googleFormUrl;
    if (modalSettingGForm) modalSettingGForm.classList.add('active');
  }

  if (btnGFormSettings) btnGFormSettings.addEventListener('click', openSettingsModal);
  if (btnGFormSettingsDrawer) {
    btnGFormSettingsDrawer.addEventListener('click', () => {
      closeMobileDrawer();
      openSettingsModal();
    });
  }

  // Save Settings Form
  const gformUrlSettingForm = document.getElementById('gform-url-setting-form');
  if (gformUrlSettingForm) {
    gformUrlSettingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newUrl = document.getElementById('gform-url-input').value.trim();
      if (newUrl) {
        googleFormUrl = newUrl;
        localStorage.setItem('ccc_google_form_url', newUrl);
        updateGFormLinks();
        if (modalSettingGForm) modalSettingGForm.classList.remove('active');
        showToast('선교사 구글 폼 URL 설정이 새로 업데이트되었습니다!');
      }
    });
  }

  // Attach Read Detail Buttons
  document.querySelectorAll('.btn-read-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openReadModal(id);
    });
  });

  // Attach Pray Count Buttons
  document.querySelectorAll('.btn-pray-count').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id') || 'letter-2026-08';
      const letter = letters.find(l => l.id === id);
      if (letter) {
        letter.prayCount++;
        saveLetters();
        const numSpan = e.currentTarget.querySelector('.pray-num') || document.getElementById('detail-pray-count-val');
        if (numSpan) numSpan.textContent = letter.prayCount;
        showToast('아멘! 2026년 8월 기도에 함께 동역해주셔서 감사합니다 🙏');
      }
    });
  });

  // Write Letter Button & Submit Form
  const btnWriteHeader = document.getElementById('btn-write-letter-header');
  if (btnWriteHeader && modalWrite) {
    btnWriteHeader.addEventListener('click', () => {
      modalWrite.classList.add('active');
    });
  }

  const writeLetterForm = document.getElementById('write-letter-form');
  if (writeLetterForm) {
    writeLetterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('write-title').value;
      const category = document.getElementById('write-category').value;
      const blogUrl = document.getElementById('write-blog-url').value;
      const summary = document.getElementById('write-summary').value;
      const content = document.getElementById('write-content').value;
      const requestsRaw = document.getElementById('write-requests').value;
      const requests = requestsRaw ? requestsRaw.split('\n').filter(r => r.trim() !== '') : [];

      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const displayDateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

      const newLetter = {
        id: `letter-${Date.now()}`,
        title,
        date: dateStr,
        displayDate: displayDateStr,
        category,
        summary,
        image: 'images/baguio_landscape.jpg',
        blogUrl: blogUrl || 'https://m.blog.naver.com/jamsh15/224232410401',
        content,
        requests,
        prayCount: 1
      };

      letters.unshift(newLetter);
      saveLetters();
      writeLetterForm.reset();
      if (modalWrite) modalWrite.classList.remove('active');
      showToast('새 기도편지가 작성 및 저장되었습니다!');
    });
  }

  // Close Modals Triggers
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.remove('active');
    });
  });

  // Share Detail Button
  const btnShareDetail = document.getElementById('btn-share-detail');
  if (btnShareDetail) {
    btnShareDetail.addEventListener('click', () => {
      const shareUrl = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('기도편지 웹사이트 링크가 복사되었습니다!');
        });
      } else {
        showToast('기도편지 웹사이트: ' + shareUrl);
      }
    });
  }

  // Account Copy Button
  const btnCopyAcc = document.getElementById('btn-copy-account');
  if (btnCopyAcc) {
    btnCopyAcc.addEventListener('click', () => {
      const textToCopy = '우리은행 26712011018995 노대영CCC';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('후원 계좌번호가 복사되었습니다!');
        });
      } else {
        showToast('계좌번호: 우리은행 26712011018995');
      }
    });
  }

  // --- 6. Guestbook Render & Submit ---
  const guestbookList = document.getElementById('guestbook-list');
  const guestbookForm = document.getElementById('guestbook-form');

  function renderGuestbook() {
    if (!guestbookList) return;
    guestbookList.innerHTML = guestbook.map(g => `
      <div style="background: #fff; border: 1px solid var(--slate-200); padding: 1.25rem; border-radius: var(--radius-md); box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <strong style="color: var(--navy-900); font-size: 0.95rem;">${g.name} <small style="color: var(--slate-500); font-weight: normal;">(${g.affiliation || '동역자'})</small></strong>
          <span style="font-size: 0.75rem; color: var(--slate-400);">${g.time}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--slate-700); line-height: 1.5; margin: 0;">${g.text}</p>
      </div>
    `).join('');
  }

  renderGuestbook();

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name-input').value;
      const affiliation = document.getElementById('guest-affiliation').value;
      const text = document.getElementById('guest-msg-input').value;

      guestbook.unshift({ name, affiliation, text, time: '방금 전' });
      saveGuestbook();
      renderGuestbook();
      guestbookForm.reset();

      showToast('중보기도 메시지가 등록되었습니다! 구글 폼 수신창을 확인합니다.');
      setTimeout(() => {
        openGoogleFormsModal();
      }, 600);
    });
  }

  // Support Commitment Form Submit
  const prayerCommitmentForm = document.getElementById('prayer-commitment-form');
  if (prayerCommitmentForm) {
    prayerCommitmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('commit-name').value;
      showToast(`${name} 동역자님, 기도약정이 제출되었습니다! 구글 폼 수신창을 엽니다.`);
      prayerCommitmentForm.reset();
      setTimeout(() => {
        openGoogleFormsModal();
      }, 600);
    });
  }

  // --- 7. Mobile Top Scroll Button ---
  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active Nav Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        document.querySelectorAll('.drawer-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Helper: Toast Notification
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold-400);"></i> ${msg}`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

});
