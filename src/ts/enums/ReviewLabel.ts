export function reviewLabelText(value: number): string {
  const labels: Record<number, string> = {
    1: "Nu mi-a plăcut deloc",
    2: "Nu mi-a plăcut",
    3: "A fost ok",
    4: "Mi-a plăcut",
    5: "Mi-a plăcut foarte mult",
  };
  return labels[value] ?? labels[3];
}
