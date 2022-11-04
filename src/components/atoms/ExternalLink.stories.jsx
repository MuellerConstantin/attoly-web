import React from "react";
import { MemoryRouter } from "react-router-dom";
import ExternalLink from "./ExternalLink";

export default {
  title: "Atoms/ExternalLink",
  component: ExternalLink,
};

function Template(args) {
  return (
    <MemoryRouter>
      <ExternalLink {...args}>Link</ExternalLink>
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {
  href: "#",
};

export const Button = Template.bind({});

Button.args = {
  type: "button",
  href: "#",
};
