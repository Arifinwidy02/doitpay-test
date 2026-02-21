import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fluidSize } from "flexivity-fluid-utils";
import CardList from "./components/card/CardList";
import { useModal } from "./context/modalProvider";
import CardDetailModal from "./components/card/modal/detailCard/CardDetailModal";
import { AddCardModal } from "./components/card/modal/addCard/AddCardModal";
import { useState } from "react";
import type { Card } from "./types/card";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isViewAll, setIsViewAll] = useState(false);
  const { activeModal, payload, closeModal } = useModal();
  const showViewAllOption = cards.length > 4;
  const handleAddCard = (card: Card) => {
    setCards([...cards, card]);
    closeModal();
  };
  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#F5FAFA",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
        onClick={() => setIsViewAll(!isViewAll)}
      >
        <h3 style={{ color: "black", fontSize: fluidSize(14, 16) }}>Cards</h3>
        {showViewAllOption && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <h3 style={{ color: "#EB4141", fontSize: fluidSize(14, 16) }}>
              View All
            </h3>
            {isViewAll ? (
              <ExpandMoreIcon
                style={{
                  color: "#EB4141",
                  width: 24,
                  height: 24,
                  marginLeft: 4,
                }}
              />
            ) : (
              <ArrowForwardIosIcon
                style={{
                  color: "#EB4141",
                  width: 14,
                  height: 14,
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        )}
      </div>
      <CardList cards={cards} isViewAll={isViewAll} />
      <CardDetailModal
        open={activeModal === "viewCard"}
        card={payload}
        onClose={closeModal}
      />
      <AddCardModal
        open={activeModal === "addCard"}
        onClose={closeModal}
        onSubmit={handleAddCard}
      />
    </div>
  );
}

export default App;
