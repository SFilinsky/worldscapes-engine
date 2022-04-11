import { NetworkClientApi } from "../client-network.api";
import {
  NetworkAdapterApi,
  NetworkMessageMapper,
  UpdatedSnapshotMessage,
  PlayerAction,
  WorldStateSnapshot,
  PlayerInputMessage
} from "@worldscapes/common";

export class SimpleNetworkClient extends NetworkClientApi {
  protected lastReceivedSnapshot!: WorldStateSnapshot;

  protected mapper = new NetworkMessageMapper();

  constructor(protected adapter: NetworkAdapterApi) {
    super();

    this.mapper.addMessageHandler(UpdatedSnapshotMessage, (message) => {
      this.lastReceivedSnapshot = message.snapshot;
    });

    adapter.onMessage = ({ messageText, connectionInfo }) => {
      this.mapper.handleMessage(JSON.parse(messageText), connectionInfo);
    };
  }

  getLastReceivedSnapshot(): WorldStateSnapshot {
    return this.lastReceivedSnapshot;
  }

  sendPlayerActions(input: PlayerAction[]): void {
    this.adapter.sendMessageByRank(
      "server",
      JSON.stringify(new PlayerInputMessage(input))
    );
  }
}
