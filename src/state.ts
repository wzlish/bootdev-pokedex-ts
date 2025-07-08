import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands/commands.js";

export type State = {
  interface: Interface;
  commands: Record<string, Commands>;
};

export type Commands = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  return {
    interface: createInterface({
      input: stdin,
      output: stdout,
      prompt: "Pokedex > ",
    }),
    commands: getCommands(),
  };
}
