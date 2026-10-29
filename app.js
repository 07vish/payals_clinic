/**
 * Payal's Dental Clinic — Core Client Script
 * Micro-interactions, Live Hours Evaluation, and Modal State Management
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initModal();
  initMobileNav();
  initCopyrightYear();
});

/**
 * 1. Live Operating Hours & Open/Closed Status Calculator
 * Calculates current time in Indian Standard Time (IST)
 * Clinic Schedule:
 * Monday – Saturday: 10:30 AM – 1:00 PM & 5:00 PM – 8:00 PM
 * Sunday: Closed
 */
function initLiveHours() {
  const navDot = document.getElementById('nav-status-dot');
  const navText = document.getElementById('nav-status-text');
  const detailDot = document.getElementById('detail-status-dot');
  const detailTitle = document.getElementById('detail-status-title');
  const detailDesc = document.getElementById('detail-status-desc');

  // Compute Indian Standard Time (UTC+5:30)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));

  const dayOfWeek = istDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const currentHours = istDate.getHours();
  const currentMinutes = istDate.getMinutes();
  const currentTime = currentHours + (currentMinutes / 60);

  // Highlight today's table row
  const allRows = document.querySelectorAll('.hours-table tr');
  allRows.forEach(row => {
    if (parseInt(row.getAttribute('data-day'), 10) === dayOfWeek) {
      row.classList.add('active-day');
      const dayCell = row.querySelector('.day-col');
      if (dayCell && !dayCell.textContent.includes('(Today)')) {
        dayCell.innerHTML += ' <span style="font-size:0.75rem;opacity:0.8;">(Today)</span>';
      }
    }
  });

  // Evaluate status
  let isOpen = false;
  let statusMessage = '';
  let subMessage = '';

  if (dayOfWeek === 0) {
    // Sunday: Closed
    isOpen = false;
    statusMessage = 'Closed Today (Sunday)';
    subMessage = 'Opens Monday at 10:30 AM';
  } else {
    // Mon - Sat
    const mMorningStart = 10.5; // 10:30 AM
    const mMorningEnd = 13.0;   // 1:00 PM
    const mEveningStart = 17.0; // 5:00 PM
    const mEveningEnd = 20.0;   // 8:00 PM

    if (currentTime >= mMorningStart && currentTime < mMorningEnd) {
      isOpen = true;
      statusMessage = 'Open Now · Morning Clinic';
      subMessage = 'Closes at 1:00 PM · Reopens at 5:00 PM';
    } else if (currentTime >= mMorningEnd && currentTime < mEveningStart) {
      isOpen = false;
      statusMessage = 'Afternoon Break';
      subMessage = 'Reopens this evening at 5:00 PM';
    } else if (currentTime >= mEveningStart && currentTime < mEveningEnd) {
      isOpen = true;
      statusMessage = 'Open Now · Evening Clinic';
      subMessage = 'Closes at 8:00 PM';
    } else if (currentTime < mMorningStart) {
      isOpen = false;
      statusMessage = 'Opens at 10:30 AM';
      subMessage = 'Morning consultation session begins shortly';
    } else {
      isOpen = false;
      statusMessage = 'Closed for the Night';
      const nextDayText = (dayOfWeek === 6) ? 'Monday at 10:30 AM' : 'tomorrow at 10:30 AM';
      subMessage = `Opens ${nextDayText}`;
    }
  }

  // Update UI Elements
  if (navDot && navText) {
    if (isOpen) {
      navDot.style.backgroundColor = 'var(--status-open)';
      navDot.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.25)';
      navText.textContent = 'Open Now';
    } else {
      navDot.style.backgroundColor = 'var(--status-closed)';
      navDot.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.25)';
      navText.textContent = 'Closed Now';
    }
  }

  if (detailDot && detailTitle && detailDesc) {
    detailDot.style.backgroundColor = isOpen ? 'var(--status-open)' : 'var(--status-closed)';
    detailTitle.textContent = statusMessage;
    detailDesc.textContent = subMessage;
  }
}

/**
 * 2. Appointment Modal Management
 */
function initModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-modal');
  const resetBtn = document.getElementById('reset-modal-btn');
  const form = document.getElementById('appointment-form');
  const successState = document.getElementById('form-success');
  const dateInput = document.getElementById('pref-date');

  // Trigger buttons
  const triggers = [
    document.getElementById('open-modal-nav'),
    document.getElementById('open-modal-hero'),
    document.getElementById('open-modal-visit'),
    document.getElementById('open-modal-footer')
  ];

  // Set min date on datepicker to today
  if (dateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.min = todayStr;
    dateInput.value = todayStr;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Auto-focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (resetBtn) resetBtn.addEventListener('click', () => {
    closeModal();
    setTimeout(() => {
      if (form) form.style.display = 'block';
      if (successState) successState.style.display = 'none';
      if (form) form.reset();
    }, 300);
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Confirming...';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successState) successState.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Confirm Appointment Request';
        }
      }, 700);
    });
  }
}

/**
 * 3. Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('is-active');
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 4. Dynamic Year
 */
function initCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
