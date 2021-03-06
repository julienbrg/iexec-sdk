const main = {
  description: 'My iExec ressource description',
  license: 'MIT',
  author: '?',
  social: {
    website: '?',
    github: '?',
  },
  logo: 'logo.png',
};

const app = {
  name: 'my-dapp',
  price: 1,
  params: {
    type: 'DOCKER',
    envvars: 'XWDOCKERIMAGE=hello-world',
  },
};

const dataset = {
  name: 'my-dataset',
  price: 2,
  params: {
    arg1: 'value1',
  },
};

const workerPool = {
  description: 'my-workerpool',
  subscriptionLockStakePolicy: 100,
  subscriptionMinimumStakePolicy: 100,
  subscriptionMinimumScorePolicy: 100,
};

const category = {
  name: 'CAT1',
  description: 'new hub category',
  workClockTimeRef: 100,
};

const chains = {
  chains: {
    dev: {
      host: 'http://localhost:8545',
      id: '1337',
      hub: '0xc4e4a08bf4c6fd11028b714038846006e27d7be8',
      scheduler: 'https://pool1api.iex.ec',
    },
    ropsten: {
      host: 'https://ropsten.infura.io/berv5GTB5cSdOJPPnqOq',
      id: '3',
      scheduler: 'https://pool1api.iex.ec',
    },
    rinkeby: {
      host: 'https://rinkeby.infura.io/berv5GTB5cSdOJPPnqOq',
      id: '4',
      scheduler: 'https://pool1api.iex.ec',
    },
    kovan: {
      host: 'https://kovan.infura.io/berv5GTB5cSdOJPPnqOq',
      id: '42',
      scheduler: 'https://pool1api.iex.ec',
    },
    mainnet: {
      host: 'https://mainnet.infura.io/berv5GTB5cSdOJPPnqOq ',
      id: '1',
      scheduler: 'https://pool1api.iex.ec',
    },
  },
};

const sellLimitOrder = {
  category: 1,
  value: 10,
  workerPool: '0x0000000000000000000000000000000000000000',
  volume: 1,
};

const buyMarketOrder = {
  app: '0x0000000000000000000000000000000000000000',
  dataset: '0x0000000000000000000000000000000000000000',
  params: {
    cmdline: '--help',
  },
};

const defaultOrder = {
  sell: sellLimitOrder,
  buy: buyMarketOrder,
};

const createOrder = (side, overwrite = {}) => {
  if (side === 'buy') return Object.assign({}, buyMarketOrder, overwrite);
  return Object.assign({}, sellLimitOrder, overwrite);
};

module.exports = {
  main,
  app,
  dataset,
  workerPool,
  category,
  chains,
  defaultOrder,
  createOrder,
};
