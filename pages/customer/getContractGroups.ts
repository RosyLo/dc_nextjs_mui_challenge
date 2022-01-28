import { Contract } from '@prisma/client';

export interface ContractInfo {
    type: string,
    typeName?: string,
    data?: ContractData[]
}

export interface ContractData extends Contract{
    typeName: string;
}

const getContractGroups = (contracts: Contract[]) => {
    let homeOwnerData: ContractInfo = {
        type: 'HOME_OWNER',
        typeName: 'Home Owner',
        data:[],
    };
    let homeContentData: ContractInfo  = {
        type: 'HOME_CONTENT',
        typeName: 'Home Content',
        data:[],
    };
    let bikeData: ContractInfo  = {
        type: 'BIKE',
        typeName: 'Bike',
        data:[],
    };

    contracts.forEach((contract) => {
        switch (contract?.type) {
            case 'HOME_OWNER':
                homeOwnerData.data?.push({...contract, typeName: 'Home Owner'});
            break;
            case 'HOME_CONTENT':
                console.log('in',contract)
                homeContentData.data?.push({...contract, typeName: 'Home Content'});
            break;
            case 'BIKE':
                bikeData.data?.push({...contract,  typeName: 'Bike'});
            break;
            default: 
                break;
        }
    });
    const homeOwnerContracts = JSON.parse(JSON.stringify(homeOwnerData));
    const homeContentContracts = JSON.parse(JSON.stringify(homeContentData));
    const bikeContracts = JSON.parse(JSON.stringify(bikeData));
    return {homeOwnerContracts, homeContentContracts, bikeContracts}
}

export default getContractGroups;