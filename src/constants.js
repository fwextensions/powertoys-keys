import { resolve } from "node:path";
import { env } from "node:process";

export const Commands = {
  Extract: "export",
  Write: "import"
};
Commands.All = Object.values(Commands);

export const Messages = {
	ApplyChanges: 'Now open PowerToys, click "Keyboard Manager", click "Remap a shortcut", and then click "OK" to apply these changes.',
	ExportedYaml: (yamlPath) => `Exported Keyboard Manager settings to "${yamlPath}".`,
};

export const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
export const DefaultSettingsDirPath = resolve(env.LOCALAPPDATA, SettingsDir);
export const DefaultYamlFilename = "Keyboard Manager Settings.yaml";
export const SettingsFilename = "default.json";
export const BackupFilename = "default - backup.json";
export const OriginalBackupFilename = "default - original.json";
