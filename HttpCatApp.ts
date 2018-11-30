import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
  } from '@rocket.chat/apps-engine/definition/accessors';
  import { App } from '@rocket.chat/apps-engine/definition/App';
  import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
  import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
  
  import { HTTPCatCommand } from './commands/HTTPCatCommand';
  
  export class HTTPCatApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
      super(info, logger);
    }
  
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
      await configuration.settings.provideSetting({
        id: 'httpcat_name',
        type: SettingType.STRING,
        packageValue: 'httpcat',
        required: true,
        public: false,
        i18nLabel: 'Customize_Name',
        i18nDescription: 'Customize_Name_Description',
      });
  
      await configuration.settings.provideSetting({
        id: 'httpcat_icon',
        type: SettingType.STRING,
        packageValue: 'https://raw.githubusercontent.com/tgardner851/Rocket.Chat.App-httpcat/master/icon.jpg',
        required: true,
        public: false,
        i18nLabel: 'Customize_Icon',
        i18nDescription: 'Customize_Icon_Description',
      });
  
      await configuration.slashCommands.provideSlashCommand(new HTTPCatCommand());
    }
  }
  