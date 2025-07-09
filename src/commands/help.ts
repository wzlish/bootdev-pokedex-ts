import type { State } from "../state.js";

export async function commandHelp(state: State) {
  const commands = state.commands;
  let output = ["Welcome to the Pokedex!", "Usage:", ""];

  for (const [_, command] of Object.entries(commands)) {
    output.push(`${command.name}: ${command.description}`);
  }

  console.log(output.join("\n"));
}
