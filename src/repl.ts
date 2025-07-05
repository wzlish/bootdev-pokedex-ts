export function cleanInput(input: string): string[] {
  const lowerTrim = input.toLowerCase().trim();
  return lowerTrim ? lowerTrim.split(/\s+/) : [];
}
