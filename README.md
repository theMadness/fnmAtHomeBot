# FNM At Home assist bot

This is a simple discord bot meant to be run on repl.it, it exposes a small set of features:

## DM Commands
### Authorization
Except for `!help` all DM commands are tools to manage the FNM Reward Codes, or the log of who was given which code and what time.

Therefore, we restrict the possible users who can issue those commands to users who are assigned to a role listed in the `whitelist.hopperManagementRoles` attribute in `permissions.js`, those roles will be checked against any channel the Bot currently resides in. This means that the Bot is meant to be single server.

### Command List
> `!help` Shows a list of available commands
> 
> `!addCodes AAAAA-AAAAA-AAAAA-AAAAA-AAAAA BBBBB-BBBBB-BBBBB-BBBBB-BBBBB [...]`  
Loads FNM-at-home codes in the database, replacing any previously stored codes.
> 
> `!checkCodes` Displays a list of unused FNM-at-home codes in the database.
> 
> `!checkLogs` Displays a log of which user received which code, and when.

## Channel Commands
### Authorization
Access to channel commands is restricted by attributes in `permissions.js`:
* `whitelist.codeChannels` limits the channels in which the command can be used (by channel name)
* `whitelist.codeRoles` limits the users who can invoke the command by their user role, matched by role name

### Command List
> `!fnmCode @player1 @player2 [...]` Sends a code to each of the tagged players, removing it from the list of available codes, and logging the event.
