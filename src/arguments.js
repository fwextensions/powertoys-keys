import { resolve } from "node:path";
import { env } from "node:process";
import parseArgs from "minimist";

const Commands = [
	"extract",
	"write"
];
const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
const SettingsDirPath = resolve(env.LOCALAPPDATA, SettingsDir);
const YamlFilename = "Keyboard Manager Settings.yaml";

export default function getArgs(
	argString = process.argv.slice(2))
{
	const { _: [command, ...otherCommands], ...flags } = parseArgs(argString);
	const args = {
		command,
		flags: {}
	};

	if (!command) {
			// default to extracting the settings to YAML
		args.command = Commands[0];
	} else if (otherCommands.length) {
		throw new Error(`Only one command at a time is supported. Found "${[command, ...otherCommands].join(", ")}".`);
	} else if (!Commands.includes(command)) {
		throw new Error(`Found unsupported command: "${command}". Must be one of "${Commands.join(", ")}".`);
	}

	args.flags.settingsDirPath = flags["settings-dir"] || SettingsDirPath;
	args.flags.yamlPath = flags["yaml"] || YamlFilename;

	return args;
}
