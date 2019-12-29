import {
  REQUEST_CREATE,
  REQUEST_RETRIEVE,
  REQUEST_LIST,
  REQUEST_UPDATE_ONE,
  REQUEST_UPDATE,
  REQUEST_DELETE_ONE,
  SET_CURRENT,
  SET_CURRENT_ID,
  RESET,
  RESET_CURRENT
} from "./types";

const mergeIndex = (oldIndex, instances) => {
  if(!instances.length) {
    return oldIndex;
  }

  return instances.reduce((index, value) => {
    index[value.getKey()] = value;
    return index;
  }, Object.assign({}, oldIndex))
}


const replaceIn = (values, instance) => {
  if(values) {
    const instanceIndex = values.findIndex((value) => value.getKey() === instance.getKey());
    if(instanceIndex !== -1) {
      values = values.slice();
      values.splice(instanceIndex, 1, instance)
    }
  }
}

const replaceInstance = (state, instance) => {
  const {index, values} = state;
  return {
    ...state,
    index: mergeIndex(index, [instance]),
    values: replaceIn(values, instance),
    current: instance,
  }
}

const reduceFunctions = {
  [SET_CURRENT_ID]: (state, { payload }) => {
    const { id } = payload;
    const { current } = state;
    return {
      ...state,
      current: id && current && current.getKey() === id ? current: null,
      currentID: id,
    };
  },

  [SET_CURRENT]: (state, { payload }) => {
    const { instance } = payload;
    const currentID = instance ? instance.getKey() : null;

    return {
      ...state,
      currentID,
      current: instance,
      index: instance ? mergeIndex(state.index, [instance]) : state.index,
    };
  },

  [REQUEST_RETRIEVE]: (state, { data, payload, success}) => {
    if(success === null) {
      return ({
        ...status,
        currentLoading: true,
      });
    }
    if(!success) {
      return ({
        ...state,
        currentLoading: false,
      })
    }
    const instance =  new payload.Model(data);
    return {
      ...state,
      current: instance.getKey() === state.currentID ? instance : state.current,
      currentLoading: false,
      index: mergeIndex(state.index, [instance]),
    };
  },

  [REQUEST_LIST]: (state, { data, abort, payload, response, success, request }) => {
    if(success === null) {
      if(state.abort) {
        state.abort();
      }
      return {
        ...state,
        abort,
        request,
        loading: true
      };
    }

    if(state.request !== request) {
      return state;
    }

    const nextState = {
      ...state,
      request: undefined,
      abort: undefined,
      loading: false,
    }

    if(!success) {
      return nextState;
    }

    const instances = Object.entries(data).map(([_, value]) => new payload.Model(value))
    const nextValues = (payload.append && state.values) ? state.values.concat(instances) : instances;

    return {
      ...nextState,
      empty: nextValues.length === 0,
      values: nextValues,
      index: mergeIndex(state.index, instances),
    };
  },

  [REQUEST_UPDATE_ONE]: (state, { data, payload, success, response }) => {
    if(success === null) {
      return {
        ...state,
        updating: true
      }
    }

    if(!success) {
      return {
        ...state,
        updating: false,
        error: response.getMessage()
      }
    }

    const instance = new payload.Model(data);
    return replaceInstance({
      ...state,
      updating: false
    }, instance);
  },

  [REQUEST_UPDATE]: (state, { data, payload, success, response }) => {
    if(success === null) {
      return {
        ...state,
        updating: true
      }
    }

    if(success === false) {
      return {
        ...state,
        updating: false,
        error: response.getMessage()
      }
    }

    const instance = new payload.Model(data);
    return replaceInstance({
      ...state,
      updating: false
    }, instance);
  },

  [REQUEST_CREATE]: (state, { data, payload, success, response }) => {
    if(success === null) {
      return {
        ...state,
        creating: true,
      }
    }

    if(!success) {
      return {
        ...state,
        creating: false,
        currentID: null,
        current: null,
        error: response.getMessage()
      }
    }
    const instance = new payload.Model(data);
    return {
      ...state,
      creating: false,
      currentID: instance.getKey(),
      current: instance,
      index: mergeIndex(state.index, [instance])
    };
  },

  [REQUEST_DELETE_ONE]: (state, { data, payload, success, response }) => {
    if(success === null) {
      return {
        ...state,
        deleting: true
      }
    }
    if(!success) {
      return {
        ...state,
        deleting: false,
        error: response.getMessage()
      }
    }

    const {Model} = payload;

    const nextState = {
      ...state,
      request: undefined,
      abort: undefined,
      loading: false,
    }

    const instances = Object.entries(data).map(([_, value]) => new Model(value))
    const nextValues = (payload.append && state.values) ? state.values.concat(instances) : instances;

    return {
      ...nextState,
      empty: nextValues.length === 0,
      values: nextValues,
      index: mergeIndex(state.index, instances),
      current: nextValues,
    };
  },

  [RESET_CURRENT]: (state) => {
      return {
        ...state,
        creating: false,
        currentID: null,
        current: null,
        error: null
      }
  },

  [RESET]: () => undefined
}

export default function apiReducer(state, action) {
  const {type, index} = action;
  const reduceFunction = reduceFunctions[type];
  if(!reduceFunction) {
    return state
  }

  const currentState = (state && state[index]) || {};
  const nextState = reduceFunction(currentState, action);
  if(currentState === nextState) {
    return state
  }

  return {
    ...state,
    [index]: nextState
  }
}
