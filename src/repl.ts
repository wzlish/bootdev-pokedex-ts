import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { Chalk } from "chalk";

import { getCommands } from "./commands/commands.js";

export function cleanInput(input: string): string[] {
  const lowerTrim = input.toLowerCase().trim();
  return lowerTrim ? lowerTrim.split(/\s+/) : [];
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  const chalk = new Chalk();

  rl.prompt();
  rl.on("line", (input: string) => {
    const cleaned = cleanInput(input);
    if (!cleaned || cleaned.length === 0) {
      rl.prompt();
      return;
    }
    const command = cleaned[0];

    const commands = getCommands();

    if (command in commands) {
      try {
        commands[command].callback(commands);
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    } else {
      console.log(chalk.red(`Unrecognized command: "${command}"`));
      try {
        commands["help"].callback(commands);
      } catch (e) {
        console.log(`Error fetching help: ${e}`);
      }
    }

    rl.prompt();
  });
}
