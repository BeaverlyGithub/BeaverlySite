/**
 * Interactive Flow Demo
 * Shows the complete Chilla flow from broker connection to Flow activation
 * Mock/dummy data only - no real backend calls
 */

class InteractiveFlowDemo {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6; // Connect, Behavior, Playgrounds, Comfort, Consent, Flow
    this.selectedBehavior = null;
    this.selectedPlaygrounds = [];
    this.comfortLevel = 50;
    this.consentAccepted = false;
    this.flowMessages = [];
    this.flowMessageIndex = 0;
    this.flowInterval = null;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.showStep(1);
    
    // Initialize pre-selected playgrounds in step 3
    this.selectedPlaygrounds = ['EURUSD', 'XAUUSD'];
  }
  
  setupEventListeners() {
    // Connect broker button
    document.addEventListener('click', (e) => {
      if (e.target.id === 'demo-connect-broker') {
        this.connectBroker();
      }
      
      // Continue buttons (all have same class)
      if (e.target.classList.contains('demo-continue-btn')) {
        this.nextStep();
      }
      
      // Activate button
      if (e.target.id === 'demo-activate-btn') {
        this.activate();
      }
      
      // Restart button
      if (e.target.id === 'restart-demo-btn') {
        this.restart();
      }
      
      // Behavior selection
      if (e.target.closest('.behavior-option')) {
        const option = e.target.closest('.behavior-option');
        this.selectBehavior(option.dataset.behavior);
      }
      
      // Playground selection
      if (e.target.closest('.playground-item')) {
        const item = e.target.closest('.playground-item');
        this.togglePlayground(item.dataset.playground);
      }
      
      // Consent checkbox
      if (e.target.id === 'demo-consent-checkbox' || e.target.closest('#demo-consent-checkbox')) {
        this.toggleConsent();
      }
    });
    
    // Comfort slider
    document.addEventListener('input', (e) => {
      if (e.target.id === 'demo-comfort-slider') {
        this.updateComfortLevel(e.target.value);
      }
    });
  }
  
  showStep(stepNumber) {
    this.currentStep = stepNumber;
    
    // Hide all cards
    document.querySelectorAll('.demo-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Show current card
    const currentCard = document.getElementById(`demo-step-${stepNumber}`);
    if (currentCard) {
      currentCard.classList.add('active');
    }
    
    // Update progress dots
    this.updateProgress();
  }
  
  updateProgress() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
      dot.classList.remove('active', 'completed');
      if (index + 1 === this.currentStep) {
        dot.classList.add('active');
      } else if (index + 1 < this.currentStep) {
        dot.classList.add('completed');
      }
    });
  }
  
  connectBroker() {
    const statusText = document.getElementById('broker-status-text');
    const connectBtn = document.getElementById('demo-connect-broker');
    
    // Show connecting...
    statusText.textContent = 'Connecting...';
    connectBtn.disabled = true;
    
    // Simulate connection delay
    setTimeout(() => {
      statusText.innerHTML = '<span class="broker-status-text connected">Connected ✓</span>';
      statusText.classList.add('connected');
      
      // Add status badge
      const brokerStatus = document.querySelector('.broker-status');
      const badge = document.createElement('div');
      badge.className = 'status-badge';
      badge.innerHTML = '<span class="status-dot"></span>Environment ready';
      
      // Replace button with badge
      connectBtn.replaceWith(badge);
      
      // Enable continue after short delay
      setTimeout(() => {
        const continueBtn = document.getElementById('demo-continue-btn-1');
        if (continueBtn) {
          continueBtn.disabled = false;
        }
      }, 500);
    }, 1200);
  }
  
  selectBehavior(behaviorName) {
    this.selectedBehavior = behaviorName;
    
    // Update UI
    document.querySelectorAll('.behavior-option').forEach(option => {
      option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-behavior="${behaviorName}"]`);
    if (selectedOption) {
      selectedOption.classList.add('selected');
    }
    
    // Enable continue button
    const continueBtn = document.getElementById('demo-continue-btn-2');
    if (continueBtn) {
      continueBtn.disabled = false;
    }
  }
  
  togglePlayground(playground) {
    const index = this.selectedPlaygrounds.indexOf(playground);
    
    if (index > -1) {
      this.selectedPlaygrounds.splice(index, 1);
    } else {
      this.selectedPlaygrounds.push(playground);
    }
    
    // Update UI
    const playgroundEl = document.querySelector(`[data-playground="${playground}"]`);
    if (playgroundEl) {
      playgroundEl.classList.toggle('selected');
      const checkmark = playgroundEl.querySelector('.checkmark');
      if (checkmark) {
        checkmark.textContent = playgroundEl.classList.contains('selected') ? '✓' : '';
      }
    }
    
    // Enable continue if at least one selected
    const continueBtn = document.getElementById('demo-continue-btn-3');
    if (continueBtn) {
      continueBtn.disabled = this.selectedPlaygrounds.length === 0;
    }
  }
  
  updateComfortLevel(value) {
    this.comfortLevel = parseInt(value);
    
    const valueDisplay = document.getElementById('comfort-value');
    const subtextDisplay = document.getElementById('comfort-subtext');
    
    if (valueDisplay && subtextDisplay) {
      let label = 'Balanced';
      let description = 'Moderate exposure';
      
      if (this.comfortLevel <= 30) {
        label = 'Deep Sleep';
        description = 'Minimal exposure';
      } else if (this.comfortLevel >= 70) {
        label = 'No Sleep';
        description = 'Higher exposure';
      }
      
      valueDisplay.textContent = label;
      subtextDisplay.textContent = description;
    }
  }
  
  toggleConsent() {
    this.consentAccepted = !this.consentAccepted;
    
    const checkbox = document.getElementById('demo-consent-checkbox');
    if (checkbox) {
      checkbox.classList.toggle('checked');
      checkbox.textContent = this.consentAccepted ? '✓' : '';
    }
    
    // Enable activate button
    const activateBtn = document.getElementById('demo-activate-btn');
    if (activateBtn) {
      activateBtn.disabled = !this.consentAccepted;
    }
  }
  
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.showStep(this.currentStep + 1);
    }
  }
  
  activate() {
    // Move to Flow step
    this.showStep(6);
    
    // Start showing Flow messages
    this.startFlowSimulation();
  }
  
  startFlowSimulation() {
    // Flow messages to display (use app icon keys, rendered as SVGs)
    this.flowMessages = [
      { type: 'success', icon: 'check', text: 'Instruction accepted', meta: 'Just now' },
      { type: 'info', icon: 'bolt', text: 'Behavior initialized', meta: 'Momentum Follow active' },
      { type: 'info', icon: 'globe', text: 'Environment: EURUSD', meta: 'Monitoring conditions...' },
      { type: 'monitoring', icon: 'eye', text: 'Monitoring conditions...', meta: 'Waiting for clarity' },
      { type: 'info', icon: 'chart', text: 'No action required', meta: 'Conditions not met' },
      { type: 'success', icon: 'check', text: 'Conditions met', meta: 'Signal detected' },
      { type: 'success', icon: 'target', text: 'Position activated', meta: 'EURUSD Long' },
      { type: 'monitoring', icon: 'eye', text: 'Monitoring...', meta: 'Position active' },
      { type: 'success', icon: 'check', text: 'Position closed', meta: 'Exit conditions met' },
      { type: 'info', icon: 'pause', text: 'Instruction complete', meta: 'Awaiting next opportunity' }
    ];
    
    this.flowMessageIndex = 0;
    
    // Add messages gradually
    this.flowInterval = setInterval(() => {
      if (this.flowMessageIndex < this.flowMessages.length) {
        this.addFlowMessage(this.flowMessages[this.flowMessageIndex]);
        this.flowMessageIndex++;
      } else {
        clearInterval(this.flowInterval);
      }
    }, 1200); // 1.2 seconds between each message (as recommended)
  }
  
  addFlowMessage(message) {
    const messagesContainer = document.getElementById('flow-messages-container');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = 'flow-message';
    messageEl.innerHTML = `
      <div class="flow-icon ${message.type}">
        ${this.getIconSVG(message.icon)}
      </div>
      <div class="flow-content">
        <div class="flow-message-text">${message.text}</div>
        <div class="flow-message-meta">${message.meta}</div>
      </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  getIconSVG(name) {
    switch (name) {
      case 'check':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'bolt':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'globe':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20M12 2c2 3 2 7 2 10s0 7-2 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'eye':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`;
      case 'chart':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="7" y="12" width="2" height="6" fill="currentColor"/><rect x="11" y="8" width="2" height="10" fill="currentColor"/><rect x="15" y="4" width="2" height="14" fill="currentColor"/></svg>`;
      case 'target':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`;
      case 'pause':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="3" height="14" fill="currentColor"/><rect x="15" y="5" width="3" height="14" fill="currentColor"/></svg>`;
      default:
        return '';
    }
  }
  
  restart() {
    // Clear flow interval if running
    if (this.flowInterval) {
      clearInterval(this.flowInterval);
    }
    
    // Reset state
    this.currentStep = 1;
    this.selectedBehavior = null;
    this.selectedPlaygrounds = [];
    this.comfortLevel = 50;
    this.consentAccepted = false;
    this.flowMessages = [];
    this.flowMessageIndex = 0;
    
    // Reset UI elements
    document.querySelectorAll('.behavior-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.playground-item').forEach(el => el.classList.remove('selected'));
    
    const checkbox = document.getElementById('demo-consent-checkbox');
    if (checkbox) {
      checkbox.classList.remove('checked');
      checkbox.textContent = '';
    }
    
    const flowContainer = document.getElementById('flow-messages-container');
    if (flowContainer) {
      flowContainer.innerHTML = '';
    }
    
    // Reset broker connection UI
    const brokerStatusText = document.getElementById('broker-status-text');
    if (brokerStatusText) {
      brokerStatusText.innerHTML = '<span class="broker-status-text">Not Connected</span>';
      brokerStatusText.classList.remove('connected');
    }
    
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
      const connectBtn = document.createElement('button');
      connectBtn.id = 'demo-connect-broker';
      connectBtn.className = 'demo-btn demo-btn-primary';
      connectBtn.textContent = 'Connect';
      statusBadge.replaceWith(connectBtn);
      
      // Re-attach event listener
      connectBtn.addEventListener('click', () => {
        this.connectBroker();
      });
    }
    
    // Show first step
    this.showStep(1);
  }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const demoSection = document.getElementById('interactive-flow-demo');
  if (demoSection) {
    new InteractiveFlowDemo();
  }
});
