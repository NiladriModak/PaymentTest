import React, { useState } from "react";
import axios from "../axios";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

function Pay() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState(""); // State for amount

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const checkoutHandler = async () => {
    if (!name || !email || !contact || !amount) {
      return toast.error("Please enter all details");
    }

    try {
      const {
        data: { key },
      } = await axios.get("http://localhost/getRazorKey");

      const {
        data: { order },
      } = await axios.post("http://localhost/payment", {
        amount: amount, // Send amount to backend
      });

      const options = {
        key,
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Educate India",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              "http://localhost/paymentVerification",
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                email,
                name,
              }
            );

            window.location.href = "http://localhost:3000/studentRegister";
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name, // Ensure name is correctly formatted
          email,
          contact,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://theacademicinsights.com/wp-content/uploads/2021/10/education-in-21st-century.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          boxShadow: "5px 10px 18px #888888",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <h1>Payment Form</h1>
        <form
          style={{
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Contact_Number"
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            type="number"
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="contained"
            onClick={checkoutHandler}
          >
            Pay
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
