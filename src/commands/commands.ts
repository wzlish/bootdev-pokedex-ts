import { commandHelp } from "./help.js";
import { commandExit } from "./exit.js";
import { commandMap, commandMapBack } from "./map.js";
import type { Commands } from "../state.js";

export function getCommands(): Record<string, Commands> {
  return {
    map: {
      name: "map",
      description: "Browse the next 20 map locations",
      callback: commandMap,
    },
    mapb: {
      name: "map",
      description: "Browse the previous 20 map locations",
      callback: commandMapBack,
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
