import React from "react";
import { MemoryRouter } from "react-router-dom";
import InfoBanner from "./InfoBanner";

export default {
  title: "Molecules/InfoBanner",
  component: InfoBanner,
};

function Template(args) {
  return (
    <MemoryRouter>
      <InfoBanner {...args} />
    </MemoryRouter>
  );
}

export const Default = Template.bind({});

Default.args = {};
