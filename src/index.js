import fs from "fs";
import { resolve } from "path";
import { homedir } from "os";
import { env } from "process";
import { parse, stringify } from "yaml";


const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";

console.log(homedir());
//console.log(env);
console.log(resolve(env.LOCALAPPDATA, "Microsoft/PowerToys/Keyboard Manager"));

const json = fs.readFileSync(resolve(env.LOCALAPPDATA, SettingsDir, "default.json"), "utf8");
const settings = JSON.parse(json);
const yaml = fs.readFileSync(resolve("src", "test.yaml"), "utf8");

console.log(stringify(settings));
console.log(parse(yaml));

/*
const keys = fs.readFileSync(resolve("src", "keys.txt"), "utf8");
const table = keys
	.split(/\r?\n/)
	.map((row) => {
//	.split("\n").map((row) => {
		let [name, value, desc = ""] = row.split("\t");

		if (!desc) {
console.log(row, "|", value, "|", name);
			[value, name] = [name, value];
//			desc = name;
		}

		let decValue = Number(value);

		return [
			isNaN(decValue)
				? value
				: decValue,
//			decValue,
			name?.replace("VK_", ""),
			desc
		].join("\t");
	})
	.join("\n");

fs.writeFileSync(resolve("src", "key-names.txt"), table);

//console.log(table);
*/

const keyValues = fs.readFileSync(resolve("src", "key-names.txt"), "utf8");
const keyHash = keyValues
	.split(/\r?\n/)
	.reduce((result, row) => {
		const [value, name, desc = ""] = row.split("\t");

		if (value && name) {
			result[value] = name.replace(" key", "");
		}

		return result;
	}, {});

fs.writeFileSync(resolve("src", "keys.json"), JSON.stringify(keyHash, null, "\t"));
