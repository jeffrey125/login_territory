import { atom, useRecoilState } from 'recoil';

const isLoggedInAtom = atom({
  key: 'loginAtom',
  default: false,
});

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  return { isLoggedIn, setIsLoggedIn };
};
