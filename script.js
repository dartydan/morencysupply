// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopNav = document.getElementById('desktop-nav');
  const nav = document.querySelector('nav');

  // Show/hide desktop nav based on screen size
  function handleResize() {
    if (!desktopNav || !mobileMenuBtn) return;
    
    if (window.innerWidth >= 768) {
      desktopNav.classList.remove('hidden');
      desktopNav.classList.add('md:flex');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.add('md:hidden');
      }
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
      document.body.style.overflow = '';
    } else {
      desktopNav.classList.add('hidden');
      desktopNav.classList.remove('md:flex');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('md:hidden');
      }
    }
  }

  // Initial check
  handleResize();
  window.addEventListener('resize', handleResize);

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu when clicking on a link
  if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target && nav) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll effect to navigation
  if (nav) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('shadow-sm');
      } else {
        nav.classList.remove('shadow-sm');
      }
    });
  }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.classList.remove('hidden');
    
    if (type === 'success') {
      formMessage.style.backgroundColor = 'oklch(0.8 0.1 150)';
      formMessage.style.color = 'oklch(0.2 0.05 150)';
      formMessage.style.border = '1px solid oklch(0.7 0.1 150)';
    } else {
      formMessage.style.backgroundColor = 'oklch(0.95 0.05 25)';
      formMessage.style.color = 'oklch(0.3 0.1 25)';
      formMessage.style.border = '1px solid oklch(0.8 0.1 25)';
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.add('hidden');
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission (in production, this would send to a server)
      showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
      contactForm.reset();
      
      // In a real application, you would send the data to your server here
      console.log('Form data:', data);
    });
  }
});

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  const cards = document.querySelectorAll('[class*="bg-card"]');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  // Check for saved theme preference or default to light mode
  function getThemePreference() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Apply theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    localStorage.setItem('theme', theme);
    updateThemeIcons();
  }

  // Update icon visibility
  function updateThemeIcons() {
    const isDark = html.classList.contains('dark');
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    sunIcons.forEach(icon => {
      icon.style.display = isDark ? 'none' : 'block';
    });
    
    moonIcons.forEach(icon => {
      icon.style.display = isDark ? 'block' : 'none';
    });
  }

  // Toggle theme with animation
  function toggleTheme(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const iconWrapper = event.currentTarget.querySelector('.theme-icon-wrapper');
    
    if (!iconWrapper) return;
    
    // Add animation class
    iconWrapper.classList.add('animating');
    
    // Toggle theme
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    
    // Remove animation class after animation completes
    setTimeout(() => {
      iconWrapper.classList.remove('animating');
    }, 600);
  }

  // Initialize theme on page load
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);

  // Add event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
});

