document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupTicker();
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
