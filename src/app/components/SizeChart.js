"use client";
import { XCircleFill } from "react-bootstrap-icons";

export default function SizeChart({ onClose, chartImage }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl relative flex items-center justify-center"
        style={{
          width: "70vw",
          height: "70vh",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer"
          aria-label="Close"
        >
          <XCircleFill size={35} color="black" />
        </button>

        <img
          src={chartImage}
          alt="Size Chart"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}