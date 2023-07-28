import { Anchor } from './anchor';

export type LinkInfo = {
  anchor: Omit<Anchor, 'actived'>;
  offsetTop: number;
};

export function getLinkInfo(
  linkInfoList: LinkInfo[],
  anchorValue: Anchor['value'],
): LinkInfo | null {
  return linkInfoList.find((linkInfo) => linkInfo.anchor.value === anchorValue) ?? null;
}

export function getNextLinkInfo(linkInfoList: LinkInfo[], linkInfo: LinkInfo): LinkInfo | null {
  const index = linkInfoList.findIndex((item) => item.anchor.value === linkInfo.anchor.value);
  if (index + 1 <= linkInfoList.length) {
    return linkInfoList[index + 1];
  }
  return null;
}
