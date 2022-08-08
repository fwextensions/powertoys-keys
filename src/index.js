#!/usr/bin/env node

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "yaml";
import { convertToJSON, convertToYAML } from "./settings.js";
import getArgs from "./arguments.js";

const SettingsFilename = "default.json";
const BackupFilename = "backup default.json";
const ApplyChangesMessage = 'Now open PowerToys, click "Keyboard Manager", click "Remap a Shortcut", and then click "OK" to apply these changes.';

async function writeYamlSettings(
	settingsDirPath,
	yamlPath)
{
	if (!existsSync(yamlPath)) {
		const json = await fs.readFile(resolve(settingsDirPath, SettingsFilename), "utf8");
		const kmSettings = JSON.parse(json);
		const yamlSettings = convertToYAML(kmSettings);

		await fs.writeFile(yamlPath, yamlSettings);
	}
}

async function writeKMSettings(
	settingsDirPath,
	yamlPath)
{
	const yamlSettings = await fs.readFile(yamlPath, "utf8");
	const settings = yaml.parse(yamlSettings);
	const json = convertToJSON(settings);
	const settingsPath = resolve(settingsDirPath, SettingsFilename);
	const backupPath = resolve(settingsDirPath, BackupFilename);

	await fs.copyFile(settingsPath, backupPath);
	await fs.writeFile(settingsPath, json);
	console.log(ApplyChangesMessage);
}

try {
	const { command, flags } = getArgs();

	switch (command) {
		case "extract":
			await writeYamlSettings(flags.settingsDirPath, flags.yamlPath);
			break;

		case "write":
			await writeKMSettings(flags.settingsDirPath, flags.yamlPath);
			break;
	}
} catch (e) {
	console.error(e.message);
	process.exit(1);
}
