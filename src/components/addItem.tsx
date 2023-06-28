import { useRef } from "react";
import { TextField, Button } from "@mui/material";

interface Props {
  error: string;
  name: string;
  finallyAt: Date;
  onAdd: () => void;
  onTextChange: (name: string) => void;
  onDateChange: (finallyAt: Date) => void;
}

export const AddItem = ({ error, name, onTextChange, finallyAt, onDateChange, onAdd }: Props) => {
  const hasError = error.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2%",
      }}
    >
      <TextField
        placeholder="Digite a tarefa"
        value={name}
        onChange={({ target }) => onTextChange(target.value)}
        error={hasError}
        label="Adicionar tarefa"
        helperText={error}
        ref={inputRef}
        fullWidth
      />
      <TextField
        id="date"
        label="Data limite"
        type="date"
        style={{
          marginLeft: 10
        }}
        value={finallyAt}
        onChange={({ target }) => onDateChange(new Date(target.value))}
      />
      <Button
        variant="contained"
        disabled={name.length === 0 || hasError}
        style={{ borderRadius: 5, marginLeft: "2%" }}
        onClick={() => {
          onAdd();
          inputRef.current?.focus();
        }}
      >
        Adicionar
      </Button>
    </div>
  );
};
