import {ECRComponent} from "../state/component/component";
import {ECRResource} from "../state/resource/resource";
import {
    StoreEntityRequest,
    StoreResourceRequest,
    StoreQueryResult,
    StoreQuerySubscription
} from "./request/request";
import {ECRQuery} from "../query/query";
import {WorldStateSnapshot} from "../simulation/implementations/simple.simulation";

export abstract class ECRStore {

    abstract subscribeQuery(query: ECRQuery<StoreEntityRequest | StoreResourceRequest>): StoreQuerySubscription;

    abstract executeQuery(query: ECRQuery<StoreEntityRequest | StoreResourceRequest>): StoreQueryResult;

    abstract createEntity(): number;

    abstract deleteEntity(entityId: number): void;


    abstract addComponent<T extends ECRComponent>(entityId: number, component: T): void;

    abstract updateComponent<T extends ECRComponent>(entityId: number, oldComponent: T, updatedComponent: T): void;

    abstract deleteComponent<T extends ECRComponent>(entityId: number, component: T): void;


    abstract addResource<T extends ECRResource>(resourceName: string, resource: T): void;

    /**
     * @description
     * **Warning**: Can change a type of resource
     */
    abstract updateResource<T extends ECRResource>(resourceName: string, updatedResource: T): void;

    abstract deleteResource<T extends ECRResource>(resourceName: string): void;


    abstract getSnapshot(): WorldStateSnapshot;

    abstract loadSnapshot(snapshot: WorldStateSnapshot): void;

}

