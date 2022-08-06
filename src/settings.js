import yaml from "yaml";
import { getShortcutFromCodes } from "./keys.js";

export class Settings {
	constructor(kmbSettings)
	{
		const { remapShortcuts } = kmbSettings;
		const allShortcuts = Object.values(remapShortcuts).flat();

		this.kmbSettings = kmbSettings;
		this.shortcuts = allShortcuts.map(this.processShortcut);
	}

	processShortcut({
		originalKeys,
		newRemapKeys,
		targetApp})
	{
		const shortcut = {
			from: getShortcutFromCodes(originalKeys),
			to: getShortcutFromCodes(newRemapKeys),
		};

		if (targetApp) {
			shortcut.app = targetApp;
		}

		return shortcut;
	}

	toYAML()
	{
		return yaml.stringify({ shortcuts: this.shortcuts });
	}
}
