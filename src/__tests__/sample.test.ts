import { transformData } from '@src/utils/transformData';
import { terrData } from './datasets/territories';

// NOTES just for jest test
import { arrayToTree } from 'performant-array-to-tree';

const expectedTree = arrayToTree(terrData, {
  dataField: null,
  parentId: 'parent',
});

describe('transformData util test', () => {
  test('transformData should have the original expected data from the Exam', () => {
    const territoryTreeDS = transformData(terrData);

    expect(territoryTreeDS).toStrictEqual(expectedTree);
  });
});
