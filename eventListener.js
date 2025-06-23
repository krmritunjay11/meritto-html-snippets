document.addEventListener('DOMContentLoaded', function () {
  console.log('BrandFactory Event Listeners Loaded');

  // Generic function to bind click events to elements with data-action
  function bindClickEvents() {
    const clickableElements = document.querySelectorAll('[data-bf-action]');
    clickableElements.forEach((el) => {
      el.addEventListener('click', function () {
        const action = el.getAttribute('data-bf-action');
        console.log(`BrandFactory Action Triggered: ${action}`);

        // Perform different actions based on the data attribute
        switch (action) {
          case 'submit-form':
            submitBrandFactoryForm(el);
            break;
          case 'track-cta':
            trackCTA(el);
            break;
          default:
            console.log(`No handler defined for action: ${action}`);
        }
      });
    });
  }

  // Sample function: form submission
  function submitBrandFactoryForm(el) {
    const formId = el.getAttribute('data-form-id');
    const form = document.getElementById(formId);
    if (form) {
      console.log(`Submitting form with ID: ${formId}`);
      form.submit();
    } else {
      console.warn(`Form not found: ${formId}`);
    }
  }

  // Sample function: click tracking
  function trackCTA(el) {
    const label = el.getAttribute('data-label') || 'Unknown CTA';
    console.log(`Tracking CTA: ${label}`);

    // Example: send tracking event
    // window.dataLayer.push({ event: 'cta_click', label });
  }

  // Initialize all listeners
  bindClickEvents();
});

