import { Completed, Todo } from "../db/Todo";
import { createRealmContext } from "@realm/react";
import { User, Preferences } from "../db/User";

export const TodoRealmContext = createRealmContext({
    schema: [Todo,Completed,User,Preferences],
    deleteRealmIfMigrationNeeded: true,
  });