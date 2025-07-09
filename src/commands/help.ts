import type { State } from "../state.js";
import chalk from "chalk";

export async function commandHelp(state: State) {
  const commands = state.commands;
  let output = [
    chalk.bold(chalk.magenta(`Welcome to the ${chalk.yellow("PokeDeX")}!`)),
    "",
    "=== Usage ===",
  ];

  for (const [_, command] of Object.entries(commands)) {
    output.push(`${command.name}: ${command.description}`);
  }

  console.log(output.join("\n"));
}
