import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);

export const authTokenAtom = atomWithStorage<string | null>('rw_token', null, storage);
export const refreshTokenAtom = atomWithStorage<string | null>('rw_refresh', null, storage);
export const userAtom = atomWithStorage<any | null>('rw_user', null, storage);
