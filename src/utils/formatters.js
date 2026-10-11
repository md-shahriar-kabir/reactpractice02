export function formatCurrency(amount, withDecimals = false) {
  const num = Number(amount) || 0;
  if (withDecimals) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
}

export function cleanDomain(url) {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  // Remove trailing slash if no path
  if (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

export function ensureProtocol(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  try {
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    // Must have hostname with at least one dot and a TLD with at least 2 chars
    return Boolean(
      parsed.hostname &&
      parsed.hostname.includes('.') &&
      parsed.hostname.split('.').pop().length >= 2
    );
  } catch {
    return false;
  }
}

export function getCategoryStyles(category) {
  switch (category) {
    case 'Web Development':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'Mobile App':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    case 'UI/UX Design':
      return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    case 'Cloud / DevOps':
      return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
    case 'AI & ML':
    case 'AI & Machine Learning':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
    case 'Branding & Growth':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  }
}
