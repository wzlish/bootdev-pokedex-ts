import { getCommands } from "./commands.js";
import type { State } from "../state.js";
import { Chalk } from "chalk";

function getPaginationInfo(
  currentURL: string,
  count: number,
  limit: number = 20,
): string {
  let offset = 0;
  if (currentURL && currentURL != "") {
    const url = new URL(currentURL);
    offset = parseInt(url.searchParams.get("offset") || "0");
  }
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);
  const chalk = new Chalk();
  return `Page ${chalk.blue(currentPage)} of ${chalk.blue(totalPages)}`;
}

export async function commandMap(state: State) {
  const locationsData = await state.PokeAPI.fetchLocations(
    state.location.nextLocation,
  );
  const pageInfo = getPaginationInfo(
    state.location.nextLocation,
    locationsData.count,
  );

  state.location.nextLocation = locationsData.next ? locationsData.next : "";
  state.location.prevLocation = locationsData.previous
    ? locationsData.previous
    : "";

  console.log(pageInfo);
  locationsData.results.forEach((r) => console.log(` - ${r.name}`));
  console.log(pageInfo);
}

export async function commandMapBack(state: State) {
  const locationsData = await state.PokeAPI.fetchLocations(
    state.location.prevLocation,
  );
  const pageInfo = getPaginationInfo(
    state.location.prevLocation,
    locationsData.count,
  );

  state.location.nextLocation = locationsData.next ? locationsData.next : "";
  state.location.prevLocation = locationsData.previous
    ? locationsData.previous
    : "";
  console.log(pageInfo);
  locationsData.results.forEach((r) => console.log(` - ${r.name}`));
  console.log(pageInfo);
}
