import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands/commands.js";
import { PokeAPI } from "./pokeapi.js";
import chalk from "chalk";

export type State = {
  interface: Interface;
  PokeAPI: PokeAPI;
  location: locationState;
  commands: Record<string, Commands>;
};

export type Commands = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type locationState = {
  nextLocation: string;
  prevLocation: string;
};

export function initState(): State {
  return {
    interface: createInterface({
      input: stdin,
      output: stdout,
      prompt: `${chalk.yellow("PokeDeX")} ${chalk.blue(">")} `,
    }),
    PokeAPI: new PokeAPI(),
    location: { nextLocation: "", prevLocation: "" },
    commands: getCommands(),
  };
}
