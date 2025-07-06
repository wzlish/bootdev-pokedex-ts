import { getCommands } from "./commands.js";

export function commandHelp() {
  const commands = getCommands();
  let output = ["Welcome to the Pokedex!", "Usage:", ""];

  for (const [_, command] of Object.entries(commands)) {
    output.push(`${command.name}: ${command.description}`);
  }

  console.log(output.join("\n"));
}
