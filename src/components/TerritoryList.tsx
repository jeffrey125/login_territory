import React, { useState } from 'react';
import { IconArrowBadgeRight, IconArrowBadgeDown } from '@tabler/icons-react';

import { List, Text, ThemeIcon } from '@mantine/core';
import type { transformData } from '@src/utils/transformData';

export const TerritoryList = ({
  territoryData,
  withPadding,
  hidden,
}: {
  territoryData: ReturnType<typeof transformData>;
  withPadding?: boolean;
  hidden?: boolean;
}) => {
  const [isHidden, setIsHidden] = useState(false);

  if (!territoryData || territoryData.length === 0) {
    return null;
  }

  return (
    <List withPadding={withPadding}>
      {territoryData.map((terrData) => (
        <React.Fragment key={terrData.id}>
          <List.Item
            sx={{ height: 25, cursor: 'pointer' }}
            onClick={() => setIsHidden((prevState) => !prevState)}
            hidden={hidden}
            icon={
              <ThemeIcon color='blue' size={18} radius='xl'>
                {isHidden ? (
                  <IconArrowBadgeRight size={16} />
                ) : (
                  <IconArrowBadgeDown size={16} />
                )}
              </ThemeIcon>
            }>
            <Text>{terrData.name}</Text>
          </List.Item>
          {!hidden && (
            <TerritoryList
              territoryData={
                terrData.children as ReturnType<typeof transformData>
              }
              withPadding
              hidden={isHidden}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};
