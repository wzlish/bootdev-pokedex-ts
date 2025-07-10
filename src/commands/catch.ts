import type { State } from "../state.js";
import { HttpError } from "../pokeapi.js";
import { Chalk } from "chalk";
import { cleanPokemonName } from "../util.js";

export async function commandCatch(state: State, ...args: string[]) {
  const chalk = new Chalk();

  if (!args || args.length === 0) {
    console.log(chalk.yellow("Usage: catch {pokemon}"));
    return;
  }

  const desiredPokemon = cleanPokemonName(args.join(""));

  let pokemonDetails;
  try {
    pokemonDetails = await state.PokeAPI.fetchPokemon(desiredPokemon);
  } catch (e) {
    if (e instanceof HttpError && e.httpCode === 404) {
      console.log(
        chalk.yellow(
          `No results found for  "${desiredPokemon}", is that a typo?`,
        ),
      );
      return;
    }
    throw new Error(`Error: ${(e as Error).message}`);
  }
  console.log(`Throwing a Pokeball at ${pokemonDetails.species.name}...`);

  let chance = Math.ceil(2 * pokemonDetails.base_experience) / 70;
  if (chance < 2) {
    chance = 2;
  }
  console.log(
    `${(100 / chance).toFixed(2)}% chance to catch ${pokemonDetails.species.name}`,
  );
  if (Math.floor(Math.random() * chance) == 0) {
    if (state.pokedex[pokemonDetails.species.name]) {
      console.log(
        chalk.yellow(
          `${pokemonDetails.species.name} was caught, but as you already have one, you release it.`,
        ),
      );
      return;
    }
    console.log(chalk.cyan(`${pokemonDetails.species.name} was caught!`));
    state.pokedex[pokemonDetails.species.name] = pokemonDetails;
    console.log(
      chalk.yellow(
        `You've added ${pokemonDetails.species.name} to your PokeDeX`,
      ),
    );
  } else {
    console.log(chalk.red(`${pokemonDetails.species.name} escaped!`));
  }
}
