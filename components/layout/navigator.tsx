import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Home from '@mui/icons-material/Home';
import BedroomParent from '@mui/icons-material/BedroomParent';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import PedalBike from '@mui/icons-material/PedalBike';

import { Text } from '../../components/common/text';

export enum InsuranceGroup {
  HomeOwner,
  HomeContent,
  Bike,
}

export const getSelectContractGroup = (contracts, choosedInsuranceGroup) => {
  const { homeOwnerContracts, homeContentContracts, bikeContracts } = contracts;
  switch (choosedInsuranceGroup) {
    case InsuranceGroup.HomeOwner:
      return homeOwnerContracts;
    case InsuranceGroup.HomeContent:
      return homeContentContracts;
    case InsuranceGroup.Bike:
      return bikeContracts;
    default:
      return homeOwnerContracts;
  }
};

interface NavigatorProps {
  setChoosedInsuranceGroup: (type: InsuranceGroup) => void;
}

const navigatorContent = [
  {
    type: InsuranceGroup.HomeOwner,
    icon: <Home fontSize="small" color="info" />,
    text: 'Home Owner',
  },
  {
    type: InsuranceGroup.HomeContent,
    icon: <Home fontSize="small" color="info" />,
    text: 'Home Content',
  },
  {
    type: InsuranceGroup.Bike,
    icon: <Home fontSize="small" color="info" />,
    text: 'Bike',
  },
];

const Navigator: FC<NavigatorProps> = ({ setChoosedInsuranceGroup }) => {
  return (
    <MenuList>
      {navigatorContent.map((content) => (
        <MenuItem
          key={`navigator - ${content.text} - ${uuidv4()}`}
          onClick={() => {
            setChoosedInsuranceGroup(content.type);
          }}
        >
          <ListItemIcon>{content.icon}</ListItemIcon>
          <ListItemText>
            <Text color={'common.white'}>{content.text}</Text>
          </ListItemText>
          <ArrowForwardIos fontSize="small" color="info" />
        </MenuItem>
      ))}
    </MenuList>
  );
};
export default Navigator;
