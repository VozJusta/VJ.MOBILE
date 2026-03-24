import { MaterialIcons } from "@expo/vector-icons";

export type SettingsIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export interface ISettingsSwitchItem {
	id: string;
	type: "switch";
	icon: SettingsIconName;
	label: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
	rightLabel?: string;
}

export interface ISettingsLinkItem {
	id: string;
	type: "link";
	icon: SettingsIconName;
	label: string;
	rightLabel?: string;
	onPress?: () => void;
}

export type ISettingsItem = ISettingsSwitchItem | ISettingsLinkItem;

export interface ISettingsSection {
	id: string;
	title: string;
	items: ISettingsItem[];
}

export interface ISettingsSupportCard {
	title: string;
	description: string;
	onPress?: () => void;
}

export interface ISettingsTemplateProps {
	title: string;
	onBack: () => void;
	sections: ISettingsSection[];
	versionLabel?: string;
	supportCard?: ISettingsSupportCard;
}
