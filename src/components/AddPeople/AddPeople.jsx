import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AddPeople.module.css";
const url=`https://backend-zvy9.onrender.com`

function AddPeople({ handleAction, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isEmailAdded, setIsEmailAdded] = useState(false);

  const handleAddEmail = async () => {
    if (email) {
      try {
        const response = await fetch(`${url}/auth/addUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          handleAction(email);
          setIsEmailAdded(true);
        } else {
          console.error("Failed to add email");
        }
      } catch (error) {
        console.error("Error adding email:", error);
      }
    }
  };

  const handleConfirm = () => {
    setIsEmailAdded(false);
    setEmail("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBackground} onClick={onClose}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalBox}>
              {isEmailAdded ? (
                <div className={styles.buttonsuccessful}>
                  <p>{email} added to board</p>
                  <button onClick={handleConfirm} className={styles.logoutBtn}>
                    Okay, got it!
                  </button>
                </div>
              ) : (
                <div>
                  <p>Add people to the board</p>
                  <div className={styles.titleHeader}>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the email"
                      required
                    />
                  </div>
                  <div className={styles.buttons}>
                    <button className={styles.cancelBtn} onClick={onClose}>
                      Cancel
                    </button>
                    <button onClick={handleAddEmail} className={styles.logoutBtn}>
                      Add Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AddPeople.propTypes = {
  handleAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPeople;
