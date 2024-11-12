import React from "react";
import TextArea from "./TextArea";

export default {
  title: "Atoms/TextArea",
  component: TextArea,
};

function Template(args) {
  return <TextArea placeholder="Value" {...args} />;
}

export const Default = Template.bind({});

Default.args = {};

export const Errored = Template.bind({});

Errored.args = {
  error: "An invalid value was provided.",
  touched: true,
};
