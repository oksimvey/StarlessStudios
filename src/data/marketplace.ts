export interface MarketplaceLink {
  platform: string;
  title: string;
  description: string;
  url: string;
  action: string;
}

export const marketplaceLinks: Record<string, MarketplaceLink> = {
  'camera-system': {
    platform: 'BuiltByBit',
    title: 'Camera System — Lock On & Cutscenes',
    description: 'View the release page, screenshots, product details, updates, and purchase options on BuiltByBit.',
    url: 'https://builtbybit.com/resources/camera-system-lock-on-cutscenes.119761/',
    action: 'View on BuiltByBit',
  },
};
