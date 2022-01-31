import { FC } from 'react';
import { Contract } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Home from '@mui/icons-material/Home';
import BedroomParent from '@mui/icons-material/BedroomParent';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import PedalBike from '@mui/icons-material/PedalBike';

import { Text } from '@/components/common/text';

export enum InsuranceGroup {
  HomeOwner,
  HomeContent,
  Bike,
}

export interface ContractData extends Contract {
  typeName: string;
}

interface ContractInfo {
  type: string;
  typeName?: string;
  data?: ContractData[];
}

export interface ContractGroup {
  homeOwnerContracts: ContractInfo;
  homeContentContracts: ContractInfo;
  bikeContracts: ContractInfo;
}

export const getSelectContractGroup = (
  contracts: ContractGroup | undefined,
  choosedInsuranceGroup: InsuranceGroup
) => {
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
    icon: <BedroomParent fontSize="small" color="info" />,
    text: 'Home Content',
  },
  {
    type: InsuranceGroup.Bike,
    icon: <PedalBike fontSize="small" color="info" />,
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
