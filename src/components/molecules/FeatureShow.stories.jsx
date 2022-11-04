import React from "react";
import { MemoryRouter } from "react-router-dom";
import FeatureShow from "./FeatureShow";

export default {
  title: "Molecules/FeatureShow",
  component: FeatureShow,
};

function Template(args) {
  return (
    <MemoryRouter>
      <FeatureShow {...args} />
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {};
