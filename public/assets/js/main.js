document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupTicker();
  setupMobileNav();
});

function setupTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');
  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabs).indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          selectTab(tabs[(currentIndex + 1) % tabs.length]);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          selectTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
        }
      });
    });
  });
}

function selectTab(tab) {
  const tabList = tab.closest('[role="tablist"]');
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const panels = tabList.parentElement.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
  panels.forEach((panel) => {
    const isActive = panel.getAttribute('id') === tab.getAttribute('aria-controls');
    panel.hidden = !isActive;
  });
}

function setupTicker() {
  const ticker = document.querySelector('#notifications');
  const list = document.querySelector('.notifications__list');
  if (!ticker || !list) return;

  let intervalId = null;
  const rotate = () => {
    const first = list.querySelector('li');
    if (!first) return;
    const clone = first.cloneNode(true);
    list.appendChild(clone);
    list.removeChild(first);
  };

  const start = () => {
    if (intervalId) return;
    intervalId = setInterval(rotate, 3500);
  };

  const stop = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  };

  ticker.addEventListener('mouseenter', stop);
  ticker.addEventListener('mouseleave', start);

  start();
}

function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navOverlay = document.querySelector('.nav__overlay');
  
  if (!hamburger || !mobileNav) return;

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileNav.setAttribute('aria-hidden', isExpanded);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  });

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking on nav links
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Close menu on window resize to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}
