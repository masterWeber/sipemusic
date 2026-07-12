-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Concert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" TEXT,
    "showTime" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "ticketUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Concert" ("city", "createdAt", "date", "id", "ticketUrl", "updatedAt", "venue") SELECT "city", "createdAt", "date", "id", "ticketUrl", "updatedAt", "venue" FROM "Concert";
DROP TABLE "Concert";
ALTER TABLE "new_Concert" RENAME TO "Concert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
