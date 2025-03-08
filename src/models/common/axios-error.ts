export interface IAxiosError {
    response: IResponseError;
    code: string;
    msg: string;
  }
  
  export interface IResponseError {
    data: {
      msg: string;
      errors?: Record<string, string[]>;
    };
    status: number;
  }
  
  export enum ERROR_MESSAGE {
  
    /* TODO: translate word */
  
    ERROR = 'Oops!, an error has occurred.',
    SERVER_ERROR = 'Internal server error',
    ERR_NETWORK = 'Network error',
    UNAUTHORIZED = 'Not authorized',
    NOT_FOUND = 'Service Not Found',
    BAD_REQUEST = 'Bad Request or unprocessable content'
  }
  
  export enum ERROR_CODE {
    ERR_NETWORK = 'ERR_NETWORK'
  }
  
  /**
   * `ERROR_STATUS` enumeration that defines HTTP status codes to
   * represent different types of response errors.
   */
  export enum ERROR_STATUS {
    /**
     * 400 BAD_REQUEST:
     * The server could not understand or process the
     *  request due to malformed syntax.
     */
    BAD_REQUEST = 400,
  
    /**
     * 401 UNAUTHORIZED:
     * Authentication is required to access the requested resource.
     * The request has failed the authentication tests.
     */
    UNAUTHORIZED = 401,
  
    /**
     * 403 FORBIDDEN:
     * The server understood the request, but it refuses to authorize it.
     * Unlike 401 UNAUTHORIZED, which implies that the client must authenticate itself,
     * a 403 FORBIDDEN implies that authentication will not help.
     */
    FORRBIDDEN = 403,
  
    /**
     * 404 NOT_FOUND:
     * The requested resource could not be found on the server.
     */
    NOT_FOUND = 404,
  
    /**
     * 404 NOT_FOUND:
     * The requested resource could not be found on the server.
     */
    METHOD_NOT_ALLOWED = 405,
  
    /**
     * 422 UNPROCESSABLE_CONTENT:
     * The request was well-formed, but it could not be followed due to semantic errors.
     */
    UNPROCESSABLE_CONTENT = 422,
  
    /**
     * 429 TOO_MANY_REQUESTS:
     * The user has sent too many requests in a given amount of time.
     */
    TOO_MANY_REQUESTS = 429,
  
    /**
     * 500 SERVER_ERROR:
     * Internal Server Error. This means something went wrong on the server's side,
     * but the server cannot be more specific about the error condition.
     */
    SERVER_ERROR = 500
  }
  