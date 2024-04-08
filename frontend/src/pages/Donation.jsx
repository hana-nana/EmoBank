import React from "react";
import * as donation from "/src/services/donation.js";
class Donation extends React.Component {
  render() {
    return (
      <>
        <h1>Donation</h1>
        <button
          onClick={async () => {
            const emotion = "fear";
            console.log(await donation.donationRecommend(emotion));
          }}
        >
          기부 추천
        </button>

        <button
          onClick={async () => {
            const payInfo = {
              name: "test1",
              userId: "userKeyTest20",
              amount: "1000",
            };
            console.log(await donation.donationPay(payInfo));
          }}
        >
          기부하기
        </button>

        <button
          onClick={async () => {
            const userId = "userKeyTest20";
            console.log(await donation.donationHistory(userId));
          }}
        >
          기부내역
        </button>
      </>
    );
  }
}

export default Donation;
