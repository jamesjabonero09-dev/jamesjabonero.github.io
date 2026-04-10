document.body.classList.add('js');
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');
const themeToggle = document.getElementById('theme-toggle');

const setTheme = theme => {
  document.body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('siteTheme', theme);
};

const savedTheme = localStorage.getItem('siteTheme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

menuToggle?.addEventListener('click', () => {
  navBar.classList.toggle('open');
});

const links = document.querySelectorAll('.nav-bar a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navBar.classList.remove('open');
  });
});

const typingElement = document.getElementById('typing-text');
const typingPhrases = [
  'reliable virtual assistance',
  'accurate admin and data support',
  'web and task assistance'
];
let typingIndex = 0;
let typingChar = 0;
let isDeleting = false;

const typeWriter = () => {
  if (!typingElement) return;

  const currentPhrase = typingPhrases[typingIndex];
  const displayed = currentPhrase.substring(0, typingChar);
  typingElement.textContent = displayed;

  const speed = isDeleting ? 60 : 110;

  if (!isDeleting && typingChar < currentPhrase.length) {
    typingChar += 1;
    setTimeout(typeWriter, speed);
  } else if (isDeleting && typingChar > 0) {
    typingChar -= 1;
    setTimeout(typeWriter, speed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeWriter, 1500);
    } else {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
      setTimeout(typeWriter, 600);
    }
  }
};

typeWriter();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

const sections = Array.from(links)
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

const updateActiveLink = () => {
  const triggerLine = window.innerHeight * 0.35;
  let activeId = sections[0]?.id;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= triggerLine && rect.bottom > triggerLine) {
      activeId = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.hash === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
updateActiveLink();

const contactForm = document.getElementById('contact-form');
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending your inquiry.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const recipient = 'jamesjabonero09@gmail.com';
  const subject = encodeURIComponent(`OnlineJobs.ph inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
