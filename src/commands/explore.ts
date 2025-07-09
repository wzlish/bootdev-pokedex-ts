import type { State } from "../state.js";
import { HttpError } from "../pokeapi.js";
import { Chalk } from "chalk";

export async function commandExplore(state: State, ...args: string[]) {
  const chalk = new Chalk();

  if (!args || args.length === 0) {
    console.log(
      chalk.yellow(
        "Usage: explore {location}. Use map to view location names!",
      ),
    );
    return;
  }

  const desiredLocation = args[0].toLowerCase();
  let locationData;
  try {
    locationData = await state.PokeAPI.fetchLocation(desiredLocation);
  } catch (e) {
    if (e instanceof HttpError && e.httpCode === 404) {
      console.log(
        chalk.yellow(
          `No results found for  "${desiredLocation}", is that a typo?`,
        ),
      );
      return;
    }
    throw new Error(`Error: ${(e as Error).message}`);
  }

  console.log(`Exploring ${desiredLocation}...`);
  if (locationData.pokemon_encounters.length === 0) {
    console.log("Found no pokemon :(");
    return;
  }
  console.log("Found Pokemon:");
  locationData.pokemon_encounters.forEach((r) =>
    console.log(` - ${r.pokemon.name}`),
  );
}
