# powertoys-keys

`powertoys-keys` is a simple command line script takes the JSON settings file from the PowerToys [Keyboard Manager](https://docs.microsoft.com/en-us/windows/powertoys/keyboard-manager) utility and converts it to a more human-readable [YAML](https://yaml.org/) format.  This makes it easier to bulk-edit the list of shortcuts.  It also supports mapping a **single** shortcut to **multiple** apps, without having to recreate that shortcut over and over.


## Usage

`powertoys-keys` requires that [Node.js](https://nodejs.org/en/download/) is installed on your computer.  

Open a Windows Terminal in a directory where you want to store your keyboard shortcuts file.  Then run:

```shell
npx powertoys-keys
```

This will create a `Keyboard Manager Shortcuts.yaml` file in the local directory.  Open this file in your preferred text editor.  The contents will look something like the following (though the list of shortcuts and apps will obviously depend on your existing settings):

```yaml
version: 0
keys:
  inProcess: []
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


### Shortcut mappings

The shortcut mappings are divided into lists, depending on the apps they apply to.  Mappings in the `global` list apply to all apps. 

Each mapping is defined using an object with `from` and `to` fields.  In the `notepad` list, for instance, the shortcut <kbd>Alt (Left)</kbd><kbd>S</kbd> is mapped to <kbd>Ctrl (Left)</kbd><kbd>S</kbd>.  Pressing the `from` shortcut triggers the `to` shortcut in the app.

Each shortcut is defined by one or more keys, separated by spaces.  The raw key codes used in the Keyboard Manager JSON file are mapped to key names in the YAML file.  See the [full list of key names](src/key-codes.js) for the available keys.  Modifiers, like <kbd>alt</kbd> or <kbd>ctrl</kbd>, have names that specify the left modifier key (`LAlt`), the right (`RAlt`) or either (`Alt`).  Key names are currently case-sensitive, so they must be typed exactly as shown in the [list](src/key-codes.js).

Shortcuts that are meant to be disabled can be mapped to a "key" named `<Disable>`.  That will prevent the shortcut from working in the associated app. 

### App lists



### Applying the new shortcuts

creates a backup
open PowerToys, then *Keyboard Manager* in the left column, then *Remap a Shortcut* 
click *OK*.

blank lines are ignored
use # for comments
