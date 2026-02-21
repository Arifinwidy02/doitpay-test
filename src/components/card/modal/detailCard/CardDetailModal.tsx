import { Modal, Button, Divider } from "antd";
import type { Card } from "../../../../types/card";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CardDetailModalProps {
  open: boolean;
  card?: Card | null;
  onClose: () => void;
}

export default function CardDetailModal({
  open,
  card,
  onClose,
}: CardDetailModalProps) {
  if (!card) return null;

  const { cardHolder, expiredAt, color } = card;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      closable={false}
      bodyStyle={{
        position: "relative",
      }}
    >
      <IoIosCloseCircleOutline
        style={{
          position: "absolute",
          top: -50,
          right: -24,
          width: 24,
          height: 24,
          color: "white",
          cursor: "pointer",
        }}
        onClick={onClose}
      />

      <h2
        style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "32px",
          marginTop: 0,
        }}
      >
        Card Detail
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <DetailRow label="Card Holder name" value={cardHolder} />
        <Divider style={{ margin: "24px 0" }} />

        <DetailRow label="Expired At" value={expiredAt} />
        <Divider style={{ margin: "24px 0" }} />

        <div
          style={{ display: "flex", alignItems: "center", minHeight: "32px" }}
        >
          <span style={{ color: "#8c8c8c", fontSize: "16px", width: "160px" }}>
            Card Color
          </span>
          <div
            style={{
              width: "56px",
              height: "24px",
              backgroundColor: color || "#14142b",
              borderRadius: "12px",
              border: "1px solid grey",
              marginLeft: "12px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <Button
          onClick={onClose}
          style={{
            height: "45px",
            padding: "0 32px",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#262626",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "#8c8c8c", fontSize: "16px", width: "160px" }}>
        {label}
      </span>
      <span
        style={{
          color: "#262626",
          fontSize: "16px",
          fontWeight: 500,
          marginLeft: "12px",
        }}
      >
        {value}
      </span>
    </div>
  );
}
