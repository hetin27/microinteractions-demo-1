class CircleMenu {
  constructor() {
    this.circularMenu = document.getElementById('circularMenu');
    this.floatingBtn = this.circularMenu.querySelector('.floating-btn');
    this.itemsWrapper = this.circularMenu.querySelector('.items-wrapper');
    this.menuItems = this.circularMenu.querySelectorAll('.menu-item');
    
    this.isActive = false;
    this.autoCloseTimeout = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMenuItems();
  }

  setupEventListeners() {
    // Main button click
    this.floatingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.circularMenu.contains(e.target)) {
        this.close();
      }
    });

    // Prevent menu from closing when clicking on items wrapper
    this.itemsWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Auto-close functionality (optional)
    this.itemsWrapper.addEventListener('mouseenter', () => {
      this.clearAutoCloseTimeout();
    });

    this.itemsWrapper.addEventListener('mouseleave', () => {
      this.startAutoCloseTimeout();
    });
  }

  setupMenuItems() {
    this.menuItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        // Add click animation or additional functionality here
        console.log(`Menu item ${index + 1} clicked`);
        
        // Optional: Close menu after item click
        setTimeout(() => {
          this.close();
        }, 200);
      });
    });
  }

  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isActive = true;
    this.circularMenu.classList.add('active');
    this.startAutoCloseTimeout(3000); // Auto-close after 3 seconds
  }

  close() {
    this.isActive = false;
    this.circularMenu.classList.remove('active');
    this.clearAutoCloseTimeout();
  }

  startAutoCloseTimeout(delay = 3000) {
    this.clearAutoCloseTimeout();
    this.autoCloseTimeout = setTimeout(() => {
      this.close();
    }, delay);
  }

  clearAutoCloseTimeout() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }
}

// Initialize the circular menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CircleMenu();
});

// Alternative: Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CircleMenu();
  });
} else {
  new CircleMenu();
}
