import { describe, expect, it, vi } from "vitest";
import { D1Provider } from "../../app/lib/storage/providers/d1";

describe("D1Provider contact persistence", () => {
  it("binds user input as parameters and reports the inserted row id", async () => {
    const run = vi.fn().mockResolvedValue({ success: true, meta: { last_row_id: 42 } });
    const bind = vi.fn().mockReturnValue({ run });
    const prepare = vi.fn().mockReturnValue({ bind });
    const provider = new D1Provider({ prepare });

    const result = await provider.saveContact({
      name: "Test User",
      email: "test@example.com",
      subject: "Hello",
      message: "Test message",
    });

    expect(prepare).toHaveBeenCalledWith(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
    );
    expect(bind).toHaveBeenCalledWith("Test User", "test@example.com", "Hello", "Test message");
    expect(result).toEqual({ success: true, id: 42 });
  });

  it("returns a failed result when D1 rejects the insert", async () => {
    const run = vi.fn().mockRejectedValue(new Error("D1 unavailable"));
    const bind = vi.fn().mockReturnValue({ run });
    const provider = new D1Provider({ prepare: vi.fn().mockReturnValue({ bind }) });

    await expect(provider.saveContact({
      name: "Test", email: "test@example.com", subject: "Subject", message: "Message",
    })).resolves.toEqual({ success: false, error: "D1 unavailable" });
  });
});
