import { Actor, AllActions, Remove, Search, Toggle, Write, Add, TarefaActionsEnum, TarefasState, WriteDate } from "./types";

export const makeInitialTarefaState = (): TarefasState => {
  let tarefasSalvas = localStorage.getItem('tasks');
  if (!tarefasSalvas) {
    tarefasSalvas = "[]";
  }
  return {
    tarefas: JSON.parse(tarefasSalvas),
    error: "",
    name: "",
    search: "",
    finallyAt: new Date(),
  }
};

export const removeTask: Actor<Remove> = (state, action) => {
  return {
    ...state,
    tarefas: state.tarefas.filter((tarefa) => tarefa.id !== action.payload.id),
  };
};

export const toggleTask: Actor<Toggle> = (state, action) => {
  return {
    ...state,
    tarefas: state.tarefas.map((t) =>
      t.id === action.payload.id ? { ...t, done: !t.done } : t
    ),
  };
};

export const writeTask: Actor<Write> = (state, { payload }) => {

  const hasTaskAlready = state.tarefas.some((t) => t.name === payload.name);

  if (hasTaskAlready) {
    return {
      ...state,
      name: payload.name,
      error: "Nome da tarefa já existe",
    };
  }

  return {
    ...state,
    error: "",
    name: payload.name,
  };
};

export const writeDate: Actor<WriteDate> = (state, { payload }) => {
  return {
    ...state,
    error: "",
    finallyAt: payload.finallyAt,
  };
};

export const addTask: Actor<Add> = (state) => {
  if (state.name === "" || !state.finallyAt) {
    return {
      ...state,
      error: "Nome da tarefa não pode ser vazio",
    };
  }

  if (state.error) {
    return state;
  }

  const tarefa = {
    id: (state.tarefas.length + 1).toString(),
    name: state.name,
    done: false,
    createdAt: new Date(),
    finallyAt: state.finallyAt,
  };

  localStorage.setItem('tasks', JSON.stringify([
    ...state.tarefas,
    tarefa,
  ], null, 2));

  return {
    ...state,
    tarefas: [
      ...state.tarefas,
      tarefa,
    ],
    error: "",
    name: "",
  };
};

export const searchTask: Actor<Search> = (state, action) => {
  return {
    ...state,
    search: action.payload.search,
  };
};

export const tarefaReducer = (
  state: TarefasState,
  action: AllActions
): TarefasState => {
  switch (action.type) {
    case TarefaActionsEnum.add:
      return addTask(state, action);

    case TarefaActionsEnum.remove:
      return removeTask(state, action);

    case TarefaActionsEnum.toggle:
      return toggleTask(state, action);

    case TarefaActionsEnum.write:
      return writeTask(state, action);

    case TarefaActionsEnum.writeDate:
      return writeDate(state, action);

    case TarefaActionsEnum.search:
      return searchTask(state, action);

    default:
      return state;
  }
};
