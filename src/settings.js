import yaml from "yaml";
import { getCodeFromKey, getKeyFromCode } from "./keys.js";

const SettingsKeyDelimiter = ";";
const KeyDelimiter = " ";

function convertToKeys(
	shortcut)
{
	return shortcut
		.split(SettingsKeyDelimiter)
		.map((code) => getKeyFromCode(code))
		.join(KeyDelimiter);
}

function convertToCodes(
	shortcut)
{
	return shortcut
		.split(KeyDelimiter)
		.map((key) => getCodeFromKey(key))
		.join(SettingsKeyDelimiter);
}

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
			from: convertToKeys(originalKeys),
			to: convertToKeys(newRemapKeys),
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
