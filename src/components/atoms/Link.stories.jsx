import React from "react";
import { MemoryRouter } from "react-router-dom";
import Link from "./Link";

export default {
  title: "Atoms/Link",
  component: Link,
};

function Template(args) {
  return (
    <MemoryRouter>
      <Link {...args}>Link</Link>
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {
  to: "#",
};

export const Button = Template.bind({});

Button.args = {
  type: "button",
  to: "#",
};
