export default interface Todo {
  id: string;
  title?: string;
  description?: string;
  is_completed?: boolean;
  todos?: Todo[];
};
