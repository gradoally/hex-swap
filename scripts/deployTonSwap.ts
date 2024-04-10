import { toNano } from '@ton/core';
import { TonSwap } from '../wrappers/TonSwap';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonSwap = provider.open(TonSwap.createFromConfig({}, await compile('TonSwap')));

    await tonSwap.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonSwap.address);

    // run methods on `tonSwap`
}
