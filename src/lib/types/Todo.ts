export default interface Todo {
  id: string;
  title?: string;
  description?: string;
  isComplete?: boolean;
  todos?: Todo[];
};
