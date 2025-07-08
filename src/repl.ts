import { createInterface } from "node:readline";
import { Chalk } from "chalk";
import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  const lowerTrim = input.toLowerCase().trim();
  return lowerTrim ? lowerTrim.split(/\s+/) : [];
}

export function startREPL() {
  const state = initState();
  const chalk = new Chalk();

  state.interface.prompt();
  state.interface.on("line", async (input: string) => {
    const cleaned = cleanInput(input);
    if (!cleaned || cleaned.length === 0) {
      state.interface.prompt();
      return;
    }
    const command = cleaned[0];

    const commands = state.commands;

    if (command in commands) {
      try {
        await commands[command].callback(state);
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    } else {
      console.log(chalk.red(`Unrecognized command: "${command}"`));
      try {
        await commands["help"].callback(state);
      } catch (e) {
        console.log(`Error fetching help: ${e}`);
      }
    }

    state.interface.prompt();
  });
}
