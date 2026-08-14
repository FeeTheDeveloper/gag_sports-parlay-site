import { createLedgerEntry, reconstructBalance, buildWalletBalance } from "@/lib/ledger";
import { LedgerEntry } from "@/types";

describe("Ledger core", () => {
  it("creates a ledger entry with correct balanceAfter", () => {
    const entry = createLedgerEntry({
      userId: "user-1",
      type: "DEPOSIT",
      amount: 500,
      balanceBefore: 0,
    });
    expect(entry.balanceAfter).toBe(500);
    expect(entry.type).toBe("DEPOSIT");
    expect(entry.id).toBeTruthy();
    expect(entry.createdAt).toBeTruthy();
  });

  it("reconstructs balance from entries", () => {
    const entries: LedgerEntry[] = [
      createLedgerEntry({ userId: "u", type: "DEPOSIT", amount: 1000, balanceBefore: 0 }),
      createLedgerEntry({ userId: "u", type: "WAGER", amount: -100, balanceBefore: 1000 }),
      createLedgerEntry({ userId: "u", type: "GRADE_WIN", amount: 90, balanceBefore: 900 }),
    ];
    const balance = reconstructBalance(entries);
    expect(balance).toBe(990);
  });

  it("builds wallet balance with bonus separation", () => {
    const entries: LedgerEntry[] = [
      createLedgerEntry({ userId: "u", type: "DEPOSIT", amount: 1000, balanceBefore: 0 }),
      createLedgerEntry({ userId: "u", type: "BONUS_CREDIT", amount: 100, balanceBefore: 1000 }),
    ];
    const wallet = buildWalletBalance("u", entries);
    expect(wallet.availableBalance).toBe(1000);
    expect(wallet.bonusBalance).toBe(100);
  });
});
