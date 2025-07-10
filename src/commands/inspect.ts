import type { State } from "../state.js";
import { Chalk } from "chalk";
import { cleanPokemonName } from "../util.js";

export async function commandInspect(state: State, ...args: string[]) {
  const chalk = new Chalk();

  if (!args || args.length === 0) {
    console.log(chalk.yellow("Usage: inspect {pokemon}"));
    return;
  }

  const desiredPokemon = cleanPokemonName(args.join(""));
  const pokemonDetails = state.pokedex[desiredPokemon];
  if (!pokemonDetails) {
    console.log(
      chalk.yellow(
        `You don't get have a ${desiredPokemon} yet, use ${chalk.yellowBright(chalk.italic(`catch ${desiredPokemon}`))} to try catching one!`,
      ),
    );
    return;
  }

  console.log(`Name: ${pokemonDetails.name}`);
  console.log(`Height: ${pokemonDetails.height}`);
  console.log(`Weight: ${pokemonDetails.weight}`);
  console.log(`==Stats==`);
  for (const [_, stat] of Object.entries(pokemonDetails.stats)) {
    console.log(` - ${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log(`==Types==`);
  for (const [_, type] of Object.entries(pokemonDetails.types)) {
    console.log(` - ${type.type.name}`);
  }
}
