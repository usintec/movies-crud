import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from "axios";

abstract class HttpClient{
    instance: AxiosInstance;    
    public constructor(baseURL: string){
        this.instance = axios.create({baseURL: baseURL});
        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.request.use(this._handleRequest);
        this.instance.interceptors.response.use(
          this._handleResponse,
          this._handleError,
        );
      };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    private _handleRequest = (config: AxiosRequestConfig) => {
        // config.headers['Authorization'] = 'Bearer ...';
        config.headers['Origin'] = 'https://myafrostream.tv';
        config.headers['Referer'] = 'https://myafrostream.tv';
        return config;
    };

    protected _handleError = (error: any) => Promise.reject(error);
}

export { HttpClient };