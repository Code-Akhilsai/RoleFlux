import React, { useState } from "react";
import { Trash2, TriangleAlert } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deleteaccount = () => {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/v1/delete-account`, {
        withCredentials: true,
      });

      console.log(res);

      if (res.status !== 200) return alert("Failed to delete the account");

      nav("/", { replace: true });
    } catch (error) {
      return console.log(`Error:${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/15">
          <TriangleAlert className="h-4 w-4 text-red-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Delete account</p>
          <p className="mt-1 text-xs text-white/50">
            This will permanently delete your account and all associated data.
            This action cannot be undone.
          </p>

          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete account
            </button>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Yes, delete permanently"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={loading}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deleteaccount;
