import { commandHelp } from "./help.js";
import { commandExit } from "./exit.js";

export type commands = {
  name: string;
  description: string;
  callback: (commands: Record<string, commands>) => void;
};

export function getCommands(): Record<string, commands> {
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
