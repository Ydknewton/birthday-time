// Universal Screen Switcher
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

// 1. Splash Screen -> Profiles Screen
document.getElementById('screen-splash').addEventListener('click', () => {
  showScreen('screen-profiles');
});

// Back from Profiles -> Splash Screen
const btnBackSplash = document.getElementById('btn-back-to-splash');
if (btnBackSplash) {
  btnBackSplash.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents immediately re-opening profiles
    showScreen('screen-splash');
  });
}

// 2. Profile Selection -> Explosion of Hearts -> Dashboard Screen
const targetProfile = document.getElementById('target-profile');

if (targetProfile) {
  targetProfile.addEventListener('click', () => {
    const rect = targetProfile.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const heartIcons = ['❤️', '💖', '✨', '💕', '🥰', '💗'];

    // Spawn 35 floating hearts radiating upwards
    for (let i = 0; i < 35; i++) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 220;
      const driftX = `${Math.cos(angle) * distance}px`;
      const driftY = `${Math.sin(angle) * distance - (120 + Math.random() * 160)}px`;
      const rotation = `${(Math.random() - 0.5) * 60}deg`;
      const size = `${1.2 + Math.random() * 1.5}rem`;

      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;
      heart.style.fontSize = size;
      heart.style.setProperty('--drift-x', driftX);
      heart.style.setProperty('--drift-y', driftY);
      heart.style.setProperty('--rot', rotation);

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1200);
    }

    // Transition into the dashboard
    setTimeout(() => {
      showScreen('screen-browse');
    }, 700);
  });
}

// Back from Dashboard -> Profiles Screen
const btnBackProfiles = document.getElementById('btn-back-to-profiles');
if (btnBackProfiles) {
  btnBackProfiles.addEventListener('click', () => {
    showScreen('screen-profiles');
  });
}

// Interactive Sweet Memories Row (Clicking any thumbnail previews it in the hero banner)
document.querySelectorAll('.poster img').forEach(img => {
  img.addEventListener('click', () => {
    const heroImg = document.getElementById('main-hero-img');
    if (heroImg) {
      heroImg.src = img.src;
    }
  });
});

// 3. "More Info" Romantic Modal
const btnMoreInfo = document.getElementById('btn-more-info') || document.querySelector('.btn-gray');
const modal = document.getElementById('info-modal');
const btnModalClose = document.getElementById('modal-close') || document.querySelector('.modal-close-btn');

if (btnMoreInfo && modal) {
  btnMoreInfo.addEventListener('click', () => {
    modal.classList.add('open');
  });

  if (btnModalClose) {
    btnModalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

// 4. Video Player Controls
const video = document.getElementById('main-video');
const btnPlay = document.getElementById('btn-play');
const btnClose = document.getElementById('btn-close-player');
const ctrlPlayPause = document.getElementById('ctrl-playpause');
const ctrlBack10 = document.getElementById('ctrl-back10');
const ctrlFwd10 = document.getElementById('ctrl-fwd10');
const progressBar = document.getElementById('progress');

if (btnPlay) {
  btnPlay.addEventListener('click', () => {
    showScreen('screen-player');
    if (video) video.play().catch(() => {});
    if (ctrlPlayPause) ctrlPlayPause.textContent = '❚❚';
  });
}

if (btnClose) {
  btnClose.addEventListener('click', () => {
    if (video) video.pause();
    showScreen('screen-browse');
  });
}

if (ctrlPlayPause) {
  ctrlPlayPause.addEventListener('click', () => {
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      ctrlPlayPause.textContent = '❚❚';
    } else {
      video.pause();
      ctrlPlayPause.textContent = '▶';
    }
  });
}

if (ctrlBack10) {
  ctrlBack10.addEventListener('click', () => {
    if (video) video.currentTime = Math.max(0, video.currentTime - 10);
  });
}

if (ctrlFwd10) {
  ctrlFwd10.addEventListener('click', () => {
    if (video) video.currentTime = Math.min(video.duration, video.currentTime + 10);
  });
}

if (video && progressBar) {
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = percent + '%';
    }
  });
}