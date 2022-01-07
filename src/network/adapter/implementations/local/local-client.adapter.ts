import {ConnectionInfo, NetworkAdapterApi} from "../../adapter.api";
import {LocalServerNetworkAdapter} from "./local-server.adapter";

export class LocalClientNetworkAdapter extends NetworkAdapterApi {


    constructor(
        protected serverAdapter?: LocalServerNetworkAdapter
    ) {
        super();

        if (serverAdapter) {
            serverAdapter.registerClient(this);
        }
    }

    getConnectionList(): ConnectionInfo[] {
        return [
            {
                id: 1,
                rank: 'server'
            }
        ];
    }

    sendMessageById(targetId: number, messageData: string): void {
        this.sendMessageToServer(messageData);
    }

    sendMessageByRank(targetRank: string, messageData: string): void {
        this.sendMessageToServer(messageData);
    }

    sendMessageToAll(messageData: string): void {
        this.sendMessageToServer(messageData);
    }

    protected sendMessageToServer(messageData: string) {
        this.serverAdapter?.receiveMessage(messageData);
    }

    receiveMessage(messageData: string) {
        this.onMessage?.(messageData);
    }

}