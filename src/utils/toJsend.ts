type JsendParams<DataType> = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  statusForJsend: 'success' | 'fail' | 'error';
  data: DataType;
  isList?: boolean;
};

export type ReturnTypeToJsend<T> = (
  | {
      status: 'success' | 'fail' | 'error';
    }
  | {
      status: 'success' | 'fail' | 'error';
      results: number;
    }
) &
  Pick<JsendParams<T>, 'data'>;

export const toJsend = <DataType>({
  method,
  data,
  statusForJsend,
  isList,
}: JsendParams<DataType>) => {
  let resData;

  if (statusForJsend === 'success' && method === 'DELETE') {
    resData = { status: statusForJsend, data: null };
  }

  if (statusForJsend === 'fail') {
    resData = {
      data,
      status: statusForJsend,
      isSystemError: false,
    };
  }

  if (statusForJsend === 'error') {
    resData = {
      data,
      status: statusForJsend,
      isSystemError: true,
    };
  }

  resData =
    isList && Array.isArray(data)
      ? { status: statusForJsend, results: data.length, data }
      : { status: statusForJsend, data };

  return resData;
};
