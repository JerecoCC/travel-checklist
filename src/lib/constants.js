export const ROUTES = {
  CHECKLIST: "/checklist",
  DEFAULT: "/",
  LOGIN: "/login",
  SIGNUP: "/register",
};

export const MODAL_TITLES = {
  ADD: "Add Item",
  EDIT: "Edit Item"
};

export const TODOS_QUERY = `
id,
title,
description,
isComplete,
todos (
  id,
  title,
  description,
  isComplete
)
`;
