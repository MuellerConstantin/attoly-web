import React from "react";
import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
};

function Template(args) {
  return <Button {...args}>Button</Button>;
}

export const Default = Template.bind({});

Default.args = {};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};
