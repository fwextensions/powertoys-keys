# powertoys-keys

`powertoys-keys` is a simple command line script takes the JSON settings file from the PowerToys [Keyboard Manager](https://docs.microsoft.com/en-us/windows/powertoys/keyboard-manager) utility and converts it to a more usable [YAML](https://yaml.org/) format.  This makes it easier to bulk-edit the list of shortcuts.  It also supports mapping a **single** shortcut to **multiple** apps, without having to recreate that shortcut over and over.


## Usage

`powertoys-keys` requires [Node.js](https://nodejs.org/en/download/) to be installed on your computer.  

Open a Windows Terminal in a directory where you want to store your editable keyboard shortcuts file.  Then run:

```shell
npx powertoys-keys export
```

After you confirm the temporary installation of the script, this will create a `Keyboard Manager Shortcuts.yaml` file in the local directory.  Open this file in your preferred text editor.  The contents will look something like the following (though the list of shortcuts and apps will obviously depend on your existing settings):

```yaml
version: 0
keys:
  inProcess:
    - from: F1
      to: F2
shortcuts:
  global:
    - from: LWin D
      to: <Disable>
      ...
  "chrome, firefox, msedge":
    - from: LCtrl LAlt I
      to: Up
    - from: LCtrl LAlt K
      to: Down
      ...
  notepad:
    - from: LAlt S
      to: LCtrl S
      ...
```


### App lists

The shortcut mappings are grouped by the applications they apply to, under the `shortcuts:` section.  Each list of app-specific mappings starts with the app's process name, followed by a colon, like `notepad:` in the example above.  Mappings in the `global:` list apply to all apps.

#### Multi-app shortcuts

Besides specifying a single app, the app list can be a quoted, comma-delimited list of multiple app names.  In this example, all of the shortcuts in the `"chrome, firefox, msedge":` list apply to Chrome, Firefox and Microsoft Edge:  

```yaml
  "chrome, firefox, msedge":
    - from: LCtrl LAlt I
      to: Up
    - from: LCtrl LAlt K
      to: Down
```

This makes it easy to share a set of shortcuts across many apps, without having to manually recreate them for each app in the *Keyboard Manager* UI.  

Each list name has to be unique, but the same app can appear in multiple lists.  For instance, you could have Chrome-specific shortcuts in a `chrome:` list, in addition to the `"chrome, firefox, msedge":` list.

```yaml
  "chrome, firefox, msedge":
    - from: LCtrl LAlt I
      to: Up
    - from: LCtrl LAlt K
      to: Down
  chrome:
    - from: LWin B
      to: LCtrl LShift O
```

Note that when the YAML file is imported into *Keyboard Manager*, all of the shortcuts in a multi-app list are duplicated, once for each app, since *PowerToys* doesn't natively support this feature.  This means that if you have 20 shortcuts in a list for 10 apps, **200** individual shortcuts will be shown in *Keyboard Manager* UI.  So don't go too crazy with lots of shared shortcuts!


### Shortcut mappings

Each mapping is defined using an object with `from` and `to` fields.  For instance, in the `notepad:` list above, the shortcut <kbd>Alt (Left)</kbd><kbd>S</kbd> is mapped to <kbd>Ctrl (Left)</kbd><kbd>S</kbd>.  Pressing the `from` shortcut triggers the `to` shortcut in the app.  (The `-` before each `from` indicates that the `from/to` object is part of a list.)

Each shortcut is defined by one or more keys, separated by spaces.  The raw key codes used in the *Keyboard Manager* JSON file are mapped to human-readable key names in the YAML file.  [See the full list ](src/key-codes.js) for the available key names.  

Modifiers, like <kbd>alt</kbd> or <kbd>ctrl</kbd>, have names that specify the left modifier key (`LAlt`), the right (`RAlt`) or either (`Alt`).  Key names are currently case-sensitive, so they must be typed exactly as shown in the [list](src/key-codes.js).

Shortcuts that are meant to be disabled can be mapped to a "key" named `<Disable>`.  That will prevent the shortcut from working in the associated app. 


### Applying the new shortcuts

Once you have created the desired list of shortcuts, you must import them into *Keyboard Manager* by running:

```shell
npx powertoys-keys import
```

This converts your YAML file back into the required JSON format, substituting codes for the key names and expanding multi-app shortcuts into individual entries.  

Unfortunately, this won't automatically apply the new settings.  To do that you must open *PowerToys*, then click *Keyboard Manager* in the left column, and then click the *Remap a shortcut* button.  After the *Remap shortcuts* dialog opens, click *OK* to apply the new shortcuts. 

Note that the new JSON file completely replaces the existing settings, which means that if you remove a shortcut in the YAML file, it will also be deleted from *Keyboard Manager* once you run the `import` command.  However, the script backs up the current JSON file as `default-backup.json` in the *Keyboard Manager* settings directory (usually `%LocalAppData%\Microsoft\PowerToys\Keyboard Manager`).  It also creates a `default-original.json` backup the first time it runs, so you can get back to the settings you started with, if necessary.


### International keyboards

This script hasn't been tested at all with international keyboards, so YMMV.


## Command line options

### `--settings-dir`

The script will look for the settings in the default directory for *Keyboard Manager*.  If you've installed *PowerToys* somewhere else, you can specify a path to a different directory with the `--settings-dir` flag:

```shell
npx powertoys-keys export --settings-dir="C:\path\to\PowerToy\Keyboard Manager"
```


### `--yaml-file`

To specify a different name for the YAML file, use the `--yaml-file` flag:

```shell
npx powertoys-keys export --yaml-file="My Shortcuts.yaml"
```

You'll need to specify the same flag when running the `import` command so that the script knows which file to import.
