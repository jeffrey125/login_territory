/* eslint-disable no-console */
import { toJsend } from '@src/utils/toJsend';
import isEmpty from 'validator/lib/isEmpty';
import axios from 'axios';
import type { ReturnTypeToJsend } from '@src/utils/toJsend';
import type { AccountBodyData, AccountBodyReq } from '@src/types/account';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosError } from 'axios';

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

  try {
    const { data } = await axios.post<AccountBodyData>(
      `${process.env.BASE_API_ROUTE}/Account/SignIn`,
      { username, password },
    );

    const successResData = toJsend({
      method: 'POST',
      statusForJsend: 'success',
      data: { ...data },
    });

    return res.status(200).json(successResData);
  } catch (err) {
    const error = err as AxiosError<ReturnTypeToJsend<AuthApiErrorData>>;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const apiErrorResponse = error.response as unknown as {
        data: { message: string };
      };

      console.log(apiErrorResponse.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if (error.response.status === 500) {
        const systemErrorResData = toJsend({
          method: 'POST',
          statusForJsend: 'error',
          data: {
            message: 'Something went wrong our backend will fix it ASAP!',
          },
        });

        return res.status(error.response.status).json(systemErrorResData);
      }

      const failRequest = toJsend({
        method: 'POST',
        statusForJsend: 'fail',
        data: { message: apiErrorResponse.data.message },
      });

      console.log(error.response.data.data);

      return res.status(error.response.status).json(failRequest);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
}
