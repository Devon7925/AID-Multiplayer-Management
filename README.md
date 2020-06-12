# AID-Multiplayer-Management
A system to manage multiplayer scenarios for AI dungeon

## Installation 
Paste the code into the scripting page found at the bottom of the scenario form in AI Dungeon 2.

## Usage
### Rule
Syntax:

-rule ruleName [enable/disable]

The rules are described below)

useTurns enforces turn order when enabled (Default: disabled)

usePin requires that commands be prefixed by the pin when enabled.
This can be used to stop impersonation. (Default: disabled)

disableYou prevents the AI from generating text including mentions of you when enabled (Default: enabled)

disableStory prevents players from using story mode when enabled  (Default: disabled)
### Ban
Syntax:

-ban playerName

This disables that player's ability to do actions. It is a toggle so you can reallow them to do actions later.
### Op
Syntax:

-op playerName

This allows that player to do commands. It is a toggle so you can disable their ability to do commands later.
### State
Syntax:

-state

This shows the current state for debugging purposes. Note that to prevent the pin from being released the rule usePin must be enabled to use this command.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
