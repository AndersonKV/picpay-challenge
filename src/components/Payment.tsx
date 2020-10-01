import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const Pagamento = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  max-width: 600px;
  margin: 0 auto;

  h3 {
    background: #8e2de2;
    color: white;
    padding: 10px;

    span {
      color: greenyellow;
    }
  }

  div {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 auto;

    input {
      margin: 3px 0px;
    }
  }

  button {
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

export interface ModalHandles {
  openModal: () => void;
}

interface SelectProps {
  location: any;
}

interface User {
  id: string;
  name: string;
  img: string;
  username: string;
}

const Modal: React.FC<SelectProps> = (props) => {
  const [user, setUser] = useState<User>();
  const [cash, setCash] = useState("");
  const [card, setCard] = useState("");
  const [paymentAccept, setPaymentAccept] = useState(false);
  const [rejectPayment, setRejectPayment] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const { state } = props.location;
    if (state != null) {
      setUser(state.user);
    } else {
      history.push("/");
    }
  });

  const handleNumbers = (event: any) => {
    var theEvent = event || window.event;
    // Handle paste
    if (theEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }
  };

  const handleSubmit = () => {
    if (cash != "" && cash[0] != "0") {
      if (card == "4111111111111234") {
        setPaymentAccept(true);
      } else {
        setRejectPayment(true);
      }
    }
  };

  let cards = [
    // valid card
    {
      card_number: "1111111111111111",
      cvv: 789,
      expiry_date: "01/18",
    },
    // invalid card
    {
      card_number: "4111111111111234",
      cvv: 123,
      expiry_date: "01/20",
    },
  ];

  const PaymentAccept = () => (
    <div>
      <h3>Recebido de pagamento</h3>
      <span>O pagamento foi concluido com sucesso</span>
    </div>
  );

  const RejectedPayament = () => (
    <div>
      <h3>Recebido de pagamento</h3>
      <span>
        O pagamento <b>não</b> foi concluido com sucesso
      </span>
    </div>
  );

  return (
    <>
      {rejectPayment === true ? (
        <RejectedPayament />
      ) : paymentAccept != true ? (
        <Pagamento>
          <h3>
            Pagamento para <span>{user && user.name}</span>
          </h3>
          <div>
            <input
              type="text"
              value={cash}
              placeholder="R$ 0,00"
              onKeyPress={handleNumbers}
              onChange={(event) => setCash(event.target.value)}
            />

            <input
              type="text"
              value={card}
              placeholder="Cartão com final 0123"
              onChange={(event) => setCard(event.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Pagar</button>
        </Pagamento>
      ) : (
        <PaymentAccept />
      )}
    </>
  );
};

export default Modal;
