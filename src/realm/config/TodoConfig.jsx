import { Completed, Todo } from "../db/Todo";
import { createRealmContext } from "@realm/react";
import { User } from "../db/User";

export const TodoRealmContext = createRealmContext({
    schema: [Todo,Completed,User],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1
  });