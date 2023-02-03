type JsendParams<DataType> = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  statusForJsend: 'success' | 'fail' | 'error';
  data: Array<DataType> | DataType;
  isList?: boolean;
  errorMessage?: string;
};

export type ReturnTypeToJsend = ReturnType<typeof toJsend>;

export const toJsend = <DataType>({
  method,
  data,
  statusForJsend,
  isList,
  errorMessage,
}: JsendParams<DataType>) => {
  let resData;

  if (statusForJsend === 'success') {
    resData =
      isList && Array.isArray(data)
        ? { status: statusForJsend, results: data.length, data }
        : { status: statusForJsend, data };
  }

  if (statusForJsend === 'success' && method === 'DELETE') {
    resData = { status: statusForJsend, data: null };
  }

  if (statusForJsend === 'fail' && errorMessage) {
    resData = {
      status: statusForJsend,
      isSystemError: false,
      data: { errorMessage },
    };
  }

  if (statusForJsend === 'error' && errorMessage) {
    resData = {
      status: statusForJsend,
      isSystemError: true,
      message: errorMessage,
    };
  }

  return resData;
};
