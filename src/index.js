import fs from "fs";
import { resolve } from "path";
import { homedir } from "os";
import { env } from "process";
import { parse, stringify } from "yaml";
import { parse as parseSettings } from "./settings.js";

const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";

console.log(homedir());
//console.log(env);
console.log(resolve(env.LOCALAPPDATA, "Microsoft/PowerToys/Keyboard Manager"));

const json = fs.readFileSync(resolve(env.LOCALAPPDATA, SettingsDir, "default.json"), "utf8");
const settings = JSON.parse(json);
//const yaml = fs.readFileSync(resolve("src", "test.yaml"), "utf8");

//console.log(stringify(settings));
//console.log(parse(yaml));
//console.log(JSON.stringify(parseSettings(json), null, 2));

console.log(JSON.stringify(settings, null, 2));
