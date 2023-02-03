/* eslint-disable no-console */
import { toJsend } from '@src/utils/toJsend';
import { terrData } from '@src/__tests__/datasets/territories';
import type { ReturnTypeToJsend } from '@src/utils/toJsend';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TerritoriesValue } from '@src/types/territories';

export type DummyTerritoriesData = TerritoriesValue[];

export type DummyApiData = ReturnTypeToJsend<DummyTerritoriesData>;

// Added this handler since on localhost I'm having CORS error
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DummyApiData>,
) {
  const dummyData = toJsend({
    method: 'GET',
    statusForJsend: 'success',
    data: terrData,
  });

  res.status(200).json(dummyData);
}
