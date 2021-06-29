const moduleReducer = require.context('.', true, /index.js$/);

const reducers = {};
let sagas = [];
moduleReducer.keys().forEach((file) => {
  if (file === './index.js') return;
  const module = moduleReducer(file);
  if (module.reducer) {
    reducers[module.namespace] = module.reducer;
  }
  if (module.saga) {
    sagas = [...sagas, module.saga];
  }
});

export { reducers, sagas };
