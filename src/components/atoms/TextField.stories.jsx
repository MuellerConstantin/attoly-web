import React from "react";
import TextField from "./TextField";

export default {
  title: "Atoms/TextField",
  component: TextField,
};

function Template(args) {
  return <TextField placeholder="Value" {...args} />;
}

export const Default = Template.bind({});

Default.args = {};

export const Errored = Template.bind({});

Errored.args = {
  error: "An invalid value was provided.",
  touched: true,
};
