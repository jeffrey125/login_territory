export type AccountBodyReq = {
  username: string;
  password: string;
};

export type AccountBodyData = {
  displayName: string;
  roles: string[];
} & Pick<AccountBodyReq, 'username'>;
