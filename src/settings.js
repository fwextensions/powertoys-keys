import yaml from "yaml";
import { getShortcutFromCodes, getShortcutFromKeys } from "./keys.js";

function convertToYAMLShortcut({
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

function convertToJSONShortcut({
	from,
	to,
	app})
{
	const shortcut = {
		originalKeys: getShortcutFromKeys(from),
		newRemapKeys: getShortcutFromKeys(to),
	};

	if (app) {
		shortcut.targetApp = app;
	}

	return shortcut;
}

export function convertToYAML(
	settings)
{
	const { remapKeys, remapShortcuts } = settings;
	const yamlSettings = {
		keys: remapKeys,
		shortcuts: {}
	};

	for (const key in remapShortcuts) {
	  yamlSettings.shortcuts[key] = remapShortcuts[key].map(convertToYAMLShortcut)
	}

	return yaml.stringify(yamlSettings);
}

export function convertToJSON(
	settings)
{
	const { keys, shortcuts } = settings;
	const jsonSettings = {
		remapKeys: keys,
		remapShortcuts: {}
	};

	for (const key in shortcuts) {
	  jsonSettings.remapShortcuts[key] = shortcuts[key].map(convertToJSONShortcut)
	}

	return JSON.stringify(jsonSettings);
}
