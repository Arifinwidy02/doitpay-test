import { Modal, Input, Button, DatePicker, ColorPicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { formatCardNumber, maskCardNumber } from "../../../../utils/formatters";
import { cardSchema } from "../../../../schemas/card.schema";
import type { Card, CardFormValues } from "../../../../types/card";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Card) => void;
};

export const AddCardModal = ({ open, onClose, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CardFormValues>({
    resolver: yupResolver(cardSchema),
    mode: "onChange",
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      color: "#000000",
    },
  });

  const submitHandler = (data: CardFormValues) => {
    const payload: Card = {
      cardHolder: data.cardHolder,
      cardNumber: maskCardNumber(data.cardNumber),
      color: data.color,
      id: crypto.randomUUID(),
      expiredAt: data.expiredAt ? dayjs(data.expiredAt).format("MM/YYYY") : "",
    };

    onSubmit(payload);
    reset();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Add New Card"
      afterClose={() => reset()}
      closable={false}
      bodyStyle={{
        position: "relative",
      }}
    >
      <IoIosCloseCircleOutline
        style={{
          position: "absolute",
          top: -80,
          right: -24,
          width: 24,
          height: 24,
          color: "white",
          cursor: "pointer",
        }}
        onClick={onClose}
      />
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Card Holder */}
        <Controller
          name="cardHolder"
          control={control}
          render={({ field }) => (
            <>
              <label style={{ display: "block", marginBottom: 4 }}>
                Credit Card Holder
              </label>
              <Input {...field} placeholder="Superhuman" />
              {errors.cardHolder && (
                <small style={{ color: "red" }}>
                  {errors.cardHolder.message}
                </small>
              )}
            </>
          )}
        />

        {/* Card Number */}
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <>
              <label style={{ display: "block", margin: "12px 0px 4px" }}>
                Credit Card Number
              </label>
              <Input
                {...field}
                maxLength={19}
                placeholder="1234-5678-9012-3456"
                onChange={(e) =>
                  field.onChange(formatCardNumber(e.target.value))
                }
              />
              {errors.cardNumber && (
                <small style={{ color: "red" }}>
                  {errors.cardNumber.message}
                </small>
              )}
            </>
          )}
        />

        {/* Color */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label style={{ display: "block", margin: "12px 0px 4px" }}>
                Color
              </label>
              <ColorPicker
                value={field.value || "#000000"}
                onChange={(color) => field.onChange(color.toHexString())}
                styles={{ popupOverlayInner: { width: 300 } }}
                trigger="click"
              >
                <div
                  style={{
                    width: "100%",
                    height: "32px",
                    backgroundColor: field.value || "#000000",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderColor = "#4096ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderColor = "#d9d9d9")
                  }
                />
              </ColorPicker>
            </div>
          )}
        />

        {/* Expired At */}
        <Controller
          name="expiredAt"
          control={control}
          render={({ field }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <label
                style={{
                  display: "block",
                  margin: "12px 0px 4px",
                  fontWeight: 500,
                }}
              >
                Expired At
              </label>
              <DatePicker
                {...field}
                placeholder="dd/mm/yyyy"
                format="DD/MM/YYYY"
                style={{ width: "100%", height: "40px", borderRadius: "8px" }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                showToday={true}
              />
              {errors.expiredAt && (
                <small style={{ color: "red", marginTop: 4 }}>
                  {errors.expiredAt.message}
                </small>
              )}
            </div>
          )}
        />

        {/* Form Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <Button
            onClick={onClose}
            style={{
              height: "40px",
              padding: "0 24px",
              borderRadius: "8px",
              color: "#4b5563",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid}
            style={{
              height: "40px",
              padding: "0 32px",
              borderRadius: "8px",
              backgroundColor: isValid ? "#4f46e5" : "#d9d9d9",
              fontWeight: 500,
            }}
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};
