import React from "react";
import Pagination from "./Pagination";

export default {
  title: "Molecules/Pagination",
  component: Pagination,
};

function Template(args) {
  return <Pagination {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  currentPage: 5,
  perPage: 15,
  totalElements: 100,
  onChange: () => {},
};
