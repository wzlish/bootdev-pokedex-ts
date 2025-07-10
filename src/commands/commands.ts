import { commandHelp } from "./help.js";
import { commandExit } from "./exit.js";
import { commandMap, commandMapBack } from "./map.js";
import { commandExplore } from "./explore.js";
import { commandCatch } from "./catch.js";
import { commandInspect } from "./inspect.js";
import { commandPokedex } from "./pokedex.js";
import type { Commands } from "../state.js";

export function getCommands(): Record<string, Commands> {
  return {
    map: {
      name: "map",
      description: "Browse the next 20 map locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Browse the previous 20 map locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location>",
      description: "Explore the given location looking for pokemon!",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon>",
      description: "Attempt to catch the target pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon>",
      description: "Lookup the stats for a pokemon you've caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all the pokemon you've caught",
      callback: commandPokedex,
    },
    help: {
      name: "help",
      description: "Displays this help text",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
