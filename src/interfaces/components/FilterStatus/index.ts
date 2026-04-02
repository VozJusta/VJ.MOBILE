export enum StatusText {
    ALL = "Todos",
    ACCEPTED = "Aceitos",
    REJECTED = "Recusados",
    PENDING = "Pendentes",
}

export interface IFilterStatus {
    status: StatusText;
    amount: number;
    onPress: () => void;
}