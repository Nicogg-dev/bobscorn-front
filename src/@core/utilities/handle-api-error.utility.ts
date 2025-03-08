import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import {
    ERROR_CODE,
    ERROR_MESSAGE,
    ERROR_STATUS,
    IAxiosError,
} from "@/models/common/axios-error";

type ApiResponse<T> = T;

const hadleAxiosError = (message: string) => {
    message = message.trim();
    toast.error(message);
};

/**
 * Asynchronous function that handles API errors.
 * This function wraps an API call and handles various types of errors,
 * displaying an appropriate error message if needed.
 *
 * @param {() => Promise<AxiosResponse<T>>} apiCall - The API call to be executed.
 * @param {(msg: string) => void} [errorCallback] - Optional callback to be executed when an error occurs.
 * @returns {Promise<T>} - The data from the API response, if the call is successful.
 * @throws {IAxiosError} - If the API call fails.
 */

export const handleApiErrors = async <T>(
    apiCall: () => Promise<AxiosResponse<T>>,
    errorCallback?: (msg: string, errors?: Record<string, string[]>) => void
): Promise<T> => {
    try {
        const response = await apiCall();
        const responseData: ApiResponse<T> = response.data;

        return responseData;
    } catch (error: any) {
        console.log(error);
        const { response, code } = error as IAxiosError;
        if (code === ERROR_CODE.ERR_NETWORK) {
            hadleAxiosError(ERROR_MESSAGE.ERR_NETWORK);
        } else if (response.status === ERROR_STATUS.SERVER_ERROR) {
            hadleAxiosError(ERROR_MESSAGE.SERVER_ERROR);
        } else if (response.status === ERROR_STATUS.METHOD_NOT_ALLOWED) {
            hadleAxiosError(ERROR_MESSAGE.ERROR);
        } else if (response.status === ERROR_STATUS.UNAUTHORIZED) {
            hadleAxiosError(ERROR_MESSAGE.UNAUTHORIZED);
        } else if (response.status === ERROR_STATUS.NOT_FOUND) {
            hadleAxiosError(ERROR_MESSAGE.NOT_FOUND);
        } else if (response.status === ERROR_STATUS.UNPROCESSABLE_CONTENT) {
            const errors = response.data.errors || {};
            if (errorCallback) {
                errorCallback(response.data.msg, errors);
            }

            return Promise.reject({ message: response.data.msg, errors });
        } else if (
            errorCallback &&
            response.status === ERROR_STATUS.BAD_REQUEST
        ) {
            console.log(response);
            const errors = response.data.msg || {};
            errorCallback(
                response.data.msg || ERROR_MESSAGE.BAD_REQUEST,
                errors
            );

            return Promise.reject({ message: response.data.msg, errors });
        } else if (axios.isAxiosError(error)) {
            hadleAxiosError(response.data.msg || ERROR_MESSAGE.ERROR);
        } else {
            hadleAxiosError(ERROR_MESSAGE.ERROR);
        }

        return Promise.reject(error);
    }
};
