import type { TerritoriesValue } from '@src/types/territories';

type TerritoriesType = {
  children: Array<TerritoriesValue & { children: TerritoriesValue[] }>;
  id: string;
  name: string;
  parent: string | null;
}[];

export const transformData = (
  arr: TerritoriesValue[],
  parentId: string | null = null,
): TerritoriesType => {
  const toTree = arr
    .filter((data) => data.parent === parentId)
    .map((territory) => ({
      ...territory,
      children: transformData(arr, territory.id),
    }));

  return toTree;
};
