import React from "react";
import { TextField } from '@material-ui/core';
import { useController } from "react-hook-form";


export default function Field({name, type, label, control}){
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return <TextField
    {...inputProps}
    inputRef={ref}
    type={type}
    label={label}
    fullWidth
    onChange={onChange}
    error={!!error}
    helperText={error ? error.message : null}
  />
}

