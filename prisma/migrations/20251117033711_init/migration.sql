/*
  Warnings:

  - You are about to alter the column `movedToTrash` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movedToTrash" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Note" ("content", "createdAt", "id", "lastEditedAt", "movedToTrash", "title") SELECT "content", "createdAt", "id", "lastEditedAt", "movedToTrash", "title" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
