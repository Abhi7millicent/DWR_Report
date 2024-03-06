import { useMutation, useQuery } from "react-query";
import {
  GetEmployeeAdressById,
  PutEmployeeAddressById,
} from "../../services/EmployeeAdress";

interface IAddressData {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  contactno1: string;
  contactno2: string;
}
export const useGetEmployeeAdressById = (addressType: string, id: string) => {
  return useQuery(["qGetEmployeeAdressById", addressType, id], () =>
    GetEmployeeAdressById(addressType, id)
  );
};

export const usePutEmployeeAddressById = () => {
  return useMutation(
    async ({
      data,
      addressType,
      id,
    }: {
      data: IAddressData;
      addressType: string;
      id: string;
    }) => {
      const updateAddress = await PutEmployeeAddressById(data, addressType, id);
      return updateAddress;
    }
  );
};
