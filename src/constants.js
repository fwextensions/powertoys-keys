import { resolve } from "node:path";
import { env } from "node:process";

export const Commands = {
  Extract: "extract",
  Write: "write"
};
Commands.All = Object.values(Commands);

export const SettingsDir = "Microsoft/PowerToys/Keyboard Manager";
export const DefaultSettingsDirPath = resolve(env.LOCALAPPDATA, SettingsDir);
export const DefaultYamlFilename = "Keyboard Manager Settings.yaml";
export const SettingsFilename = "default.json";
export const BackupFilename = "backup default.json";
export const ApplyChangesMessage = 'Now open PowerToys, click "Keyboard Manager", click "Remap a Shortcut", and then click "OK" to apply these changes.';
