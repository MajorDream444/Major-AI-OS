(() => {
  const button = document.getElementById('blueprint-checkout');
  const status = document.getElementById('blueprint-status');
  if (!(button instanceof HTMLButtonElement) || !status) return;
  fetch('/api/checkout', { headers: { accept: 'application/json' } }).then(async (response) => {
    const data = await response.json();
    if (!response.ok || !data.available) throw new Error('unavailable');
    button.disabled = false;
    button.textContent = 'Begin secure checkout →';
    status.textContent = 'Stripe checkout is available.';
  }).catch(() => {
    button.textContent = 'Checkout opening soon';
    status.textContent = 'No payment can be started while delivery is not fully configured.';
  });
  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = 'Opening secure checkout…';
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ requestId: crypto.randomUUID() }) });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error('unavailable');
      location.assign(data.url);
    } catch {
      button.disabled = false;
      status.textContent = 'Checkout could not be opened. No payment was created.';
    }
  });
})();
