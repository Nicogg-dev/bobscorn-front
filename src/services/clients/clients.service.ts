import { clientHTTP } from "@/@core/configs/configAxios";
import { handleApiErrors } from "@/@core/utilities/handle-api-error.utility";
import { IGetClientsResp } from "@/models/clients/get-all/get-all-client.model";
import { IInsertClientsReq, IInsertClientsResp } from "@/models/clients/insert/insert-client.model";


export default class ImportClientsService {

    public static async getAll(): Promise<IGetClientsResp> {
        return handleApiErrors<IGetClientsResp>(() =>
            clientHTTP.get<IGetClientsResp>(
                "popcorn"           
            )
        ) 
    }

    public static async insert(
        obj: IInsertClientsReq,
        errorCallback: (msg: string) => void
      ): Promise<IInsertClientsResp> {
        return await handleApiErrors<IInsertClientsResp>(
          () =>
            clientHTTP.post<IInsertClientsResp>('popcorn', obj),
          errorCallback
        );
      }

}
