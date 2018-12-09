export class RestRequest {
  queryParams: any;
  body: any;
}

export class RestResponse {
  error: boolean;
  content: any;
}

export class RestErrorResponse {
  code: string;
  message: string;
  details: string;
}
