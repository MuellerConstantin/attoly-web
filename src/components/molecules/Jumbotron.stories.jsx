import React from "react";
import { MemoryRouter } from "react-router-dom";
import Jumbotron from "./Jumbotron";

export default {
  title: "Molecules/Jumbotron",
  component: Jumbotron,
};

function Template(args) {
  return (
    <MemoryRouter>
      <Jumbotron {...args} />
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {};
