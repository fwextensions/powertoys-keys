#!/usr/bin/env node

import fsp from "node:fs/promises";
import fs from "node:fs";
import { resolve } from "node:path";
import { env } from "node:process";
import yaml from "yaml";
import { convertToJSON, convertToYAML } from "./settings.js";

const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
const SettingsFilename = "default.json";
const SettingsPath = resolve(env.LOCALAPPDATA, SettingsDir, SettingsFilename);
const BackupFilename = "backup default.json";
const YamlFilename = "Keyboard Manager Settings.yaml";
const ApplyChangesMessage = 'Now open PowerToys, click "Keyboard Manager", click "Remap a Shortcut", and then click "OK" to apply these changes.';

async function writeYamlSettings()
{
	if (!fs.existsSync(YamlFilename)) {
		const json = await fsp.readFile(SettingsPath, "utf8");
		const kmSettings = JSON.parse(json);
		const yamlSettings = convertToYAML(kmSettings);

		await fsp.writeFile(YamlFilename, yamlSettings);
	}
}

async function writeKMSettings(
	settings)
{
	const json = convertToJSON(settings);
	const settingsDir = resolve(env.LOCALAPPDATA, SettingsDir);
	const settingsPath = resolve(settingsDir, SettingsFilename);
	const backupPath = resolve(settingsDir, BackupFilename);

	await fsp.copyFile(settingsPath, backupPath);
	await fsp.writeFile(settingsPath, json);
	console.log(ApplyChangesMessage);
}

await writeYamlSettings();

const yamlSettings = await fsp.readFile(YamlFilename, "utf8");
const settings = yaml.parse(yamlSettings);

await writeKMSettings(settings);
