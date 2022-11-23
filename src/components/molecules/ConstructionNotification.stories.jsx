import React from "react";
import { MemoryRouter } from "react-router-dom";
import ConstructionNotification from "./ConstructionNotification";

export default {
  title: "Molecules/ConstructionNotification",
  component: ConstructionNotification,
};

function Template(args) {
  return (
    <MemoryRouter>
      <ConstructionNotification {...args} />
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {};
