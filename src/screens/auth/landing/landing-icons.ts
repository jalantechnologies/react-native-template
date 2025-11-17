import BadgeIcon from 'react-native-template/assets/icons/flashon.svg';
import CheckCircleIcon from 'react-native-template/assets/icons/checkcircle.svg';
import ShieldIcon from 'react-native-template/assets/icons/shield.svg';
import TargetIcon from 'react-native-template/assets/icons/target.svg';
import ZapIcon from 'react-native-template/assets/icons/zap.svg';

export const LANDING_ICONS = {
  badge: BadgeIcon,
  flash: ZapIcon,
  hero: CheckCircleIcon,
  shield: ShieldIcon,
  target: TargetIcon,
} as const;

export type LandingIconName = keyof typeof LANDING_ICONS;

