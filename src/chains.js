const Debug = require('debug');
const Promise = require('bluebird');
const EthJS = require('ethjs');
const keystore = require('./keystore');
const { loadChainsConf } = require('./fs');
const SignerProvider = require('./ethjs-iexec-signer');
const createIExecContracts = require('./iexec-contracts-js-client');
const createIExecClient = require('iexec-server-js-client');

const debug = Debug('iexec:chains');

const getChains = (
  from,
  chainsConf,
  {
    signTransaction,
    accounts,
    signTypedData,
    signMessage,
    signPersonalMessage,
  },
) => {
  try {
    const chains = { names: Object.keys(chainsConf.chains) };
    chains.names.forEach((name) => {
      const chain = chainsConf.chains[name];
      const ethProvider = new SignerProvider(chain.host, {
        signTransaction,
        accounts,
        signTypedData,
        signMessage,
        signPersonalMessage,
      });

      chains[name] = Object.assign({}, chain);
      chains[name].name = name;
      chains[name].ethjs = new EthJS(ethProvider);
      chains[name].EthJS = EthJS;
      chains[name].iexec = createIExecClient({ server: chain.server });
      chains[name].contracts = createIExecContracts({
        eth: chains[name].ethjs,
        chainID: chains[name].id,
        txOptions: {
          from,
          chainId: parseInt(chains[name].id, 10),
        },
      });
      // index by chainID
      chains[chain.id] = chains[name];
    });
    return chains;
  } catch (error) {
    debug('getChains()', error);
    throw error;
  }
};

const loadChains = async () => {
  try {
    const [{ address }, chainsConf] = await Promise.all([
      keystore.load(),
      loadChainsConf(),
    ]);
    const chains = getChains(address, chainsConf, keystore);
    return chains;
  } catch (error) {
    debug('loadChains()', error);
    throw error;
  }
};

const loadChain = async (chainName) => {
  try {
    const chains = await loadChains();
    return chains[chainName];
  } catch (error) {
    debug('loadChain()', error);
    throw error;
  }
};

module.exports = {
  loadChains,
  loadChain,
};