import type { AddressItem } from '@/types/address';

interface AddressState {
  selectedAddress: AddressItem | null;
}

const initialState: Partial<AddressState> = {};

export default {
  name: 'address',
  state: initialState,
  reducers: {
    // 修改选中的地址
    changeSelectedAddress(state: AddressState, payload: AddressItem) {
      return {
        ...state,
        selectedAddress: payload,
      };
    },
  },

  effects: () => ({}),
};
