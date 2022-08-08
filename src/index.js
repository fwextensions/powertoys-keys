#!/usr/bin/env node

import getArgs from "./arguments.js";
import { Commands } from "./constants.js";
import { writeYamlSettings, writeKMSettings } from "./settings-file.js";

try {
	const { command, flags } = getArgs();

	switch (command) {
		case Commands.Extract:
			await writeYamlSettings(flags);
			break;

		case Commands.Write:
			await writeKMSettings(flags);
			break;
	}
} catch (e) {
	console.error(e.message);
	process.exit(1);
}
