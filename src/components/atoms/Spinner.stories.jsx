import React from "react";
import { MemoryRouter } from "react-router-dom";
import Spinner from "./Spinner";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
};

function Template(args) {
  return (
    <MemoryRouter>
      <Spinner {...args} />
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {
};
