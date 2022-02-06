export function onColors(type: string): string {
  switch (type) {
    case 'draft':
      return '#D3DAE4';
    case 'published':
      return '#00C897';
    case 'archived':
      return '#F7971C';
    default:
      return '';
  }
}
