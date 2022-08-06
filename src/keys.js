import fs from "node:fs";
import { resolve } from "node:path";

const SettingsKeyDelimiter = ";";
const KeyDelimiter = " ";
const UnknownKey = "<Unknown Key>";

const keysJSON = fs.readFileSync(resolve("src", "keys.json"), "utf8");
const byCode = JSON.parse(keysJSON);
const byKey = Object.fromEntries(
	Object.entries(byCode).map(([code, key]) => [key, code])
);

export function getKeyFromCode(
	code)
{
	return byCode[code] ?? UnknownKey;
}

export function getCodeFromKey(
	key)
{
	return byKey[key] ?? UnknownKey;
}

export function getShortcutFromCodes(
	shortcut)
{
	return shortcut
		.split(SettingsKeyDelimiter)
		.map((code) => getKeyFromCode(code))
		.join(KeyDelimiter);
}

export function getShortcutFromKeys(
	shortcut)
{
	return shortcut
		.split(KeyDelimiter)
		.map((key) => getCodeFromKey(key))
		.join(SettingsKeyDelimiter);
}
