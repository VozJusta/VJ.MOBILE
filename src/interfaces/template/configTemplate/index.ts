import { MaterialIcons } from "@expo/vector-icons";

export type SettingsIconName = React.ComponentProps<typeof MaterialIcons>["name"];
export type SettingsSectionVariant = "grouped" | "stacked";
export type SettingsTemplateVariant = "default" | "privacy";
export type SettingsItemVariant = "default" | "danger";

export interface ISettingsSwitchItem {
	id: string;
	type: "switch";
	icon: SettingsIconName;
	label: string;
	description?: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
	rightLabel?: string;
	variant?: SettingsItemVariant;
}

export interface ISettingsLinkItem {
	id: string;
	type: "link";
	icon: SettingsIconName;
	label: string;
	description?: string;
	rightLabel?: string;
	onPress?: () => void;
	variant?: SettingsItemVariant;
}

export interface ISettingsInfoItem {
	id: string;
	type: "info";
	icon: SettingsIconName;
	label: string;
	description?: string;
	variant?: SettingsItemVariant;
}

export type ISettingsItem = ISettingsSwitchItem | ISettingsLinkItem | ISettingsInfoItem;

export interface ISettingsSection {
	id: string;
	title: string;
	variant?: SettingsSectionVariant;
	items: ISettingsItem[];
}

export interface ISettingsSupportCard {
	id?: string;
	icon?: SettingsIconName;
	title: string;
	description: string;
	ctaLabel?: string;
	onPress?: () => void;
}

export interface ISettingsDangerCard {
	id?: string;
	icon?: SettingsIconName;
	title: string;
	description: string;
	buttonLabel: string;
	onPress?: () => void;
}

export interface ISettingsTemplateProps {
	title: string;
	description?: string;
	templateVariant?: SettingsTemplateVariant;
	onBack: () => void;
	sections: ISettingsSection[];
	versionLabel?: string;
	supportCard?: ISettingsSupportCard;
	dangerCard?: ISettingsDangerCard;
}
