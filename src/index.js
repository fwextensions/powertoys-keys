import fs from "node:fs";
import { resolve } from "node:path";
import { env } from "node:process";
import yaml from "yaml";
import { convertToJSON, convertToYAML } from "./settings.js";

const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
const SettingsFilename = "default.json";

const json = fs.readFileSync(resolve(env.LOCALAPPDATA, SettingsDir, SettingsFilename), "utf8");
const kmbSettings = JSON.parse(json);
const yamlSettings = convertToYAML(kmbSettings);
const jsonSettings = convertToJSON(yaml.parse(yamlSettings));

console.log(json);
console.log(jsonSettings);

console.log(JSON.stringify(kmbSettings, null, 2));
console.log(yamlSettings);

//fs.writeFileSync("default.json", jsonSettings);
