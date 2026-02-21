"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CardItem from "./CardItem";
import { useRef, useState } from "react";
import { fluidSize } from "flexivity-fluid-utils";
import { FiChevronLeft, FiPlusCircle, FiChevronRight } from "react-icons/fi";
import { useModal } from "../../context/modalProvider";
import type { Card } from "../../types/card";
import { CardSeed } from "../../data/card.seed";

type Props = {
  cards: Card[];
  isViewAll: boolean;
};

export default function CardList({ cards, isViewAll }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { openModal } = useModal();
  const cardsData = cards; //|| CardSeed; --> please choose cardseed for testing with multiple data

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 12,
        boxSizing: "border-box", // Pastikan padding tidak merusak layout
      }}
    >
      {/* 1. Tombol Add New Card */}
      <div
        style={{
          width: 250,
          minWidth: 250,
          height: 150, // Konsisten dengan tinggi CardItem
          border: "1px dashed grey",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
          flexShrink: 0,
        }}
        onClick={() => openModal("addCard")}
      >
        <FiPlusCircle size={32} color="black" />
        <h3
          style={{ fontSize: fluidSize(14, 16), color: "black", marginTop: 8 }}
        >
          Add New Card
        </h3>
      </div>

      {/* 2. Kondisi Data Kosong */}
      {cardsData?.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "grey", fontSize: fluidSize(18, 24) }}>
            No Card Added Yet, Please Add New Card
          </h2>
        </div>
      ) : (
        /* 3. Tampilan View All (Grid) vs Swiper */
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          {isViewAll ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {cardsData.map((item) => (
                <div key={item.id} style={{ width: 250 }}>
                  <CardItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Overlay Navigasi Panah */}
              {!isBeginning && (
                <div
                  onClick={() => swiperRef.current?.slidePrev()}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <FiChevronLeft size={24} color="white" />
                </div>
              )}

              {!isEnd && cards.length > 1 && (
                <div
                  onClick={() => swiperRef.current?.slideNext()}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <FiChevronRight size={24} color="white" />
                </div>
              )}

              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView="auto"
                spaceBetween={12}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                style={{ width: "100%", paddingBottom: "30px" }}
              >
                {cardsData.map((item) => (
                  <SwiperSlide key={item.id} style={{ width: 250 }}>
                    <CardItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      )}
    </div>
  );
}
