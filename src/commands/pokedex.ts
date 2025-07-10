import type { State } from "../state.js";

export async function commandPokedex(state: State) {
  console.log("== Your Pokdex ==");
  if (Object.keys(state.pokedex).length === 0) {
    console.log("Your PokeDeX is empty, use catch {pokemon} to fill it!");
    return;
  }
  for (const pokemon of Object.values(state.pokedex)) {
    console.log(`- ${pokemon.name}`);
  }
}
