import { commandHelp } from "./help.js";
import { commandExit } from "./exit.js";
import type { Commands } from "../state.js";

export function getCommands(): Record<string, Commands> {
  return {
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
