import { HttpStatusCode } from "@angular/common/http";

export interface APIResponse {
    httpStatusCode: HttpStatusCode,
    isSuccess: boolean,
    error: string,
    result : Object
}
