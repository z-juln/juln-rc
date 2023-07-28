export interface Anchor {
  label: string;
  value: string;
  actived?: boolean;
}

export function getActivedAnchors(anchors: Anchor[]): Anchor[] {
  return anchors.filter((anchor) => anchor.actived);
}

export function getAnchorByLabel(anchors: Anchor[], label: string) {
  return anchors.find((anchor) => anchor.label === label);
}

export function getAnchorByValue(anchors: Anchor[], value: string) {
  return anchors.find((anchor) => anchor.value === value);
}

export function getSingleActiveAnchor(anchors: Anchor[], anchor: Anchor) {
  let newAnchors = [...anchors];
  newAnchors = newAnchors.map((a) => ({ ...a, actived: a.value === anchor.value }));
  return newAnchors;
}
