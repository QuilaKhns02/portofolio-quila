/**
 * DevForge Aurora - Portfolio Interaction Script
 * Quila Khansa Agnissa | Student Software Engineer SMKN 6 Surakarta
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFiltering();
  initContactForm();
  initTerminalModal();
  initProjectDemoModal();
  initCopyCode();
  initScrollSpy();
});

// ==========================================
// 1. PROJECT FILTERING LOGIC
// ==========================================
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'font-semibold', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface-variant', 'font-medium');
      });

      btn.classList.remove('bg-surface-container', 'text-on-surface-variant', 'font-medium');
      btn.classList.add('bg-primary', 'text-on-primary', 'font-semibold', 'shadow-sm');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.98)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ==========================================
// 2. CONTACT FORM SUBMISSION & SIMULATION
// ==========================================
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const toast = document.getElementById('formSuccessToast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-block animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
      <span>Mengirim Pesan...</span>
    `;

    setTimeout(() => {
      // Success feedback
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;

      if (toast) {
        toast.classList.remove('hidden');
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();

      setTimeout(() => {
        if (toast) {
          toast.classList.add('hidden');
        }
      }, 6000);
    }, 800);
  });
}

// ==========================================
// 3. COPY CODE SNIPPET (HERO SECTION)
// ==========================================
function initCopyCode() {
  const copyBtn = document.getElementById('copyConfigBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const codeSnippet = `const internCandidate: StudentRPL = {
  name: 'Quila Khansa Agnissa',
  school: 'SMKN 6 Surakarta',
  grade: 'Kelas XI',
  major: 'Rekayasa Perangkat Lunak (RPL)',
  status: 'Ready for PKL / Magang Industri',
  skills: ['Tailwind CSS', 'JavaScript (ES6+)', 'PHP', 'MySQL', 'Git & GitHub'],
  mentorshipHunger: 100%
};`;

    navigator.clipboard.writeText(codeSnippet).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <span class="material-symbols-outlined text-[14px] text-emerald-400">check</span>
        <span class="text-emerald-400">Copied!</span>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
}

// ==========================================
// 4. INTERACTIVE TERMINAL SIMULATION (DEV SPECIALTY)
// ==========================================
function initTerminalModal() {
  const terminalModal = document.getElementById('terminalModal');
  const openButtons = document.querySelectorAll('.open-terminal-btn');
  const closeBtn = document.getElementById('closeTerminalBtn');
  const terminalInput = document.getElementById('terminalCommandInput');
  const terminalOutput = document.getElementById('terminalOutput');

  if (!terminalModal) return;

  const openTerminal = () => {
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (terminalInput) terminalInput.focus();
    }, 100);
  };

  const closeTerminal = () => {
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', openTerminal));
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  // Close on backdrop click
  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) {
      closeTerminal();
    }
  });

  // Keyboard shortcut Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
    if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  // Terminal Command Processor
  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        appendTerminalLine(`mila@smkn6-rpl:~$ ${cmd}`, 'text-secondary font-medium');

        processCommand(cmd);
      }
    });
  }

  function appendTerminalLine(text, className = 'text-on-surface-variant') {
    const line = document.createElement('div');
    line.className = `leading-relaxed ${className}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function processCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendTerminalLine('Perintah yang tersedia:', 'text-primary font-semibold');
        appendTerminalLine('  <span class="text-secondary font-bold">bio</span>        : Tampilkan biodata & profil kandidat PKL');
        appendTerminalLine('  <span class="text-secondary font-bold">skills</span>     : Tampilkan daftar keahlian & stack');
        appendTerminalLine('  <span class="text-secondary font-bold">projects</span>   : Tampilkan daftar proyek unggulan');
        appendTerminalLine('  <span class="text-secondary font-bold">contact</span>    : Informasi kontak resmi');
        appendTerminalLine('  <span class="text-secondary font-bold">clear</span>      : Bersihkan layar terminal');
        appendTerminalLine('  <span class="text-secondary font-bold">exit</span>       : Tutup sesi terminal');
        break;

      case 'bio':
        appendTerminalLine('=== BIODATA KANDIDAT PKL ===', 'text-tertiary font-bold');
        appendTerminalLine('Nama      : Quila Khansa Agnissa');
        appendTerminalLine('Status    : Student Software Engineer');
        appendTerminalLine('Sekolah   : SMKN 6 Surakarta');
        appendTerminalLine('Kelas     : XI (Sebelas)');
        appendTerminalLine('Jurusan   : Rekayasa Perangkat Lunak (RPL)');
        appendTerminalLine('Minat     : Frontend Development & Modern Web Systems');
        break;

      case 'skills':
        appendTerminalLine('=== TEKNOLOGI & SKILL ===', 'text-primary font-bold');
        appendTerminalLine('Frontend  : HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), Responsive Design');
        appendTerminalLine('Backend   : PHP Native & OOP Dasar, MySQL DBMS, REST API');
        appendTerminalLine('Workflow  : Git & GitHub, VS Code, Figma, Linux/Bash, Postman');
        break;

      case 'projects':
        appendTerminalLine('=== PROYEK UNGGULAN ===', 'text-secondary font-bold');
        appendTerminalLine('1. SIPUS-SMK: Sistem Perpustakaan Digital (PHP, MySQL, Tailwind)');
        appendTerminalLine('2. KantinPay: Kasir & E-Wallet Kantin Sekolah (JS, Tailwind, LocalStorage)');
        appendTerminalLine('3. EduTask: Kanban Board Manajemen Tugas RPL (UI/UX, Responsive Web)');
        break;

      case 'contact':
        appendTerminalLine('=== KONTAK RESMI ===', 'text-emerald-400 font-bold');
        appendTerminalLine('WhatsApp  : <a href="https://wa.me/62882007587825" target="_blank" class="text-secondary underline">0882-0075-87825</a>');
        appendTerminalLine('Email     : <a href="mailto:quilakhansa@gmail.com" class="text-secondary underline">quilakhansa@gmail.com</a>');
        appendTerminalLine('GitHub    : <a href="https://github.com/QuilaKhns02" target="_blank" class="text-secondary underline">github.com/QuilaKhns02</a>');
        appendTerminalLine('Instagram : <a href="https://instagram.com/1lacy_" target="_blank" class="text-secondary underline">@1lacy_</a>');
        break;

      case 'clear':
        terminalOutput.innerHTML = '';
        break;

      case 'exit':
        closeTerminal();
        break;

      case '':
        break;

      default:
        appendTerminalLine(`Perintah '${cmd}' tidak dikenali. Ketik <span class="text-primary font-bold">help</span> untuk panduan.`, 'text-error');
        break;
    }
  }
}

// ==========================================
// 5. PROJECT DEMO PREVIEW MODAL
// ==========================================
const projectData = {
  'sipus': {
    title: 'SIPUS-SMK: Sistem Informasi Perpustakaan Digital',
    tag: 'Web App & Database',
    badge: 'Production Ready',
    image: './assets/project_sipus.jpg',
    description: 'Aplikasi manajemen peminjaman buku perpustakaan sekolah berbasis web dengan fitur pencarian katalog cepat, barcode scanner untuk registrasi buku, dan rekapitulasi data sirkulasi buku mingguan serta bulanan.',
    features: [
      'Manajemen data buku, siswa, dan transaksi peminjaman',
      'Kalkulasi denda keterlambatan pengembalian otomatis',
      'Export laporan sirkulasi ke format PDF & Excel',
      'Desain antarmuka responsif dan ramah perangkat tablet tata usaha'
    ],
    tech: ['PHP Native', 'MySQL Relational', 'Tailwind CSS', 'JavaScript DOM'],
    github: 'https://github.com/QuilaKhns02'
  },
  'kantinpay': {
    title: 'KantinPay: E-Wallet & Kasir Kantin Sekolah',
    tag: 'Fintech & POS App',
    badge: 'POS App',
    image: './assets/project_kantinpay.jpg',
    description: 'Sistem point-of-sale digital dan simulasi dompet elektronik untuk kantin sekolah, mengeliminasi antrean panjang saat jam istirahat dan mencatat mutasi saldo secara real-time.',
    features: [
      'Katalog menu makanan & minuman dengan keranjang belanja interaktif',
      'Simulasi scan QR dan pengurangan saldo pengguna',
      'Cetak struk belanja digital & history transaksi di LocalStorage',
      'Dashboard ringkasan pendapatan harian stan kantin'
    ],
    tech: ['JavaScript ES6+', 'Tailwind CSS', 'HTML5 Web Storage', 'Figma UI/UX'],
    github: 'https://github.com/QuilaKhns02'
  },
  'edutask': {
    title: 'EduTask: Platform Manajemen Tugas Siswa RPL',
    tag: 'Workflow & Productivity',
    badge: 'Workflow Tool',
    image: './assets/project_edutask.jpg',
    description: 'Aplikasi produktivitas kolaboratif untuk membantu siswa jurusan RPL memonitor deadline tugas coding individu maupun sprint kelompok dengan papan Kanban drag-and-drop interaktif.',
    features: [
      'Papan tugas fleksibel: To Do, In Progress, Code Review, Done',
      'Indikator prioritas tinggi (High, Medium, Low) dengan deadline countdown',
      'Checklist subtask dan tautan lampiran repository GitHub',
      'Mode gelap ramah mata (Dark Mode UI) ala developer tools'
    ],
    tech: ['Responsive Web', 'Figma Wireframing', 'Git Workflow', 'JavaScript ES6'],
    github: 'https://github.com/QuilaKhns02'
  }
};

function initProjectDemoModal() {
  const modal = document.getElementById('projectDemoModal');
  const demoButtons = document.querySelectorAll('.open-demo-btn');
  const closeBtn = document.getElementById('closeDemoModalBtn');

  if (!modal) return;

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectBadge').textContent = data.badge;
    document.getElementById('modalProjectImg').src = data.image;
    document.getElementById('modalProjectDesc').textContent = data.description;

    const featureList = document.getElementById('modalProjectFeatures');
    featureList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-on-surface-variant text-body-sm';
      li.innerHTML = `<span class="material-symbols-outlined text-[16px] text-primary flex-shrink-0 mt-0.5">check_circle</span><span>${feat}</span>`;
      featureList.appendChild(li);
    });

    const techContainer = document.getElementById('modalProjectTech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 rounded-md bg-primary/10 text-primary font-code-sm text-[12px] font-medium border border-primary/20';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    const githubLink = document.getElementById('modalProjectGithub');
    if (githubLink) {
      githubLink.href = data.github;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project');
      openModal(pId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================
// 6. SCROLL SPY & NAVIGATION HIGHLIGHT
// ==========================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileDockLinks = document.querySelectorAll('.mobile-dock-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        // Update Desktop
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary');
            link.classList.remove('text-on-surface-variant');
          } else {
            link.classList.remove('text-primary');
            link.classList.add('text-on-surface-variant');
          }
        });

        // Update Mobile Dock
        mobileDockLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary', 'bg-primary/10', 'rounded-xl');
            link.classList.remove('text-on-surface-variant');
          } else {
            link.classList.remove('text-primary', 'bg-primary/10', 'rounded-xl');
            link.classList.add('text-on-surface-variant');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
