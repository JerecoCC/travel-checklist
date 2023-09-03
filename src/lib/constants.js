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
is_completed,
todos (
  id,
  title,
  description,
  is_completed
)
`;

export const TODOS_COUNT_QUERY = `
id,
is_completed
`;