import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "yaml";
import { convertToJSON, convertToYAML } from "./settings.js";
import { SettingsFilename, BackupFilename, Messages } from "./constants.js";

export async function writeYamlSettings({
	settingsDirPath,
	yamlPath})
{
	if (!existsSync(yamlPath)) {
		const json = await fs.readFile(resolve(settingsDirPath, SettingsFilename), "utf8");
		const kmSettings = JSON.parse(json);
		const yamlSettings = convertToYAML(kmSettings);

		await fs.writeFile(yamlPath, yamlSettings);
		console.log(Messages.ExportedYaml(yamlPath));
	}
}

export async function writeKMSettings({
	settingsDirPath,
	yamlPath})
{
	const yamlSettings = await fs.readFile(yamlPath, "utf8");
	const settings = yaml.parse(yamlSettings);
	const json = convertToJSON(settings);
	const settingsPath = resolve(settingsDirPath, SettingsFilename);
	const backupPath = resolve(settingsDirPath, BackupFilename);

	await fs.copyFile(settingsPath, backupPath);
	await fs.writeFile(settingsPath, json);
	console.log(Messages.ApplyChanges);
}
