export function getTrackTextColor(track, { heavy = false } = {}) {
  const offset = (track.letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) % 3;
  if (offset === 0)
    return !heavy ? 'text-orange-300' : 'text-orange-500';
  if (offset === 1)
    return !heavy ? 'text-green-300' : 'text-green-500';
  return !heavy ? 'text-purple-300' : 'text-purple-500';
}


export function getTrackBgColor(track) {
  const offset = (track.letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) % 3;
  if (offset === 0)
    return 'bg-orange-100';
  if (offset === 1)
    return 'bg-green-100';
  return 'bg-purple-100';
}
