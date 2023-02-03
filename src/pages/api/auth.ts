import { toJsend } from '@src/utils/toJsend';
import type { ReturnTypeToJsend } from '@src/utils/toJsend';
import type { AccountBodyData, AccountBodyReq } from '@src/types/account';
import type { NextApiRequest, NextApiResponse } from 'next';
import isEmpty from 'validator/lib/isEmpty';
import axios from 'axios';

export type AuthApiErrorData = {
  message: string;
};

export type AuthApiData = ReturnTypeToJsend<AuthApiErrorData | AccountBodyData>;

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<AuthApiData>,
) {
  const resBody = body as AccountBodyReq | undefined;

  if (method !== 'POST') {
    const invalidMethod = toJsend({
      method: 'POST',
      statusForJsend: 'fail',
      data: { message: 'Invalid Method' },
    });

    return res.status(405).json(invalidMethod);
  }

  if (!resBody) {
    const invalidRequest = toJsend({
      method: 'POST',
      statusForJsend: 'fail',
      data: { message: 'Invalid Request!' },
    });

    return res.status(401).json(invalidRequest);
  }

  const { username, password } = resBody;

  if (isEmpty(username.trim()) || isEmpty(password.trim())) {
    const badRequestBody = toJsend({
      method: 'POST',
      statusForJsend: 'fail',
      data: { message: 'Invalid Body Request!' },
    });

    return res.status(401).json(badRequestBody);
  }

  if (!process.env.BASE_API_ROUTE) {
    throw new Error('NO BASE API ROUTE FOUND');
  }

  const { data } = await axios.post<AccountBodyData>(
    `${process.env.BASE_API_ROUTE}/Account/SignIn`,
    { username, password },
  );

  const successResData = toJsend({
    method: 'POST',
    statusForJsend: 'success',
    data: { ...data },
  });

  res.status(200).json(successResData);
}
