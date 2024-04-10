import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TonSwapConfig = {};

export function tonSwapConfigToCell(config: TonSwapConfig): Cell {
    return beginCell().endCell();
}

export class TonSwap implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonSwap(address);
    }

    static createFromConfig(config: TonSwapConfig, code: Cell, workchain = 0) {
        const data = tonSwapConfigToCell(config);
        const init = { code, data };
        return new TonSwap(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
