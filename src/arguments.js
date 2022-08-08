import parseArgs from "minimist";
import { Commands, DefaultSettingsDirPath, DefaultYamlFilename } from "./constants.js";

const YamlExtensionPattern = /\.yaml$/;

const list = (items) => items.join(", ");

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
		args.command = Commands.Extract;
	} else if (otherCommands.length) {
		throw new Error(`Only one command at a time is supported. Found "${list([command, ...otherCommands])}".`);
	} else if (!Commands.All.includes(command)) {
		throw new Error(`Found unsupported command: "${command}". Must be one of "${list(Commands.All)}".`);
	}

	args.flags.settingsDirPath = flags["settings-dir"] || DefaultSettingsDirPath;
	args.flags.yamlPath = flags["yaml-file"] || DefaultYamlFilename;

	if (!YamlExtensionPattern.test(args.flags.yamlPath)) {
		args.flags.yamlPath += ".yaml";
	}

	return args;
}
