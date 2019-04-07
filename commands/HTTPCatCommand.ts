import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class HTTPCatCommand implements ISlashCommand {
    public command: string = 'httpcat';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('httpcat_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('httpcat_name');

        const codes = [100, 101, 200, 201, 202, 204, 206, 207, 300, 301, 303, 304, 305, 307, 400, 401, 402, 403, 404,
          405, 406, 408, 409, 410, 411, 413, 414, 416, 417, 418, 422, 423, 424, 425, 426, 429, 431, 444, 450, 500,
          502, 503, 506, 507, 508, 509, 599];
        const httpCatUrl = 'https://http.cat/';

        let result;
        let successful = false; // Way to be pessimistic

        if (context.getArguments().length === 1) {
          // Has a code
          const code = parseInt(context.getArguments()[0], undefined);
          if (isNaN(code)) {
            // Code invalid as number
            result = 'Code was not a number!';
          } else {
            // Code valid as a number
            if (codes.indexOf(code) <= -1) {
              // Code wasn't valid for list
              result = 'That code is not a valid HTTP Status Code!';
            } else {
              // Code was valid for list
              successful = true;
              const url = httpCatUrl + code + '.jpg';
              result = url;
            }
          }
        } else if (context.getArguments().length > 1) {
          // Has too many codes
          result = 'Please enter only one code.';
        } else {
          // Does not have a code
          result = 'You must enter a code!';
        }

        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText(result).setUsernameAlias(username).setAvatarUrl(icon);

        if (successful === true) {
          // Respond in room
          await modify.getCreator().finish(builder);
        } else {
          // Respond back to user directly
          await modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
        }

        return;
    }
}
