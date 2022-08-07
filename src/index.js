import fs from "node:fs/promises";
import { resolve } from "node:path";
import { env } from "node:process";
import yaml from "yaml";
import { convertToJSON, convertToYAML } from "./settings.js";

const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
const SettingsFilename = "default.json";
const BackupFilename = "backup default.json";
const YamlFilename = "Keyboard Manager Settings.yaml";

async function writeKMSettings(
	settings)
{
	const json = convertToJSON(settings);
	const settingsDir = resolve(env.LOCALAPPDATA, SettingsDir);
	const settingsPath = resolve(settingsDir, SettingsFilename);
	const backupPath = resolve(settingsDir, BackupFilename);

	await fs.copyFile(settingsPath, backupPath);
	await fs.writeFile(settingsPath, json);
}

//const json = await fs.readFile(resolve(env.LOCALAPPDATA, SettingsDir, SettingsFilename), "utf8");
//const kmbSettings = JSON.parse(json);
//const yamlSettings = convertToYAML(kmbSettings);
//const jsonSettings = convertToJSON(yaml.parse(yamlSettings));

//await fs.writeFile(YamlFilename, yamlSettings);

const yamlSettings = await fs.readFile(YamlFilename, "utf8");
const settings = yaml.parse(yamlSettings);

await writeKMSettings(settings);
console.log('Now open PowerToys, click "Keyboard Manager", click "Remap a Shortcut", and then click "OK" to apply these changes.');
