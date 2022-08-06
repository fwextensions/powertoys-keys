import fs from "node:fs";
import { resolve } from "node:path";
import { env } from "node:process";
import { Settings } from "./settings.js";

const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
const SettingsFilename = "default.json";

const json = fs.readFileSync(resolve(env.LOCALAPPDATA, SettingsDir, SettingsFilename), "utf8");
const kmbSettings = JSON.parse(json);
const settings = new Settings(kmbSettings);

console.log(JSON.stringify(kmbSettings, null, 2));
console.log(settings.toYAML());
