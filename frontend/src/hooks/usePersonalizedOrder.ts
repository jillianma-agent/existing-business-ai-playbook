import { useAccount, useRecommendations } from "../context/AccountContext";

/** Sort items: recommended IDs first (in order), then the rest. */
export function usePersonalizedOrder<T extends { id: string }>(
  items: T[],
  recommendedIds?: string[]
) {
  const { isPersonalized } = useAccount();

  const ids = recommendedIds ?? [];
  const recommendedSet = new Set(ids);

  if (!isPersonalized || ids.length === 0) {
    return { ordered: items, recommendedIds: recommendedSet };
  }

  const ordered = [...items].sort((a, b) => {
    const aIdx = ids.indexOf(a.id);
    const bIdx = ids.indexOf(b.id);
    const aRank = aIdx === -1 ? 999 : aIdx;
    const bRank = bIdx === -1 ? 999 : bIdx;
    return aRank - bRank;
  });

  return { ordered, recommendedIds: recommendedSet };
}

export function useIsRecommended(id: string, recommendedIds?: string[]) {
  const rec = useRecommendations();
  if (recommendedIds) return recommendedIds.includes(id);
  if (!rec) return false;
  return id === rec.talkTrackId;
}
