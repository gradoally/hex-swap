import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TonSwap } from '../wrappers/TonSwap';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TonSwap', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TonSwap');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonSwap: SandboxContract<TonSwap>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonSwap = blockchain.openContract(TonSwap.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tonSwap.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonSwap.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonSwap are ready to use
    });
});
