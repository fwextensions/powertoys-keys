import yaml from "yaml";
import { getShortcutFromCodes, getShortcutFromKeys } from "./keys.js";

const Version = 0;
const AppDelimiterPattern = /\s*,\s*/;

const appList = (apps) => apps.join(", ");

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

function convertToJSONShortcut(
	{ from, to },
	app)
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
	const { remapKeys, remapShortcuts: { global, appSpecific } } = settings;
	const yamlSettings = {
		version: Version,
		keys: remapKeys,
		shortcuts: {
			global: global.map(convertToYAMLShortcut)
		},
	};
	const appsByMapping = {};
	const mappingsByApps = {};

	appSpecific.forEach((shortcut) => {
		const { from, to, app } = convertToYAMLShortcut(shortcut);
		const mapping = `${from}|${to}`;
		const apps = appsByMapping[mapping] || [];

		appsByMapping[mapping] = [...apps, app].sort();
	});

	for (const mapping in appsByMapping) {
	  const apps = appList(appsByMapping[mapping]);
		const mappings = mappingsByApps[apps] || [];

		mappingsByApps[apps] = [...mappings, mapping].sort();
	}

	for (const apps in mappingsByApps) {
	  yamlSettings.shortcuts[apps] = mappingsByApps[apps].map((mapping) => {
			const [from, to] = mapping.split("|");

			return { from, to };
		});
	}

	return yaml.stringify(yamlSettings);
}

export function convertToJSON(
	settings)
{
	const { keys, shortcuts: { global, ...appShortcuts} } = settings;
	const jsonSettings = {
		remapKeys: keys,
		remapShortcuts: {
			global: global.map((shortcut) => convertToJSONShortcut(shortcut)),
			appSpecific: []
		}
	};
	const { appSpecific } = jsonSettings.remapShortcuts;

		// each key on appShortcuts is an array of shortcuts shared across one or
		// more apps
	for (const [apps, shortcuts] of Object.entries(appShortcuts)) {
			// make sure there's an array of shortcuts, in case the user moved them to
			// another app and left this one empty
		if (shortcuts?.length) {
			apps.split(AppDelimiterPattern).forEach(app => {
					// convert each shortcut back into the KBM format with the appropriate
					// targetApp name, and add it to the list of app-specific shortcuts
				appSpecific.push(
					...shortcuts.map((shortcut) => convertToJSONShortcut(shortcut, app))
				);
			});
		}
	}

	return JSON.stringify(jsonSettings);
}
