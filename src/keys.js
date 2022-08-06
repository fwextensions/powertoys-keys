import fs from "fs";
import { resolve } from "path";

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
