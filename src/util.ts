export function cleanPokemonName(name: string) {
  const replaceChars: { [index: string]: string } = {
    é: "e",
    "♂": "m",
    "♀": "f",
    " ": "-",
  };
  return [...name.toLowerCase()].map((ch) => replaceChars[ch] || ch).join("");
}
