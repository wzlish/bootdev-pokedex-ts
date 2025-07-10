import { commandHelp } from "./help.js";
import { commandExit } from "./exit.js";
import { commandMap, commandMapBack } from "./map.js";
import { commandExplore } from "./explore.js";
import { commandCatch } from "./catch.js";
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
