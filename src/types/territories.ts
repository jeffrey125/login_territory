export type TerritoriesValue = {
  id: string;
  name: string;
  parent: string | null;
};

export type TerritoriesData = {
  data: TerritoriesValue[];
};
