import { fluidSize } from "flexivity-fluid-utils";
import type { Card } from "../../types/card";
import { IoLogoPolymer } from "react-icons/io";
import { useModal } from "../../context/modalProvider";

interface CardItemProps {
  item: Card;
}

export default function CardItem({ item }: CardItemProps) {
  const { cardNumber, cardHolder, expiredAt, color } = item;
  const { openModal } = useModal();
  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: color,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderRadius: "12px",
        flexDirection: "column",
        height: "150px",
        width: "100%",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
      onClick={() => openModal("viewCard", item)}
    >
      <div>
        <IoLogoPolymer
          style={{
            color: "white",
            width: 32,
            height: 32,
            transform: "rotate(90deg)",
          }}
        />
      </div>
      <div>
        <p style={{ color: "white", fontSize: fluidSize(14, 16) }}>
          {cardHolder}
        </p>
        <p style={{ color: "white", fontSize: fluidSize(14, 16) }}>
          {cardNumber}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: fluidSize(14, 16),
            }}
          >
            Expired At:
          </p>
          <p
            style={{
              color: "white",
              fontSize: fluidSize(14, 16),
            }}
          >
            {expiredAt}
          </p>
        </div>
        <img
          src="/Mastercard-logo.svg"
          alt="Mastercard"
          style={{
            color: "white",
            width: 32,
            height: 32,
          }}
        />
      </div>
    </div>
  );
}
