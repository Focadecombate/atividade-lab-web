import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import {
  AllActions,
  TarefaActionsEnum,
  TarefasState,
} from "../domain/reducers";

import { MyAppBar } from "../components/appBar";
import { AddItem } from "../components/addItem";
import { ListaTarefas } from "../components/tarefaLista";
import { Search } from "../components/search";

interface Props {
  appState: TarefasState;
  dispatch: (action: AllActions) => void;
}

export function Home({ appState, dispatch }: Props) {
  const navigate = useNavigate();

  const onTextChange = (name: string) => {
    dispatch({ type: TarefaActionsEnum.write, payload: { name } });
  };

  const onDateChange = (finallyAt: Date) => {
    dispatch({ type: TarefaActionsEnum.writeDate, payload: { finallyAt } });
  };

  const onAdd = () => {
    dispatch({ type: TarefaActionsEnum.add, payload: {} });
  };

  const goToTarefa = (id: string) => {
    navigate(`task/${id}`, { state: { id } });
  };

  const search = (search: string) => {
    dispatch({ type: "SEARCH", payload: { search } });
  };

  return (
    <>
      <MyAppBar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inicio
        </Typography>

        <Search search={appState.search} onChangeText={search} />
      </MyAppBar>
      <main
        style={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AddItem
          error={appState.error}
          name={appState.name}
          finallyAt={appState.finallyAt}
          onTextChange={onTextChange}
          onDateChange={onDateChange}
          onAdd={onAdd}
        />
        <ListaTarefas
          search={appState.search}
          tarefas={appState.tarefas}
          dispatch={dispatch}
          goToTarefa={goToTarefa}
        />
      </main>
    </>
  );
}
