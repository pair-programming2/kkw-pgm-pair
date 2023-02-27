const createStore = initialState => {
  const events = {};
  const state = new Proxy(initialState, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;

      events[prop]();

      return true;
    },
  });

  const subscribe = (actionType, eventCallback) => {
    events[actionType] = eventCallback;
  };

  return {
    state,
    subscribe,
  };
};

export default createStore;
