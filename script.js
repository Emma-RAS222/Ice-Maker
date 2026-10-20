const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Toggle navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('.order-link').forEach(link => {
  link.addEventListener('click', () => {
    const quantity = document.querySelector('#order-quantity');
    if (quantity) quantity.value = link.dataset.product;
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#order-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const contact = form.get('contact').trim();
  const quantity = form.get('quantity');
  const notes = form.get('notes').trim() || 'No additional details provided.';
  const subject = encodeURIComponent(`Tube ice order inquiry — ${quantity}`);
  const body = encodeURIComponent(
    `Hello IDEA Ice Tube Maker,\\n\\nI'd like to inquire about an order.\\n\\nName: ${name}\\nContact number: ${contact}\\nQuantity: ${quantity}\\nPickup / delivery details: ${notes}\\n\\nPlease confirm availability and total price. Thank you!`
  );
  document.querySelector('#form-status').textContent = 'Opening your email app with your inquiry…';
  // Replace this demo email with your real business email in index.html and below.
  window.location.href = `mailto:hello@ideaice.example?subject=${subject}&body=${body}`;
});
