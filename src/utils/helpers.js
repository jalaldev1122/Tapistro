export function humanize(s) {
  if (!s) return s;
  const words = s
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(' ');
}

export function findNodeForMessage(nodes = [], msg = '') {
  if (!msg) return null;
  for (let n of nodes) {
    if (msg.includes(n.id)) return n.id;
    const label = n.data?.label || '';
    if (label && msg.includes(label)) return n.id;
  }
  return null;
}
