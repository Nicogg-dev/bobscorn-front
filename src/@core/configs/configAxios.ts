import axios, { AxiosInstance } from "axios";

/**
 * ClientHTTP class is responsible for creating an HTTP client
 * using the Axios library. It allows for an optional interceptor
 * that can modify the request configuration.
 */
class ClientHTTP {
    private api: AxiosInstance;

    /**
     * Constructs an instance of the ClientHTTP class.
     * @param {boolean} applyContentAppJson - Determines the `Content-Type` header.
     */
    constructor(private applyContentAppJson: boolean) {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_PUBLIC_API_URL,
            headers: {
                "Content-Type": this.applyContentAppJson
                    ? "application/json"
                    : "multipart/form-data",
            },
        });
    }

    /**
     * Get the created Axios instance.
     * @returns {AxiosInstance} - The created Axios instance for making HTTP requests.
     */
    getApi(): AxiosInstance {
        return this.api;
    }
}

const clientHTTP = new ClientHTTP(true).getApi();
const clientHTTPMultiPlatform = new ClientHTTP(false).getApi();

export { clientHTTP, clientHTTPMultiPlatform };
