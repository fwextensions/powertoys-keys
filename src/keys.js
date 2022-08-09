import byCode from "./key-codes.js";

const SettingsKeyDelimiter = ";";
const KeyDelimiter = " ";
const KeyDelimiterPattern = /\s+/;
const UnknownKey = "<Unknown Key>";

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
		.split(KeyDelimiterPattern)
		.map((key) => getCodeFromKey(key))
		.join(SettingsKeyDelimiter);
}
